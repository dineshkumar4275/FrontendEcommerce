'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/apiClient';
import toast from 'react-hot-toast';
import { 
  EyeIcon, 
  TruckIcon, 
  CheckCircleIcon, 
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      const response = await apiClient.post('/orders/assign', { 
        orderId: parseInt(orderId), 
        driverId: parseInt(driverId) 
      });
      
      if (response.data.success) {
        toast.success('Driver assigned successfully');
        fetchOrders();
      } else {
        toast.error(response.data.message || 'Failed to assign driver');
      }
    } catch (error) {
      console.error('Assign driver error:', error);
      toast.error('Failed to assign driver');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/status`, { status });
      if (response.data.success) {
        toast.success(`Order status updated`);
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

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <CheckCircleIcon className="w-4 h-4" />;
      case 'pending': return <ClockIcon className="w-4 h-4" />;
      default: return <TruckIcon className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Orders Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track all customer orders</p>
        </div>
        <div className="text-sm text-gray-500">
          Total Orders: <span className="font-semibold text-purple-600">{orders.length}</span>
        </div>
      </div>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 sm:p-12 text-center">
          <div className="text-5xl sm:text-6xl mb-4">📦</div>
          <h3 className="text-lg sm:text-xl font-semibold">No orders yet</h3>
          <p className="text-gray-500 mt-2 text-sm">Orders will appear here once customers place orders</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-4 border border-gray-100">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Order ID</p>
                    <p className="font-semibold text-purple-600">#{order.order_number}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="space-y-2 mb-3 text-sm">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-gray-400" />
                    <span>{order.customer_name || 'Guest'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CurrencyRupeeIcon className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold">₹{parseFloat(order.total_amount).toLocaleString()}</span>
                  </div>
                </div>

                {/* Driver Assignment */}
                <div className="mb-3">
                  {order.driver_id ? (
                    <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded-lg">
                      <TruckIcon className="w-4 h-4" />
                      <span>Driver: {order.driver_name || 'Assigned'}</span>
                    </div>
                  ) : (
                    <select
                      onChange={(e) => assignDriver(order.id, e.target.value)}
                      defaultValue=""
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                    >
                      <option value="">Select Driver</option>
                      {drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.name} {driver.is_available ? '✅' : '❌'}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Status Update */}
                <select
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  defaultValue={order.status}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="accepted">Accepted</option>
                  <option value="picked_up">Picked Up</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
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
                    <tr key={order.id} className="hover:bg-gray-50">
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
                        {order.driver_id ? (
                          <span className="text-sm text-green-600">✓ Assigned</span>
                        ) : (
                          <select
                            onChange={(e) => assignDriver(order.id, e.target.value)}
                            defaultValue=""
                            className="border rounded px-2 py-1 text-sm"
                          >
                            <option value="">Select Driver</option>
                            {drivers.map((driver) => (
                              <option key={driver.id} value={driver.id}>
                                {driver.name}
                              </option>
                            ))}
                          </select>
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
        </div>
      )}

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Order Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="p-4">
              <pre className="text-sm">{JSON.stringify(selectedOrder, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}