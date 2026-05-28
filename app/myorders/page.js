// app/myorders/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import apiClient from '../../src/lib/apiClient';
import toast from 'react-hot-toast';

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/orders/myorders');
      console.log('API Response:', response.data);
      
      let ordersList = [];
      if (response.data.success && Array.isArray(response.data.data)) {
        ordersList = response.data.data;
      } else if (Array.isArray(response.data)) {
        ordersList = response.data;
      } else if (response.data.orders && Array.isArray(response.data.orders)) {
        ordersList = response.data.orders;
      }
      
      setOrders(ordersList);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getAmount = (order) => {
    // Try different possible field names
    const amount = order.total_amount || order.totalAmount || order.amount || order.total || 0;
    const numAmount = parseFloat(amount);
    return isNaN(numAmount) ? 0 : numAmount;
  };

  const getOrderNumber = (order) => {
    return order.order_number || order.orderNumber || order.id || 'N/A';
  };

  const getStatus = (order) => {
    return order.status || order.orderStatus || 'pending';
  };

  const getDate = (order) => {
    const date = order.created_at || order.createdAt || order.orderDate;
    if (!date) return 'Just now';
    try {
      return new Date(date).toLocaleDateString('en-IN');
    } catch {
      return 'Just now';
    }
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 'bg-green-100 text-green-800';
    if (s === 'cancelled') return 'bg-red-100 text-red-800';
    if (s === 'pending') return 'bg-yellow-100 text-yellow-800';
    if (s === 'confirmed') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (!token) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Please Login</h2>
            <Link href="/login" className="text-purple-600 hover:text-purple-700">
              Login to see your orders →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-500 mb-4">No orders yet</p>
              <Link href="/products" className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
                Start Shopping →
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order #{getOrderNumber(order)}</p>
                      <p className="text-sm text-gray-500">{getDate(order)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(getStatus(order))}`}>
                      {getStatus(order).toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-purple-600">
                          ₹{getAmount(order).toLocaleString()}
                        </p>
                      </div>
                      <Link 
                        href={`/orders/${order.id}`}
                        className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}