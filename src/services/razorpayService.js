import apiClient from '../lib/apiClient';

// Create Razorpay order
export const createRazorpayOrder = async (amount, receipt) => {
  try {
    // Ensure amount is a valid number
    const validAmount = Number(amount);
    if (isNaN(validAmount) || validAmount <= 0) {
      throw new Error('Invalid amount: ' + amount);
    }
    
    console.log('Creating order with amount:', validAmount);
    
    const response = await apiClient.post('/razorpay/create-order', {
      amount: validAmount,
      receipt,
      currency: 'INR'
    });
    return response.data;
  } catch (error) {
    console.error('Create order error:', error.response?.data || error.message);
    throw error;
  }
};

// Verify payment
export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await apiClient.post('/razorpay/verify-payment', paymentData);
    return response.data;
  } catch (error) {
    console.error('Verify payment error:', error);
    throw error;
  }
};

// Get payment details
export const getPaymentDetails = async (paymentId) => {
  try {
    const response = await apiClient.get(`/razorpay/payment/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error('Get payment details error:', error);
    throw error;
  }
};