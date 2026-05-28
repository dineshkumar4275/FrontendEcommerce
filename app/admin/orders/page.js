'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import apiClient from '@/lib/apiClient';

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [trackingData, setTrackingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchDrivers();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/orders');
      if (response.data.success) {
        setOrders(response.data.data);
        // Fetch tracking for each order
        response.data.data.forEach(order => {
          fetchTrackingForOrder(order.id);
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchTrackingForOrder = async (orderId) => {
    try {
      const response = await apiClient.get(`/tracking/${orderId}`);
      if (response.data.success) {
        setTrackingData(prev => ({
          ...prev,
          [orderId]: response.data.tracking || []
        }));
      }
    } catch (error) {
      console.error('Error fetching tracking:', error);
      setTrackingData(prev => ({ ...prev, [orderId]: [] }));
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await apiClient.get('/drivers/all');
      if (response.data.success) {
        setDrivers(response.data.data || []);
      } else {
        setDrivers([]);
      }
    } catch (error) {
      console.error('Error fetching drivers:', error);
      // Don't show error to user, just set empty array
      setDrivers([]);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await apiClient.put(`/orders/${orderId}/status`, { status });
      toast.success(`Order status updated to ${status}`);
      
      // Add tracking update if tracking endpoint exists
      try {
        await apiClient.post('/tracking', {
          order_id: orderId,
          status: status,
          location: `Order status changed to ${status} by admin`
        });
      } catch (trackingError) {
        console.log('Tracking update not added');
      }
      
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const assignDriver = async (orderId, driverId) => {
    if (!driverId) return;
    try {
      await apiClient.post('/orders/assign', { orderId, driverId });
      
      // Get driver name
      const driver = drivers.find(d => d.id == driverId);
      
      // Add tracking update
      try {
        await apiClient.post('/tracking', {
          order_id: orderId,
          status: 'accepted',
          location: `Driver ${driver?.name || driverId} assigned to order`
        });
      } catch (trackingError) {
        console.log('Tracking update not added');
      }
      
      toast.success(`Driver assigned to order`);
      fetchOrders();
    } catch (error) {
      console.error('Error assigning driver:', error);
      toast.error('Failed to assign driver');
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
      'pending': '⏳',
      'confirmed': '✅',
      'accepted': '👨‍✈️',
      'picked_up': '📦',
      'in_transit': '🚚',
      'out_for_delivery': '🏠',
      'delivered': '🎉',
      'cancelled': '❌'
    };
    return icons[status] || '📝';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressPercentage = (status) => {
    const steps = ['pending', 'confirmed', 'accepted', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered'];
    const currentIndex = steps.indexOf(status);
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / steps.length) * 100;
  };

  const getTrackingSteps = () => {
    return [
      { key: 'confirmed', label: 'Confirmed', icon: '✅' },
      { key: 'accepted', label: 'Assigned', icon: '👨‍✈️' },
      { key: 'picked_up', label: 'Picked', icon: '📦' },
      { key: 'in_transit', label: 'Shipped', icon: '🚚' },
      { key: 'out_for_delivery', label: 'Near You', icon: '🏠' },
      { key: 'delivered', label: 'Delivered', icon: '🎉' }
    ];
  };

  const toggleExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-gray-500 text-lg">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <button
          onClick={fetchOrders}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
        >
          <span>🔄</span> Refresh
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
          <p className="text-gray-600">Orders will appear here once customers make purchases</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const tracking = trackingData[order.id] || [];
            const latestTracking = tracking[0];
            const progressPercent = getProgressPercentage(order.status);
            const steps = getTrackingSteps();
            const currentStepIndex = steps.findIndex(step => step.key === order.status);
            
            return (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                {/* Order Header */}
                <div className="p-6 border-b bg-gray-50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.order_number}</p>
                      <p className="text-xs text-gray-400">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(order.status)}`}>
                        <span>{getStatusIcon(order.status)}</span>
                        <span>{order.status?.toUpperCase()}</span>
                      </div>
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                      >
                        {expandedOrder === order.id ? '▲ Less' : '▼ Details'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600 text-sm">Customer</p>
                      <p className="font-semibold">{order.user_name || 'Guest User'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Total Amount</p>
                      <p className="text-xl font-bold text-indigo-600">₹{parseFloat(order.total_amount).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Driver</p>
                      <select
                        value={order.driver_id || ''}
                        onChange={(e) => assignDriver(order.id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm w-full"
                      >
                        <option value="">Select Driver</option>
                        {drivers.map((driver) => (
                          <option key={driver.id} value={driver.id}>
                            {driver.name} {driver.is_available ? '✅' : '❌'}
                          </option>
                        ))}
                      </select>
                      {drivers.length === 0 && (
                        <p className="text-xs text-gray-400 mt-1">No drivers available</p>
                      )}
                    </div>
                  </div>

                  {/* Status Update Dropdown */}
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-2">Update Status</p>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="accepted">Accepted</option>
                      <option value="picked_up">Picked Up</option>
                      <option value="in_transit">In Transit</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Progress Bar - Like Amazon */}
                  <div className="mt-4">
                    <div className="relative">
                      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <div className="relative flex justify-between">
                        {steps.map((step, idx) => {
                          const isCompleted = idx <= currentStepIndex;
                          const isActive = idx === currentStepIndex;
                          
                          return (
                            <div key={step.key} className="text-center flex-1">
                              <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 transition-all
                                ${isCompleted ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'}
                                ${isActive ? 'ring-4 ring-indigo-200 scale-110' : ''}
                              `}>
                                <span className="text-sm">{step.icon}</span>
                              </div>
                              <p className={`text-xs ${isCompleted ? 'text-indigo-600' : 'text-gray-400'}`}>
                                {step.label}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Latest Update */}
                  {latestTracking && (
                    <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                      <p className="text-sm text-indigo-800">
                        <span className="font-semibold">Latest Update:</span> {latestTracking.status?.replace(/_/g, ' ')}
                      </p>
                      <p className="text-xs text-indigo-600 mt-1">{latestTracking.location}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(latestTracking.created_at)} at {formatTime(latestTracking.created_at)}</p>
                    </div>
                  )}
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div className="border-t p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Products */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Items Ordered</h3>
                        {order.products && typeof order.products === 'string' 
                          ? (() => {
                              try {
                                const products = JSON.parse(order.products);
                                return products.map((product, idx) => (
                                  <div key={idx} className="flex justify-between py-2 border-b last:border-0">
                                    <span>{product.name} x {product.quantity}</span>
                                    <span className="font-medium">₹{parseFloat(product.price).toLocaleString()}</span>
                                  </div>
                                ));
                              } catch(e) {
                                return <p className="text-gray-500">No products</p>;
                              }
                            })()
                          : order.products?.map((product, idx) => (
                              <div key={idx} className="flex justify-between py-2 border-b last:border-0">
                                <span>{product.name} x {product.quantity}</span>
                                <span className="font-medium">₹{parseFloat(product.price).toLocaleString()}</span>
                              </div>
                            ))
                        }
                      </div>

                      {/* Shipping Address */}
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Shipping Address</h3>
                        <div className="text-sm text-gray-600">
                          {typeof order.shipping_address === 'object' ? (
                            <>
                              <p>{order.shipping_address.fullName}</p>
                              <p>{order.shipping_address.address}</p>
                              <p>{order.shipping_address.city}, {order.shipping_address.state}</p>
                              <p>PIN: {order.shipping_address.pincode}</p>
                              <p>Phone: {order.shipping_address.phone}</p>
                            </>
                          ) : (
                            <p>{order.shipping_address}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Full Tracking Timeline */}
                    {tracking.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-semibold text-gray-800 mb-3">Tracking History</h3>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {tracking.map((track, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                              <div>
                                <p className="font-medium capitalize text-sm">{track.status?.replace(/_/g, ' ')}</p>
                                <p className="text-xs text-gray-500">{track.location}</p>
                                <p className="text-xs text-gray-400">{formatDate(track.created_at)} at {formatTime(track.created_at)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-3">
                      <Link href={`/admin/orders/${order.id}`}>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                          View Full Details
                        </button>
                      </Link>
                      <Link href={`/track/${order.id}`}>
                        <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition flex items-center gap-2">
                          <span>📍</span> Track Order
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}