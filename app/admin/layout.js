// app/admin/layout.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ClipboardDocumentListIcon,
  UserGroupIcon,
  TruckIcon,
  ArrowLeftOnRectangleIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
  { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon },
  { name: 'Add Product', href: '/admin/products/new', icon: PlusIcon },
  { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon },
  { name: 'Customers', href: '/admin/customers', icon: UserGroupIcon },
  { name: 'Drivers', href: '/admin/drivers', icon: TruckIcon },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== 'admin' && parsedUser.email !== 'admin@example.com') {
        router.push('/');
      } else {
        setUser(parsedUser);
      }
    } catch (error) {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [isMounted, router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  if (!isMounted || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white flex flex-col">
        <div className="p-6 border-b border-purple-800">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-purple-300 mt-1">{user.name}</p>
          <p className="text-xs text-purple-400">{user.email}</p>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
                  isActive 
                    ? 'bg-purple-600 text-white' 
                    : 'text-purple-200 hover:bg-purple-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-purple-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-purple-200 hover:bg-purple-800 transition"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}