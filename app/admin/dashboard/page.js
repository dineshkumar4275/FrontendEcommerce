'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarIcon,
  CurrencyRupeeIcon,
  TruckIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChevronRightIcon,
  BoltIcon,
  SparklesIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon
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
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      fetchDashboardData();
      setLastUpdated(new Date());
    }, 30000);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-500 mt-4 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <SparklesIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome back, Admin</h1>
              <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
                <ClockIcon className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">Last updated: {lastUpdated.toLocaleTimeString()}</span>
              </div>
              <button
                onClick={fetchDashboardData}
                className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <ArrowPathIcon className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
        >
          {/* Total Earnings Card */}
          <motion.div variants={itemVariants} className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-green-100 text-xs font-medium uppercase tracking-wider">Total Earnings</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-2">{formatCurrency(stats.summary.total_earnings)}</p>
                    <p className="text-green-100 text-xs mt-1 flex items-center gap-1">
                      <BoltIcon className="w-3 h-3" />
                      {stats.summary.total_deliveries} deliveries completed
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <CurrencyRupeeIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Today's Earnings Card */}
          <motion.div variants={itemVariants} className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-100 text-xs font-medium uppercase tracking-wider">Today's Earnings</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-2">{formatCurrency(stats.summary.today_earnings)}</p>
                    <p className="text-blue-100 text-xs mt-1 flex items-center gap-1">
                      <BoltIcon className="w-3 h-3" />
                      {stats.summary.today_deliveries} deliveries today
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Week Earnings Card */}
          <motion.div variants={itemVariants} className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-100 text-xs font-medium uppercase tracking-wider">This Week</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-2">{formatCurrency(stats.summary.week_earnings)}</p>
                    <p className="text-purple-100 text-xs mt-1 flex items-center gap-1">
                      <BoltIcon className="w-3 h-3" />
                      {stats.summary.week_deliveries} deliveries this week
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <ChartBarIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Month Earnings Card */}
          <motion.div variants={itemVariants} className="group">
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-orange-100 text-xs font-medium uppercase tracking-wider">This Month</p>
                    <p className="text-2xl sm:text-3xl font-bold mt-2">{formatCurrency(stats.summary.month_earnings)}</p>
                    <p className="text-orange-100 text-xs mt-1 flex items-center gap-1">
                      <BoltIcon className="w-3 h-3" />
                      {stats.summary.month_deliveries} deliveries this month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <ArrowTrendingUpIcon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Orders Status Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8"
        >
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <ShoppingBagIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">Pending Orders</h3>
                  <p className="text-xs text-gray-500">Awaiting driver assignment</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-yellow-600">{stats.summary.pending_orders}</p>
            </div>
            <div className="mt-4 h-2 bg-yellow-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((stats.summary.pending_orders / (stats.summary.pending_orders + stats.summary.orders_in_progress || 1)) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TruckIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">In Progress</h3>
                  <p className="text-xs text-gray-500">Orders being delivered</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-600">{stats.summary.orders_in_progress}</p>
            </div>
            <div className="mt-4 h-2 bg-blue-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((stats.summary.orders_in_progress / (stats.summary.pending_orders + stats.summary.orders_in_progress || 1)) * 100, 100)}%` }}
              />
            </div>
          </div>
        </motion.div>

        {/* Drivers Active Today Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-md">
                    <UserGroupIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-800">Drivers Active Today</h2>
                    <p className="text-xs text-gray-500">Drivers who completed deliveries</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                    {stats.drivers_today.length} Active Drivers
                  </span>
                </div>
              </div>
            </div>
            
            {stats.drivers_today.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TruckIcon className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500">No active drivers at the moment</p>
                <p className="text-xs text-gray-400 mt-1">Drivers will appear here when they start deliveries</p>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block md:hidden divide-y divide-gray-100">
                  {stats.drivers_today.map((driver, idx) => (
                    <motion.div
                      key={driver.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-bold text-lg">
                              {driver.name?.charAt(0) || 'D'}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{driver.name}</p>
                            <p className="text-xs text-gray-500">{driver.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                <BoltIcon className="w-2.5 h-2.5" />
                                {driver.deliveries_count} deliveries
                              </span>
                              <span className="text-xs font-semibold text-green-600">
                                {formatCurrency(driver.earnings_today)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">{driver.vehicle_number || 'No vehicle'}</p>
                          <p className="text-xs text-gray-400 mt-1">Last: {formatDate(driver.last_delivery_time)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Delivery</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {stats.drivers_today.map((driver, idx) => (
                        <motion.tr
                          key={driver.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 font-bold">
                                  {driver.name?.charAt(0) || 'D'}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{driver.name}</p>
                                <p className="text-xs text-gray-500">{driver.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <PhoneIcon className="w-4 h-4 text-gray-400" />
                              {driver.phone || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <p className="font-medium text-gray-700">{driver.vehicle_number || 'N/A'}</p>
                              <p className="text-xs text-gray-500 capitalize">{driver.vehicle_type || 'bike'}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-800">{driver.deliveries_count}</span>
                                <span className="text-xs text-gray-500">deliveries</span>
                                <span className="text-sm font-semibold text-green-600 ml-2">{formatCurrency(driver.earnings_today)}</span>
                              </div>
                              <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                  style={{ width: `${Math.min((driver.deliveries_count / 20) * 100, 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatDate(driver.last_delivery_time)}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* All Drivers Performance Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
                  <TruckIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">All Drivers Performance</h2>
                  <p className="text-xs text-gray-500">Complete driver performance analytics</p>
                </div>
              </div>
            </div>

            {stats.all_drivers.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UserGroupIcon className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500">No drivers found</p>
                <p className="text-xs text-gray-400 mt-1">Add drivers to see performance data</p>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block md:hidden divide-y divide-gray-100">
                  {stats.all_drivers.map((driver, idx) => (
                    <motion.div
                      key={driver.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-bold">
                              {driver.name?.charAt(0) || 'D'}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{driver.name}</p>
                            <p className="text-xs text-gray-500">{driver.email}</p>
                          </div>
                        </div>
                        {driver.is_available ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            Online
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            Offline
                          </span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-500">Total Deliveries</p>
                          <p className="text-lg font-bold text-gray-800">{driver.total_deliveries}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-500">Total Earnings</p>
                          <p className="text-lg font-bold text-purple-600">{formatCurrency(driver.total_earnings)}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-500">Today</p>
                          <p className="text-sm font-semibold text-gray-800">{driver.today_deliveries} deliveries</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-500">Today Earnings</p>
                          <p className="text-sm font-semibold text-green-600">{formatCurrency(driver.today_earnings)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Deliveries</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Earnings</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Today</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Today Earnings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {stats.all_drivers.map((driver, idx) => (
                        <motion.tr
                          key={driver.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedDriver(driver);
                            setShowDriverModal(true);
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 font-bold">
                                  {driver.name?.charAt(0) || 'D'}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">{driver.name}</p>
                                <p className="text-xs text-gray-500">{driver.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <PhoneIcon className="w-4 h-4 text-gray-400" />
                              {driver.phone || 'N/A'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {driver.is_available ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                Online
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                Offline
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-800">{driver.total_deliveries}</span>
                              <span className="text-xs text-gray-400">deliveries</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-purple-600">{formatCurrency(driver.total_earnings)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-600">{driver.today_deliveries}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-green-600">{formatCurrency(driver.today_earnings)}</span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Driver Details Modal */}
      <AnimatePresence>
        {showDriverModal && selectedDriver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDriverModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl font-bold">
                      {selectedDriver.name?.charAt(0) || 'D'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedDriver.name}</h3>
                    <p className="text-purple-100 text-sm">Driver ID: #{selectedDriver.id}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Total Deliveries</p>
                    <p className="text-xl font-bold text-gray-800">{selectedDriver.total_deliveries}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Total Earnings</p>
                    <p className="text-xl font-bold text-purple-600">{formatCurrency(selectedDriver.total_earnings)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Today's Deliveries</p>
                    <p className="text-xl font-bold text-gray-800">{selectedDriver.today_deliveries}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">Today's Earnings</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(selectedDriver.today_earnings)}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3 text-sm">
                    <PhoneIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{selectedDriver.phone || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm mt-2">
                    <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{selectedDriver.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm mt-2">
                    <TruckIcon className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{selectedDriver.vehicle_number || 'No vehicle'}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowDriverModal(false)}
                  className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}