'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrashIcon, 
  PlusIcon, 
  MinusIcon, 
  ShoppingBagIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useCart } from '../../src/hooks/useCart';
import { useAuth } from '../../src/hooks/useAuth';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import { formatPrice } from '../../src/utils/formatters';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalAmount, totalQuantity } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState({});
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Mock recommended products
  useEffect(() => {
    setRecommendedProducts([
      { id: 101, name: 'Premium Wireless Mouse', price: 999, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300', rating: 4.5 },
      { id: 102, name: 'USB-C Fast Charging Cable', price: 499, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300', rating: 4.3 },
      { id: 103, name: 'Ergonomic Laptop Stand', price: 1499, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300', rating: 4.7 },
    ]);
  }, []);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }
    setLoading(prev => ({ ...prev, [productId]: true }));
    await updateQuantity(productId, newQuantity);
    setLoading(prev => ({ ...prev, [productId]: false }));
  };

  const handleRemoveItem = async (productId) => {
    setLoading(prev => ({ ...prev, [productId]: true }));
    await removeFromCart(productId);
    toast.success('Item removed from cart');
    setLoading(prev => ({ ...prev, [productId]: false }));
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout');
      router.push('/login');
      return;
    }
    window.location.href = '/checkout';
  };

  const deliveryCharge = totalAmount > 500 ? 0 : 50;
  const taxAmount = totalAmount * 0.18;
  const finalAmount = totalAmount + deliveryCharge + taxAmount;

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-[70vh] bg-gradient-to-br from-gray-50 via-white to-purple-50/30 flex items-center justify-center pt-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 mx-auto mb-6"
            >
              <ShoppingBagIcon className="w-16 h-16 text-purple-500" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any items yet. Start shopping to fill your cart!</p>
            <Link href="/products">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <SparklesIcon className="w-5 h-5" />
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-purple-600 transition">Home</Link>
              <span>/</span>
              <span className="text-purple-600 font-medium">Shopping Cart</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Link href="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors mb-4 group">
                  <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition" />
                  Continue Shopping
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Shopping Cart
                </h1>
                <p className="text-gray-500 mt-2">
                  You have <span className="font-semibold text-purple-600">{totalQuantity}</span> {totalQuantity !== 1 ? 'items' : 'item'} in your cart
                </p>
              </motion.div>

              {/* Cart Items List */}
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-lg mb-4 overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image */}
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className="relative w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden flex-shrink-0 mx-auto md:mx-0"
                        >
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-full h-full object-contain p-3"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBagIcon className="w-12 h-12 text-gray-300" />
                            </div>
                          )}
                        </motion.div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex-1">
                              <Link href={`/products/${item.id}`}>
                                <h3 className="font-bold text-lg text-gray-800 hover:text-purple-600 transition-colors line-clamp-2">
                                  {item.name}
                                </h3>
                              </Link>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {item.selectedSize && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                                    Size: {item.selectedSize}
                                  </span>
                                )}
                                {item.selectedColor && (
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                                    Color: {item.selectedColor}
                                  </span>
                                )}
                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 rounded-lg text-xs text-green-600">
                                  <TruckIcon className="w-3 h-3" />
                                  Free Shipping
                                </span>
                              </div>
                            </div>
                            <div className="text-left md:text-right">
                              <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                {formatPrice(item.price)}
                              </p>
                              {item.originalPrice && (
                                <p className="text-sm text-gray-400 line-through">
                                  {formatPrice(item.originalPrice)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Quantity Controls & Actions */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-500">Quantity:</span>
                              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  disabled={loading[item.id]}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50"
                                >
                                  <MinusIcon className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center font-semibold">{item.quantity}</span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  disabled={loading[item.id]}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-colors disabled:opacity-50"
                                >
                                  <PlusIcon className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => toast.success(`${item.name} added to wishlist!`)}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                              >
                                <HeartIcon className="w-4 h-4" />
                                <span className="text-sm">Save for later</span>
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                disabled={loading[item.id]}
                                className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors"
                              >
                                <TrashIcon className="w-4 h-4" />
                                <span className="text-sm">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Recommended Products */}
              {recommendedProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10"
                >
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-yellow-500" />
                    You May Also Like
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {recommendedProducts.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -4 }}
                      >
                        <Link href={`/products/${product.id}`}>
                          <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                            <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-3">
                              <h4 className="font-semibold text-sm text-gray-800 line-clamp-1">{product.name}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                <div className="flex text-yellow-400 text-xs">
                                  {'★'.repeat(Math.floor(product.rating))}
                                </div>
                                <span className="text-xs text-gray-500">({product.reviews})</span>
                              </div>
                              <p className="text-purple-600 font-bold text-sm mt-1">{formatPrice(product.price)}</p>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CreditCardIcon className="w-5 h-5 text-purple-600" />
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 border-b pb-4">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({totalQuantity} items)</span>
                      <span className="font-medium">{formatPrice(totalAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Delivery Charge</span>
                      <span className={deliveryCharge === 0 ? "text-green-600" : ""}>
                        {deliveryCharge === 0 ? "Free" : formatPrice(deliveryCharge)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Tax (18% GST)</span>
                      <span>{formatPrice(taxAmount)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold text-gray-800 py-4 border-b">
                    <span>Total Amount</span>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {formatPrice(finalAmount)}
                    </span>
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <TruckIcon className="w-4 h-4" />
                      <span>Free delivery on orders above ₹500</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <ShieldCheckIcon className="w-4 h-4" />
                      <span>Secure checkout & payment protection</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCardIcon className="w-5 h-5" />
                    Proceed to Checkout
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-400 mb-2">100% Secure Payments</p>
                    <div className="flex justify-center gap-2 flex-wrap">
                      <span className="text-xs px-3 py-1.5 bg-gray-100 rounded-lg">Visa</span>
                      <span className="text-xs px-3 py-1.5 bg-gray-100 rounded-lg">Mastercard</span>
                      <span className="text-xs px-3 py-1.5 bg-gray-100 rounded-lg">UPI</span>
                      <span className="text-xs px-3 py-1.5 bg-gray-100 rounded-lg">Razorpay</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}