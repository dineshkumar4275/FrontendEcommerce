// services/paymentService.js
import apiClient from '../lib/apiClient';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const paymentService = {
  // Create order and initiate Razorpay payment
  createOrderAndPayment: async (orderData, userDetails) => {
    try {
      console.log('Step 1: Creating order in backend...');
      
      // Step 1: Create order in backend
      const response = await apiClient.post('/orders', orderData);
      
      console.log('Order creation response:', response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to create order');
      }
      
      const { order, razorpayOrder } = response.data;
      
      console.log('Step 2: Loading Razorpay script...');
      
      // Step 2: Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Payment gateway failed to load. Please check your internet connection.');
      }
      
      console.log('Step 3: Opening Razorpay checkout...');
      
      // Step 3: Open Razorpay checkout
      return new Promise((resolve, reject) => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: 'Ecommerce Store',
          description: `Order #${order.order_number}`,
          image: '/logo.png', // Add your logo
          order_id: razorpayOrder.id,
          callback_url: `${window.location.origin}/api/payment-callback`,
          redirect: true,
          handler: async (paymentResponse) => {
            console.log('Payment response received:', paymentResponse);
            
            try {
              // Step 4: Verify payment
              console.log('Step 4: Verifying payment...');
              
              const verifyResponse = await apiClient.post('/orders/verify-payment', {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                order_id: order.id
              });
              
              console.log('Verification response:', verifyResponse.data);
              
              if (verifyResponse.data.success) {
                resolve({
                  success: true,
                  order: verifyResponse.data.data,
                  payment: paymentResponse,
                  message: 'Payment successful!'
                });
              } else {
                reject(new Error(verifyResponse.data.message || 'Payment verification failed'));
              }
            } catch (error) {
              console.error('Verification error:', error);
              reject(new Error('Payment verification failed. Please contact support.'));
            }
          },
          prefill: {
            name: userDetails.fullName || userDetails.name || '',
            email: userDetails.email || 'customer@example.com',
            contact: userDetails.phone || userDetails.mobile || ''
          },
          notes: {
            order_id: order.id,
            order_number: order.order_number,
            address: JSON.stringify(orderData.shipping_address)
          },
          theme: {
            color: '#3B82F6',
            hide_topbar: false
          },
          modal: {
            ondismiss: () => {
              console.log('Payment modal closed by user');
              reject(new Error('Payment cancelled by user'));
            }
          }
        };
        
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.on('payment.failed', (response) => {
          console.error('Payment failed:', response.error);
          reject(new Error(response.error.description || 'Payment failed. Please try again.'));
        });
        
        razorpayInstance.open();
      });
      
    } catch (error) {
      console.error('Payment service error:', error);
      throw error;
    }
  },
  
  // Create COD order (no payment gateway)
  createCODOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders', {
        ...orderData,
        payment_method: 'cod',
        payment_status: 'pending'
      });
      
      return response.data;
    } catch (error) {
      console.error('COD order error:', error);
      throw error;
    }
  }
};

export default paymentService;