// // 'use client';

// // import { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { getDashboardStats, getRecentOrders } from '../../../src/services/dashboardService';
// // import apiClient from '../../../src/lib/apiClient';
// // import toast from 'react-hot-toast';
// // import driverService from '../../../src/services/api/driverService';

// // import {
// //   ShoppingBagIcon,
// //   CurrencyRupeeIcon,
// //   UsersIcon,
// //   ShoppingCartIcon,
// //   TruckIcon,
// //   EyeIcon,
// //   CheckCircleIcon,
// //   ClockIcon,
// //   XCircleIcon,
// //   ArrowPathIcon,
// //   ChartBarIcon,
// // } from '@heroicons/react/24/outline';

// // export default function DashboardPage() {
// //   const [stats, setStats] = useState({
// //     totalProducts: 0,
// //     totalOrders: 0,
// //     totalUsers: 0,
// //     totalRevenue: 0
// //   });
// //   const [recentOrders, setRecentOrders] = useState([]);
// //   const [activeDrivers, setActiveDrivers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [selectedTab, setSelectedTab] = useState('overview');

// //   useEffect(() => {
// //     fetchDashboardData();
// //     fetchActiveDrivers();
// //     const interval = setInterval(() => fetchActiveDrivers(), 30000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const fetchDashboardData = async () => {
// //     try {
// //       setLoading(true);
// //       const [statsData, ordersData] = await Promise.all([
// //         getDashboardStats(),
// //         getRecentOrders(10)
// //       ]);
// //       setStats(statsData || { totalProducts: 0, totalOrders: 0, totalUsers: 0, totalRevenue: 0 });
// //       setRecentOrders(Array.isArray(ordersData) ? ordersData : []);
// //     } catch (error) {
// //       console.error('Error fetching dashboard data:', error);
// //       toast.error('Failed to load dashboard data');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// // // In your Dashboard page, update the fetchActiveDrivers function
// // const fetchActiveDrivers = async () => {
// //   try {
// //     console.log('🔄 Fetching active drivers...');
// //     // Use the correct service method that calls /drivers/active
// //     const result = await driverService.getActiveDrivers();
// //     console.log('✅ Driver service result:', result);
    
// //     if (result && result.success && result.data) {
// //       console.log(`📋 Found ${result.data.length} active drivers`);
// //       setActiveDrivers(result.data);
// //     } else {
// //       console.log('⚠️ No active drivers found or invalid response');
// //       setActiveDrivers([]);
// //     }
// //   } catch (error) {
// //     console.error('❌ Error fetching drivers:', error);
// //     setActiveDrivers([]);
// //     toast.error('Failed to load drivers');
// //   }
// // };

// //   const updateOrderStatus = async (orderId, status) => {
// //     try {
// //       await apiClient.put(`/orders/${orderId}/status`, { status });
// //       toast.success(`Order status updated to ${status}`);
// //       await fetchDashboardData();
// //       await fetchActiveDrivers();
// //     } catch (error) {
// //       console.error('Error updating order:', error);
// //       toast.error('Failed to update order status');
// //     }
// //   };

