'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  TruckIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyRupeeIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

export const AdminSidebar = () => {
  const pathname = usePathname();
  const { logoutUser, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon, gradient: 'from-purple-500 to-pink-500' },
    { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon, gradient: 'from-blue-500 to-cyan-500' },
    { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon, gradient: 'from-green-500 to-emerald-500' },
    { name: 'Customers', href: '/admin/customers', icon: UserGroupIcon, gradient: 'from-orange-500 to-yellow-500' },
    { name: 'Drivers', href: '/admin/drivers', icon: TruckIcon, gradient: 'from-teal-500 to-cyan-500' },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon, gradient: 'from-red-500 to-pink-500' },
    { name: 'Payments', href: '/admin/payments', icon: CurrencyRupeeIcon, gradient: 'from-indigo-500 to-purple-500' },
    { name: 'Support', href: '/admin/support', icon: ChatBubbleLeftRightIcon, gradient: 'from-yellow-500 to-orange-500' },
    { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon, gradient: 'from-gray-500 to-gray-600' },
  ];

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-20' : 'w-72'
      } bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white min-h-screen flex flex-col transition-all duration-300 fixed left-0 top-0 z-30 border-r border-purple-500/20 shadow-2xl shadow-purple-900/20`}
    >
      {/* Logo Section with Glow */}
      <div className={`p-6 border-b border-purple-500/20 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!isCollapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AdminHub
            </span>
          </Link>
        )}
        {isCollapsed && (
          <Link href="/admin/dashboard" className="group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-purple-500/20 hover:border-purple-500/50"
        >
          {isCollapsed ? <ChevronRightIcon className="h-4 w-4" /> : <ChevronLeftIcon className="h-4 w-4" />}
        </button>
      </div>

      {/* User Info with Gradient Border */}
      {!isCollapsed && (
        <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">{user?.name || 'Administrator'}</p>
              <p className="text-xs text-purple-400">{user?.email || 'admin@example.com'}</p>
              <span className="inline-block mt-1 text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">Admin</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-purple-500/20`
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                  title={isCollapsed ? item.name : ''}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                  )}
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                  {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                  {isCollapsed && (
                    <div className="absolute left-16 ml-2 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg border border-purple-500/20">
                      {item.name}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-purple-500/20">
        {/* Notifications */}
        {!isCollapsed && (
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-gray-400 hover:bg-gray-800/50 hover:text-white transition-all duration-300 mb-2 group">
            <div className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <span className="text-sm">Notifications</span>
            <span className="ml-auto bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full">3</span>
          </button>
        )}
        
        {/* Logout */}
        <button
          onClick={logoutUser}
          className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 ${
            isCollapsed ? 'justify-center' : ''
          } group`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
          {isCollapsed && (
            <div className="absolute left-16 ml-2 px-3 py-1.5 bg-red-500/10 text-red-400 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-red-500/20">
              Logout
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};