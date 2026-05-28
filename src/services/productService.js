// src/services/productService.js
import apiClient from '../lib/apiClient';

// Get all products
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    if (response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get single product by ID
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    if (response.data.success) {
      return response.data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// ✅ CREATE PRODUCT
export const createProduct = async (productData) => {
  try {
    const response = await apiClient.post('/products', productData);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to create product');
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// ✅ UPDATE PRODUCT
export const updateProduct = async (id, productData) => {
  try {
    const response = await apiClient.put(`/products/${id}`, productData);
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to update product');
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// ✅ DELETE PRODUCT
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    if (response.data.success) {
      return true;
    }
    throw new Error(response.data.message || 'Failed to delete product');
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Search with filters
export const searchProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (filters.q && filters.q.trim()) {
      params.append('q', filters.q);
    }
    
    if (filters.category && filters.category !== 'all' && filters.category !== '') {
      params.append('category', filters.category);
    }
    
    if (filters.minPrice && filters.minPrice > 0) {
      params.append('minPrice', filters.minPrice);
    }
    if (filters.maxPrice && filters.maxPrice > 0) {
      params.append('maxPrice', filters.maxPrice);
    }
    
    params.append('limit', filters.limit || 50);
    
    const response = await apiClient.get(`/products/search?${params.toString()}`);
    
    if (response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
};

// Get all categories
export const getCategories = async () => {
  try {
    const response = await apiClient.get('/products/categories');
    if (response.data.success) {
      return response.data.data || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};