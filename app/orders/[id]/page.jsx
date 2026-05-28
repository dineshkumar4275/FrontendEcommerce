// app/orders/[id]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  TruckIcon, 
  ClockIcon, 
  CubeIcon,  // ✅ Changed from PackageIcon to CubeIcon
  MapPinIcon, 
  PhoneIcon, 
  CalendarIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Header } from '../../../src/components/layout/Header';
import { Footer } from '../../../src/components/layout/Footer';
import orderCancelService from '../../../src/services/orderCancelService';
import { CancelOrderModal } from '../../../src/components/orders/CancelOrderModal';
import { ReturnOrderModal } from '../../../src/components/orders/ReturnOrderModal';
import toast from 'react-hot-toast';



export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [cancellationStatus, setCancellationStatus] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const localOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = localOrders.find(o => 
        o.id === orderId || o.order_number === orderId || o.orderNumber === orderId
      );
      
      if (foundOrder) {
        setOrder(foundOrder);
        const status = orderCancelService.getCancellationStatus(foundOrder.id);
        setCancellationStatus(status);
      } else {
        router.push('/orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      router.push('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (reason, comments) => {
    const result = await orderCancelService.cancelOrder(order.id, reason, comments);
    
    if (result.success) {
      toast.success(result.message);
      setShowCancelModal(false);
      fetchOrderDetails();
    } else {
      toast.error(result.message);
    }
  };

  const handleReturnOrder = async (reason, comments) => {
    // Implement return logic here
    toast.success('Return request submitted successfully');
    setShowReturnModal(false);
  };

  const canCancel = order && orderCancelService.canCancelOrder(order);
  const canReturn = order && orderCancelService.canReturnOrder(order);
  const cancellationReason = cancellationStatus?.cancellationReason || '';
  const timeRemaining = cancellationStatus?.timeRemaining || 0;
  const isCancelled = order?.status === 'cancelled';
  const isDelivered = order?.status === 'delivered';

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    const num = parseFloat(amount);
    return isNaN(num) ? 0 : num.toLocaleString();
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'accepted': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'in_transit': 'bg-orange-100 text-orange-800',
      'shipped': 'bg-orange-100 text-orange-800',
      'out_for_delivery': 'bg-pink-100 text-pink-800'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'pending': <ClockIcon className="w-4 h-4" />,
      'confirmed': <CheckCircleIcon className="w-4 h-4" />,
      'delivered': <CheckCircleIcon className="w-4 h-4" />,
      'cancelled': <XCircleIcon className="w-4 h-4" />,
      'shipped': <TruckIcon className="w-4 h-4" />
    };
    return icons[status?.toLowerCase()] || <PackageIcon className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2">Order Not Found</h2>
            <Link href="/orders" className="text-purple-600 hover:underline">
              Back to My Orders →
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const address = order.shipping_address || order.shippingAddress;
  const items = order.items || order.products || [];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 pt-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-4">
            <Link href="/orders" className="text-purple-600 hover:underline text-sm">
              ← Back to My Orders
            </Link>
          </div>
          
          {/* Order Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold">Order Details</h1>
                <p className="text-gray-500 text-sm mt-1">Order #{order.order_number || order.id}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {/* Cancel Button - Only if cancellable */}
                {canCancel && (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition text-sm"
                  >
                    Cancel Order
                  </button>
                )}
                
                {/* Return Button - Only if delivered and within return window */}
                {canReturn && (
                  <button
                    onClick={() => setShowReturnModal(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition text-sm flex items-center gap-1"
                  >
                    <ArrowPathIcon className="w-4 h-4" />
                    Return Order
                  </button>
                )}
                
                {/* Status Badge */}
                <span className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>
            </div>
            
            {/* Cancellation Restriction Reason (if cannot cancel) */}
            {!canCancel && !isCancelled && !isDelivered && cancellationReason && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-lg flex items-start gap-2">
                <ExclamationTriangleIcon className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-800">{cancellationReason}</p>
              </div>
            )}
            
            {/* Time remaining for cancellation */}
            {canCancel && timeRemaining > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-blue-700">
                  Cancel within {timeRemaining} minute{timeRemaining > 1 ? 's' : ''} to avoid cancellation fees
                </p>
              </div>
            )}
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Information</h2>
            <div className="space-y-3">
              <div className="flex flex-wrap justify-between py-2 border-b">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">{order.order_number || order.id}</span>
              </div>
              <div className="flex flex-wrap justify-between py-2 border-b">
                <span className="text-gray-600">Order Date:</span>
                <span>{formatDate(order.created_at)}</span>
              </div>
              <div className="flex flex-wrap justify-between py-2">
                <span className="text-gray-600 font-semibold">Total Amount:</span>
                <span className="font-bold text-purple-600 text-xl">₹{formatAmount(order.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Items Ordered */}
          {items.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Items Ordered</h2>
              <div className="space-y-4">
                {items.map((product, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">📦</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">₹{formatAmount(product.price)}</p>
                      <p className="text-xs text-gray-400">Total: ₹{formatAmount(product.price * product.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{formatAmount(order.subtotal || order.total_amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className={order.shipping === 0 ? 'text-green-600' : ''}>
                  {order.shipping === 0 ? 'Free' : `₹${formatAmount(order.shipping)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (GST)</span>
                <span>₹{formatAmount(order.tax || 0)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-xl text-purple-600">₹{formatAmount(order.total_amount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {address && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="text-gray-700">
                {typeof address === 'object' ? (
                  <>
                    <p className="font-medium">{address.fullName}</p>
                    <p>{address.address}</p>
                    <p>{address.city}, {address.state} - {address.pincode}</p>
                    <p>Phone: {address.phone}</p>
                  </>
                ) : (
                  <p>{address}</p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {order.status !== 'cancelled' && order.status !== 'delivered' && (
              <Link href={`/track/${order.id}`} className="flex-1">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <TruckIcon className="w-5 h-5" />
                  Track Order
                </button>
              </Link>
            )}
            <Link href="/products" className="flex-1">
              <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
                Continue Shopping
              </button>
            </Link>
            <Link href="/orders" className="flex-1">
              <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                View All Orders
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CancelOrderModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        order={order}
        onConfirm={handleCancelOrder}
        timeRemaining={timeRemaining}
      />
      
      <ReturnOrderModal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        order={order}
        onConfirm={handleReturnOrder}
      />
      
      <Footer />
    </>
  );
}