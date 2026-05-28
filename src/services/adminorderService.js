// services/adminService.js
import apiClient from '../../lib/apiClient';

const adminService = {
  // Get all orders
  getAllOrders: async () => {
    try {
      const response = await apiClient.get('/orders');
      if (response.data.success) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/status`, { status });
      if (response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to update status');
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },

  // Get dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get recent orders for dashboard
  getRecentOrders: async () => {
    try {
      const response = await apiClient.get('/dashboard/recent-orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      throw error;
    }
  }
};

export default adminService;