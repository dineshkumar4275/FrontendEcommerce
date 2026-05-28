
// import { motion } from 'framer-motion';
// import { useRouter } from 'next/router';
// import { TruckIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/outline';

// const OrderCard = ({ order, index }) => {
//     const router = useRouter();

//     const getStatusColor = (status) => {
//         switch(status) {
//             case 'pending': return 'bg-yellow-500';
//             case 'confirmed': return 'bg-blue-500';
//             case 'shipped': return 'bg-purple-500';
//             case 'delivered': return 'bg-green-500';
//             case 'cancelled': return 'bg-red-500';
//             default: return 'bg-gray-500';
//         }
//     };

//     const getStatusIcon = (status) => {
//         switch(status) {
//             case 'pending': return <ClockIcon className="w-5 h-5" />;
//             case 'shipped': return <TruckIcon className="w-5 h-5" />;
//             case 'delivered': return <CheckCircleIcon className="w-5 h-5" />;
//             default: return null;
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             whileHover={{ scale: 1.02 }}
//             onClick={() => router.push(`/order/${order.id}`)}
//             className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all"
//         >
//             <div className="flex justify-between items-start mb-4">
//                 <div>
//                     <p className="text-sm text-gray-500">Order #{order.order_number}</p>
//                     <p className="text-sm text-gray-500">
//                         {new Date(order.created_at).toLocaleDateString()}
//                     </p>
//                 </div>
//                 <div className={`${getStatusColor(order.status)} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1`}>
//                     {getStatusIcon(order.status)}
//                     <span>{order.status.toUpperCase()}</span>
//                 </div>
//             </div>

//             <div className="flex justify-between items-end">
//                 <div>
//                     <p className="text-gray-600">
//                         {order.items_count || order.order_items?.length || 0} items
//                     </p>
//                     <p className="text-2xl font-bold text-blue-600">
//                         ₹{order.total_amount.toLocaleString()}
//                     </p>
//                 </div>
//                 <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="text-blue-600 hover:text-blue-700 font-semibold"
//                 >
//                     View Details →
//                 </motion.button>
//             </div>
//         </motion.div>
//     );
// };

// export default OrderCard;

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { EyeIcon, TruckIcon, PackageIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { formatPrice, formatDate } from '@/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const OrderCard = ({ order, showActions = true }) => {
  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: 'warning', icon: ClockIcon, text: 'Pending' },
      confirmed: { color: 'info', icon: PackageIcon, text: 'Confirmed' },
      processing: { color: 'info', icon: PackageIcon, text: 'Processing' },
      shipped: { color: 'primary', icon: TruckIcon, text: 'Shipped' },
      delivered: { color: 'success', icon: CheckCircleIcon, text: 'Delivered' },
      cancelled: { color: 'danger', icon: ClockIcon, text: 'Cancelled' },
    };
    return configs[status] || configs.pending;
  };

  const StatusIcon = getStatusConfig(order.status).icon;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Order Header */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">Order #{order.id.slice(-8)}</p>
            <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusIcon className={`h-5 w-5 text-${getStatusConfig(order.status).color}-500`} />
            <Badge variant={getStatusConfig(order.status).color}>
              {getStatusConfig(order.status).text}
            </Badge>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="px-6 py-4">
        <div className="space-y-3">
          {order.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={item.image || '/images/placeholder.jpg'}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × {formatPrice(item.price)}
                </p>
                {item.selectedSize && (
                  <p className="text-xs text-gray-400">Size: {item.selectedSize}</p>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold text-blue-600">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
          
          {order.items.length > 2 && (
            <p className="text-sm text-gray-500 text-center">
              +{order.items.length - 2} more items
            </p>
          )}
        </div>
      </div>

      {/* Order Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-xl font-bold text-blue-600">{formatPrice(order.totalAmount)}</p>
          </div>
          
          {showActions && (
            <div className="flex gap-3">
              {order.status === 'delivered' && (
                <Button variant="outline" size="sm">
                  Write a Review
                </Button>
              )}
              {order.status === 'pending' && (
                <Button variant="danger" size="sm">
                  Cancel Order
                </Button>
              )}
              <Link href={`/orders/${order.id}`}>
                <Button variant="primary" size="sm">
                  <EyeIcon className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};