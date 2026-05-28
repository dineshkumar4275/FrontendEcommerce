// src/services/userOrderService.js
import apiClient from '@/lib/apiClient';

const userOrderService = {
  // Get user's orders
  getUserOrders: async () => {
    try {
      const response = await apiClient.get('/orders/my-orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Track order
  trackOrder: async (orderNumber) => {
    try {
      const response = await apiClient.get(`/orders/track/${orderNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error tracking order:', error);
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (orderId) => {
    try {
      const response = await apiClient.patch(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  }
};

export default userOrderService;