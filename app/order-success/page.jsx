'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  TruckIcon, 
  ShoppingBagIcon, 
  ArrowPathIcon,
  ClockIcon,
  MapPinIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import apiClient from '../../src/lib/apiClient';
import toast from 'react-hot-toast';

// Component that uses useSearchParams
function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [tracking, setTracking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
      fetchTrackingDetails();
    } else {
      router.push('/products');
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = localOrders.find(o => 
        o.id === orderId || o.order_number === orderId || o.orderNumber === orderId
      );
      
      if (foundOrder) {
        setOrder(foundOrder);
        return;
      }
      
      const response = await apiClient.get(`/orders/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const fetchTrackingDetails = async () => {
    try {
      if (order?.tracking) {
        setTracking(order.tracking);
      } else {
        const response = await apiClient.get(`/tracking/${orderId}`);
        if (response.data.success) {
          setTracking(response.data.tracking || []);
        } else {
          setTracking([
            {
              status: 'confirmed',
              location: 'Order confirmed successfully',
              timestamp: new Date().toISOString()
            }
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching tracking:', error);
      setTracking([
        {
          status: 'confirmed',
          location: 'Order confirmed successfully',
          timestamp: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstimatedDelivery = () => {
    if (!order?.created_at) return '3-5 business days';
    const orderDate = new Date(order.created_at);
    const estimatedDate = new Date(orderDate);
    estimatedDate.setDate(orderDate.getDate() + 5);
    return estimatedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order && !loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="text-7xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
            <p className="text-gray-500 mb-6">We couldn't find your order details</p>
            <Link href="/products">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition">
                Continue Shopping
              </button>
            </Link>
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
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="text-center mb-6"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircleIcon className="w-12 h-12 text-green-600" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8 text-center">
                <h1 className="text-2xl font-bold text-white">Order Placed Successfully! 🎉</h1>
                <p className="text-green-100 mt-2">Thank you for your purchase</p>
              </div>

              <div className="p-6">
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-500">Order ID</span>
                    <span className="font-semibold text-gray-800">#{order?.order_number || orderId}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-500">Total Amount</span>
                    <span className="font-bold text-green-600 text-lg">₹{parseFloat(order?.total_amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Payment Status</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold">
                      <CheckCircleIcon className="w-3 h-3" />
                      Paid
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <TruckIcon className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">Estimated Delivery</p>
                      <p className="font-bold text-blue-800 text-lg">{getEstimatedDelivery()}</p>
                    </div>
                  </div>
                </div>

                {tracking.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-purple-600" />
                      Latest Update
                    </h3>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="font-medium text-purple-800 capitalize">
                        {tracking[tracking.length - 1]?.status?.replace(/_/g, ' ')}
                      </p>
                      <p className="text-sm text-purple-600 mt-1">{tracking[tracking.length - 1]?.location}</p>
                      <p className="text-xs text-purple-400 mt-2">{formatDate(tracking[tracking.length - 1]?.timestamp)}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Link href={`/track/${orderId}`}>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                      <TruckIcon className="w-5 h-5" />
                      Track Your Order
                    </button>
                  </Link>
                  
                  <Link href={`/orders/${orderId}`}>
                    <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2">
                      <ShoppingBagIcon className="w-5 h-5" />
                      View Order Details
                    </button>
                  </Link>
                  
                  <Link href="/products">
                    <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
                      Continue Shopping
                    </button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <EnvelopeIcon className="w-4 h-4" />
                    <span>Order confirmation sent to your email</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    You can also track your order from your Orders page
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Link href="/orders">
                <div className="bg-white rounded-xl p-4 text-center hover:shadow-md transition cursor-pointer">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ShoppingBagIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="font-medium text-gray-800">My Orders</p>
                  <p className="text-xs text-gray-400">View all orders</p>
                </div>
              </Link>
              <Link href="/products">
                <div className="bg-white rounded-xl p-4 text-center hover:shadow-md transition cursor-pointer">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ArrowPathIcon className="w-5 h-5 text-pink-600" />
                  </div>
                  <p className="font-medium text-gray-800">Shop More</p>
                  <p className="text-xs text-gray-400">Continue shopping</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Main page component with Suspense boundary
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}