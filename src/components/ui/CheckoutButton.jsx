// components/CheckoutButton.jsx
import React, { useState } from 'react';
import orderService from '../service/orderService';

const CheckoutButton = ({ cartItems, totalAmount, shippingAddress, user }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const orderData = {
        products: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total_amount: totalAmount,
        shipping_address: shippingAddress
      };
      
      const userDetails = {
        name: user.name,
        email: user.email,
        mobile: user.mobile
      };
      
      const result = await orderService.createOrderWithPayment(orderData, userDetails);
      
      if (result.success) {
        alert('Order placed successfully!');
        // Redirect to order confirmation
        window.location.href = `/order-confirmation/${result.order.id}`;
      }
      
    } catch (error) {
      alert(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading}
      className="checkout-btn"
    >
      {loading ? 'Processing...' : `Pay ₹${totalAmount}`}
    </button>
  );
};

export default CheckoutButton;