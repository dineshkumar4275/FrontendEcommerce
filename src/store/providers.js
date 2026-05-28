// src/store/providers.js
'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './slices/authSlice';

function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        dispatch(setCredentials({ user: JSON.parse(user), token }));
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, [dispatch]);
  return children;
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
      </AuthInitializer>
      {/* ✅ ONLY ONE TOASTER - BOTTOM RIGHT */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'linear-gradient(135deg, #1e1b4b 0%, #2d1b4e 100%)',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
            border: '1px solid rgba(168, 85, 247, 0.3)',
          },
          success: {
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            },
          },
        }}
      />
    </Provider>
  );
}