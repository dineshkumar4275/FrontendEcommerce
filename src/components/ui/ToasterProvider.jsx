// src/components/ToastProvider.jsx
'use client';

import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export default function ToastProvider() {
  // Add custom CSS for animations (this runs on client side only)
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes toastSlideIn {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes toastSlideOut {
        from {
          transform: translateY(0);
          opacity: 1;
        }
        to {
          transform: translateY(100%);
          opacity: 0;
        }
      }
      
      .go-Toast-enter {
        animation: toastSlideIn 0.3s ease-out;
      }
      
      .go-Toast-exit {
        animation: toastSlideOut 0.2s ease-in;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Toaster 
      position="bottom-right"
      toastOptions={{
        duration: 3000,
       
        success: {
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            border: '1px solid rgba(16, 185, 129, 0.5)',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#059669',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
          },
          iconTheme: {
            primary: '#ffffff',
            secondary: '#dc2626',
          },
        },
        loading: {
          style: {
            background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)',
            border: '1px solid rgba(124, 58, 237, 0.5)',
          },
        },
      }}
    />
  );
}