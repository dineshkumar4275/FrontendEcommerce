// 'use client';

// import { useState, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchOrdersStart,
//   fetchOrdersSuccess,
//   fetchOrdersFailure,
//   fetchOrderByIdStart,
//   fetchOrderByIdSuccess,
//   fetchOrderByIdFailure,
//   createOrderStart,
//   createOrderSuccess,
//   createOrderFailure,
// } from '@/store/slices/orderSlice';
// import { orderService } from '@/services/orderService';
// import { paymentService } from '@/services/paymentService';
// import { toast } from 'react-hot-toast';

// export const useOrders = () => {
//   const dispatch = useDispatch();
//   const { orders, selectedOrder, loading, error, totalPages, currentPage } = useSelector(
//     (state) => state.orders
//   );
//   const [trackingInfo, setTrackingInfo] = useState(null);

//   const fetchOrders = useCallback(async (params = {}) => {
//     dispatch(fetchOrdersStart());
//     try {
//       const queryParams = {
//         page: params.page || currentPage || 1,
//         limit: params.limit || 10,
//         status: params.status || '',
//         sortBy: params.sortBy || 'newest',
//       };
      
//       const response = await orderService.getOrders(queryParams);
      
//       dispatch(fetchOrdersSuccess({
//         orders: response.data.orders,
//         totalPages: response.data.totalPages,
//         currentPage: queryParams.page,
//       }));
      
//       return { success: true, data: response.data };
//     } catch (error) {
//       dispatch(fetchOrdersFailure(error.message));
//       return { success: false, error: error.message };
//     }
//   }, [dispatch, currentPage]);

//   const fetchOrderById = useCallback(async (id) => {
//     dispatch(fetchOrderByIdStart());
//     try {
//       const response = await orderService.getOrderById(id);
//       dispatch(fetchOrderByIdSuccess(response.data));
//       return { success: true, order: response.data };
//     } catch (error) {
//       dispatch(fetchOrderByIdFailure(error.message));
//       return { success: false, error: error.message };
//     }
//   }, [dispatch]);

//   const createOrder = useCallback(async (orderData) => {
//     dispatch(createOrderStart());
//     try {
//       const response = await orderService.createOrder(orderData);
//       dispatch(createOrderSuccess(response.data));
//       toast.success('Order placed successfully!');
//       return { success: true, order: response.data };
//     } catch (error) {
//       dispatch(createOrderFailure(error.message));
//       toast.error(error.response?.data?.message || 'Failed to place order');
//       return { success: false, error: error.message };
//     }
//   }, [dispatch]);

//   const cancelOrder = useCallback(async (orderId, reason = '') => {
//     try {
//       const response = await orderService.cancelOrder(orderId, reason);
//       if (response.success) {
//         toast.success('Order cancelled successfully');
//         await fetchOrderById(orderId);
//         await fetchOrders();
//         return { success: true };
//       }
//     } catch (error) {
//       toast.error('Failed to cancel order');
//       return { success: false };
//     }
//   }, [fetchOrderById, fetchOrders]);

//   const trackOrder = useCallback(async (orderId) => {
//     try {
//       const response = await orderService.trackOrder(orderId);
//       setTrackingInfo(response.data);
//       return { success: true, tracking: response.data };
//     } catch (error) {
//       toast.error('Failed to track order');
//       return { success: false, error: error.message };
//     }
//   }, []);

//   const requestReturn = useCallback(async (orderId, returnData) => {
//     try {
//       const response = await orderService.requestReturn(orderId, returnData);
//       if (response.success) {
//         toast.success('Return request submitted successfully');
//         return { success: true };
//       }
//     } catch (error) {
//       toast.error('Failed to submit return request');
//       return { success: false };
//     }
//   }, []);

//   const initiatePayment = useCallback(async (orderId, paymentMethod) => {
//     try {
//       const response = await paymentService.initiatePayment(orderId, paymentMethod);
      
//       if (paymentMethod === 'razorpay') {
//         // Handle Razorpay payment
//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//           amount: response.data.amount,
//           currency: response.data.currency,
//           name: 'E-Commerce Store',
//           description: `Order #${orderId}`,
//           order_id: response.data.orderId,
//           handler: async (paymentResponse) => {
//             await verifyPayment(orderId, paymentResponse);
//           },
//           prefill: {
//             name: response.data.customerName,
//             email: response.data.customerEmail,
//             contact: response.data.customerPhone,
//           },
//           theme: {
//             color: '#3b82f6',
//           },
//         };
        
//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       }
      
