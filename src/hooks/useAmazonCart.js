// src/hooks/useAmazonCart.js
'use client';

import { useState, useEffect } from 'react';
import { cartStorage } from '../services/storageService';

export const useAmazonCart = () => {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load cart on mount
  useEffect(() => {
    loadCart();
    
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    const cartItems = cartStorage.getItems();
    setItems(cartItems);
    
    const totalQty = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalAmt = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
    
    setTotalItems(totalQty);
    setTotalAmount(totalAmt);
    setLoading(false);
  };

  const addToCart = (product, quantity = 1) => {
    cartStorage.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: quantity,
      selectedSize: product.selectedSize,
      selectedColor: product.selectedColor
    });
    return true;
  };

  const updateQuantity = (id, quantity) => {
    cartStorage.updateQuantity(id, Math.max(1, quantity));
  };

  const removeFromCart = (id) => {
    cartStorage.removeItem(id);
  };

  const clearCart = () => {
    cartStorage.clearCart();
  };

  return {
    items,
    totalItems,
    totalAmount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCart
  };
};