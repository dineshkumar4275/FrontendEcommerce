// components/SimpleTracking.jsx
'use client';

import { useState, useEffect } from 'react';

export default function SimpleTracking({ orderId }) {
  const [tracking, setTracking] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracking();
  }, [orderId]);

  const fetchTracking = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tracking/order/${orderId}/details`);
      const data = await response.json();
      
      if (data.success) {
        setTracking(data.tracking || []);
        setOrder(data.order);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      'out-for-delivery': 'bg-orange-100 text-orange-800',
      delivered: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return <div className="text-center py-8">Loading tracking...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Order Tracking</h2>
        <p className="text-gray-600">Order #{order?.order_number}</p>
      </div>

      {/* Current Status */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-600 font-semibold">Current Status</p>
        <p className="text-xl font-bold capitalize">{order?.status}</p>
      </div>

      {/* Tracking Timeline */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Tracking History</h3>
        
        {tracking.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tracking updates yet</p>
        ) : (
          <div className="space-y-3">
            {tracking.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
                      {item.status.toUpperCase()}
                    </span>
                    {item.location && (
                      <p className="text-sm text-gray-600 mt-1">📍 {item.location}</p>
                    )}
                    {item.description && (
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    )}
                    {item.estimated_delivery && (
                      <p className="text-sm text-green-600 mt-1">
                        📅 Expected Delivery: {new Date(item.estimated_delivery).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}