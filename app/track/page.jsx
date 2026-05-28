// app/track/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import { TruckIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function TrackOrderInputPage() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Load recent orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    const allOrders = orders.length > 0 ? orders : userOrders;
    
    const recent = allOrders.slice(0, 3).map(order => ({
      id: order.order_number || order.id,
      order_number: order.order_number || order.id,
      created_at: order.created_at
    }));
    setRecentOrders(recent);
  }, []);

  const handleTrack = async (e) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      toast.error('Please enter your order ID');
      return;
    }

    setLoading(true);
    
    // Check if order exists in localStorage before redirecting
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    const allOrders = [...orders, ...userOrders];
    
    const orderExists = allOrders.some(order => 
      order.id === orderId.trim() || 
      order.order_number === orderId.trim() ||
      order.orderNumber === orderId.trim()
    );
    
    if (!orderExists) {
      toast.error('Order not found. Please check your order ID.');
      setLoading(false);
      return;
    }
    
    router.push(`/track/${orderId.trim()}`);
    setLoading(false);
  };

  const handleQuickTrack = (orderId) => {
    router.push(`/track/${orderId}`);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-8 pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-purple-600 transition">Home</Link>
                <span>/</span>
                <span className="text-purple-600 font-medium">Track Order</span>
              </div>
            </div>

            {/* Track Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8 text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TruckIcon className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">Track Your Order</h1>
                <p className="text-white/80 mt-2">Enter your order ID to track your package</p>
              </div>

              <div className="p-8">
                <form onSubmit={handleTrack} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Order ID / Order Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter your order ID"
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        autoFocus
                      />
                      <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      You can find your order ID in your order confirmation email or in your orders page.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
                  >
                    {loading ? 'Checking...' : 'Track Order →'}
                  </button>
                </form>

                {/* Recent Orders */}
                {recentOrders.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700 mb-3">Recent Orders</p>
                    <div className="space-y-2">
                      {recentOrders.map((order) => (
                        <button
                          key={order.id}
                          onClick={() => handleQuickTrack(order.id)}
                          className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-800">#{order.id}</p>
                            <p className="text-xs text-gray-500">
                              {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Recent order'}
                            </p>
                          </div>
                          <span className="text-purple-600 text-sm">Track →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Don't have an order ID? 
                    <Link href="/orders" className="text-purple-600 hover:underline ml-1">
                      View my orders
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📦</span>
                </div>
                <h3 className="font-semibold">Order Confirmed</h3>
                <p className="text-xs text-gray-500 mt-1">Your order has been placed</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-semibold">Shipped</h3>
                <p className="text-xs text-gray-500 mt-1">Your order is on the way</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="font-semibold">Delivered</h3>
                <p className="text-xs text-gray-500 mt-1">Order delivered successfully</p>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Need help? <Link href="/contact" className="text-purple-600 hover:underline">Contact Support</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}