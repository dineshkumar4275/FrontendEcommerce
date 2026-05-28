// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { TruckIcon, PackageIcon, CheckCircleIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/outline';
// import axiosInstance from '../../utils/axiosConfig';

// const Tracking = ({ orderId }) => {
//     const [trackingData, setTrackingData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [order, setOrder] = useState(null);

//     useEffect(() => {
//         fetchTrackingData();
//         fetchOrderDetails();
//     }, [orderId]);

//     const fetchTrackingData = async () => {
//         try {
//             const { data } = await axiosInstance.get(`/tracking/${orderId}`);
//             setTrackingData(data);
//         } catch (error) {
//             console.error('Error fetching tracking:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchOrderDetails = async () => {
//         try {
//             const { data } = await axiosInstance.get(`/orders/${orderId}`);
//             setOrder(data);
//         } catch (error) {
//             console.error('Error fetching order:', error);
//         }
//     };

//     const getStatusIcon = (status, isCompleted) => {
//         if (isCompleted) return <CheckCircleIcon className="w-8 h-8 text-green-500" />;
//         switch(status) {
//             case 'pending': return <PackageIcon className="w-8 h-8 text-gray-400" />;
//             case 'confirmed': return <PackageIcon className="w-8 h-8 text-blue-500" />;
//             case 'shipped': return <TruckIcon className="w-8 h-8 text-purple-500" />;
//             case 'delivered': return <CheckCircleIcon className="w-8 h-8 text-green-500" />;
//             default: return <PackageIcon className="w-8 h-8 text-gray-400" />;
//         }
//     };

//     const timelineSteps = [
//         { status: 'pending', label: 'Order Placed', description: 'Your order has been placed successfully' },
//         { status: 'confirmed', label: 'Order Confirmed', description: 'Your order has been confirmed' },
//         { status: 'shipped', label: 'Shipped', description: 'Your order has been shipped' },
//         { status: 'delivered', label: 'Delivered', description: 'Your order has been delivered' },
//     ];

//     const getCurrentStep = () => {
//         if (!order) return 0;
//         const statuses = ['pending', 'confirmed', 'shipped', 'delivered'];
//         return statuses.indexOf(order.status);
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             {/* Order Info */}
//             {order && (
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 mb-8"
//                 >
//                     <h2 className="text-2xl font-bold mb-2">Order #{order.order_number}</h2>
//                     <p className="opacity-90">Total Amount: ₹{order.total_amount.toLocaleString()}</p>
//                     <p className="opacity-90">Placed on: {new Date(order.created_at).toLocaleDateString()}</p>
//                 </motion.div>
//             )}

//             {/* Timeline */}
//             <div className="mb-12">
//                 <h3 className="text-xl font-bold mb-6">Order Timeline</h3>
//                 <div className="relative">
//                     {timelineSteps.map((step, index) => {
//                         const isCompleted = index <= getCurrentStep();
//                         const isCurrent = index === getCurrentStep();
                        
//                         return (
//                             <div key={step.status} className="flex mb-8 relative">
//                                 {/* Line connector */}
//                                 {index < timelineSteps.length - 1 && (
//                                     <div className={`absolute left-4 top-8 w-0.5 h-16 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
//                                 )}
                                
//                                 {/* Icon */}
//                                 <div className="relative z-10">
//                                     <motion.div
//                                         initial={{ scale: 0 }}
//                                         animate={{ scale: 1 }}
//                                         transition={{ delay: index * 0.2 }}
//                                         className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                                             isCompleted ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-300'
//                                         }`}
//                                     >
//                                         {getStatusIcon(step.status, isCompleted)}
//                                     </motion.div>
//                                 </div>
                                
