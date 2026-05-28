// src/services/trackingService.js
import apiClient from '../lib/apiClient';

// Simple tracking service without socket.io for now
export const trackingService = {
  // Get tracking history from localStorage
  getTrackingHistory: async (orderId) => {
    try {
      // First check localStorage
      const localTracking = localStorage.getItem(`tracking_${orderId}`);
      if (localTracking) {
        return {
          success: true,
          data: JSON.parse(localTracking),
        };
      }
      
      // Try to get from order's tracking in orders storage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const order = orders.find(o => o.id === orderId || o.order_number === orderId);
      
      if (order && order.tracking) {
        return {
          success: true,
          data: order.tracking,
        };
      }
      
      // Return default tracking
      return {
        success: true,
        data: [
          {
            status: 'confirmed',
            location: 'Order confirmed',
            timestamp: new Date().toISOString()
          }
        ],
      };
    } catch (error) {
      console.error('Error fetching tracking history:', error);
      return {
        success: false,
        data: [],
        message: error.message,
      };
    }
  },

  // Add tracking update
  addTrackingUpdate: async (orderId, update) => {
    try {
      // Save to localStorage
      const existing = localStorage.getItem(`tracking_${orderId}`);
      const tracking = existing ? JSON.parse(existing) : [];
      tracking.push({
        ...update,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(`tracking_${orderId}`, JSON.stringify(tracking));
      
      // Also update order tracking
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const orderIndex = orders.findIndex(o => o.id === orderId || o.order_number === orderId);
      if (orderIndex !== -1) {
        if (!orders[orderIndex].tracking) orders[orderIndex].tracking = [];
        orders[orderIndex].tracking.push({
          ...update,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('user_orders', JSON.stringify(orders));
      }
      
      return { success: true, data: tracking };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Initialize socket (optional, for future use)
  initSocket: () => {
    console.log('Socket initialization skipped - using localStorage');
    return null;
  },

  joinOrderTracking: (orderId) => {
    console.log(`Joined tracking for order: ${orderId}`);
  },

  leaveOrderTracking: (orderId) => {
    console.log(`Left tracking for order: ${orderId}`);
  },

  onStatusUpdate: (callback) => {
    // Placeholder for socket events
  },

  onLocationUpdate: (callback) => {
    // Placeholder for socket events
  },

  removeListeners: () => {
    // Placeholder
  },

  disconnectSocket: () => {
    // Placeholder
  },

  getEstimatedDelivery: async (orderId) => {
    try {
      // Calculate estimated delivery (3-5 days from order date)
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const order = orders.find(o => o.id === orderId || o.order_number === orderId);
      
      if (order && order.created_at) {
        const orderDate = new Date(order.created_at);
        const estimatedDate = new Date(orderDate);
        estimatedDate.setDate(orderDate.getDate() + 5);
        
        return {
          success: true,
          data: {
            estimated_delivery: estimatedDate.toISOString(),
            message: 'Estimated delivery within 3-5 business days'
          },
        };
      }
      
      return {
        success: false,
        message: 'Could not estimate delivery',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },
};