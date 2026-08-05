// frontend/app/checkout/page.js
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../src/hooks/useCart';
import { useAuth } from '../../src/hooks/useAuth';
import { useAddress } from '../../src/hooks/useAddress';
import { useApp } from '../../src/hooks/useApp'; // ✅ Add this
import { formatPrice } from '../../src/utils/formatters';
import apiClient from '../../src/lib/apiClient';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { 
  ArrowLeft, CreditCard, Shield, Truck, Wallet,   
  ShieldCheck, Clock, ShoppingBag, MapPin, 
  Pencil, Check, X, Home, Briefcase, MapPinned
} from 'lucide-react';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';

// Lazy load Razorpay component
const RazorpayPayment = React.lazy(() => import('../../src/components/checkout/RazorpayPayment'));

// Loading component for suspense
const LoadingSpinner = () => (
  <div className="flex justify-center py-4">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
  </div>
);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const { address: savedAddress, hasAddress, updateAddress, loading: addressLoading } = useAddress();
  const { t } = useApp(); // ✅ Get translation function
  
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cartItems, setCartItems] = useState([]);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    district: '',
    state: '',
    country: 'India',
    pincode: '',
    addressType: 'Home',
  });
  
  const [errors, setErrors] = useState({});

  // Load cart items and address on mount
  useEffect(() => {
    setMounted(true);
    
    const loadCartItems = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          setCartItems(parsed);
        } catch (e) {
          console.error('Error parsing cart:', e);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };
    
    loadCartItems();
    
    if (items && items.length > 0 && cartItems.length === 0) {
      setCartItems(items);
    }
    
    // Pre-fill form with saved address if available
    if (savedAddress && hasAddress) {
      setFormData(prev => ({
        ...prev,
        fullName: savedAddress.full_name || user?.name || '',
        email: user?.email || '',
        phone: savedAddress.mobile || user?.phone || '',
        alternatePhone: savedAddress.alternate_mobile || '',
        addressLine1: savedAddress.address_line1 || '',
        addressLine2: savedAddress.address_line2 || '',
        landmark: savedAddress.landmark || '',
        city: savedAddress.city || '',
        district: savedAddress.district || '',
        state: savedAddress.state || '',
        country: savedAddress.country || 'India',
        pincode: savedAddress.pincode || '',
        addressType: savedAddress.address_type || 'Home',
      }));
      setIsEditingAddress(false);
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }));
      setIsEditingAddress(true);
    }
  }, [user, items, savedAddress, hasAddress]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          setCartItems(parsed);
        } catch (e) {
          console.error('Error parsing cart:', e);
        }
      }
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  // Calculate totals from cartItems with validation
  const calculateTotals = () => {
    if (!cartItems || cartItems.length === 0) {
      return { subtotal: 0, tax: 0, shipping: 0, grandTotal: 0, itemCount: 0 };
    }
    
    const subtotal = cartItems.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + (price * quantity);
    }, 0);
    
    const tax = subtotal * 0.18;
    const shipping = subtotal > 500 ? 0 : 50;
    const grandTotal = subtotal + tax + shipping;
    const itemCount = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);
    
    return { subtotal, tax, shipping, grandTotal, itemCount };
  };

  const { subtotal, tax, shipping, grandTotal, itemCount } = calculateTotals();

  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && cartItems.length === 0) {
      toast.error(t('cart_empty') || 'Your cart is empty. Please add items to continue.');
      setTimeout(() => {
        router.push('/products');
      }, 1500);
    }
  }, [mounted, cartItems.length, router]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = t('full_name_required') || 'Full name is required';
    if (!formData.email.trim()) newErrors.email = t('email_required') || 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('email_invalid') || 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = t('phone_required') || 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = t('phone_invalid') || 'Phone number must be 10 digits';
    }
    if (formData.alternatePhone && !/^[0-9]{10}$/.test(formData.alternatePhone.replace(/\D/g, ''))) {
      newErrors.alternatePhone = t('phone_invalid') || 'Alternate phone must be 10 digits';
    }
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = t('address_required') || 'Address is required';
    if (!formData.city.trim()) newErrors.city = t('city_required') || 'City is required';
    if (!formData.state.trim()) newErrors.state = t('state_required') || 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = t('pincode_required') || 'Pincode is required';
    else if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = t('pincode_invalid') || 'Pincode must be 6 digits';
    return newErrors;
  };

  // ✅ Save address to backend
  const saveAddressToBackend = async (addressData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return null;
      }

      const response = await apiClient.put('/address', addressData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('❌ Address save error:', error.response?.data || error.message);
      return null;
    }
  };

  // ✅ Save order to backend database
  const saveOrderToBackend = async (orderData) => {
    try {
      const token = localStorage.getItem('token');
      
      const orderPayload = {
        order_number: orderData.orderNumber,
        total_amount: orderData.totalAmount,
        user_id: user?.id || null,
        shipping_address: {
          full_name: formData.fullName,
          email: formData.email,
          mobile: formData.phone,
          alternate_mobile: formData.alternatePhone,
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2,
          landmark: formData.landmark,
          city: formData.city,
          district: formData.district,
          state: formData.state,
          country: formData.country,
          pincode: formData.pincode,
          address_type: formData.addressType,
        },
        products: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: Number(item.price),
          quantity: Number(item.quantity),
          image: item.image_url
        })),
        status: orderData.status || 'pending',
        payment_method: orderData.paymentMethod,
        payment_status: orderData.paymentStatus
      };

      console.log('📤 Saving order to backend:', orderPayload);

      const response = await apiClient.post('/orders', orderPayload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });

      if (response.data.success) {
        console.log('✅ Order saved to database:', response.data.data);
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error('❌ Backend save error:', error.response?.data || error.message);
      return null;
    }
  };

  // ✅ Save to localStorage as backup
  const saveToLocalStorage = (orderData) => {
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.unshift(orderData);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    const userOrders = JSON.parse(localStorage.getItem('user_orders') || '[]');
    userOrders.unshift(orderData);
    localStorage.setItem('user_orders', JSON.stringify(userOrders));
  };

  // ✅ Handle address save
  const handleSaveAddress = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(t('fix_errors') || 'Please fix all errors before saving');
      return;
    }

    setIsSavingAddress(true);
    try {
      const addressData = {
        full_name: formData.fullName,
        mobile: formData.phone,
        alternate_mobile: formData.alternatePhone,
        address_line1: formData.addressLine1,
        address_line2: formData.addressLine2,
        landmark: formData.landmark,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        address_type: formData.addressType,
      };

      const saved = await saveAddressToBackend(addressData);
      if (saved || !localStorage.getItem('token')) {
        localStorage.setItem('userAddress', JSON.stringify(addressData));
        toast.success(t('address_saved') || 'Address saved successfully!');
        setIsEditingAddress(false);
      } else {
        toast.error(t('address_save_failed') || 'Failed to save address');
      }
    } catch (error) {
      console.error('Save address error:', error);
      toast.error(t('address_save_failed') || 'Failed to save address');
    } finally {
      setIsSavingAddress(false);
    }
  };

  // ✅ Handle place order (COD)
  const handlePlaceOrder = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(t('fix_errors') || 'Please fill all required fields');
      return;
    }

    if (isEditingAddress) {
      await handleSaveAddress();
    }

    setLoading(true);
    try {
      const orderNumber = 'ORD' + Date.now();
      
      const orderData = {
        orderNumber: orderNumber,
        order_number: orderNumber,
        total_amount: grandTotal,
        totalAmount: grandTotal,
        status: 'pending',
        paymentMethod: 'cod',
        payment_method: 'cod',
        paymentStatus: 'pending',
        payment_status: 'pending'
      };

      const savedOrder = await saveOrderToBackend(orderData);
      
      if (savedOrder) {
        console.log('✅ Order saved to database successfully');
        saveToLocalStorage(savedOrder);
        
        localStorage.removeItem('cartItems');
        clearCart();
        window.dispatchEvent(new Event('cartUpdated'));
        
        toast.success(t('order_placed') || 'Order placed successfully!');
        router.push(`/orders/${orderNumber}`);
      } else {
        console.warn('Backend save failed, saving only to localStorage');
        const fallbackOrder = {
          id: orderNumber,
          orderNumber: orderNumber,
          order_number: orderNumber,
          items: cartItems,
          products: cartItems,
          total_amount: grandTotal,
          totalAmount: grandTotal,
          shipping_address: formData,
          shippingAddress: formData,
          status: 'pending',
          orderStatus: 'pending',
          paymentMethod: 'cod',
          payment_method: 'cod',
          paymentStatus: 'pending',
          payment_status: 'pending',
          created_at: new Date().toISOString(),
          createdAt: new Date().toISOString()
        };
        saveToLocalStorage(fallbackOrder);
        localStorage.removeItem('cartItems');
        clearCart();
        toast.warning(t('order_saved_locally') || 'Order saved locally. Will sync when online.');
        router.push(`/orders/${orderNumber}`);
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error(t('order_failed') || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle payment success
  const handlePaymentSuccess = async (paymentData) => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(t('fix_errors') || 'Please fill all required fields');
      return;
    }

    if (isEditingAddress) {
      await handleSaveAddress();
    }

    setLoading(true);
    try {
      const orderNumber = 'ORD' + Date.now();
      
      const orderData = {
        orderNumber: orderNumber,
        order_number: orderNumber,
        total_amount: grandTotal,
        totalAmount: grandTotal,
        status: 'confirmed',
        paymentMethod: 'online',
        payment_method: 'online',
        paymentStatus: 'paid',
        payment_status: 'paid'
      };

      const savedOrder = await saveOrderToBackend(orderData);
      
      if (savedOrder) {
        console.log('✅ Order saved to database with payment');
        
        const orderWithPayment = {
          ...savedOrder,
          paymentId: paymentData.razorpay_payment_id,
          razorpayOrderId: paymentData.razorpay_order_id
        };
        
        saveToLocalStorage(orderWithPayment);
        
        localStorage.removeItem('cartItems');
        clearCart();
        window.dispatchEvent(new Event('cartUpdated'));
        
        toast.success(t('payment_success') || 'Payment successful! Order placed.');
        router.push(`/orders/${orderNumber}`);
      } else {
        toast.error(t('order_creation_failed') || 'Payment successful but order creation failed. Contact support.');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error(t('order_creation_failed') || 'Payment successful but order creation failed. Contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    toast.error(t('payment_failed') || 'Payment failed. Please try again.');
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isValidAmount = grandTotal > 0 && !isNaN(grandTotal) && isFinite(grandTotal);

  // ✅ Render Address View Mode
  const renderAddressView = () => {
    if (!hasAddress && !formData.fullName) {
      return (
        <button
          onClick={() => setIsEditingAddress(true)}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors text-center"
        >
          <MapPin className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">{t('no_address_saved') || 'No address saved'}</p>
          <p className="text-sm text-gray-400">{t('click_to_add_address') || 'Click to add your delivery address'}</p>
        </button>
      );
    }

    return (
      <div className="bg-gray-50 rounded-lg p-4 relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`
                text-xs font-medium px-2 py-0.5 rounded-full
                ${formData.addressType === 'Home' 
                  ? 'bg-green-100 text-green-700' 
                  : formData.addressType === 'Work'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
                }
              `}>
                {formData.addressType === 'Home' && <Home className="h-3 w-3 inline mr-1" />}
                {formData.addressType === 'Work' && <Briefcase className="h-3 w-3 inline mr-1" />}
                {formData.addressType === 'Other' && <MapPinned className="h-3 w-3 inline mr-1" />}
                {t(formData.addressType.toLowerCase()) || formData.addressType}
              </span>
            </div>
            <p className="font-medium text-gray-900">{formData.fullName}</p>
            <p className="text-sm text-gray-600">📱 {formData.phone}</p>
            {formData.alternatePhone && (
              <p className="text-sm text-gray-500">📱 {t('alt') || 'Alt'}: {formData.alternatePhone}</p>
            )}
            <div className="mt-1 space-y-0.5 text-sm text-gray-600">
              <p>{formData.addressLine1}</p>
              {formData.addressLine2 && <p>{formData.addressLine2}</p>}
              {formData.landmark && <p className="text-gray-500">📍 {formData.landmark}</p>}
              <p>
                {formData.city}
                {formData.district && `, ${formData.district}`}
                {formData.state && `, ${formData.state}`}
              </p>
              <p>{formData.country} - {formData.pincode}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditingAddress(true)}
            className="ml-4 p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
          >
            <Pencil className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>
    );
  };

  // ✅ Render Address Edit Form
  const renderAddressForm = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('full_name') || 'Full Name'} *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('full_name_placeholder') || 'John Doe'}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('email') || 'Email Address'} *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('email_placeholder') || 'john@example.com'}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone') || 'Phone Number'} *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('phone_placeholder') || '9876543210'}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('alternate_phone') || 'Alternate Phone'}</label>
            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.alternatePhone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('optional') || 'Optional'}
            />
            {errors.alternatePhone && <p className="text-red-500 text-xs mt-1">{errors.alternatePhone}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('address_line1') || 'Address Line 1'} *</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={t('address_placeholder') || 'House No., Street, Area'}
          />
          {errors.addressLine1 && <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('address_line2') || 'Address Line 2'}</label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('address_placeholder2') || 'Apartment, Suite, etc.'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('landmark') || 'Landmark'}</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('landmark_placeholder') || 'Near City Center'}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('city') || 'City'} *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('city_placeholder') || 'Mumbai'}
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('district') || 'District'}</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t('district_placeholder') || 'Mumbai City'}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('state') || 'State'} *</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.state ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('state_placeholder') || 'Maharashtra'}
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('pincode') || 'Pincode'} *</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.pincode ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('pincode_placeholder') || '400001'}
            />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('country') || 'Country'}</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={t('country_placeholder') || 'India'}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('address_type') || 'Address Type'}</label>
          <select
            name="addressType"
            value={formData.addressType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Home">🏠 {t('home') || 'Home'}</option>
            <option value="Work">💼 {t('work') || 'Work'}</option>
            <option value="Other">📍 {t('other') || 'Other'}</option>
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleSaveAddress}
            disabled={isSavingAddress}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSavingAddress ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {t('saving') || 'Saving...'}
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                {t('save_address') || 'Save Address'}
              </>
            )}
          </button>
          {hasAddress && (
            <button
              onClick={() => setIsEditingAddress(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  if (!mounted) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t('cart_empty') || 'Your cart is empty'}</h2>
            <p className="text-gray-500 mb-6">{t('cart_empty_desc') || "Looks like you haven't added any items to your cart yet."}</p>
            <button
              onClick={() => router.push('/products')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {t('continue_shopping') || 'Continue Shopping'}
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 pt-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            {t('back_to_cart') || 'Back to Cart'}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  {t('shipping_information') || 'Shipping Information'}
                </h2>
                
                {isEditingAddress ? renderAddressForm() : renderAddressView()}
              </div>

              <div className="mt-4 bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">{t('estimated_delivery') || 'Estimated Delivery: 3-5 business days'}</p>
                  <p className="text-xs mt-1">{t('free_shipping_desc') || 'Free shipping on orders above ₹500'}</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                  {t('order_summary') || 'Order Summary'} ({itemCount} {itemCount === 1 ? (t('item') || 'item') : (t('items') || 'items')})
                </h2>
                
                <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                  {cartItems.map((item, index) => (
                    <div key={item.id || index} className="flex justify-between text-sm py-2 border-b border-gray-100">
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 ml-1">x{item.quantity || 1}</span>
                      </div>
                      <span className="font-semibold">{formatPrice((Number(item.price) || 0) * (Number(item.quantity) || 1))}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('subtotal') || 'Subtotal'}:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('shipping') || 'Shipping'}:</span>
                    <span className={shipping === 0 ? 'text-green-600' : 'text-gray-600'}>
                      {shipping === 0 ? t('free') || 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('tax') || 'Tax (18% GST)'}:</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t('total') || 'Total'}:</span>
                      <span className="text-blue-600">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">{t('select_payment_method') || 'Select Payment Method'}</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600 w-4 h-4"
                      />
                      <Wallet className="h-5 w-5 text-gray-500" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{t('cash_on_delivery') || 'Cash on Delivery'}</p>
                        <p className="text-xs text-gray-500">{t('pay_on_delivery') || 'Pay when you receive the order'}</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-all">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600 w-4 h-4"
                      />
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{t('online_payment') || 'Online Payment'}</p>
                        <p className="text-xs text-gray-500">{t('online_payment_desc') || 'Card, UPI, NetBanking via Razorpay'}</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  {paymentMethod === 'cod' ? (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading || !formData.fullName}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          {t('processing') || 'Processing...'}
                        </span>
                      ) : (
                        `${t('place_order_cod') || 'Place Order (COD)'} • ${formatPrice(grandTotal)}`
                      )}
                    </button>
                  ) : (
                    isValidAmount && formData.fullName ? (
                      <Suspense fallback={<LoadingSpinner />}>
                        <RazorpayPayment
                          amount={grandTotal}
                          orderId={`ORDER_${Date.now()}`}
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                          buttonText={`${t('pay') || 'Pay'} ${formatPrice(grandTotal)} ${t('with_razorpay') || 'with Razorpay'}`}
                          buttonClassName="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </Suspense>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                      >
                        {!formData.fullName ? t('add_address_first') || 'Please add address first' : t('invalid_amount') || 'Invalid Amount - Please check cart'}
                      </button>
                    )
                  )}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>{t('secure_payments') || '100% Secure Payments'}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{t('easy_returns') || 'Easy Returns'}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{t('support_24_7') || '24/7 Support'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}