// app/admin/login/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import apiClient from '@/lib/apiClient';
import { setCredentials } from '@/store/slices/authSlice';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }

    setLoading(true);
    
    try {
      const { data } = await apiClient.post('/auth/login', { email, password });
      
      if (data.role !== 'admin') {
        toast.error('Access denied. Admin only!');
        return;
      }
      
      dispatch(setCredentials({ 
        user: { 
          id: data.id, 
          name: data.name, 
          email: data.email, 
          role: data.role 
        }, 
        token: data.token 
      }));
      
      toast.success('Admin login successful!');
      
      // Safe redirect after mount
      if (isMounted) {
        router.push('/admin/dashboard');
      } else {
        setTimeout(() => router.push('/admin/dashboard'), 100);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Don't render until mounted
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">👑</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          <p className="text-purple-200 mt-1">Login to access dashboard</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">📧</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Admin Login'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center font-semibold">Demo Admin Credentials:</p>
            <p className="text-xs text-gray-500 text-center mt-1">
              Email: <span className="font-mono font-bold">admin@example.com</span>
            </p>
            <p className="text-xs text-gray-500 text-center">
              Password: <span className="font-mono font-bold">admin123</span>
            </p>
          </div>

          <div className="text-center mt-4">
            <a href="/login" className="text-sm text-purple-600 hover:underline">
              ← User Login
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}