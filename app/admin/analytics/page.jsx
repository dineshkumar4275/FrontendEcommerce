// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   ArrowTrendingUpIcon,
//   ArrowTrendingDownIcon,
//   CurrencyRupeeIcon,
//   ShoppingBagIcon,
//   UsersIcon,
//   EyeIcon,
//   ArrowDownTrayIcon,
//   CalendarIcon
// } from '@heroicons/react/24/outline';
// import apiClient from '@/lib/apiClient';
// import toast from 'react-hot-toast';

// export default function AnalyticsPage() {
//   const [period, setPeriod] = useState('month');
//   const [loading, setLoading] = useState(true);
//   const [salesData, setSalesData] = useState({
//     totalRevenue: 0,
//     totalOrders: 0,
//     averageOrderValue: 0,
//     topProducts: [],
//     dailySales: [],
//     monthlySales: [],
//     yearlySales: []
//   });

//   useEffect(() => {
//     fetchAnalytics();
//   }, [period]);

//   const fetchAnalytics = async () => {
//     try {
//       setLoading(true);
//       const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      
//       const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
//       const totalOrders = orders.length;
//       const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      
//       const productMap = new Map();
//       orders.forEach(order => {
//         (order.items || order.products || []).forEach(item => {
//           const name = item.name;
//           const quantity = item.quantity || 1;
//           productMap.set(name, (productMap.get(name) || 0) + quantity);
//         });
//       });
      
//       const topProducts = Array.from(productMap.entries())
//         .map(([name, sales]) => ({ name, sales }))
//         .sort((a, b) => b.sales - a.sales)
//         .slice(0, 5);
      
//       const dailySales = [];
//       for (let i = 6; i >= 0; i--) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         const daySales = orders.filter(o => {
//           const orderDate = new Date(o.created_at);
//           return orderDate.toDateString() === date.toDateString();
//         }).reduce((sum, o) => sum + (o.total_amount || 0), 0);
        
//         dailySales.push({
//           date: date.toLocaleDateString('en-IN', { weekday: 'short' }),
//           sales: daySales
//         });
//       }
      
//       setSalesData({
//         totalRevenue,
//         totalOrders,
//         averageOrderValue,
//         topProducts,
//         dailySales,
//         monthlySales: dailySales,
//         yearlySales: dailySales
//       });
      
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//       toast.error('Failed to load analytics');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadReport = () => {
//     const reportData = {
//       generatedAt: new Date().toISOString(),
//       period: period,
//       totalRevenue: salesData.totalRevenue,
//       totalOrders: salesData.totalOrders,
//       averageOrderValue: salesData.averageOrderValue,
//       topProducts: salesData.topProducts,
//       dailySales: salesData.dailySales
//     };
    
//     const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.json`;
//     a.click();
//     URL.revokeObjectURL(url);
//     toast.success('Report downloaded');
//   };

//   const StatCard = ({ title, value, icon: Icon, color, prefix = '' }) => (
//     <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-500 text-sm">{title}</p>
//           <p className="text-2xl font-bold text-gray-800 mt-1">
//             {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
//           </p>
//         </div>
//         <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
//           <Icon className="h-6 w-6 text-white" />
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
//           <p className="text-gray-500 text-sm mt-1">Track your store performance</p>
//         </div>
//         <div className="flex gap-3">
//           <select
//             value={period}
//             onChange={(e) => setPeriod(e.target.value)}
//             className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//           >
//             <option value="week">Last 7 Days</option>
//             <option value="month">Last 30 Days</option>
//             <option value="year">Last 12 Months</option>
//           </select>
//           <button
//             onClick={downloadReport}
//             className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
//           >
//             <ArrowDownTrayIcon className="w-4 h-4" />
//             Download Report
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         <StatCard 
//           title="Total Revenue" 
//           value={salesData.totalRevenue} 
//           icon={CurrencyRupeeIcon} 
//           color="bg-green-500"
//           prefix="₹"
//         />
//         <StatCard 
//           title="Total Orders" 
//           value={salesData.totalOrders} 
//           icon={ShoppingBagIcon} 
//           color="bg-blue-500"
//         />
//         <StatCard 
//           title="Avg Order Value" 
//           value={salesData.averageOrderValue} 
//           icon={ArrowTrendingUpIcon} 
//           color="bg-yellow-500"
//           prefix="₹"
//         />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
//           <div className="space-y-3">
//             {salesData.dailySales.map((day, idx) => (
//               <div key={idx} className="flex items-center gap-3">
//                 <div className="w-20 text-sm text-gray-600">{day.date}</div>
//                 <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
//                     style={{ width: `${Math.min((day.sales / (salesData.totalRevenue || 1)) * 100, 100)}%` }}
//                   />
//                 </div>
//                 <div className="w-24 text-right text-sm font-semibold text-purple-600">
//                   ₹{day.sales.toLocaleString()}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
//           <div className="space-y-3">
//             {salesData.topProducts.map((product, idx) => (
//               <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
//                 <div className="flex items-center gap-3">
//                   <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
//                     {idx + 1}
//                   </span>
//                   <span className="font-medium">{product.name}</span>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <span className="text-sm text-gray-500">{product.sales} sold</span>
//                   <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
//                 </div>
//               </div>
//             ))}
//             {salesData.topProducts.length === 0 && (
//               <p className="text-center text-gray-500 py-8">No sales data available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyRupeeIcon,
  ShoppingBagIcon,
  UsersIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import apiClient from '@/lib/apiClient';
