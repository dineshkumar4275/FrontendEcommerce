'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowDownTrayIcon,
  DocumentIcon,
  ChartBarIcon,
  CurrencyRupeeIcon,
  ShoppingBagIcon,
  UsersIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    generateReport();
  }, [reportType, dateRange]);

  const generateReport = async () => {
    setLoading(true);
    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const users = JSON.parse(localStorage.getItem('user_orders') || '[]');
      
      // Filter by date range
      const now = new Date();
      let filteredOrders = orders;
      
      if (dateRange === 'week') {
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        filteredOrders = orders.filter(o => new Date(o.created_at) > weekAgo);
      } else if (dateRange === 'month') {
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        filteredOrders = orders.filter(o => new Date(o.created_at) > monthAgo);
      } else if (dateRange === 'year') {
        const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
        filteredOrders = orders.filter(o => new Date(o.created_at) > yearAgo);
      }
      
      const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
      const totalOrders = filteredOrders.length;
      const totalCustomers = new Set(filteredOrders.map(o => o.user_id || o.user_email)).size;
      
      // Top products
      const productSales = new Map();
      filteredOrders.forEach(order => {
        (order.items || order.products || []).forEach(item => {
          productSales.set(item.name, (productSales.get(item.name) || 0) + (item.quantity || 1));
        });
      });
      
      const topProducts = Array.from(productSales.entries())
        .map(([name, quantity]) => ({ name, quantity }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 10);
      
      // Order status breakdown
      const statusBreakdown = {
        pending: filteredOrders.filter(o => o.status === 'pending').length,
        confirmed: filteredOrders.filter(o => o.status === 'confirmed').length,
        delivered: filteredOrders.filter(o => o.status === 'delivered').length,
        cancelled: filteredOrders.filter(o => o.status === 'cancelled').length
      };
      
      setReportData({
        summary: {
          totalRevenue,
          totalOrders,
          totalCustomers,
          averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0
        },
        topProducts,
        statusBreakdown,
        orders: filteredOrders,
        generatedAt: new Date().toISOString(),
        dateRange,
        reportType
      });
      
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (!reportData) return;
    
    let csvData = [];
    
    if (reportType === 'sales') {
      csvData = [
        ['Report Type', 'Sales Report'],
        ['Generated On', new Date().toLocaleString()],
        ['Date Range', dateRange],
        [],
        ['Metric', 'Value'],
        ['Total Revenue', `₹${reportData.summary.totalRevenue.toLocaleString()}`],
        ['Total Orders', reportData.summary.totalOrders],
        ['Total Customers', reportData.summary.totalCustomers],
        ['Average Order Value', `₹${reportData.summary.averageOrderValue.toLocaleString()}`],
        [],
        ['Order Status Breakdown'],
        ['Status', 'Count'],
        ...Object.entries(reportData.statusBreakdown).map(([status, count]) => [status, count]),
        [],
        ['Top Products'],
        ['Product Name', 'Quantity Sold'],
        ...reportData.topProducts.map(p => [p.name, p.quantity])
      ];
    } else if (reportType === 'orders') {
      csvData = [
        ['Order ID', 'Date', 'Customer', 'Amount', 'Status', 'Payment Method'],
        ...reportData.orders.map(o => [
          o.order_number,
          new Date(o.created_at).toLocaleDateString(),
          o.user_name || 'Guest',
          o.total_amount,
          o.status,
          o.payment_method || 'COD'
        ])
      ];
    }
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportType}_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Report downloaded');
  };

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Generate and download sales reports</p>
        </div>
        <button
          onClick={downloadCSV}
          disabled={!reportData}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Download Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="sales">Sales Report</option>
              <option value="orders">Orders Report</option>
              <option value="products">Products Report</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last 12 Months</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={generateReport}
              disabled={loading}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : reportData ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <StatCard 
              title="Total Revenue" 
              value={`₹${reportData.summary.totalRevenue.toLocaleString()}`} 
              icon={CurrencyRupeeIcon} 
              color="bg-green-500"
            />
            <StatCard 
              title="Total Orders" 
              value={reportData.summary.totalOrders} 
              icon={ShoppingBagIcon} 
              color="bg-blue-500"
            />
            <StatCard 
              title="Total Customers" 
              value={reportData.summary.totalCustomers} 
              icon={UsersIcon} 
              color="bg-purple-500"
            />
            <StatCard 
              title="Avg Order Value" 
              value={`₹${reportData.summary.averageOrderValue.toLocaleString()}`} 
              icon={ChartBarIcon} 
              color="bg-yellow-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Status Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Order Status</h2>
              <div className="space-y-3">
                {Object.entries(reportData.statusBreakdown).map(([status, count]) => (
                  <div key={status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize">{status}</span>
                      <span>{count}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          status === 'delivered' ? 'bg-green-500' :
                          status === 'cancelled' ? 'bg-red-500' :
                          status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${(count / (reportData.summary.totalOrders || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
              <div className="space-y-3">
                {reportData.topProducts.map((product, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-medium">{product.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{product.quantity} sold</span>
                  </div>
                ))}
                {reportData.topProducts.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No sales data available</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Orders Table */}
          {reportData.orders.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
              <div className="px-6 py-4 border-b bg-gray-50">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reportData.orders.slice(0, 10).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">#{order.order_number}</td>
                        <td className="px-4 py-3 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-sm">{order.user_name || 'Guest'}</td>
                        <td className="px-4 py-3 text-sm font-semibold">₹{order.total_amount?.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl">
          <DocumentIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Select report type and click Generate</p>
        </div>
      )}
    </div>
  );
}