'use client';

import { useState, useEffect } from 'react';

export const useCart = () => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadCart();
    
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        setItems(cartItems);
        calculateTotals(cartItems);
      } else {
        setItems([]);
        setTotalAmount(0);
        setTotalQuantity(0);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const calculateTotals = (cartItems) => {
    const amount = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
    const quantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setTotalAmount(amount);
    setTotalQuantity(quantity);
  };

  const addToCart = (product) => {
    try {
      console.log('addToCart received product:', product);
      
      // Validate product ID
      const productId = product?.id || product?.productId;
      if (!productId) {
        console.error('Cannot add to cart: Missing product ID', product);
        return false;
      }
      
      const existingCart = [...items];
      const existingIndex = existingCart.findIndex(item => {
        const itemId = item.id || item.productId;
        return itemId === productId;
      });
      
      const quantityToAdd = product.quantity || 1;
      const productPrice = product.price || 0;
      const productName = product.name || 'Product';
      const productImage = product.image_url || product.image;
      
      if (existingIndex !== -1) {
        existingCart[existingIndex].quantity = (existingCart[existingIndex].quantity || 1) + quantityToAdd;
      } else {
        existingCart.push({
          id: productId,
          productId: productId,
          name: productName,
          price: productPrice,
          image_url: productImage,
          image: productImage,
          quantity: quantityToAdd,
          selectedSize: product.selectedSize || null,
          selectedColor: product.selectedColor || null,
        });
      }
      
      localStorage.setItem('cartItems', JSON.stringify(existingCart));
      setItems(existingCart);
      calculateTotals(existingCart);
      window.dispatchEvent(new Event('cartUpdated'));
      
      return true;
    } catch (error) {
      console.error('Add to cart error:', error);
      return false;
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = items.filter(item => {
      const itemId = item.id || item.productId;
      return itemId !== productId;
    });
    
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setItems(updatedCart);
    calculateTotals(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = items.map(item => {
      const itemId = item.id || item.productId;
      if (itemId === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setItems(updatedCart);
    calculateTotals(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    localStorage.removeItem('cartItems');
    setItems([]);
    setTotalAmount(0);
    setTotalQuantity(0);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const cart = {
    items: items,
    totalPrice: totalAmount,
    totalQuantity: totalQuantity
  };

  if (!mounted) {
    return {
      cart: { items: [], totalPrice: 0, totalQuantity: 0 },
      items: [],
      totalAmount: 0,
      totalQuantity: 0,
      updateQuantity: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      addToCart: () => false,
    };
  }

  return {
    cart,
    items,
    totalAmount,
    totalQuantity,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};