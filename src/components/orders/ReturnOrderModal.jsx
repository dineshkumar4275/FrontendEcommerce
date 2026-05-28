// src/components/orders/ReturnOrderModal.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export const ReturnOrderModal = ({ isOpen, onClose, order, onConfirm }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);

  const returnReasons = [
    { id: 1, reason: 'Wrong item received' },
    { id: 2, reason: 'Damaged or defective' },
    { id: 3, reason: 'Quality issues' },
    { id: 4, reason: 'Size/ fit issues' },
    { id: 5, reason: 'Changed my mind' },
    { id: 6, reason: 'Better price available' },
    { id: 7, reason: 'Missing parts/accessories' },
    { id: 8, reason: 'Other reasons' },
  ];

  const handleConfirm = async () => {
    if (!selectedReason) {
      toast.error('Please select a reason for return');
      return;
    }

    setLoading(true);
    await onConfirm(selectedReason, comments);
    setLoading(false);
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
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ArrowPathIcon className="w-5 h-5 text-white" />
                    <h2 className="text-lg font-bold text-white">Request Return</h2>
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
                {/* Reason Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for return <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value="">Select a reason</option>
                    {returnReasons.map((item) => (
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

                {/* Return Policy Note */}
                <div className="bg-green-50 rounded-lg p-3 mb-5">
                  <p className="text-xs text-green-800 leading-relaxed">
                    ✅ <span className="font-semibold">Return Policy:</span>
                    <br />• You can return items within 7 days of delivery
                    <br />• Refund will be processed within 5-7 business days
                    <br />• Free pickup available
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
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Submit Return Request'
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