'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import apiClient from '@/lib/apiClient';
import toast from 'react-hot-toast';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch order details
      const orderRes = await apiClient.get(`/orders/${id}`);
      setOrder(orderRes.data);
      
      // Try to fetch tracking data, but don't fail if it doesn't exist
      try {
        const trackingRes = await apiClient.get(`/tracking/${id}`);
        setTracking(trackingRes.data);
      } catch (trackingError) {
        // Tracking endpoint might not exist or tracking not available
        console.log('Tracking data not available:', trackingError.response?.status);
        setTracking(null);
        // Don't show error toast for tracking as it's optional
      }
      
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
      
      if (error.response?.status === 404) {
        toast.error('Order not found');
      } else if (error.response?.status === 401) {
        // Handle unauthorized
        localStorage.removeItem('token');
        window.location.href = '/admin/login';
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (newStatus) => {
    try {
      setUpdating(true);
      await apiClient.put(`/orders/${id}/status`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      accepted: 'bg-blue-100 text-blue-800',
      picked_up: 'bg-purple-100 text-purple-800',
      in_transit: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-gray-500 text-lg">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
        <p className="text-gray-500">The order you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
        <p className="text-gray-500">Order #{order.order_number || order.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">Order Status</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 font-medium">Current Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {order.status?.toUpperCase()}
                </span>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-600 font-medium mb-2">Update Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(e.target.value)}
                  disabled={updating}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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

              {updating && (
                <div className="text-sm text-indigo-600">Updating status...</div>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">Customer Information</h2>
            </div>
            <div className="p-6 space-y-3">
              <div>
                <span className="text-gray-500 text-sm">Name:</span>
                <p className="font-medium">{order.user_name || 'Guest User'}</p>
              </div>
              {order.user_email && (
                <div>
                  <span className="text-gray-500 text-sm">Email:</span>
                  <p className="font-medium">{order.user_email}</p>
                </div>
              )}
              {order.user_phone && (
                <div>
                  <span className="text-gray-500 text-sm">Phone:</span>
                  <p className="font-medium">{order.user_phone}</p>
                </div>
              )}
              {order.shipping_address && (
                <div>
                  <span className="text-gray-500 text-sm">Shipping Address:</span>
                  <p className="font-medium whitespace-pre-wrap">{order.shipping_address}</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{item.product_name}</div>
                            {item.sku && <div className="text-xs text-gray-500">SKU: {item.sku}</div>}
                          </div>
                        </td>
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4">₹{Number(item.price).toLocaleString('en-IN')}</td>
                        <td className="px-6 py-4 font-medium">₹{Number(item.total).toLocaleString('en-IN')}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                        No items found
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-right font-medium">Subtotal:</td>
                    <td className="px-6 py-4">₹{Number(order.subtotal || order.total_amount).toLocaleString('en-IN')}</td>
                  </tr>
                  {order.delivery_charge > 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-right font-medium">Delivery Charge:</td>
                      <td className="px-6 py-4">₹{Number(order.delivery_charge).toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  {order.tax > 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-right font-medium">Tax:</td>
                      <td className="px-6 py-4">₹{Number(order.tax).toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  <tr className="border-t-2">
                    <td colSpan="3" className="px-6 py-4 text-right font-bold text-lg">Total:</td>
                    <td className="px-6 py-4 font-bold text-lg">₹{Number(order.total_amount).toLocaleString('en-IN')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Additional Info */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
            </div>
            <div className="p-6 space-y-3">
              <div>
                <span className="text-gray-500 text-sm">Order Date:</span>
                <p className="font-medium">
                  {order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}
                </p>
              </div>
              {order.driver_name && (
                <div>
                  <span className="text-gray-500 text-sm">Assigned Driver:</span>
                  <p className="font-medium">{order.driver_name}</p>
                </div>
              )}
              {order.payment_method && (
                <div>
                  <span className="text-gray-500 text-sm">Payment Method:</span>
                  <p className="font-medium">{order.payment_method}</p>
                </div>
              )}
              {order.payment_status && (
                <div>
                  <span className="text-gray-500 text-sm">Payment Status:</span>
                  <p className="font-medium">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {order.payment_status}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Tracking Information (Optional) */}
          {tracking && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">Tracking Information</h2>
              </div>
              <div className="p-6 space-y-3">
                {tracking.current_location && (
                  <div>
                    <span className="text-gray-500 text-sm">Current Location:</span>
                    <p className="font-medium">{tracking.current_location}</p>
                  </div>
                )}
                {tracking.estimated_delivery && (
                  <div>
                    <span className="text-gray-500 text-sm">Estimated Delivery:</span>
                    <p className="font-medium">{new Date(tracking.estimated_delivery).toLocaleString()}</p>
                  </div>
                )}
                {tracking.updates && tracking.updates.length > 0 && (
                  <div>
                    <span className="text-gray-500 text-sm">Tracking Updates:</span>
                    <div className="mt-2 space-y-2">
                      {tracking.updates.map((update, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="text-gray-500">{new Date(update.timestamp).toLocaleString()}:</span>
                          <p className="font-medium">{update.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 space-y-3">
              <button
                onClick={() => window.print()}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🖨️ Print Order
              </button>
              <button
                onClick={fetchData}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}