'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster 
      position="bottom-right"  // ✅ Changed to bottom-right
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#4ade80',
            secondary: '#fff',
          },
          style: {
            background: '#22c55e',
            color: '#fff',
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        },
        loading: {
          style: {
            background: '#3b82f6',
            color: '#fff',
          },
        },
      }}
    />
  )
}