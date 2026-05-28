// src/hooks/useToast.js
import toast from 'react-hot-toast';

// Simple flag to prevent duplicate toasts
let lastToastTime = 0;
const TOAST_DELAY = 1000;

export const useToast = () => {
  const showToast = (message, type = 'success', options = {}) => {
    const now = Date.now();
    
    // Prevent duplicate toasts within 1 second
    if (now - lastToastTime < TOAST_DELAY) {
      return;
    }
    lastToastTime = now;

    const defaultOptions = {
      position: 'bottom-right', // Match the provider position
      duration: type === 'error' ? 4000 : 3000,
      ...options,
    };

    switch (type) {
      case 'success':
        toast.success(message, defaultOptions);
        break;
      case 'error':
        toast.error(message, defaultOptions);
        break;
      case 'loading':
        toast.loading(message, defaultOptions);
        break;
      default:
        toast(message, defaultOptions);
    }
  };

  return { showToast };
};