//       return { success: true, paymentData: response.data };
//     } catch (error) {
//       toast.error('Failed to initiate payment');
//       return { success: false };
//     }
//   }, []);

//   const verifyPayment = useCallback(async (orderId, paymentResponse) => {
//     try {
//       const response = await paymentService.verifyPayment(orderId, paymentResponse);
//       if (response.success) {
//         toast.success('Payment successful!');
//         await fetchOrderById(orderId);
//         return { success: true };
//       }
//     } catch (error) {
//       toast.error('Payment verification failed');
//       return { success: false };
//     }
//   }, [fetchOrderById]);

//   const downloadInvoice = useCallback(async (orderId) => {
//     try {
//       const response = await orderService.downloadInvoice(orderId);
      
//       // Create blob and download
//       const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `invoice_${orderId}.pdf`;
//       a.click();
//       window.URL.revokeObjectURL(url);
      
//       toast.success('Invoice downloaded');
//       return { success: true };
//     } catch (error) {
//       toast.error('Failed to download invoice');
//       return { success: false };
//     }
//   }, []);

//   return {
//     orders,
//     selectedOrder,
//     loading,
//     error,
//     totalPages,
//     currentPage,
//     trackingInfo,
//     fetchOrders,
//     fetchOrderById,
//     createOrder,
//     cancelOrder,
//     trackOrder,
//     requestReturn,
//     initiatePayment,
//     verifyPayment,
//     downloadInvoice,
//   };
// };
// src/hooks/useGlobalOrders.js
'use client';

import { useState, useEffect, useCallback } from 'react';
import globalOrderService from '../../src/services/orderService';
import toast from 'react-hot-toast';

export const useGlobalOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    delivered: 0,
    cancelled: 0,
    totalRevenue: 0
  });

  // Load orders on mount
  useEffect(() => {
    loadOrders();
    
    // Listen for order updates
    const handleOrderUpdate = (updatedOrders) => {
      setOrders(updatedOrders);
      updateStats(updatedOrders);
    };
    
    globalOrderService.addListener(handleOrderUpdate);
    return () => globalOrderService.removeListener(handleOrderUpdate);
  }, []);

  const loadOrders = () => {
    const allOrders = globalOrderService.getAllOrders();
    setOrders(allOrders);
    updateStats(allOrders);
    setLoading(false);
  };

  const updateStats = (orderList) => {
    setStats({
      total: orderList.length,
      pending: orderList.filter(o => o.status === 'pending').length,
      confirmed: orderList.filter(o => o.status === 'confirmed').length,
      delivered: orderList.filter(o => o.status === 'delivered').length,
      cancelled: orderList.filter(o => o.status === 'cancelled').length,
      totalRevenue: orderList.reduce((sum, o) => sum + (o.total_amount || 0), 0)
    });
  };

  const createOrder = useCallback(async (orderData, userDetails) => {
    setLoading(true);
    try {
      const result = await globalOrderService.createOrder(orderData, userDetails);
      if (result.success) {
        toast.success('Order placed successfully!');
        return result;
      } else {
        toast.error('Failed to place order');
        return result;
      }
    } catch (error) {
      toast.error('Failed to place order');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrder = useCallback((orderId) => {
    return globalOrderService.getOrderById(orderId);
  }, []);

  const cancelOrder = useCallback(async (orderId, reason) => {
    setLoading(true);
    try {
      const result = await globalOrderService.cancelOrder(orderId, reason);
      if (result.success) {
        toast.success('Order cancelled successfully');
        loadOrders();
        return result;
      } else {
        toast.error(result.error || 'Failed to cancel order');
        return result;
      }
    } catch (error) {
      toast.error('Failed to cancel order');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = useCallback((orderId, status) => {
    const result = globalOrderService.updateOrderStatus(orderId, status);
    if (result) {
      loadOrders();
      toast.success(`Order status updated to ${status}`);
    }
    return result;
  }, []);

  const getTracking = useCallback((orderId) => {
    return globalOrderService.getTrackingHistory(orderId);
  }, []);

  const getOrdersByStatus = useCallback((status) => {
    return globalOrderService.getOrdersByStatus(status);
  }, []);

  const getRecentOrders = useCallback((limit) => {
    return globalOrderService.getRecentOrders(limit);
  }, []);

  return {
    orders,
    loading,
    stats,
    createOrder,
    getOrder,
    cancelOrder,
    updateStatus,
    getTracking,
    getOrdersByStatus,
    getRecentOrders,
    refreshOrders: loadOrders
  };
};