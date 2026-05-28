// hooks/useProductSearch.js
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchProducts } from '../services/productService';

// Simple debounce function
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const DEFAULT_FILTERS = {
  q: '',
  category: '',
  minPrice: 0,
  maxPrice: 100000,
  minRating: 0,
  sortBy: 'newest',
  inStock: false,
  page: 1,
  limit: 20,
};

export function useProductSearch(options = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { initialFilters = {}, debounceMs = 500, autoFetch = true } = options;

  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  // Debounced search query
  const debouncedSearchQuery = useDebounce(filters.q, debounceMs);

  // Sync with URL params
  useEffect(() => {
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');
    const page = searchParams.get('page');

    if (q) setFilters(prev => ({ ...prev, q }));
    if (category) setFilters(prev => ({ ...prev, category }));
    if (minPrice) setFilters(prev => ({ ...prev, minPrice: Number(minPrice) }));
    if (maxPrice) setFilters(prev => ({ ...prev, maxPrice: Number(maxPrice) }));
    if (sort) setFilters(prev => ({ ...prev, sortBy: sort }));
    if (page) setFilters(prev => ({ ...prev, page: Number(page) }));
  }, [searchParams]);

  // Fetch products - UPDATED to work with your API response
  const fetchProducts = useCallback(async (currentFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching with filters:', currentFilters);
      
      // Call your existing searchProducts function
      const result = await searchProducts({
        q: currentFilters.q,
        category: currentFilters.category,
        minPrice: currentFilters.minPrice,
        maxPrice: currentFilters.maxPrice,
        limit: currentFilters.limit,
      });
      
      console.log('Search result:', result);
      
      // Your API returns an array directly
      const productsArray = Array.isArray(result) ? result : [];
      console.log('Products found:', productsArray.length);
      
      setProducts(productsArray);
      setTotalProducts(productsArray.length);
      setTotalPages(Math.ceil(productsArray.length / currentFilters.limit));
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch products');
      setProducts([]);
      setTotalProducts(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced fetch
  const debouncedFetch = useRef(
    debounce((currentFilters) => {
      fetchProducts(currentFilters);
    }, debounceMs)
  ).current;

  // Auto fetch when debounced search query changes
  useEffect(() => {
    if (autoFetch) {
      debouncedFetch(filters);
    }
  }, [debouncedSearchQuery, filters.category, filters.minPrice, filters.maxPrice, autoFetch, debouncedFetch]);

  // Update URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.q) params.set('q', filters.q);
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice > 0) params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice < 100000) params.set('maxPrice', String(filters.maxPrice));
    if (filters.sortBy !== 'newest') params.set('sort', filters.sortBy);
    if (filters.page > 1) params.set('page', String(filters.page));
    
    const newURL = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    router.replace(newURL, { scroll: false });
  }, [filters.q, filters.category, filters.minPrice, filters.maxPrice, filters.sortBy, filters.page, router]);

  // Helper functions
  const setSearchQuery = useCallback((q) => {
    setFilters(prev => ({ ...prev, q, page: 1 }));
  }, []);

  const setCategory = useCallback((category) => {
    setFilters(prev => ({ ...prev, category, page: 1 }));
  }, []);

  const setPriceRange = useCallback((min, max) => {
    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max, page: 1 }));
  }, []);

  const setSortBy = useCallback((sortBy) => {
    setFilters(prev => ({ ...prev, sortBy, page: 1 }));
  }, []);

  const toggleInStock = useCallback(() => {
    setFilters(prev => ({ ...prev, inStock: !prev.inStock, page: 1 }));
  }, []);

  const setRating = useCallback((rating) => {
    setFilters(prev => ({ ...prev, minRating: rating, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS, ...initialFilters });
  }, [initialFilters]);

  const nextPage = useCallback(() => {
    if (filters.page < totalPages) {
      setFilters(prev => ({ ...prev, page: prev.page + 1 }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [filters.page, totalPages]);

  const prevPage = useCallback(() => {
    if (filters.page > 1) {
      setFilters(prev => ({ ...prev, page: prev.page - 1 }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [filters.page]);

  const setPage = useCallback((page) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return {
    filters,
    products,
    loading,
    totalProducts,
    totalPages,
    error,
    hasMore: filters.page < totalPages,
    setSearchQuery,
    setCategory,
    setPriceRange,
    setSortBy,
    toggleInStock,
    setRating,
    resetFilters,
    nextPage,
    prevPage,
    setPage,
    refetch: () => fetchProducts(filters),
  };
}