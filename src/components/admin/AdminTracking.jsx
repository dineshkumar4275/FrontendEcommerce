// // components/admin/AdminTracking.jsx
// 'use client';

// import { useState } from 'react';

// export default function AdminTracking({ orderId, currentStatus }) {
//   const [status, setStatus] = useState(currentStatus);
//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');
//   const [estimatedDelivery, setEstimatedDelivery] = useState('');
//   const [loading, setLoading] = useState(false);

//   const statusOptions = [
//     'pending', 'confirmed', 'processing', 'shipped', 'out-for-delivery', 'delivered', 'cancelled'
//   ];

//   const handleUpdateTracking = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const response = await fetch(`http://localhost:5000/api/tracking/${orderId}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           status,
//           location,
//           description,
//           estimated_delivery: estimatedDelivery || null
//         })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         alert('Tracking updated successfully!');
//         setLocation('');
//         setDescription('');
//       } else {
//         alert('Failed to update tracking');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Error updating tracking');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h3 className="text-xl font-bold mb-4">Update Order Tracking</h3>
      
//       <form onSubmit={handleUpdateTracking} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium mb-1">Status</label>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2"
//           >
//             {statusOptions.map(opt => (
//               <option key={opt} value={opt}>{opt.toUpperCase()}</option>
//             ))}
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">Location</label>
//           <input
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="e.g., Chennai Hub, Mumbai Sort Center"
//             className="w-full border rounded-lg px-3 py-2"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="e.g., Package received at sort facility"
//             rows="2"
//             className="w-full border rounded-lg px-3 py-2"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">Estimated Delivery Date</label>
//           <input
//             type="date"
//             value={estimatedDelivery}
//             onChange={(e) => setEstimatedDelivery(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2"
//           />
//         </div>
        
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//         >
//           {loading ? 'Updating...' : 'Update Tracking'}
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { MapPinIcon, TruckIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatPrice } from '@/utils/formatters';
import { toast } from 'react-hot-toast';

export const AdminTracking = ({ orderId, onStatusUpdate }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchOrderDetails();
    fetchDrivers();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`);
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      toast.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const response = await fetch('/api/admin/drivers?status=active');
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const updateStatus = async (newStatus) => {
    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, driverId: selectedDriver }),
      });

      if (response.ok) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrderDetails();
        if (onStatusUpdate) onStatusUpdate();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setUpdating(false);
    }
  };

  const assignDriver = async () => {
    if (!selectedDriver) {
      toast.error('Please select a driver');
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/assign-driver`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driverId: selectedDriver }),
      });

      if (response.ok) {
        toast.success('Driver assigned successfully');
        fetchOrderDetails();
      } else {
        toast.error('Failed to assign driver');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setUpdating(false);
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'warning' },
    { value: 'confirmed', label: 'Confirmed', color: 'info' },
    { value: 'processing', label: 'Processing', color: 'info' },
    { value: 'shipped', label: 'Shipped', color: 'primary' },
    { value: 'out_for_delivery', label: 'Out for Delivery', color: 'primary' },
    { value: 'delivered', label: 'Delivered', color: 'success' },
    { value: 'cancelled', label: 'Cancelled', color: 'danger' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="space-y-6">
      {/* Order Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">Order #{order.id?.slice(-8)}</h2>
            <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <Badge variant={statusOptions.find(s => s.value === order.status)?.color || 'default'}>
            {order.status?.toUpperCase()}
          </Badge>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Customer Details</h3>
            <p className="text-sm">{order.customer?.name}</p>
            <p className="text-sm text-gray-600">{order.customer?.email}</p>
            <p className="text-sm text-gray-600">{order.customer?.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p className="text-sm">{order.shippingAddress?.address}</p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="border-t pt-4 mb-6">
          <h3 className="font-semibold mb-3">Order Items</h3>
          <div className="space-y-3">
            {order.items?.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × ₹{item.price}
                    {item.selectedSize && ` | Size: ${item.selectedSize}`}
                  </p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Status Update */}
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">Update Status</h3>
          <div className="flex flex-wrap gap-3">
            {statusOptions.map((status) => (
              <Button
                key={status.value}
                variant={order.status === status.value ? 'primary' : 'outline'}
                size="sm"
                onClick={() => updateStatus(status.value)}
                disabled={updating || order.status === 'delivered' || order.status === 'cancelled'}
              >
                {status.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Assign Driver */}
        {(order.status === 'shipped' || order.status === 'out_for_delivery') && (
          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-3">Assign Driver</h3>
            <div className="flex gap-3">
              <select
                value={selectedDriver}
                onChange={(e) => setSelectedDriver(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} - {driver.phone}
                  </option>
                ))}
              </select>
              <Button onClick={assignDriver} disabled={updating}>
                Assign
              </Button>
            </div>
            {order.driver && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium">Assigned Driver: {order.driver.name}</p>
                <p className="text-sm text-gray-600">Phone: {order.driver.phone}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Live Location Map */}
      {order.status === 'out_for_delivery' && order.driver?.location && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold mb-3">Live Tracking</h3>
          <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <TruckIcon className="h-12 w-12 text-blue-600 mx-auto mb-2 animate-pulse" />
              <p className="text-gray-600">Driver is on the way!</p>
              <p className="text-sm text-gray-500">
                Last updated: {new Date(order.driver.location.updatedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};