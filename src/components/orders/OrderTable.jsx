'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EyeIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { formatPrice, formatDate } from '@/utils/formatters';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const OrderTable = ({ orders, onSort }) => {
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
    if (onSort) onSort(field, direction);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronUpIcon className="h-4 w-4 opacity-30" />;
    return sortDirection === 'asc' ? 
      <ChevronUpIcon className="h-4 w-4" /> : 
      <ChevronDownIcon className="h-4 w-4" />;
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'info',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'danger',
    };
    return <Badge variant={variants[status] || 'default'}>{status.toUpperCase()}</Badge>;
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <PackageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-4">Start shopping to see your orders here</p>
        <Link href="/products">
          <Button variant="primary">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('createdAt')}
              >
                <div className="flex items-center gap-1">
                  Date
                  <SortIcon field="createdAt" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                onClick={() => handleSort('totalAmount')}
              >
                <div className="flex items-center gap-1">
                  Total
                  <SortIcon field="totalAmount" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    #{order.id.slice(-8)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                  </div>
                  <div className="text-xs text-gray-500">
                    {order.items[0]?.name}
                    {order.items.length > 1 && ` +${order.items.length - 1} more`}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatPrice(order.totalAmount)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 capitalize">
                    {order.paymentMethod}
                  </div>
                  <div className={`text-xs ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {order.paymentStatus}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PackageIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);