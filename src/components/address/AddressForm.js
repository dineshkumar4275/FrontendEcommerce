// frontend/components/address/AddressForm.js
'use client';

import { useState, useEffect } from 'react';
import { PencilIcon, XMarkIcon, CheckIcon, MapPinIcon } from '@heroicons/react/24/outline';

export const AddressForm = ({ initialData = {}, onSubmit, loading, onDelete }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        mobile: '',
        alternate_mobile: '',
        address_line1: '',
        address_line2: '',
        landmark: '',
        city: '',
        district: '',
        state: '',
        country: 'India',
        pincode: '',
        address_type: 'Home',
        ...initialData
    });

    const [errors, setErrors] = useState({});
    const [isEditing, setIsEditing] = useState(!initialData?.full_name);

    useEffect(() => {
        if (initialData?.full_name) {
            setFormData(prev => ({
                ...prev,
                ...initialData
            }));
        }
    }, [initialData]);

    const validate = () => {
        const newErrors = {};
        
        if (!formData.full_name?.trim()) {
            newErrors.full_name = 'Full name is required';
        } else if (formData.full_name.length < 2) {
            newErrors.full_name = 'Full name must be at least 2 characters';
        }
        
        if (!formData.mobile?.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
            newErrors.mobile = 'Please enter a valid 10-digit mobile number';
        }
        
        if (formData.alternate_mobile && !/^[0-9]{10}$/.test(formData.alternate_mobile.replace(/\D/g, ''))) {
            newErrors.alternate_mobile = 'Please enter a valid 10-digit alternate number';
        }
        
        if (!formData.address_line1?.trim()) {
            newErrors.address_line1 = 'Address is required';
        }
        
        if (!formData.city?.trim()) {
            newErrors.city = 'City is required';
        }
        
        if (!formData.state?.trim()) {
            newErrors.state = 'State is required';
        }
        
        if (!formData.pincode?.trim()) {
            newErrors.pincode = 'Pincode is required';
        } else if (!/^[0-9]{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Please enter a valid 6-digit pincode';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCancel = () => {
        if (initialData?.full_name) {
            setIsEditing(false);
            setFormData(initialData);
            setErrors({});
        }
    };

    // ✅ View Mode - Show address card
    if (!isEditing && initialData?.full_name) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                                {initialData.full_name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                                    {initialData.full_name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    📱 {initialData.mobile}
                                    {initialData.alternate_mobile && ` | ${initialData.alternate_mobile}`}
                                </p>
                            </div>
                        </div>
                        
                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300 ml-1">
                            <p className="font-medium">{initialData.address_line1}</p>
                            {initialData.address_line2 && <p>{initialData.address_line2}</p>}
                            {initialData.landmark && (
                                <p className="text-gray-500 dark:text-gray-400">📍 {initialData.landmark}</p>
                            )}
                            <p>
                                {initialData.city}
                                {initialData.district && `, ${initialData.district}`}
                                {initialData.state && `, ${initialData.state}`}
                            </p>
                            <p>
                                {initialData.country || 'India'} - {initialData.pincode}
                            </p>
                        </div>
                        
                        <div className="mt-3 flex items-center gap-2">
                            <span className={`
                                text-xs font-medium px-3 py-1 rounded-full
                                ${initialData.address_type === 'Home' 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                    : initialData.address_type === 'Work'
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400'
                                }
                            `}>
                                🏠 {initialData.address_type}
                            </span>
                            {initialData.address_updated_at && (
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    Updated {new Date(initialData.address_updated_at).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex gap-1 ml-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            aria-label="Edit address"
                            disabled={loading}
                        >
                            <PencilIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </button>
                        {onDelete && (
                            <button
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to delete your address?')) {
                                        onDelete();
                                    }
                                }}
                                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                aria-label="Delete address"
                                disabled={loading}
                            >
                                <XMarkIcon className="w-5 h-5 text-red-500" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ✅ Edit/Create Mode - Address Form
    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MapPinIcon className="w-6 h-6 text-blue-500" />
                    {initialData?.full_name ? '✏️ Edit Address' : '📍 Add Delivery Address'}
                </h2>
                {initialData?.full_name && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors flex items-center gap-1"
                    >
                        <XMarkIcon className="w-4 h-4" />
                        Cancel
                    </button>
                )}
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                ${errors.full_name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                            placeholder="John Doe"
                            disabled={loading}
                        />
                        {errors.full_name && (
                            <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>
                        )}
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Mobile Number *
                        </label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                ${errors.mobile ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                            placeholder="9876543210"
                            disabled={loading}
                        />
                        {errors.mobile && (
                            <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                        )}
                    </div>
                </div>

                {/* Alternate Mobile */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Alternate Mobile
                    </label>
                    <input
                        type="tel"
                        name="alternate_mobile"
                        value={formData.alternate_mobile || ''}
                        onChange={handleChange}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                            ${errors.alternate_mobile ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="Optional"
                        disabled={loading}
                    />
                    {errors.alternate_mobile && (
                        <p className="text-red-500 text-xs mt-1">{errors.alternate_mobile}</p>
                    )}
                </div>

                {/* Address Line 1 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address Line 1 *
                    </label>
                    <input
                        type="text"
                        name="address_line1"
                        value={formData.address_line1}
                        onChange={handleChange}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                            ${errors.address_line1 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                        placeholder="123 Main Street, Apartment 4B"
                        disabled={loading}
                    />
                    {errors.address_line1 && (
                        <p className="text-red-500 text-xs mt-1">{errors.address_line1}</p>
                    )}
                </div>

                {/* Address Line 2 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address Line 2
                    </label>
                    <input
                        type="text"
                        name="address_line2"
                        value={formData.address_line2 || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Near City Center, Opposite Park"
                        disabled={loading}
                    />
                </div>

                {/* Landmark */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Landmark
                    </label>
                    <input
                        type="text"
                        name="landmark"
                        value={formData.landmark || ''}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Near City Center"
                        disabled={loading}
                    />
                </div>

                {/* City, District, State, Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            City *
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                            placeholder="Mumbai"
                            disabled={loading}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            District
                        </label>
                        <input
                            type="text"
                            name="district"
                            value={formData.district || ''}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            placeholder="Mumbai City"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            State *
                        </label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                ${errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                            placeholder="Maharashtra"
                            disabled={loading}
                        />
                        {errors.state && (
                            <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Pincode *
                        </label>
                        <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                ${errors.pincode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                            placeholder="400001"
                            maxLength="6"
                            disabled={loading}
                        />
                        {errors.pincode && (
                            <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
                        )}
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Country
                    </label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="India"
                        disabled={loading}
                    />
                </div>

                {/* Address Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address Type
                    </label>
                    <select
                        name="address_type"
                        value={formData.address_type}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        disabled={loading}
                    >
                        <option value="Home">🏠 Home</option>
                        <option value="Work">💼 Work</option>
                        <option value="Other">📍 Other</option>
                    </select>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t dark:border-gray-700">
                    {initialData?.full_name && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <CheckIcon className="w-5 h-5" />
                                {initialData?.full_name ? 'Update Address' : 'Save Address'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};