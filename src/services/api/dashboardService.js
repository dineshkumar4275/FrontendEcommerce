// services/dashboardService.js
import apiClient from '../../lib/apiClient';
import adminService from '../adminService';
import driverService from '../driverService';

export const getDashboardStats = async () => {
  try {
    // Try primary endpoint
    const response = await apiClient.get('/dashboard/stats');
    if (response.data && response.data.success) {
      return response.data.data;
    }
    if (response.data && !response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error('Dashboard stats error:', error);
    
    // Try alternative endpoint
    try {
      const altResponse = await adminService.getAdminStats();
      if (altResponse && altResponse.success) {
        return altResponse.data;
      }
    } catch (altError) {
      console.error('Alternative stats endpoint also failed:', altError);
    }
    
    // Return default values
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalRevenue: 0
    };
  }
};

export const getRecentOrders = async (limit = 10) => {
  try {
    const response = await apiClient.get(`/orders/recent?limit=${limit}`);
    if (response.data && response.data.data) {
      return response.data.data;
    }
    if (response.data && response.data.success && response.data.orders) {
      return response.data.orders;
    }
    return [];
  } catch (error) {
    console.error('Recent orders error:', error);
    
    // Try alternative endpoint
    try {
      const altResponse = await apiClient.get(`/orders?limit=${limit}`);
      if (altResponse.data && altResponse.data.data) {
        return altResponse.data.data;
      }
    } catch (altError) {
      console.error('Alternative orders endpoint failed:', altError);
    }
    
    return [];
  }
};

export const getActiveDrivers = async () => {
  try {
    const response = await driverService.getActiveDrivers();
    if (response && response.success) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error('Active drivers error:', error);
    return [];
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await adminService.updateOrderStatus(orderId, status);
    return response;
  } catch (error) {
    console.error('Update order status error:', error);
    throw error;
  }
};

export const assignDriverToOrder = async (orderId, driverId) => {
  try {
    const response = await driverService.assignDriverToOrder(orderId, driverId);
    return response;
  } catch (error) {
    console.error('Assign driver error:', error);
    throw error;
  }
};