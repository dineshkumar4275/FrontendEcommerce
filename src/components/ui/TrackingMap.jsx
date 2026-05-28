// components/TrackingMap.jsx
'use client';

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const trackingSteps = [
  { status: 'pending', label: 'Order Placed', icon: '📝', description: 'Your order has been confirmed' },
  { status: 'confirmed', label: 'Order Confirmed', icon: '✅', description: 'We have received your order' },
  { status: 'processing', label: 'Processing', icon: '⚙️', description: 'Your order is being processed' },
  { status: 'shipped', label: 'Shipped', icon: '🚚', description: 'Your order has been shipped' },
  { status: 'out-for-delivery', label: 'Out for Delivery', icon: '🚛', description: 'Your order is out for delivery' },
  { status: 'delivered', label: 'Delivered', icon: '🏠', description: 'Your order has been delivered' }
];

export default function TrackingMap({ orderId, initialStatus }) {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [trackingHistory, setTrackingHistory] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Connect to WebSocket
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);
    
    // Join order room
    newSocket.emit('join-order', orderId);
    
    // Listen for tracking updates
    newSocket.on('tracking-update', (data) => {
      console.log('Real-time update received:', data);
      setCurrentStatus(data.order.status);
      setTrackingHistory(prev => [data.tracking, ...prev]);
    });
    
    // Fetch initial tracking data
    fetchTrackingHistory();
    
    return () => {
      newSocket.emit('leave-order', orderId);
      newSocket.disconnect();
    };
  }, [orderId]);

  const fetchTrackingHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/tracking/${orderId}`);
      const data = await response.json();
      
      if (data.success) {
        setTrackingHistory(data.tracking || []);
        setCurrentStatus(data.currentStatus);
      }
    } catch (error) {
      console.error('Error fetching tracking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStepIndex = () => {
    return trackingSteps.findIndex(step => step.status === currentStatus);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Order Tracking</h2>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {trackingSteps.map((step, index) => {
            const isCompleted = index <= getCurrentStepIndex();
            const isCurrent = index === getCurrentStepIndex();
            
            return (
              <div key={step.status} className="flex-1 text-center">
                <div className="relative">
                  <div className={`
                    w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl
                    ${isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
                    ${isCurrent ? 'ring-4 ring-blue-300' : ''}
                  `}>
                    {step.icon}
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div className={`
                      absolute top-6 left-1/2 w-full h-1
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                    `} />
                  )}
                </div>
                <p className="mt-2 font-semibold text-sm">{step.label}</p>
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Live Status */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600 font-semibold">Current Status</p>
            <p className="text-xl font-bold capitalize">{currentStatus}</p>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-green-600">Live Updates</span>
          </div>
        </div>
      </div>
      
      {/* Tracking History */}
      <div>
        <h3 className="font-semibold mb-4">Tracking History</h3>
        <div className="space-y-3">
          {trackingHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No tracking updates yet</p>
          ) : (
            trackingHistory.map((track, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold capitalize">{track.status}</p>
                    {track.location && (
                      <p className="text-sm text-gray-600">📍 {track.location}</p>
                    )}
                    {track.description && (
                      <p className="text-sm text-gray-500">{track.description}</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(track.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}