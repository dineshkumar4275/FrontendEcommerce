'use client';

import { useState } from 'react';
import { createRazorpayOrder, verifyRazorpayPayment } from '../../services/razorpayService';
import toast from 'react-hot-toast';

const RazorpayPayment = ({ amount, orderId, onSuccess, onError, buttonText = "Pay Now", buttonClassName = "" }) => {
  const [loading, setLoading] = useState(false);

  // Validate amount
  const validAmount = Number(amount) || 0;
  
  if (validAmount <= 0) {
    console.error('Invalid amount for Razorpay:', amount);
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // Validate amount
    if (validAmount <= 0) {
      toast.error('Invalid payment amount. Please check your cart.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!token) {
        toast.error('Please login to continue');
        localStorage.setItem('redirectAfterLogin', '/checkout');
        window.location.href = '/login';
        setLoading(false);
        return;
      }

      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      
      if (!isScriptLoaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setLoading(false);
        return;
      }

      // Create order on backend with valid amount
      const orderData = await createRazorpayOrder(validAmount, orderId);

      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create order');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'ShopHub',
        description: `Order #${orderId}`,
        image: '/logo.png',
        order_id: orderData.orderId,
        prefill: {
          name: user.name || '',
          email: user.email || '',
          contact: user.phone || '',
        },
        notes: {
          address: 'Order from ShopHub',
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function() {
            toast.error('Payment cancelled');
            setLoading(false);
            if (onError) onError(new Error('Payment cancelled'));
          },
        },
        handler: async function(response) {
          try {
            // Verify payment
            const verification = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verification.success) {
              toast.success('Payment successful!');
              if (onSuccess) {
                onSuccess({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                });
              }
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            toast.error(error.message || 'Payment verification failed');
            if (onError) onError(error);
          }
          setLoading(false);
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
      if (onError) onError(error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading || validAmount <= 0}
      className={buttonClassName || "w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : buttonText}
    </button>
  );
};

export default RazorpayPayment;