// app/admin/coupons/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  TicketIcon,
  GiftIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: '',
    maxDiscount: '',
    usageLimit: '',
    usedCount: 0,
    validFrom: '',
    validTo: '',
    status: 'active',
    description: ''
  });

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    try {
      const saved = localStorage.getItem('coupons');
      if (saved) {
        setCoupons(JSON.parse(saved));
      } else {
        // Default coupons
        const defaultCoupons = [
          {
            id: 1,
            code: 'SAVE10',
            discountType: 'percentage',
            discountValue: 10,
            minOrderAmount: 500,
            maxDiscount: 500,
            usageLimit: 100,
            usedCount: 25,
            validFrom: new Date().toISOString(),
            validTo: new Date(Date.now() + 30*24*60*60*1000).toISOString(),
            status: 'active',
            description: '10% off on orders above ₹500'
          },
          {
            id: 2,
            code: 'SAVE20',
            discountType: 'percentage',
            discountValue: 20,
            minOrderAmount: 1000,
            maxDiscount: 1000,
            usageLimit: 50,
            usedCount: 12,
            validFrom: new Date().toISOString(),
            validTo: new Date(Date.now() + 15*24*60*60*1000).toISOString(),
            status: 'active',
            description: '20% off on orders above ₹1000'
          },
          {
            id: 3,
            code: 'FREESHIP',
            discountType: 'fixed',
            discountValue: 0,
            minOrderAmount: 499,
            maxDiscount: 0,
            usageLimit: 200,
            usedCount: 45,
            validFrom: new Date().toISOString(),
            validTo: new Date(Date.now() + 45*24*60*60*1000).toISOString(),
            status: 'active',
            description: 'Free shipping on orders above ₹499'
          }
        ];
        setCoupons(defaultCoupons);
        localStorage.setItem('coupons', JSON.stringify(defaultCoupons));
      }
    } catch (error) {
      console.error('Error loading coupons:', error);
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  const saveCoupons = (updatedCoupons) => {
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
    setCoupons(updatedCoupons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.code || !formData.discountValue) {
      toast.error('Please fill all required fields');
      return;
    }

    if (editingCoupon) {
      const updated = coupons.map(coupon =>
        coupon.id === editingCoupon.id
          ? { ...coupon, ...formData, updated_at: new Date().toISOString() }
          : coupon
      );
      saveCoupons(updated);
      toast.success('Coupon updated successfully');
    } else {
      const newCoupon = {
        id: Date.now(),
        ...formData,
        usedCount: 0,
        created_at: new Date().toISOString()
      };
      saveCoupons([...coupons, newCoupon]);
      toast.success('Coupon created successfully');
    }
    
    setShowModal(false);
    setEditingCoupon(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      code: '',
      discountType: 'percentage',
      discountValue: '',
      minOrderAmount: '',
      maxDiscount: '',
      usageLimit: '',
      usedCount: 0,
      validFrom: '',
      validTo: '',
      status: 'active',
      description: ''
    });
  };

  const handleDelete = (id, code) => {
    if (confirm(`Are you sure you want to delete coupon "${code}"?`)) {
      const updated = coupons.filter(coupon => coupon.id !== id);
      saveCoupons(updated);
      toast.success('Coupon deleted successfully');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const isExpired = (validTo) => {
    return new Date(validTo) < new Date();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Coupons & Discounts</h1>
          <p className="text-gray-500 text-sm mt-1">Create and manage discount coupons</p>
        </div>
        <button
          onClick={() => {
            setEditingCoupon(null);
            resetForm();
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Create Coupon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Coupons</p>
              <p className="text-2xl font-bold text-gray-800">{coupons.length}</p>
            </div>
            <TicketIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Coupons</p>
              <p className="text-2xl font-bold text-green-600">
                {coupons.filter(c => c.status === 'active' && !isExpired(c.validTo)).length}
              </p>
            </div>
            <GiftIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Uses</p>
              <p className="text-2xl font-bold text-blue-600">
                {coupons.reduce((sum, c) => sum + (c.usedCount || 0), 0)}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Expired</p>
              <p className="text-2xl font-bold text-red-600">
                {coupons.filter(c => isExpired(c.validTo)).length}
              </p>
            </div>
            <TrashIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon, index) => {
          const expired = isExpired(coupon.validTo);
          const usagePercent = ((coupon.usedCount || 0) / (coupon.usageLimit || 1)) * 100;
          
          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition ${
                expired ? 'border-red-200 bg-red-50/30' : 'border-gray-100'
              }`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <TicketIcon className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-lg text-purple-600">{coupon.code}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{coupon.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    coupon.status === 'active' && !expired
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {expired ? 'Expired' : coupon.status}
                  </span>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm font-semibold">
                    {coupon.discountType === 'percentage' 
                      ? `${coupon.discountValue}% OFF`
                      : coupon.discountValue > 0 
                        ? `₹${coupon.discountValue} OFF`
                        : 'Free Shipping'}
                  </p>
                  {coupon.minOrderAmount > 0 && (
                    <p className="text-xs text-gray-500">Min order: ₹{coupon.minOrderAmount}</p>
                  )}
                  {coupon.maxDiscount > 0 && (
                    <p className="text-xs text-gray-500">Max discount: ₹{coupon.maxDiscount}</p>
                  )}
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Usage: {coupon.usedCount || 0}/{coupon.usageLimit || '∞'}</span>
                    <span>{Math.round(usagePercent)}% used</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${Math.min(usagePercent, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-xs text-gray-400 mb-4">
                  Valid: {formatDate(coupon.validFrom)} - {formatDate(coupon.validTo)}
                </div>
                
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setEditingCoupon(coupon);
                      setFormData({
                        code: coupon.code,
                        discountType: coupon.discountType,
                        discountValue: coupon.discountValue,
                        minOrderAmount: coupon.minOrderAmount || '',
                        maxDiscount: coupon.maxDiscount || '',
                        usageLimit: coupon.usageLimit || '',
                        usedCount: coupon.usedCount || 0,
                        validFrom: coupon.validFrom || '',
                        validTo: coupon.validTo || '',
                        status: coupon.status,
                        description: coupon.description || ''
                      });
                      setShowModal(true);
                    }}
                    className="flex-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition flex items-center justify-center gap-1"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coupon.id, coupon.code)}
                    className="flex-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm transition flex items-center justify-center gap-1"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Coupon Code *</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                  placeholder="SAVE10"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Value *</label>
                  <input
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={formData.discountType === 'percentage' ? '10' : '100'}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Min Order (₹)</label>
                  <input
                    type="number"
                    value={formData.minOrderAmount}
                    onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Discount (₹)</label>
                  <input
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Unlimited"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Valid From</label>
                  <input
                    type="date"
                    value={formData.validFrom?.split('T')[0] || ''}
                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Valid To</label>
                  <input
                    type="date"
                    value={formData.validTo?.split('T')[0] || ''}
                    onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Usage Limit</label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Unlimited"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Brief description of the coupon"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCoupon(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg"
                >
                  {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}