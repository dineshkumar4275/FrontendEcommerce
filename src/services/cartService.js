import apiClient from './apiClient';

export const cartService = {
  // Get cart
  getCart: async () => {
    try {
      const response = await apiClient.get('/cart');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch cart',
      };
    }
  },

  // Add to cart
  addToCart: async (item) => {
    try {
      const response = await apiClient.post('/cart', item);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add to cart',
      };
    }
  },

  // Update quantity
  updateQuantity: async (productId, quantity) => {
    try {
      const response = await apiClient.put(`/cart/${productId}`, { quantity });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update quantity',
      };
    }
  },

  // Remove from cart
  removeFromCart: async (productId) => {
    try {
      const response = await apiClient.delete(`/cart/${productId}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove from cart',
      };
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const response = await apiClient.delete('/cart');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to clear cart',
      };
    }
  },

  // Apply coupon
  applyCoupon: async (code) => {
    try {
      const response = await apiClient.post('/cart/apply-coupon', { code });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid coupon',
      };
    }
  },

  // Remove coupon
  removeCoupon: async () => {
    try {
      const response = await apiClient.delete('/cart/coupon');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove coupon',
      };
    }
  },

  // Sync cart (for logged in users)
  syncCart: async (items) => {
    try {
      const response = await apiClient.post('/cart/sync', { items });
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to sync cart',
      };
    }
  },
};