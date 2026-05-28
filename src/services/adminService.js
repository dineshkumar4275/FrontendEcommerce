// services/adminService.js
import apiClient from '../lib/apiClient';

const adminService = {
  // Dashboard Stats
  getDashboardStats: async () => {
    try {
      const response = await apiClient.get('/dashboard/stats');
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return {
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0
      };
    }
  },

  // Recent Orders
  getRecentOrders: async (limit = 10) => {
    try {
      const response = await apiClient.get(`/orders?limit=${limit}`);
      if (response.data && response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching recent orders:', error);
      return [];
    }
  },

  // All Orders
  getAllOrders: async () => {
    try {
      const response = await apiClient.get('/orders');
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  },

  // Update Order Status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/status`, { status });
      if (response.data && response.data.success) {
        return response.data.data;
      }
      throw new Error('Failed to update status');
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  // Get Order Details
  getOrderDetails: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  },

  // Admin Stats
  getAdminStats: async () => {
    try {
      const response = await apiClient.get('/admin/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get All Users (Admin)
  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update User Role
  updateUserRole: async (userId, role) => {
    try {
      const response = await apiClient.put(`/admin/users/${userId}/role`, { role });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get Sales Analytics
  getSalesAnalytics: async (period = 'month') => {
    try {
      const response = await apiClient.get(`/admin/analytics/sales?period=${period}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get Admin Recent Orders
  getAdminRecentOrders: async () => {
    try {
      const response = await apiClient.get('/admin/recent-orders');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

// Export both as default AND named export
export default adminService;
export { adminService };