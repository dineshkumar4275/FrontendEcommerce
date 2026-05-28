// src/components/orders/OrderList.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EyeIcon, TruckIcon, ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const StatusBadge = ({ status }) => {
  const config = {
    pending: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, label: 'Pending' },
    confirmed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircleIcon, label: 'Confirmed' },
    delivered: { color: 'bg-green-100 text-green-800', icon: TruckIcon, label: 'Delivered' },
    cancelled: { color: 'bg-red-100 text-red-800', icon: XCircleIcon, label: 'Cancelled' }
  };
  
  const StatusIcon = config[status]?.icon || ClockIcon;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${config[status]?.color || 'bg-gray-100'}`}>
      <StatusIcon className="w-3 h-3" />
      {config[status]?.label || status}
    </span>
  );
};

export const OrderList = ({ orders, onCancelOrder, showActions = true }) => {
  const [cancellingId, setCancellingId] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    const num = parseFloat(amount);
    return isNaN(num) ? 0 : num.toLocaleString();
  };

  const handleCancel = async (orderId) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      setCancellingId(orderId);
      await onCancelOrder(orderId);
      setCancellingId(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
        <Link href="/products">
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition">
            Start Shopping →
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
        >
          {/* Order Header */}
          <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Order #{order.order_number || order.id}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatDate(order.created_at)}</p>
              </div>
              <StatusBadge status={order.status} />
            </div>
          </div>

          {/* Order Body */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Items Summary */}
              <div className="md:col-span-1">
                <p className="text-sm font-medium text-gray-700 mb-2">Items</p>
                {(order.items || order.products || []).slice(0, 2).map((item, idx) => (
                  <div key={idx} className="text-sm text-gray-600 mb-1">
                    {item.quantity}× {item.name}
                  </div>
                ))}
                {(order.items || order.products || []).length > 2 && (
                  <p className="text-xs text-gray-400 mt-1">
                    +{(order.items || order.products || []).length - 2} more items
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="md:col-span-1">
                <p className="text-sm font-medium text-gray-700 mb-2">Total Amount</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{formatAmount(order.total_amount)}
                </p>
              </div>

              {/* Actions */}
              {showActions && (
                <div className="md:col-span-1 flex flex-wrap gap-3 items-start justify-end">
                  <Link href={`/orders/${order.id}`}>
                    <button className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                      <EyeIcon className="w-4 h-4" />
                      View Details
                    </button>
                  </Link>
                  
                  {(order.status === 'pending' || order.status === 'confirmed') && (
                    <button
                      onClick={() => handleCancel(order.id)}
                      disabled={cancellingId === order.id}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition disabled:opacity-50"
                    >
                      {cancellingId === order.id ? 'Cancelling...' : 'Cancel Order'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};