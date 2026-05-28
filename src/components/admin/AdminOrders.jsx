'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/apiClient';
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    fetchDrivers();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/orders');
      if (response.data.success) {
        setOrders(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await apiClient.get('/drivers/all');
      if (response.data.success) {
        setDrivers(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const assignDriver = async (orderId, driverId) => {
    if (!driverId) {
      toast.error('Please select a driver');
      return;
    }
    
    try {
      console.log('Assigning driver:', { orderId, driverId });
      
      const response = await apiClient.post('/orders/assign', { 
        orderId: parseInt(orderId), 
        driverId: parseInt(driverId) 
      });
      
      if (response.data.success) {
        toast.success(response.data.message || 'Driver assigned successfully');
        fetchOrders(); // Refresh orders
        fetchDrivers(); // Refresh drivers list
      } else {
        toast.error(response.data.message || 'Failed to assign driver');
      }
    } catch (error) {
      console.error('Assign driver error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to assign driver';
      toast.error(errorMessage);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/status`, { status });
      if (response.data.success) {
        toast.success(`Order status updated to ${status}`);
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      picked_up: 'bg-purple-100 text-purple-800',
      in_transit: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders Management</h1>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold">No orders yet</h3>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assign Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      #{order.order_number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.customer_name || 'Guest'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      ₹{parseFloat(order.total_amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        onChange={(e) => assignDriver(order.id, e.target.value)}
                        defaultValue=""
                        className="border rounded px-2 py-1 text-sm"
                        disabled={order.driver_id}
                      >
                        <option value="">Select Driver</option>
                        {drivers.map((driver) => (
                          <option key={driver.id} value={driver.id}>
                            {driver.name} {driver.is_available ? '✅' : '❌'}
                          </option>
                        ))}
                      </select>
                      {order.driver_id && (
                        <p className="text-xs text-green-600 mt-1">
                          Assigned to: {order.driver_name}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        defaultValue={order.status}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="accepted">Accepted</option>
                        <option value="picked_up">Picked Up</option>
                        <option value="in_transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}