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
  Cog6ToothIcon,
  ChartBarIcon,
  ArrowLeftOnRectangleIcon,
  BellIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyRupeeIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

export const Sidebar = () => {
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
    { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon, gradient: 'from-rose-500 to-purple-500' },
  ];

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-20' : 'w-72'
      } bg-gradient-to-br from-slate-900 via-purple-900/50 to-pink-900/50 text-white min-h-screen flex flex-col transition-all duration-300 fixed left-0 top-0 z-30 border-r border-purple-500/30 backdrop-blur-sm`}
    >
      {/* Logo Section */}
      <div className={`p-5 border-b border-purple-500/30 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!isCollapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50 animate-pulse">
              <SparklesIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              AdminHub
            </span>
          </Link>
        )}
        {isCollapsed && (
          <Link href="/admin/dashboard" className="group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 transition-all duration-300 border border-purple-400/30 hover:border-purple-400/60"
        >
          {isCollapsed ? <ChevronRightIcon className="h-3.5 w-3.5 text-purple-300" /> : <ChevronLeftIcon className="h-3.5 w-3.5 text-purple-300" />}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'A'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-purple-900 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white text-sm">{user?.name || 'Administrator'}</p>
              <p className="text-xs text-purple-300 truncate">{user?.email || 'admin@example.com'}</p>
              <span className="inline-block mt-1 text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full shadow-md">
                Admin
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-purple-500/40`
                      : 'text-purple-300/70 hover:bg-purple-500/20 hover:text-white'
                  }`}
                  title={isCollapsed ? item.name : ''}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-white rounded-r-full shadow-lg"></div>
                  )}
                  <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                  {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                  {isCollapsed && (
                    <div className="absolute left-16 ml-2 px-3 py-1.5 bg-gradient-to-r from-purple-800 to-pink-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg border border-purple-400/30">
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
      <div className="p-4 border-t border-purple-500/30">
        {/* Notifications */}
        {!isCollapsed && (
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-purple-300/70 hover:bg-purple-500/20 hover:text-white transition-all duration-300 mb-2 group">
            <div className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <span className="text-sm">Notifications</span>
            <span className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
              3
            </span>
          </button>
        )}
        
        {/* Collapsed Notifications Indicator */}
        {isCollapsed && (
          <button className="relative flex justify-center py-2 w-full rounded-xl text-purple-300/70 hover:bg-purple-500/20 hover:text-white transition-all duration-300 mb-2 group">
            <div className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="absolute left-16 ml-2 px-3 py-1.5 bg-gradient-to-r from-purple-800 to-pink-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg border border-purple-400/30">
              Notifications (3)
            </div>
          </button>
        )}
        
        {/* Logout */}
        <button
          onClick={logoutUser}
          className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-purple-300/70 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 ${
            isCollapsed ? 'justify-center' : ''
          } group`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
          {isCollapsed && (
            <div className="absolute left-16 ml-2 px-3 py-1.5 bg-gradient-to-r from-red-800 to-pink-800 text-red-300 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg border border-red-400/30">
              Logout
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};