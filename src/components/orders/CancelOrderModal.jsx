// src/components/orders/CancelOrderModal.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const CancelOrderModal = ({ isOpen, onClose, order, onConfirm, timeRemaining = 0 }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(timeRemaining);

  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 60000);
      return () => clearInterval(timer);
    }
  }, [isOpen, countdown]);

  const cancellationReasons = [
    { id: 1, reason: 'Changed my mind' },
    { id: 2, reason: 'Found better price elsewhere' },
    { id: 3, reason: 'Order placed by mistake' },
    { id: 4, reason: 'Shipping address is wrong' },
    { id: 5, reason: 'Delivery time is too long' },
    { id: 6, reason: 'Item is out of stock' },
    { id: 7, reason: 'Payment issue' },
    { id: 8, reason: 'Other reasons' },
  ];

  const handleConfirm = async () => {
    if (!selectedReason) {
      toast.error('Please select a reason for cancellation');
      return;
    }

    setLoading(true);
    await onConfirm(selectedReason, comments);
    setLoading(false);
  };

  const formatTime = (minutes) => {
    if (minutes <= 0) return 'Expired';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
    }
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };

  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[100]"
          />
          
          {/* Modal Container - Centered on all screens */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-pink-500 px-5 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-5 h-5 text-white" />
                    <h2 className="text-lg font-bold text-white">Cancel Order</h2>
                  </div>
                  <button 
                    onClick={onClose} 
                    className="text-white/80 hover:text-white p-1 rounded-full transition"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-white/80 text-xs mt-1">
                  Order #{order.order_number}
                </p>
              </div>

              {/* Body */}
              <div className="p-5 max-h-[70vh] overflow-y-auto">
                {/* Countdown Timer */}
                {countdown > 0 && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-blue-600" />
                    <p className="text-xs text-blue-700">
                      Cancel within {formatTime(countdown)} to avoid cancellation fees
                    </p>
                  </div>
                )}

                {/* Reason Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for cancellation <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value="">Select a reason</option>
                    {cancellationReasons.map((item) => (
                      <option key={item.id} value={item.reason}>
                        {item.reason}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Comments */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional comments <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows="3"
                    placeholder="Please provide any additional details..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm resize-none"
                  />
                </div>

                {/* Warning Note */}
                <div className="bg-yellow-50 rounded-lg p-3 mb-5">
                  <p className="text-xs text-yellow-800 leading-relaxed">
                    ⚠️ <span className="font-semibold">Important:</span> Cancelling this order will:
                    <br />• Remove the order from your active orders
                    <br />• Refund will be processed within 5-7 business days (if paid online)
                    <br />• This action cannot be undone
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition text-sm"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={loading || !selectedReason}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Cancelling...
                      </span>
                    ) : (
                      'Confirm Cancellation'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};