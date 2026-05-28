'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { CartItems } from './CartItems';

export const CartDrawer = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="text-lg font-semibold">My Cart</h2>
              </div>
              <button onClick={onClose}>
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Scroll Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <CartItems />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};