// // services/api/orderService.js
// import apiClient from '../lib/apiClient';

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     if (typeof window === 'undefined') {
//       resolve(false);
//       return;
//     }
    
//     if (window.Razorpay) {
//       console.log('Razorpay already loaded');
//       resolve(true);
//       return;
//     }
    
//     console.log('Loading Razorpay script...');
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     script.onload = () => {
//       console.log('Razorpay script loaded successfully');
//       resolve(true);
//     };
//     script.onerror = () => {
//       console.error('Failed to load Razorpay script');
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// };

// const orderService = {
//   // Create order and initiate payment
//   createOrderWithPayment: async (orderData, userDetails) => {
//     try {
//       console.log('Step 1: Creating order in backend...');
      
//       // Step 1: Create order in backend
//       const response = await apiClient.post('/orders', orderData);
      
//       console.log('Order response:', response.data);
      
//       if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to create order');
//       }
      
//       const { order, razorpayOrder } = response.data;
      
//       console.log('Step 2: Loading Razorpay script...');
      
//       // Step 2: Load Razorpay script
//       const isScriptLoaded = await loadRazorpayScript();
//       if (!isScriptLoaded) {
//         throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
//       }
      
//       console.log('Step 3: Opening Razorpay checkout...');
//       console.log('Razorpay Order:', razorpayOrder);
      
//       // Step 3: Open Razorpay checkout
//       return new Promise((resolve, reject) => {
//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//           amount: razorpayOrder.amount,
//           currency: razorpayOrder.currency,
//           name: 'Ecommerce Store',
//           description: `Order #${order.order_number}`,
//           order_id: razorpayOrder.id,
//           handler: async (paymentResponse) => {
//             console.log('Payment handler called:', paymentResponse);
            
//             try {
//               // Step 4: Verify payment
//               console.log('Step 4: Verifying payment...');
//               const verifyResponse = await apiClient.post('/orders/verify-payment', {
//                 razorpay_order_id: paymentResponse.razorpay_order_id,
//                 razorpay_payment_id: paymentResponse.razorpay_payment_id,
//                 razorpay_signature: paymentResponse.razorpay_signature,
//                 order_id: order.id
//               });
              
//               console.log('Verify response:', verifyResponse.data);
              
//               if (verifyResponse.data.success) {
//                 resolve({
//                   success: true,
//                   order: verifyResponse.data.data,
//                   payment: paymentResponse
//                 });
//               } else {
//                 reject(new Error(verifyResponse.data.message || 'Payment verification failed'));
//               }
//             } catch (error) {
//               console.error('Verification error:', error);
//               reject(new Error('Payment verification failed. Please contact support.'));
//             }
//           },
//           prefill: {
//             name: userDetails.name || userDetails.fullName || '',
//             email: userDetails.email || 'customer@example.com',
//             contact: userDetails.mobile || userDetails.phone || ''
//           },
//           theme: {
//             color: '#3B82F6'
//           },
//           modal: {
//             ondismiss: () => {
//               console.log('Razorpay modal closed by user');
//               reject(new Error('Payment cancelled by user'));
//             }
//           }
//         };
        
//         const razorpayInstance = new window.Razorpay(options);
        
//         // Handle payment failure
//         razorpayInstance.on('payment.failed', (response) => {
//           console.error('Payment failed:', response.error);
//           reject(new Error(response.error.description || 'Payment failed. Please try again.'));
//         });
        
//         razorpayInstance.open();
//       });
      
//     } catch (error) {
//       console.error('Order creation failed:', error);
//       throw error;
//     }
//   },
  
//   // Get user orders
//   getUserOrders: async () => {
//     try {
//       const response = await apiClient.get('/orders/myorders?userId=1');
//       return response.data.success ? response.data.data : [];
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       return [];
//     }
//   }
// };

// export default orderService;
// src/services/globalOrderService.js
'use client';

import apiClient from '../lib/apiClient';

// Storage keys
const STORAGE_KEYS = {
  ORDERS: 'global_orders',
  CURRENT_ORDER: 'current_order',
  TRACKING: 'global_tracking'
};

// Global Order Service
class GlobalOrderService {
  constructor() {
    this.orders = [];
    this.listeners = [];
    this.loadOrders();
  }

  // Load orders from localStorage
  loadOrders() {
    try {
      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      this.orders = savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Error loading orders:', error);
      this.orders = [];
    }
  }

  // Save orders to localStorage
  saveOrders() {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
    this.notifyListeners();
  }

  // Add listener for order updates
  addListener(callback) {
    this.listeners.push(callback);
  }

  // Remove listener
  removeListener(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.orders));
  }

  // Get all orders
  getAllOrders() {
    return this.orders;
  }

  // Get order by ID
  getOrderById(orderId) {
    return this.orders.find(order => 
      order.id === orderId || 
      order.order_number === orderId ||
      order.orderNumber === orderId
    );
  }

  // Create new order
  async createOrder(orderData, userDetails = null) {
    try {
      // Generate order number
      const orderNumber = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();
      
      const newOrder = {
        id: orderNumber,
        order_number: orderNumber,
        orderNumber: orderNumber,
        items: orderData.items || orderData.products || [],
        products: orderData.items || orderData.products || [],
        total_amount: parseFloat(orderData.total_amount || orderData.totalAmount || 0),
        totalAmount: parseFloat(orderData.total_amount || orderData.totalAmount || 0),
        subtotal: parseFloat(orderData.subtotal || 0),
        tax: parseFloat(orderData.tax || 0),
        shipping: parseFloat(orderData.shipping || 0),
        status: orderData.paymentMethod === 'cod' ? 'pending' : 'confirmed',
        orderStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'confirmed',
        payment_method: orderData.paymentMethod || 'cod',
        paymentMethod: orderData.paymentMethod || 'cod',
        payment_status: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
        paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
        shipping_address: orderData.shippingAddress || orderData.shipping_address,
        shippingAddress: orderData.shippingAddress || orderData.shipping_address,
        created_at: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        userDetails: userDetails || null
      };

      // Save to localStorage first
      this.orders.unshift(newOrder);
      this.saveOrders();

      // Try to save to backend if logged in
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const backendOrder = await apiClient.post('/orders', {
            order_number: orderNumber,
            total_amount: newOrder.total_amount,
            shipping_address: newOrder.shipping_address,
            products: newOrder.items,
            status: newOrder.status,
            payment_method: newOrder.payment_method,
            payment_status: newOrder.payment_status
          });
          
          if (backendOrder.data.success) {
            newOrder.backendId = backendOrder.data.data.id;
            this.saveOrders();
          }
        } catch (error) {
          console.log('Backend save failed, order saved locally');
        }
      }

      return { success: true, order: newOrder };
    } catch (error) {
      console.error('Order creation error:', error);
      return { success: false, error: error.message };
    }
  }

  // Update order status
  updateOrderStatus(orderId, status) {
    const order = this.getOrderById(orderId);
    if (order) {
      order.status = status;
      order.orderStatus = status;
      order.updated_at = new Date().toISOString();
      this.saveOrders();
      
      // Try to update backend if exists
      if (order.backendId) {
        apiClient.put(`/orders/${order.backendId}/status`, { status }).catch(console.error);
      }
      
      return true;
    }
    return false;
  }

  // Add tracking update
  addTrackingUpdate(orderId, update) {
    const tracking = this.getTrackingHistory(orderId);
    tracking.push({
      ...update,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(`${STORAGE_KEYS.TRACKING}_${orderId}`, JSON.stringify(tracking));
  }

  // Get tracking history
  getTrackingHistory(orderId) {
    try {
      const tracking = localStorage.getItem(`${STORAGE_KEYS.TRACKING}_${orderId}`);
      return tracking ? JSON.parse(tracking) : [];
    } catch {
      return [];
    }
  }

  // Cancel order
  async cancelOrder(orderId, reason = '') {
    const order = this.getOrderById(orderId);
    if (order && (order.status === 'pending' || order.status === 'confirmed')) {
      this.updateOrderStatus(orderId, 'cancelled');
      
      // Add cancellation tracking
      this.addTrackingUpdate(orderId, {
        status: 'cancelled',
        location: 'Order cancelled',
        message: reason || 'Order cancelled by customer'
      });
      
      return { success: true };
    }
    return { success: false, error: 'Order cannot be cancelled' };
  }

  // Clear all orders (for testing)
  clearAllOrders() {
    this.orders = [];
    this.saveOrders();
  }

  // Get orders by status
  getOrdersByStatus(status) {
    return this.orders.filter(order => order.status === status);
  }

  // Get recent orders
  getRecentOrders(limit = 5) {
    return this.orders.slice(0, limit);
  }

  // Get order statistics
  getOrderStats() {
    return {
      total: this.orders.length,
      pending: this.getOrdersByStatus('pending').length,
      confirmed: this.getOrdersByStatus('confirmed').length,
      delivered: this.getOrdersByStatus('delivered').length,
      cancelled: this.getOrdersByStatus('cancelled').length,
      totalRevenue: this.orders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
    };
  }
}

// Singleton instance
const globalOrderService = new GlobalOrderService();
export default globalOrderService;