// components/AuthDebug.js
'use client';

import { useSelector } from 'react-redux';

export function AuthDebug() {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);
  
  // Only show in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 right-4 bg-black text-white text-xs p-2 rounded z-50 opacity-75 hover:opacity-100">
        <div>🔐 Auth: {isAuthenticated ? '✅ Logged In' : '❌ Logged Out'}</div>
        <div>👤 User: {user?.name || 'None'}</div>
        <div>📧 Email: {user?.email || 'None'}</div>
        <div>🔑 Token: {token ? '✅ Present' : '❌ Missing'}</div>
      </div>
    );
  }
  
  return null;
}