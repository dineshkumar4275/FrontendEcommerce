'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  EnvelopeIcon, 
  LockClosedIcon, 
  BellIcon,
  GlobeAltIcon,
  CurrencyRupeeIcon,
  TruckIcon,
  ShieldCheckIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'ShopHub',
    storeEmail: 'support@shophub.com',
    storePhone: '+91 9876543210',
    storeAddress: '123 Business Street, Mumbai, India',
    currency: 'INR',
    taxRate: 18,
    freeShippingThreshold: 499,
    shippingCharge: 40
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
    
    // Load store settings from localStorage
    const saved = localStorage.getItem('storeSettings');
    if (saved) {
      setStoreSettings(JSON.parse(saved));
    }
  }, [user]);

  const saveStoreSettings = () => {
    localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
    toast.success('Store settings saved successfully');
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update in localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = { ...userData, name: formData.name };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update Redux
      dispatch(setCredentials({ user: updatedUser, token: localStorage.getItem('token') }));
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, call API to change password
      toast.success('Password changed successfully');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'store', label: 'Store Settings', icon: GlobeAltIcon },
    { id: 'shipping', label: 'Shipping', icon: TruckIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and store preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-purple-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                {loading ? 'Saving...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Store Settings */}
      {activeTab === 'store' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Store Settings</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <input
                  type="text"
                  value={storeSettings.storeName}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Store Email</label>
                <input
                  type="email"
                  value={storeSettings.storeEmail}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Phone</label>
              <input
                type="text"
                value={storeSettings.storePhone}
                onChange={(e) => setStoreSettings({ ...storeSettings, storePhone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
              <textarea
                value={storeSettings.storeAddress}
                onChange={(e) => setStoreSettings({ ...storeSettings, storeAddress: e.target.value })}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  value={storeSettings.currency}
                  onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (GST %)</label>
                <input
                  type="number"
                  value={storeSettings.taxRate}
                  onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                onClick={saveStoreSettings}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                Save Store Settings
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Shipping Settings */}
      {activeTab === 'shipping' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Shipping Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold (₹)</label>
              <div className="relative">
                <CurrencyRupeeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={storeSettings.freeShippingThreshold}
                  onChange={(e) => setStoreSettings({ ...storeSettings, freeShippingThreshold: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Orders above this amount get free shipping</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Standard Shipping Charge (₹)</label>
              <div className="relative">
                <CurrencyRupeeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={storeSettings.shippingCharge}
                  onChange={(e) => setStoreSettings({ ...storeSettings, shippingCharge: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                onClick={saveStoreSettings}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                Save Shipping Settings
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 flex items-center gap-2"
              >
                <DocumentArrowDownIcon className="w-4 h-4" />
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}