import toast from 'react-hot-toast';

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(true);
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  const [salesData, setSalesData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topProducts: [],
    dailySales: [],
    monthlySales: [],
    yearlySales: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      const totalOrders = orders.length;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      
      const productMap = new Map();
      orders.forEach(order => {
        (order.items || order.products || []).forEach(item => {
          const name = item.name;
          const quantity = item.quantity || 1;
          productMap.set(name, (productMap.get(name) || 0) + quantity);
        });
      });
      
      const topProducts = Array.from(productMap.entries())
        .map(([name, sales]) => ({ name, sales }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5);
      
      const dailySales = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const daySales = orders.filter(o => {
          const orderDate = new Date(o.created_at);
          return orderDate.toDateString() === date.toDateString();
        }).reduce((sum, o) => sum + (o.total_amount || 0), 0);
        
        dailySales.push({
          date: date.toLocaleDateString('en-IN', { weekday: 'short' }),
          sales: daySales
        });
      }
      
      setSalesData({
        totalRevenue,
        totalOrders,
        averageOrderValue,
        topProducts,
        dailySales,
        monthlySales: dailySales,
        yearlySales: dailySales
      });
      
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      period: period,
      totalRevenue: salesData.totalRevenue,
      totalOrders: salesData.totalOrders,
      averageOrderValue: salesData.averageOrderValue,
      topProducts: salesData.topProducts,
      dailySales: salesData.dailySales
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded');
  };

  const StatCard = ({ title, value, icon: Icon, color, prefix = '' }) => (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      </div>
    </div>
  );

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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Track your store performance</p>
        </div>
        <div className="flex gap-3">
          {/* Period Selector - Mobile Friendly */}
          <div className="relative">
            <button
              onClick={() => setShowPeriodMenu(!showPeriodMenu)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span>
                {period === 'week' ? 'Last 7 Days' : period === 'month' ? 'Last 30 Days' : 'Last 12 Months'}
              </span>
              <ChevronRightIcon className="w-4 h-4 transform rotate-90" />
            </button>
            {showPeriodMenu && (
              <div className="absolute top-full right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 min-w-[140px]">
                {['week', 'month', 'year'].map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPeriod(p);
                      setShowPeriodMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                      period === p ? 'bg-purple-50 text-purple-600' : ''
                    }`}
                  >
                    {p === 'week' ? 'Last 7 Days' : p === 'month' ? 'Last 30 Days' : 'Last 12 Months'}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={downloadReport}
            className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Download Report</span>
            <span className="sm:hidden">Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards - Scrollable on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard 
          title="Total Revenue" 
          value={salesData.totalRevenue} 
          icon={CurrencyRupeeIcon} 
          color="bg-green-500"
          prefix="₹"
        />
        <StatCard 
          title="Total Orders" 
          value={salesData.totalOrders} 
          icon={ShoppingBagIcon} 
          color="bg-blue-500"
        />
        <StatCard 
          title="Avg Order Value" 
          value={salesData.averageOrderValue} 
          icon={ArrowTrendingUpIcon} 
          color="bg-yellow-500"
          prefix="₹"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview - Mobile friendly */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Sales Overview</h2>
          <div className="space-y-3">
            {salesData.dailySales.map((day, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <div className="w-20 text-sm text-gray-600">{day.date}</div>
                <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((day.sales / (salesData.totalRevenue || 1)) * 100, 100)}%` }}
                  />
                </div>
                <div className="w-24 text-right text-sm font-semibold text-purple-600">
                  ₹{day.sales.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products - Mobile friendly */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold mb-4">Top Selling Products</h2>
          <div className="space-y-3">
            {salesData.topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-sm sm:text-base truncate max-w-[120px] sm:max-w-[200px]">
                    {product.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs sm:text-sm text-gray-500">{product.sales} sold</span>
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                </div>
              </div>
            ))}
            {salesData.topProducts.length === 0 && (
              <p className="text-center text-gray-500 py-8 text-sm">No sales data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}