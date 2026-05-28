import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      loadGuestCart();
    }
  }, [user]);

  const loadGuestCart = () => {
    const savedCart = localStorage.getItem('guestCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error loading guest cart:', error);
      }
    }
  };

  const saveGuestCart = (cartData) => {
    localStorage.setItem('guestCart', JSON.stringify(cartData));
  };

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/cart');
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1, size = null, color = null) => {
    // First fetch product details
    let product;
    try {
      const { data } = await axios.get(`/api/products/${productId}`);
      product = data;
    } catch (error) {
      toast.error('Product not found');
      return false;
    }

    if (!user) {
      // Guest cart
      const currentCart = { ...cart };
      const existingItemIndex = currentCart.items.findIndex(
        item => item.productId === productId && item.size === size && item.color === color
      );
      
      if (existingItemIndex > -1) {
        currentCart.items[existingItemIndex].quantity += quantity;
      } else {
        currentCart.items.push({
          _id: Date.now().toString(),
          productId,
          product: product,
          quantity,
          size,
          color
        });
      }
      
      currentCart.totalPrice = currentCart.items.reduce(
        (sum, item) => sum + (item.product.price * item.quantity), 0
      );
      
      setCart(currentCart);
      saveGuestCart(currentCart);
      toast.success('Added to cart!');
      return true;
    }
    
    try {
      const { data } = await axios.post('/api/cart/add', { productId, quantity, size, color });
      setCart(data);
      toast.success('Added to cart!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      return false;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!user) {
      const currentCart = { ...cart };
      const itemIndex = currentCart.items.findIndex(item => item._id === itemId);
      if (itemIndex > -1) {
        currentCart.items[itemIndex].quantity = quantity;
        currentCart.totalPrice = currentCart.items.reduce(
          (sum, item) => sum + (item.product.price * item.quantity), 0
        );
        setCart(currentCart);
        saveGuestCart(currentCart);
      }
      return;
    }
    
    try {
      const { data } = await axios.put(`/api/cart/${itemId}`, { quantity });
      setCart(data);
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) {
      const currentCart = { ...cart };
      currentCart.items = currentCart.items.filter(item => item._id !== itemId);
      currentCart.totalPrice = currentCart.items.reduce(
        (sum, item) => sum + (item.product.price * item.quantity), 0
      );
      setCart(currentCart);
      saveGuestCart(currentCart);
      return;
    }
    
    try {
      const { data } = await axios.delete(`/api/cart/${itemId}`);
      setCart(data);
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    if (!user) {
      const emptyCart = { items: [], totalPrice: 0 };
      setCart(emptyCart);
      saveGuestCart(emptyCart);
      return;
    }
    
    try {
      await axios.delete('/api/cart');
      setCart({ items: [], totalPrice: 0 });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};