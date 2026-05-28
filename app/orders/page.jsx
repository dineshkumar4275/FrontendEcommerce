// app/orders/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { EyeIcon, TruckIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import orderCancelService from '../../src/services/orderCancelService';
import { CancelOrderModal } from '../../src/components/orders/CancelOrderModal';
// Remove toast import - already in providers

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadOrders();
    // Listen for order cancellation events
    window.addEventListener('orderCancelled', () => loadOrders());
    return () => window.removeEventListener('orderCancelled', () => loadOrders());
  }, []);

  const loadOrders = () => {
    try {
      setLoading(true);
      
      let allOrders = [];
      
      const userOrders = localStorage.getItem('user_orders');
      if (userOrders) {
        const parsed = JSON.parse(userOrders);
        if (Array.isArray(parsed) && parsed.length > 0) {
          allOrders = parsed;
        }
      }
      
      if (allOrders.length === 0) {
        const oldOrders = localStorage.getItem('orders');
        if (oldOrders) {
          const parsed = JSON.parse(oldOrders);
          if (Array.isArray(parsed)) {
            allOrders = parsed;
          }
        }
      }
      
      allOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setOrders(allOrders);
      
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId, reason, comments) => {
    const result = await orderCancelService.cancelOrder(orderId, reason, comments);
    
    if (result.success) {
      // Toast will be shown by the global toast provider
      // You can dispatch a custom event or just rely on the state update
      setCancelModalOpen(false);
      setSelectedOrder(null);
      loadOrders();
    }
  };

  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setCancelModalOpen(true);
  };

  const formatAmount = (amount) => {
    const num = parseFloat(amount);
    return isNaN(num) ? 0 : num.toLocaleString();
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <ClockIcon className="w-4 h-4" />,
      confirmed: <CheckCircleIcon className="w-4 h-4" />,
      delivered: <CheckCircleIcon className="w-4 h-4" />,
      cancelled: <XCircleIcon className="w-4 h-4" />
    };
    return icons[status] || <ClockIcon className="w-4 h-4" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-100 py-8 pt-24">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-8 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
              <p className="text-gray-500 text-sm mt-1">Track and manage your orders</p>
            </div>
            <button
              onClick={() => router.push('/products')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
            >
              Continue Shopping
            </button>
          </div>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="text-7xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
              <p className="text-gray-500 mb-6">Looks like you haven't placed any orders</p>
              <button
                onClick={() => router.push('/products')}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition"
              >
                Start Shopping →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
                >
                  <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Order #{order.order_number || order.id}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.created_at)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status?.toUpperCase() || 'PENDING'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-purple-600">
                          ₹{formatAmount(order.total_amount)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {order.items?.length || order.products?.length || 0} item(s)
                        </p>
                      </div>
                      <div className="flex gap-3">
                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                          <button
                            onClick={() => router.push(`/track/${order.id}`)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-1"
                          >
                            <TruckIcon className="w-4 h-4" />
                            Track Order
                          </button>
                        )}
                        
                        {orderCancelService.canCancelOrder(order) && (
                          <button
                            onClick={() => openCancelModal(order)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition"
                          >
                            Cancel Order
                          </button>
                        )}
                        
                        <button
                          onClick={() => router.push(`/orders/${order.id}`)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition flex items-center gap-1"
                        >
                          <EyeIcon className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CancelOrderModal
        isOpen={cancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
        onConfirm={handleCancelOrder}
      />
      
      <Footer />
    </>
  );
}