// //   const assignDriver = async (orderId, driverId) => {
// //     if (!driverId) return;
// //     try {
// //       await apiClient.post('/orders/assign', { orderId, driverId });
// //       toast.success(`Driver assigned to order ${orderId}`);
// //       await fetchDashboardData();
// //       await fetchActiveDrivers();
// //     } catch (error) {
// //       console.error('Error assigning driver:', error);
// //       toast.error('Failed to assign driver');
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     const colors = {
// //       pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
// //       confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
// //       accepted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
// //       picked_up: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
// //       in_transit: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
// //       delivered: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
// //       cancelled: 'bg-red-500/20 text-red-400 border-red-500/30'
// //     };
// //     return colors[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
// //   };

// //   const getStatusIcon = (status) => {
// //     switch(status) {
// //       case 'delivered': return <CheckCircleIcon className="w-3 h-3" />;
// //       case 'cancelled': return <XCircleIcon className="w-3 h-3" />;
// //       default: return <ClockIcon className="w-3 h-3" />;
// //     }
// //   };

// //   const statCards = [
// //     { title: 'Total Products', value: stats.totalProducts || 0, icon: ShoppingBagIcon, gradient: 'from-purple-500 to-pink-500' },
// //     { title: 'Total Orders', value: stats.totalOrders || 0, icon: ShoppingCartIcon, gradient: 'from-blue-500 to-cyan-500' },
// //     { title: 'Total Users', value: stats.totalUsers || 0, icon: UsersIcon, gradient: 'from-green-500 to-emerald-500' },
// //     { title: 'Revenue', value: `₹${(stats.totalRevenue || 0).toLocaleString('en-IN')}`, icon: CurrencyRupeeIcon, gradient: 'from-orange-500 to-yellow-500' },
// //   ];

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-[calc(100vh-100px)]">
// //         <div className="text-center">
// //           <div className="relative">
// //             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
// //             <div className="absolute inset-0 flex items-center justify-center">
// //               <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
// //             </div>
// //           </div>
// //           <div className="text-purple-300 text-lg font-medium mt-4">Loading dashboard...</div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6">
// //       {/* Page Header */}
// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
// //           Dashboard Overview
// //         </h1>
// //         <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your store today.</p>
// //       </div>

// //       {/* Tabs */}
// //       <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800">
// //         {[
// //           { id: 'overview', label: '📊 Overview', icon: ChartBarIcon },
// //           { id: 'orders', label: '📦 Orders', icon: ShoppingCartIcon },
// //           { id: 'drivers', label: '🚚 Drivers', icon: TruckIcon },
// //         ].map((tab) => (
// //           <button
// //             key={tab.id}
// //             onClick={() => setSelectedTab(tab.id)}
// //             className={`flex items-center gap-2 px-5 py-2.5 rounded-t-lg font-medium transition-all duration-300 ${
// //               selectedTab === tab.id
// //                 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
// //                 : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
// //             }`}
// //           >
// //             {tab.label}
// //           </button>
// //         ))}
// //       </div>

// //       <AnimatePresence mode="wait">
// //         {/* Overview Tab */}
// //         {selectedTab === 'overview' && (
// //           <motion.div
// //             key="overview"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -20 }}
// //             transition={{ duration: 0.3 }}
// //           >
// //             {/* Stats Grid */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// //               {statCards.map((stat, index) => {
// //                 const Icon = stat.icon;
// //                 return (
// //                   <motion.div
// //                     key={stat.title}
// //                     initial={{ opacity: 0, scale: 0.9 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     transition={{ delay: index * 0.1 }}
// //                     className="relative group"
// //                   >
// //                     <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300`}></div>
// //                     <div className="relative bg-gray-900 rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300">
// //                       <div className="flex items-center justify-between mb-4">
// //                         <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
// //                           <Icon className="w-6 h-6 text-white" />
// //                         </div>
// //                         <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
// //                           {stat.value}
// //                         </div>
// //                       </div>
// //                       <h3 className="text-gray-400 font-medium text-lg">{stat.title}</h3>
// //                       <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
// //                         <div className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full w-2/3`}></div>
// //                       </div>
// //                     </div>
// //                   </motion.div>
// //                 );
// //               })}
// //             </div>

// //             {/* Active Drivers Section */}
// //             <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden mb-8">
// //               <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-3">
// //                     <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
// //                       <TruckIcon className="w-5 h-5 text-green-400" />
// //                     </div>
// //                     <h2 className="text-xl font-semibold text-white">
// //                       Active Drivers 
// //                       <span className="ml-2 text-sm text-green-400">({activeDrivers?.length || 0})</span>
// //                     </h2>
// //                   </div>
// //                   <button
// //                     onClick={fetchActiveDrivers}
// //                     className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
// //                   >
// //                     <ArrowPathIcon className="w-4 h-4" />
// //                     Refresh
// //                   </button>
// //                 </div>
// //               </div>
// //               <div className="p-6">
// //                 {!activeDrivers || activeDrivers.length === 0 ? (
// //                   <div className="text-center py-12">
// //                     <TruckIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
// //                     <p className="text-gray-500">No active drivers at the moment</p>
// //                   </div>
// //                 ) : (
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                     {activeDrivers.map((driver, idx) => (
// //                       <motion.div
// //                         key={driver.id}
// //                         initial={{ opacity: 0, x: -20 }}
// //                         animate={{ opacity: 1, x: 0 }}
// //                         transition={{ delay: idx * 0.05 }}
// //                         className="bg-gray-800/50 rounded-xl border border-gray-700 p-4 hover:border-green-500/30 transition-all duration-300"
// //                       >
// //                         <div className="flex items-center justify-between mb-3">
// //                           <div className="flex items-center gap-3">
// //                             <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
// //                               {driver.name?.charAt(0) || driver.driver_name?.charAt(0) || 'D'}
// //                             </div>
// //                             <div>
// //                               <h3 className="font-bold text-white">{driver.name || driver.driver_name}</h3>
// //                               <p className="text-xs text-gray-500">{driver.vehicle_number}</p>
// //                             </div>
// //                           </div>
// //                           <span className="relative flex h-3 w-3">
// //                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
// //                             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
// //                           </span>
// //                         </div>
// //                         <div className="space-y-1 text-sm">
// //                           <p className="text-gray-400">📞 {driver.phone}</p>
// //                           {driver.current_latitude && driver.current_longitude && (
// //                             <a
// //                               href={`https://www.google.com/maps?q=${driver.current_latitude},${driver.current_longitude}`}
// //                               target="_blank"
// //                               rel="noopener noreferrer"
// //                               className="text-green-400 hover:text-green-300 text-xs flex items-center gap-1 mt-2"
// //                             >
// //                               📍 View Live Location →
// //                             </a>
// //                           )}
// //                         </div>
// //                       </motion.div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Recent Orders Table */}
// //             <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
// //               <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-3">
// //                     <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
// //                       <ShoppingCartIcon className="w-5 h-5 text-blue-400" />
// //                     </div>
// //                     <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
// //                   </div>
// //                   <button
// //                     onClick={fetchDashboardData}
// //                     className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
// //                   >
// //                     <ArrowPathIcon className="w-4 h-4" />
// //                     Refresh
// //                   </button>
// //                 </div>
// //               </div>
              
// //               <div className="overflow-x-auto">
// //                 {recentOrders && recentOrders.length > 0 ? (
// //                   <table className="w-full">
// //                     <thead className="bg-gray-800/50">
// //                       <tr>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order ID</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Driver</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
// //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="divide-y divide-gray-800">
// //                       {recentOrders.map((order) => (
// //                         <tr key={order.id} className="hover:bg-gray-800/30 transition-colors">
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-purple-400">#{order.order_number || order.id}</td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.user_name || 'Guest User'}</td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-white">₹{parseFloat(order.total_amount).toLocaleString('en-IN')}</td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <select
// //                               value={order.status}
// //                               onChange={(e) => updateOrderStatus(order.id, e.target.value)}
// //                               className={`px-2 py-1 text-xs rounded-lg font-medium border ${getStatusColor(order.status)} bg-gray-900/50 cursor-pointer`}
// //                             >
// //                               <option value="pending">Pending</option>
// //                               <option value="confirmed">Confirmed</option>
// //                               <option value="accepted">Accepted</option>
// //                               <option value="picked_up">Picked Up</option>
// //                               <option value="delivered">Delivered</option>
// //                               <option value="cancelled">Cancelled</option>
// //                             </select>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{order.driver_name || 'Not assigned'}</td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <button
// //                               onClick={() => window.location.href = `/orders/${order.id}`}
// //                               className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-sm transition-colors"
// //                             >
// //                               <EyeIcon className="w-4 h-4" />
// //                               View
// //                             </button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 ) : (
// //                   <div className="text-center py-16">
// //                     <ShoppingCartIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
// //                     <h3 className="text-lg font-medium text-white mb-2">No Orders Yet</h3>
// //                     <p className="text-gray-500">Orders will appear here once customers make purchases</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* Orders Tab */}
// //         {selectedTab === 'orders' && (
// //           <motion.div
// //             key="orders"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -20 }}
// //             transition={{ duration: 0.3 }}
// //             className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
// //           >
// //             <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50">
// //               <h2 className="text-xl font-semibold text-white">All Orders</h2>
// //             </div>
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-800/50">
// //                   <tr>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Order ID</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Customer</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Assign Driver</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-800">
// //                   {recentOrders.map((order) => (
// //                     <tr key={order.id} className="hover:bg-gray-800/30">
// //                       <td className="px-6 py-4 font-mono text-sm text-purple-400">#{order.order_number}</td>
// //                       <td className="px-6 py-4 text-gray-300">{order.user_name || 'Guest'}</td>
// //                       <td className="px-6 py-4 font-semibold text-white">₹{Number(order.total_amount).toLocaleString()}</td>
// //                       <td className="px-6 py-4">
// //                         <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(order.status)}`}>
// //                           {getStatusIcon(order.status)}
// //                           {order.status}
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4">
// //                         <select
// //                           onChange={(e) => assignDriver(order.id, e.target.value)}
// //                           className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                           defaultValue=""
// //                         >
// //                           <option value="">Select Driver</option>
// //                           {activeDrivers && activeDrivers.map((driver) => (
// //                             <option key={driver.id} value={driver.id}>{driver.name || driver.driver_name}</option>
// //                           ))}
// //                         </select>
// //                       </td>
// //                       <td className="px-6 py-4 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </motion.div>
// //         )}

// //         {/* Drivers Tab */}
// //         {selectedTab === 'drivers' && (
// //           <motion.div
// //             key="drivers"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -20 }}
// //             transition={{ duration: 0.3 }}
// //             className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
// //           >
// //             <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50">
// //               <div className="flex items-center justify-between">
// //                 <h2 className="text-xl font-semibold text-white">All Drivers</h2>
// //                 <button
// //                   onClick={fetchActiveDrivers}
// //                   className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
// //                 >
// //                   <ArrowPathIcon className="w-4 h-4" />
// //                   Refresh
// //                 </button>
// //               </div>
// //             </div>
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="bg-gray-800/50">
// //                   <tr>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">ID</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Name</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Phone</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Vehicle</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Live Location</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-800">
// //                   {activeDrivers && activeDrivers.map((driver) => (
// //                     <tr key={driver.id} className="hover:bg-gray-800/30">
// //                       <td className="px-6 py-4 text-gray-400">#{driver.id}</td>
// //                       <td className="px-6 py-4 font-medium text-white">{driver.name || driver.driver_name}</td>
// //                       <td className="px-6 py-4 text-gray-300">{driver.phone}</td>
// //                       <td className="px-6 py-4 text-gray-300">{driver.vehicle_number}</td>
// //                       <td className="px-6 py-4">
// //                         <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
// //                           driver.is_available || driver.is_active
// //                             ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
// //                             : 'bg-red-500/20 text-red-400 border border-red-500/30'
// //                         }`}>
// //                           <span className={`w-1.5 h-1.5 rounded-full ${driver.is_available || driver.is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
// //                           {driver.is_available || driver.is_active ? 'Available' : 'Busy'}
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4">
// //                         {driver.current_latitude && driver.current_longitude ? (
// //                           <a
// //                             href={`https://www.google.com/maps?q=${driver.current_latitude},${driver.current_longitude}`}
// //                             target="_blank"
// //                             rel="noopener noreferrer"
// //                             className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
// //                           >
// //                             📍 View on Map →
// //                           </a>
// //                         ) : (
// //                           <span className="text-gray-600 text-sm">No location data</span>
// //                         )}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }
// // web-admin/app/admin/dashboard/page.jsx

// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   ChartBarIcon,
//   CurrencyRupeeIcon,
//   TruckIcon,
//   ShoppingBagIcon,
//   UserGroupIcon,
//   CalendarIcon,
//   ArrowTrendingUpIcon,
//   CheckBadgeIcon
// } from '@heroicons/react/24/outline';

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     summary: {
//       total_earnings: 0,
//       total_deliveries: 0,
//       today_earnings: 0,
//       today_deliveries: 0,
//       week_earnings: 0,
//       week_deliveries: 0,
//       month_earnings: 0,
//       month_deliveries: 0,
//       pending_orders: 0,
//       orders_in_progress: 0
//     },
//     drivers_today: [],
//     all_drivers: []
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//     const interval = setInterval(fetchDashboardData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:5000/api/admin/dashboard/stats', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       if (response.data.success) {
//         setStats(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching dashboard:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (amount) => {
//     return `₹${amount.toLocaleString('en-IN')}`;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-green-100 text-sm">Total Earnings</p>
//               <p className="text-3xl font-bold mt-2">{formatCurrency(stats.summary.total_earnings)}</p>
//               <p className="text-green-100 text-sm mt-1">{stats.summary.total_deliveries} deliveries</p>
//             </div>
//             <CurrencyRupeeIcon className="w-10 h-10 text-green-200" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-blue-100 text-sm">Today's Earnings</p>
//               <p className="text-3xl font-bold mt-2">{formatCurrency(stats.summary.today_earnings)}</p>
//               <p className="text-blue-100 text-sm mt-1">{stats.summary.today_deliveries} deliveries</p>
//             </div>
//             <CalendarIcon className="w-10 h-10 text-blue-200" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-purple-100 text-sm">This Week</p>
//               <p className="text-3xl font-bold mt-2">{formatCurrency(stats.summary.week_earnings)}</p>
//               <p className="text-purple-100 text-sm mt-1">{stats.summary.week_deliveries} deliveries</p>
//             </div>
//             <ChartBarIcon className="w-10 h-10 text-purple-200" />
//           </div>
//         </div>

//         <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
//           <div className="flex justify-between items-start">
//             <div>
//               <p className="text-orange-100 text-sm">This Month</p>
//               <p className="text-3xl font-bold mt-2">{formatCurrency(stats.summary.month_earnings)}</p>
//               <p className="text-orange-100 text-sm mt-1">{stats.summary.month_deliveries} deliveries</p>
//             </div>
//             <ArrowTrendingUpIcon className="w-10 h-10 text-orange-200" />
//           </div>
//         </div>
//       </div>

//       {/* Orders Status */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
//           <div className="flex items-center gap-3 mb-2">
//             <ShoppingBagIcon className="w-6 h-6 text-yellow-600" />
//             <h3 className="font-semibold text-yellow-800">Pending Orders</h3>
//           </div>
//           <p className="text-3xl font-bold text-yellow-700">{stats.summary.pending_orders}</p>
//           <p className="text-sm text-yellow-600 mt-1">Orders waiting for driver assignment</p>
//         </div>

//         <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
//           <div className="flex items-center gap-3 mb-2">
//             <TruckIcon className="w-6 h-6 text-blue-600" />
//             <h3 className="font-semibold text-blue-800">Orders In Progress</h3>
//           </div>
//           <p className="text-3xl font-bold text-blue-700">{stats.summary.orders_in_progress}</p>
//           <p className="text-sm text-blue-600 mt-1">Orders being delivered</p>
//         </div>
//       </div>

//       {/* Drivers Who Worked Today */}
//       <div className="bg-white rounded-xl shadow-sm border mb-8">
//         <div className="px-6 py-4 border-b bg-gray-50 rounded-t-xl">
//           <div className="flex items-center gap-3">
//             <UserGroupIcon className="w-5 h-5 text-green-600" />
//             <h2 className="text-lg font-semibold">Drivers Who Worked Today</h2>
//             <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
//               {stats.drivers_today.length} drivers
//             </span>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deliveries</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Today Earnings</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Delivery</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {stats.drivers_today.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
//                     No deliveries completed today
//                   </td>
//                 </tr>
//               ) : (
//                 stats.drivers_today.map((driver) => (
//                   <tr key={driver.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-900">{driver.name}</div>
//                       <div className="text-sm text-gray-500">{driver.email}</div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{driver.vehicle_number || 'N/A'}</td>
//                     <td className="px-6 py-4">
//                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         {driver.deliveries_count} deliveries
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 font-semibold text-green-600">
//                       {formatCurrency(driver.earnings_today)}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">
//                       {formatDate(driver.last_delivery_time)}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* All Drivers Performance */}
//       <div className="bg-white rounded-xl shadow-sm border">
//         <div className="px-6 py-4 border-b bg-gray-50 rounded-t-xl">
//           <div className="flex items-center gap-3">
//             <TruckIcon className="w-5 h-5 text-purple-600" />
//             <h2 className="text-lg font-semibold">All Drivers Performance</h2>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Deliveries</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Earnings</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Today</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Today Earnings</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {stats.all_drivers.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
//                     No drivers found
//                   </td>
//                 </tr>
//               ) : (
//                 stats.all_drivers.map((driver) => (
//                   <tr key={driver.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">
//                       <div className="font-medium text-gray-900">{driver.name}</div>
//                       <div className="text-sm text-gray-500">{driver.email}</div>
//                     </td>
//                     <td className="px-6 py-4">
//                       {driver.is_available ? (
//                         <span className="inline-flex items-center gap-1 text-green-600 text-sm">
//                           <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//                           Online
//                         </span>
//                       ) : (
//                         <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
//                           <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
//                           Offline
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 font-medium text-gray-900">{driver.total_deliveries}</td>
//                     <td className="px-6 py-4 font-semibold text-purple-600">{formatCurrency(driver.total_earnings)}</td>
//                     <td className="px-6 py-4 text-gray-600">{driver.today_deliveries}</td>
//                     <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(driver.today_earnings)}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChartBarIcon,
  CurrencyRupeeIcon,
  TruckIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  CheckBadgeIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    summary: {
      total_earnings: 0,
      total_deliveries: 0,
      today_earnings: 0,
      today_deliveries: 0,
      week_earnings: 0,
      week_deliveries: 0,
      month_earnings: 0,
      month_deliveries: 0,
      pending_orders: 0,
      orders_in_progress: 0
    },
    drivers_today: [],
    all_drivers: []
  });
  const [loading, setLoading] = useState(true);
  const [expandedDriver, setExpandedDriver] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of your store performance</p>
      </div>

      {/* Summary Cards - Scrollable on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100 text-xs sm:text-sm">Total Earnings</p>
              <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{formatCurrency(stats.summary.total_earnings)}</p>
              <p className="text-green-100 text-xs mt-1">{stats.summary.total_deliveries} deliveries</p>
            </div>
            <CurrencyRupeeIcon className="w-8 h-8 sm:w-10 sm:h-10 text-green-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100 text-xs sm:text-sm">Today's Earnings</p>
              <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{formatCurrency(stats.summary.today_earnings)}</p>
              <p className="text-blue-100 text-xs mt-1">{stats.summary.today_deliveries} deliveries</p>
            </div>
            <CalendarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-blue-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100 text-xs sm:text-sm">This Week</p>
              <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{formatCurrency(stats.summary.week_earnings)}</p>
              <p className="text-purple-100 text-xs mt-1">{stats.summary.week_deliveries} deliveries</p>
            </div>
            <ChartBarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-200 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-4 sm:p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-orange-100 text-xs sm:text-sm">This Month</p>
              <p className="text-xl sm:text-3xl font-bold mt-1 sm:mt-2">{formatCurrency(stats.summary.month_earnings)}</p>
              <p className="text-orange-100 text-xs mt-1">{stats.summary.month_deliveries} deliveries</p>
            </div>
            <ArrowTrendingUpIcon className="w-8 h-8 sm:w-10 sm:h-10 text-orange-200 opacity-80" />
          </div>
        </div>
      </div>

      {/* Orders Status - Mobile stack */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-yellow-50 rounded-xl p-4 sm:p-6 border border-yellow-200">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBagIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            <h3 className="font-semibold text-yellow-800 text-sm sm:text-base">Pending Orders</h3>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-yellow-700">{stats.summary.pending_orders}</p>
          <p className="text-xs text-yellow-600 mt-1">Awaiting driver assignment</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <TruckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h3 className="font-semibold text-blue-800 text-sm sm:text-base">In Progress</h3>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-blue-700">{stats.summary.orders_in_progress}</p>
          <p className="text-xs text-blue-600 mt-1">Orders being delivered</p>
        </div>
      </div>

      {/* Drivers Who Worked Today - Mobile Card View */}
      <div className="bg-white rounded-xl shadow-sm border mb-8">
        <div className="px-4 sm:px-6 py-4 border-b bg-gray-50 rounded-t-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-3">
              <UserGroupIcon className="w-5 h-5 text-green-600" />
              <h2 className="text-base sm:text-lg font-semibold">Drivers Active Today</h2>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full self-start sm:self-center">
              {stats.drivers_today.length} drivers
            </span>
          </div>
        </div>
        
        {/* Mobile Card View */}
        <div className="block md:hidden divide-y divide-gray-100">
          {stats.drivers_today.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No deliveries completed today
            </div>
          ) : (
            stats.drivers_today.map((driver) => (
              <div key={driver.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{driver.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{driver.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {driver.deliveries_count} deliveries
                      </span>
                      <span className="text-xs text-green-600 font-semibold">
                        {formatCurrency(driver.earnings_today)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Last: {formatDate(driver.last_delivery_time)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{driver.vehicle_number || 'No vehicle'}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deliveries</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Today Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Delivery</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.drivers_today.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No deliveries completed today
                  </td>
                </tr>
              ) : (
                stats.drivers_today.map((driver) => (
                  <tr key={driver.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{driver.name}</div>
                      <div className="text-sm text-gray-500">{driver.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{driver.vehicle_number || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {driver.deliveries_count} deliveries
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-green-600">
                      {formatCurrency(driver.earnings_today)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(driver.last_delivery_time)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Drivers Performance - Mobile Card View */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="px-4 sm:px-6 py-4 border-b bg-gray-50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <TruckIcon className="w-5 h-5 text-purple-600" />
            <h2 className="text-base sm:text-lg font-semibold">All Drivers Performance</h2>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block md:hidden divide-y divide-gray-100">
          {stats.all_drivers.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No drivers found
            </div>
          ) : (
            stats.all_drivers.map((driver) => (
              <div key={driver.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-gray-900">{driver.name}</p>
                    <p className="text-xs text-gray-500">{driver.email}</p>
                  </div>
                  {driver.is_available ? (
                    <span className="inline-flex items-center gap-1 text-green-600 text-xs">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Online
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                      <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                      Offline
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Total Deliveries</p>
                    <p className="font-semibold text-gray-900">{driver.total_deliveries}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Total Earnings</p>
                    <p className="font-semibold text-purple-600">{formatCurrency(driver.total_earnings)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Today</p>
                    <p className="text-gray-900">{driver.today_deliveries} deliveries</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Today Earnings</p>
                    <p className="font-semibold text-green-600">{formatCurrency(driver.today_earnings)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Deliveries</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Earnings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Today</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Today Earnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.all_drivers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No drivers found
                  </td>
                </tr>
              ) : (
                stats.all_drivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{driver.name}</div>
                      <div className="text-sm text-gray-500">{driver.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      {driver.is_available ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Online
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-500 text-sm">
                          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                          Offline
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{driver.total_deliveries}</td>
                    <td className="px-6 py-4 font-semibold text-purple-600">{formatCurrency(driver.total_earnings)}</td>
                    <td className="px-6 py-4 text-gray-600">{driver.today_deliveries}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">{formatCurrency(driver.today_earnings)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}