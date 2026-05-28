// src/services/api/driverService.js
import apiClient from '@/lib/apiClient';

const driverService = {
  // ✅ Get all drivers (for admin panel)
  getAllDrivers: async () => {
    try {
      console.log('📡 Calling API: /drivers/all');
      const response = await apiClient.get('/drivers/all');
      console.log('📥 Response:', response.data);
      
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data || [],
          total: response.data.total || 0
        };
      }
      return { success: false, data: [], total: 0 };
    } catch (error) {
      console.error('Error fetching all drivers:', error);
      return { success: false, data: [], total: 0, error: error.message };
    }
  },

  // ✅ Get active drivers only (Online) - FIXED ENDPOINT
  getActiveDrivers: async () => {
    try {
      console.log('📡 Calling API: /drivers/active');
      const response = await apiClient.get('/drivers/active');
      console.log('📥 Active drivers response:', response.data);
      
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data || [],
          total: response.data.data?.length || 0
        };
      }
      return { success: false, data: [], total: 0 };
    } catch (error) {
      console.error('Error fetching active drivers:', error);
      return { success: false, data: [], total: 0, error: error.message };
    }
  },

  // ✅ Get inactive drivers only (Offline)
  getInactiveDrivers: async () => {
    try {
      console.log('📡 Calling API: /drivers/inactive');
      const response = await apiClient.get('/drivers/inactive');
      
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data || [],
          total: response.data.data?.length || 0
        };
      }
      return { success: false, data: [], total: 0 };
    } catch (error) {
      console.error('Error fetching inactive drivers:', error);
      return { success: false, data: [], total: 0 };
    }
  },

  // ✅ Get driver status summary
  getDriverSummary: async () => {
    try {
      console.log('📡 Calling API: /drivers/summary');
      const response = await apiClient.get('/drivers/summary');
      
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data || { total: 0, active: 0, inactive: 0 }
        };
      }
      return { success: false, data: { total: 0, active: 0, inactive: 0 } };
    } catch (error) {
      console.error('Error fetching driver summary:', error);
      return { success: false, data: { total: 0, active: 0, inactive: 0 } };
    }
  },

  // ✅ Get single driver by ID
  getDriverById: async (id) => {
    try {
      console.log(`📡 Calling API: /drivers/${id}`);
      const response = await apiClient.get(`/drivers/${id}`);
      
      if (response.data && response.data.success) {
        return { success: true, data: response.data.data };
      }
      return { success: false, data: null };
    } catch (error) {
      console.error('Error fetching driver:', error);
      return { success: false, data: null };
    }
  },

  // ✅ Create new driver
  createDriver: async (driverData) => {
    try {
      console.log('📡 Creating driver:', driverData);
      const response = await apiClient.post('/drivers', driverData);
      
      if (response.data && response.data.success) {
        return { success: true, data: response.data.data, message: 'Driver created successfully' };
      }
      return { success: false, message: response.data?.message || 'Failed to create driver' };
    } catch (error) {
      console.error('Error creating driver:', error);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  // ✅ Update driver
  updateDriver: async (id, driverData) => {
    try {
      console.log(`📡 Updating driver ${id}:`, driverData);
      const response = await apiClient.put(`/drivers/${id}`, driverData);
      
      if (response.data && response.data.success) {
        return { success: true, data: response.data.data, message: 'Driver updated successfully' };
      }
      return { success: false, message: response.data?.message || 'Failed to update driver' };
    } catch (error) {
      console.error('Error updating driver:', error);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  // ✅ Delete driver
  deleteDriver: async (id) => {
    try {
      console.log(`📡 Deleting driver ${id}`);
      const response = await apiClient.delete(`/drivers/${id}`);
      
      if (response.data && response.data.success) {
        return { success: true, message: 'Driver deleted successfully' };
      }
      return { success: false, message: response.data?.message || 'Failed to delete driver' };
    } catch (error) {
      console.error('Error deleting driver:', error);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  },

  // ✅ Update driver status (online/offline)
  updateDriverStatus: async (id, isAvailable) => {
    try {
      console.log(`📡 Updating driver ${id} status to: ${isAvailable ? 'online' : 'offline'}`);
      const response = await apiClient.patch(`/drivers/status/${id}`, { is_active: isAvailable });
      
      if (response.data && response.data.success) {
        return { 
          success: true, 
          data: response.data.data,
          message: isAvailable ? 'Driver is now online' : 'Driver is now offline'
        };
      }
      return { success: false, message: response.data?.message || 'Failed to update status' };
    } catch (error) {
      console.error('Error updating driver status:', error);
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
};

export default driverService;