// hooks/useProducts.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, searchProducts, getCategories } from '../../src/services/productService';
import { fetchWishlist, toggleWishlistLocal, addToWishlistAsync, removeFromWishlistAsync } from '../../src/store/slices/wishlistSlice';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';

export const useProducts = (options = {}) => {
  const { autoFetch = true, initialFilters = {} } = options;
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    q: '',
    category: '',
    minPrice: 0,
    maxPrice: 100000,
    sortBy: 'newest',
    ...initialFilters
  });
  const [totalProducts, setTotalProducts] = useState(0);
  
  const dispatch = useDispatch();
  const { addToCart } = useCart();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const wishlistState = useSelector((state) => state.wishlist || { items: [], loading: false });
  const wishlistItems = wishlistState.items || [];
  const wishlistIds = new Set(wishlistItems.map(item => item.product_id || item.id));

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      let results;
      
      if (filters.q) {
        results = await searchProducts(filters);
      } else {
        results = await getProducts();
      }
      
      setProducts(results);
      setTotalProducts(results.length);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  // Fetch wishlist
  const fetchWishlistData = useCallback(() => {
    if (token || isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, token, isAuthenticated]);

  // Add to cart
  const handleAddToCart = useCallback(async (product) => {
    const success = addToCart(product);
    if (success) {
      toast.success(`${product.name} added to cart!`, { icon: '🛒' });
    }
    return success;
  }, [addToCart]);

  // Toggle wishlist
  const handleWishlistToggle = useCallback(async (productId, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (!token && !isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      // Add router push logic here if needed
      return;
    }
    
    dispatch(toggleWishlistLocal(productId));
    
    try {
      if (wishlistIds.has(productId)) {
        await dispatch(removeFromWishlistAsync(productId)).unwrap();
        toast.success('Removed from wishlist', { 
          icon: '💔',
          style: { borderRadius: '12px', background: '#1e1b4b', color: '#fff' }
        });
      } else {
        await dispatch(addToWishlistAsync(productId)).unwrap();
        toast.success('Added to wishlist!', { 
          icon: '❤️',
          style: { borderRadius: '12px', background: '#1e1b4b', color: '#fff' }
        });
      }
    } catch (error) {
      dispatch(toggleWishlistLocal(productId));
      toast.error('Failed to update wishlist');
    }
  }, [dispatch, token, isAuthenticated, wishlistIds]);

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const setSearchQuery = useCallback((q) => {
    setFilters(prev => ({ ...prev, q }));
  }, []);

  const setCategory = useCallback((category) => {
    setFilters(prev => ({ ...prev, category }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      q: '',
      category: '',
      minPrice: 0,
      maxPrice: 100000,
      sortBy: 'newest',
    });
  }, []);

  // Auto fetch on mount and filter changes
  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [autoFetch, fetchProducts]);

  useEffect(() => {
    fetchCategories();
    fetchWishlistData();
  }, [fetchCategories, fetchWishlistData]);

  return {
    products,
    loading,
    categories,
    filters,
    totalProducts,
    wishlistIds,
    fetchProducts,
    fetchCategories,
    handleAddToCart,
    handleWishlistToggle,
    updateFilters,
    setSearchQuery,
    setCategory,
    resetFilters,
  };
};