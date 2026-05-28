// import { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';
// import { motion } from 'framer-motion';
// import { saveShippingAddress } from '../../store/slices/cartSlice';
// import { clearCart } from '../../store/slices/cartSlice';
// import toast from 'react-hot-toast';
// import axiosInstance from '../../utils/axiosConfig';

// const Checkout = () => {
//     const { cartItems, shippingAddress } = useSelector((state) => state.cart);
//     const { userInfo } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//     const router = useRouter();
    
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         address: shippingAddress.address || '',
//         city: shippingAddress.city || '',
//         state: shippingAddress.state || '',
//         zipCode: shippingAddress.zipCode || '',
//         phone: shippingAddress.phone || '',
//     });

//     const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//     const tax = totalPrice * 0.18; // 18% GST
//     const shipping = totalPrice > 500 ? 0 : 50;
//     const grandTotal = totalPrice + tax + shipping;

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!formData.address || !formData.city || !formData.state || !formData.zipCode || !formData.phone) {
//             toast.error('Please fill in all shipping details');
//             return;
//         }

//         dispatch(saveShippingAddress(formData));
//         setLoading(true);

//         try {
//             // Create order
//             const { data } = await axiosInstance.post('/orders', {
//                 products: cartItems,
//                 total_amount: grandTotal,
//                 shipping_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`,
//                 phone: formData.phone,
//             });

//             // Initialize Razorpay
//             const options = {
//                 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
//                 amount: data.razorpayOrder.amount,
//                 currency: 'INR',
//                 name: 'ShopHub',
//                 description: `Order ${data.order.order_number}`,
//                 order_id: data.razorpayOrder.id,
//                 handler: async (response) => {
//                     try {
//                         await axiosInstance.post('/orders/verify', {
//                             razorpay_order_id: response.razorpay_order_id,
//                             razorpay_payment_id: response.razorpay_payment_id,
//                             razorpay_signature: response.razorpay_signature,
//                         });
                        
//                         toast.success('Payment successful! Order confirmed.');
//                         dispatch(clearCart());
//                         router.push(`/order/${data.order.id}`);
//                     } catch (error) {
//                         toast.error('Payment verification failed');
//                     }
//                 },
//                 prefill: {
//                     name: userInfo.name,
//                     email: userInfo.email,
//                     contact: formData.phone,
//                 },
//                 theme: {
//                     color: '#3b82f6',
//                 },
//             };

//             const razorpay = new window.Razorpay(options);
//             razorpay.open();
//         } catch (error) {
//             toast.error('Failed to create order');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Shipping Form */}
//                 <div className="lg:col-span-2">
//                     <motion.div
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="bg-white rounded-xl shadow-lg p-6"
//                     >
//                         <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div>
//                                 <label className="block text-gray-700 mb-2">Address</label>
//                                 <textarea
//                                     name="address"
//                                     value={formData.address}
//                                     onChange={handleChange}
//                                     rows="3"
//                                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     required
//                                 />
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">City</label>
//                                     <input
//                                         type="text"
//                                         name="city"
//                                         value={formData.city}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">State</label>
//                                     <input
//                                         type="text"
//                                         name="state"
//                                         value={formData.state}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">ZIP Code</label>
//                                     <input
//                                         type="text"
//                                         name="zipCode"
//                                         value={formData.zipCode}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-700 mb-2">Phone Number</label>
//                                     <input
//                                         type="tel"
//                                         name="phone"
//                                         value={formData.phone}
//                                         onChange={handleChange}
//                                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         </form>
//                     </motion.div>
//                 </div>

//                 {/* Order Summary */}
//                 <div className="lg:col-span-1">
//                     <motion.div
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
//                     >
//                         <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        
//                         <div className="space-y-3 mb-4">
//                             {cartItems.map((item) => (
//                                 <div key={item.id} className="flex justify-between text-sm">
//                                     <span>{item.name} × {item.quantity}</span>
//                                     <span>₹{(item.price * item.quantity).toLocaleString()}</span>
//                                 </div>
//                             ))}
//                         </div>
                        
//                         <div className="border-t pt-4 space-y-2">
//                             <div className="flex justify-between">
//                                 <span>Subtotal:</span>
//                                 <span>₹{totalPrice.toLocaleString()}</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>Tax (18% GST):</span>
//                                 <span>₹{tax.toLocaleString()}</span>
//                             </div>
//                             <div className="flex justify-between">
//                                 <span>Shipping:</span>
//                                 <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
//                             </div>
//                             <div className="flex justify-between text-lg font-bold pt-2 border-t">
//                                 <span>Total:</span>
//                                 <span className="text-blue-600">₹{grandTotal.toLocaleString()}</span>
//                             </div>
//                         </div>

//                         <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             onClick={handleSubmit}
//                             disabled={loading || cartItems.length === 0}
//                             className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
//                         >
//                             {loading ? 'Processing...' : `Pay ₹${grandTotal.toLocaleString()}`}
//                         </motion.button>
//                     </motion.div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Checkout;
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatPrice } from '@/utils/formatters';
import { toast } from 'react-hot-toast';

export const CheckoutForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalAmount, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    else if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items,
        totalAmount,
        shippingAddress: formData,
        paymentMethod,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      
      if (response.ok) {
        clearCart();
        toast.success('Order placed successfully!');
        router.push(`/orders/${data.order.id}`);
      } else {
        toast.error(data.message || 'Failed to place order');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Shipping Form */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
                placeholder="John Doe"
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john@example.com"
              />
            </div>

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="9876543210"
            />

            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              placeholder="House No., Street, Area"
            />

            <Input
              label="Landmark (Optional)"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Near city mall"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                placeholder="Mumbai"
              />
              <Input
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
                placeholder="Maharashtra"
              />
              <Input
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                error={errors.pincode}
                placeholder="400001"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          {/* Items List */}
          <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                  {item.selectedSize && ` (${item.selectedSize})`}
                </span>
                <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span>{formatPrice(totalAmount * 0.18)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">{formatPrice(totalAmount + (totalAmount * 0.18))}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Method
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">Pay when you receive the order</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500">Pay securely online</p>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-blue-600"
                />
                <div>
                  <p className="font-medium">UPI</p>
                  <p className="text-sm text-gray-500">Google Pay, PhonePe, etc.</p>
                </div>
              </label>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            fullWidth
            isLoading={loading}
            disabled={loading || items.length === 0}
            className="mt-6"
          >
            Place Order
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By placing your order, you agree to our Terms and Conditions
          </p>
        </div>
      </div>
    </div>
  );
};