//                                 {/* Content */}
//                                 <div className="ml-4 flex-1">
//                                     <motion.div
//                                         initial={{ opacity: 0, x: -20 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ delay: index * 0.2 }}
//                                         className={`p-4 rounded-lg ${
//                                             isCurrent ? 'bg-blue-50 border-2 border-blue-500' : 'bg-gray-50'
//                                         }`}
//                                     >
//                                         <h4 className="font-semibold text-lg">{step.label}</h4>
//                                         <p className="text-gray-600">{step.description}</p>
//                                         {isCurrent && order.status === step.status && (
//                                             <p className="text-sm text-blue-600 mt-2">Current Status</p>
//                                         )}
//                                     </motion.div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             {/* Tracking Updates */}
//             {trackingData.length > 0 && (
//                 <div>
//                     <h3 className="text-xl font-bold mb-4">Tracking History</h3>
//                     <div className="space-y-4">
//                         {trackingData.map((track, index) => (
//                             <motion.div
//                                 key={track.id}
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: index * 0.1 }}
//                                 className="bg-gray-50 rounded-lg p-4"
//                             >
//                                 <div className="flex justify-between items-start mb-2">
//                                     <div className="flex items-center space-x-2">
//                                         <MapPinIcon className="w-5 h-5 text-blue-600" />
//                                         <span className="font-semibold capitalize">{track.status}</span>
//                                     </div>
//                                     <span className="text-sm text-gray-500">
//                                         {new Date(track.updated_at).toLocaleString()}
//                                     </span>
//                                 </div>
//                                 <p className="text-gray-600 ml-7">{track.location}</p>
//                                 {track.estimated_delivery && (
//                                     <div className="flex items-center space-x-2 ml-7 mt-2">
//                                         <CalendarIcon className="w-4 h-4 text-gray-500" />
//                                         <span className="text-sm text-gray-500">
//                                             Estimated Delivery: {new Date(track.estimated_delivery).toLocaleDateString()}
//                                         </span>
//                                     </div>
//                                 )}
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Tracking;


'use client';

import React from 'react';
import { CheckCircleIcon, TruckIcon, PackageIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@/utils/formatters';

export const TrackingTimeline = ({ tracking }) => {
  const steps = [
    { key: 'order_placed', label: 'Order Placed', icon: ClockIcon },
    { key: 'confirmed', label: 'Confirmed', icon: PackageIcon },
    { key: 'processing', label: 'Processing', icon: PackageIcon },
    { key: 'shipped', label: 'Shipped', icon: TruckIcon },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: TruckIcon },
    { key: 'delivered', label: 'Delivered', icon: CheckCircleIcon },
  ];

  const getCurrentStepIndex = () => {
    const currentStatus = tracking?.status || 'pending';
    const statusMap = {
      pending: 0,
      confirmed: 1,
      processing: 2,
      shipped: 3,
      out_for_delivery: 4,
      delivered: 5,
    };
    return statusMap[currentStatus] || 0;
  };

  const currentStep = getCurrentStepIndex();

  return (
    <div className="space-y-6">
      {/* Tracking Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        <div className="space-y-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={step.key} className="relative flex gap-4">
                {/* Timeline Icon */}
                <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-300'
                } ${isCurrent ? 'ring-4 ring-green-200' : ''}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                
                {/* Timeline Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <h4 className={`font-semibold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </h4>
                      {tracking?.updates?.[step.key] && (
                        <p className="text-sm text-gray-500 mt-1">
                          {tracking.updates[step.key].description}
                        </p>
                      )}
                    </div>
                    {tracking?.updates?.[step.key] && (
                      <p className="text-xs text-gray-400">
                        {formatDate(tracking.updates[step.key].timestamp)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery Location */}
      {tracking?.deliveryLocation && (
        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <div className="flex gap-3">
            <MapPinIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900">Delivery Location</h4>
              <p className="text-sm text-gray-700 mt-1">{tracking.deliveryLocation.address}</p>
              <p className="text-sm text-gray-500 mt-1">
                Expected Delivery: {formatDate(tracking.expectedDelivery)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Driver Info */}
      {tracking?.driver && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Delivery Partner</h4>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TruckIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{tracking.driver.name}</p>
              <p className="text-sm text-gray-500">ID: {tracking.driver.id}</p>
            </div>
            <a href={`tel:${tracking.driver.phone}`} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors">
              <PhoneIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}

      {/* Live Map (placeholder) */}
      {tracking?.status === 'out_for_delivery' && (
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Live tracking map will appear here</p>
            <p className="text-sm text-gray-400">Your order is on the way!</p>
          </div>
        </div>
      )}

      {/* Estimated Delivery Message */}
      {tracking?.status !== 'delivered' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex gap-3">
            <ClockIcon className="h-5 w-5 text-yellow-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-yellow-800">
                Estimated delivery by {formatDate(tracking?.expectedDelivery)}
              </p>
              <p className="text-xs text-yellow-600 mt-1">
                You'll receive SMS/Email updates about your order status
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};