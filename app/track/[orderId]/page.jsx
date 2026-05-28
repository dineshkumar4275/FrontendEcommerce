// app/track/[orderId]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  TruckIcon, 
  ClockIcon, 
  CubeIcon,
  MapPinIcon, 
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Header } from '../../../src/components/layout/Header';
import { Footer } from '../../../src/components/layout/Footer';
import toast from 'react-hot-toast';

export default function TrackOrderPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId;
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      
      // Check localStorage for orders
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
      const allOrders = [...localOrders, ...userOrders];
      
      // Remove duplicates by id
      const uniqueOrders = Array.from(new Map(allOrders.map(o => [o.id, o])).values());
      
      const foundOrder = uniqueOrders.find(o => 
        o.id === orderId || 
        o.order_number === orderId || 
        o.orderNumber === orderId
      );
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        toast.error('Order not found');
        router.push('/track');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order');
      router.push('/track');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'accepted': 'bg-purple-100 text-purple-800',
      'picked_up': 'bg-indigo-100 text-indigo-800',
      'in_transit': 'bg-orange-100 text-orange-800',
      'out_for_delivery': 'bg-pink-100 text-pink-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'pending': <ClockIcon className="w-4 h-4" />,
      'confirmed': <CheckCircleIcon className="w-4 h-4" />,
      'accepted': <TruckIcon className="w-4 h-4" />,
      'picked_up': <CubeIcon className="w-4 h-4" />,
      'in_transit': <TruckIcon className="w-4 h-4" />,
      'out_for_delivery': <TruckIcon className="w-4 h-4" />,
      'delivered': <CheckCircleIcon className="w-4 h-4" />,
      'cancelled': <XCircleIcon className="w-4 h-4" />
    };
    return icons[status] || <ClockIcon className="w-4 h-4" />;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    const num = parseFloat(amount);
    return isNaN(num) ? 0 : num.toLocaleString();
  };

  const getProgressPercentage = (status) => {
    const steps = ['pending', 'confirmed', 'accepted', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'];
    const currentIndex = steps.indexOf(status);
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const trackingSteps = [
    { key: 'confirmed', label: 'Confirmed', icon: '✅' },
    { key: 'accepted', label: 'Assigned', icon: '👨‍✈️' },
    { key: 'picked_up', label: 'Picked', icon: '📦' },
    { key: 'in_transit', label: 'Shipped', icon: '🚚' },
    { key: 'out_for_delivery', label: 'Near You', icon: '🏠' },
    { key: 'delivered', label: 'Delivered', icon: '🎉' }
  ];

  const currentStepIndex = trackingSteps.findIndex(step => step.key === order?.status);
  const progressPercent = getProgressPercentage(order?.status);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
            <p className="text-gray-500 mb-4">We couldn't find order #{orderId}</p>
            <Link href="/track" className="text-purple-600 hover:underline">
              Try another order ID →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const address = order.shipping_address || order.shippingAddress;
  const items = order.items || order.products || [];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-8 pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-purple-600 transition">Home</Link>
                <span>/</span>
                <Link href="/track" className="hover:text-purple-600 transition">Track Order</Link>
                <span>/</span>
                <span className="text-purple-600 font-medium">#{order.order_number || order.id}</span>
              </div>
            </div>

            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold">Track Order</h1>
                  <p className="text-gray-500 mt-1">Order #{order.order_number || order.id}</p>
                </div>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-6">Order Status</h2>
              
              {/* Progress Bar */}
              <div className="relative mb-8">
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="relative flex justify-between">
                  {trackingSteps.map((step, idx) => {
                    const isCompleted = idx <= currentStepIndex;
                    const isActive = idx === currentStepIndex;
                    
                    return (
                      <div key={step.key} className="text-center flex-1">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-all
                          ${isCompleted ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-400'}
                          ${isActive ? 'ring-4 ring-purple-200 scale-110' : ''}
                        `}>
                          <span className="text-lg">{step.icon}</span>
                        </div>
                        <p className={`text-xs font-medium ${isCompleted ? 'text-purple-600' : 'text-gray-400'}`}>
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tracking Updates */}
              {order.tracking && order.tracking.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-4">Tracking History</h3>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {order.tracking.map((track, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                        </div>
                        <div>
                          <p className="font-medium capitalize text-gray-800">{track.status?.replace(/_/g, ' ')}</p>
                          <p className="text-sm text-gray-500">{track.location}</p>
                          <p className="text-xs text-gray-400">{formatDate(track.created_at || track.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Order Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-medium capitalize">{order.payment_method || order.paymentMethod || 'COD'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className="font-medium text-green-600 capitalize">{order.payment_status || order.paymentStatus || 'Paid'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-bold text-purple-600 text-lg">₹{formatAmount(order.total_amount)}</p>
                </div>
              </div>
            </div>

            {/* Items Ordered */}
            {items.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Items Ordered</h2>
                <div className="space-y-4">
                  {items.map((product, idx) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">📦</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-purple-600">₹{formatAmount(product.price)}</p>
                        <p className="text-xs text-gray-400">Total: ₹{formatAmount(product.price * product.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Address */}
            {address && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <div className="text-gray-700">
                  {typeof address === 'object' ? (
                    <>
                      <p className="font-medium">{address.fullName}</p>
                      <p>{address.address}</p>
                      <p>{address.city}, {address.state} - {address.pincode}</p>
                      <p>Phone: {address.phone}</p>
                    </>
                  ) : (
                    <p>{address}</p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Link href="/orders" className="flex-1">
                <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">
                  My Orders
                </button>
              </Link>
              <Link href="/products" className="flex-1">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}