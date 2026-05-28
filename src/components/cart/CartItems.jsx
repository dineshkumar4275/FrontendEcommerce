// src/components/layout/CartSidebar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  TrashIcon,
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  CreditCardIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function CartItems({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (isOpen) loadCart();
  }, [isOpen]);

  useEffect(() => {
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    const cart = localStorage.getItem('cartItems');
    if (cart) {
      const items = JSON.parse(cart);
      setCartItems(items);
      calculateTotal(items);
      console.log("🛒 CART DATA:", items);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const qty = item.quantity || 1;
      return acc + price * qty;
    }, 0);
    setTotal(sum);
  };

  const getProductImage = (item) => {
    return (
      item?.image_url ||
      item?.image ||
      item?.imageUrl ||
      item?.thumbnail ||
      item?.images?.[0] ||
      'https://placehold.co/400x400?text=No+Image'
    );
  };

  const getProductName = (item) => {
    return (
      item?.name ||
      item?.title ||
      item?.product_name ||
      "Product Name"
    );
  };

  const updateQuantity = (id, qty) => {
    if (qty < 1) return;

    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );

    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    calculateTotal(updated);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    calculateTotal(updated);
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success("Item removed");
  };

  const clearCart = () => {
    if (!confirm("Clear cart?")) return;
    setCartItems([]);
    localStorage.setItem('cartItems', JSON.stringify([]));
    calculateTotal([]);
  };

  const shipping = total >= 499 ? 0 : 40;
  const tax = total * 0.18;
  const finalTotal = total + shipping + tax;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 flex flex-col shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2 text-white">
                <ShoppingCartIcon className="w-5 h-5" />
                <div>
                  <h2 className="font-bold">My Cart</h2>
                  <p className="text-xs">{cartItems.length} items</p>
                </div>
              </div>
              <button onClick={onClose}>
                <XMarkIcon className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Items - FIXED: Better visibility */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  Cart is empty
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b pb-4">
                      {/* IMAGE */}
                      <div className="flex-shrink-0">
                        <img
                          src={getProductImage(item)}
                          className="w-24 h-24 object-cover bg-gray-100 rounded-lg"
                          alt="product"
                        />
                      </div>

                      {/* DETAILS - FULL WIDTH */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 pr-2">
                            <h4 className="text-sm font-semibold text-gray-800 break-words">
                              {getProductName(item)}
                            </h4>
                            <p className="text-purple-600 font-bold mt-1">
                              ₹{Number(item.price).toLocaleString()}
                            </p>
                            
                            {/* Size & Color if exists */}
                            {(item.selectedSize || item.selectedColor) && (
                              <div className="flex gap-2 mt-1">
                                {item.selectedSize && (
                                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                    Size: {item.selectedSize}
                                  </span>
                                )}
                                {item.selectedColor && (
                                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                                    Color: {item.selectedColor}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {/* REMOVE BUTTON */}
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 flex-shrink-0"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>

                        {/* QUANTITY CONTROLS */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 border border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-l-lg"
                            >
                              <MinusIcon className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-r-lg"
                            >
                              <PlusIcon className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-bold text-gray-800">
                            ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 border-t space-y-2 bg-white">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST)</span>
                  <span className="font-medium">₹{Math.round(tax)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-purple-600">₹{Math.round(finalTotal).toLocaleString()}</span>
                  </div>
                </div>
                <Link href="/checkout" onClick={onClose}>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg mt-2 flex items-center justify-center gap-2 font-medium">
                    <CreditCardIcon className="w-4 h-4" />
                    Proceed to Checkout
                  </button>
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-red-500 text-sm py-1 hover:text-red-600"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}