// // app/admin/layout.js
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import Link from 'next/link';
// import { 
//   HomeIcon, 
//   ShoppingBagIcon, 
//   ClipboardDocumentListIcon,
//   UserGroupIcon,
//   TruckIcon,
//   ArrowLeftOnRectangleIcon,
//   PlusIcon
// } from '@heroicons/react/24/outline';

// const menuItems = [
//   { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
//   { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon },
//   { name: 'Add Product', href: '/admin/products/new', icon: PlusIcon },
//   { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon },
//   { name: 'Customers', href: '/admin/customers', icon: UserGroupIcon },
//   { name: 'Drivers', href: '/admin/drivers', icon: TruckIcon },
// ];

// export default function AdminLayout({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isMounted, setIsMounted] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!isMounted) return;
    
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (!token || !userData) {
//       router.push('/admin/login');
//       return;
//     }
    
//     try {
//       const parsedUser = JSON.parse(userData);
//       if (parsedUser.role !== 'admin' && parsedUser.email !== 'admin@example.com') {
//         router.push('/');
//       } else {
//         setUser(parsedUser);
//       }
//     } catch (error) {
//       router.push('/admin/login');
//     } finally {
//       setLoading(false);
//     }
//   }, [isMounted, router]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/admin/login');
//   };

//   if (!isMounted || loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white flex flex-col">
//         <div className="p-6 border-b border-purple-800">
//           <h1 className="text-xl font-bold">Admin Panel</h1>
//           <p className="text-sm text-purple-300 mt-1">{user.name}</p>
//           <p className="text-xs text-purple-400">{user.email}</p>
//         </div>
        
//         <nav className="flex-1 px-4 py-6">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const isActive = pathname === item.href;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
//                   isActive 
//                     ? 'bg-purple-600 text-white' 
//                     : 'text-purple-200 hover:bg-purple-800'
//                 }`}
//               >
//                 <Icon className="h-5 w-5" />
//                 <span>{item.name}</span>
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="p-4 border-t border-purple-800">
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-purple-200 hover:bg-purple-800 transition"
//           >
//             <ArrowLeftOnRectangleIcon className="h-5 w-5" />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-auto p-6">
//         {children}
//       </main>
//     </div>
//   );
// }
// app/admin/layout.js

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ClipboardDocumentListIcon,
  UserGroupIcon,
  TruckIcon,
  ArrowLeftOnRectangleIcon,
  PlusIcon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon, gradient: 'from-purple-500 to-pink-500' },
  { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon, gradient: 'from-blue-500 to-cyan-500' },
  { name: 'Add Product', href: '/admin/products/new', icon: PlusIcon, gradient: 'from-green-500 to-emerald-500' },
  { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon, gradient: 'from-orange-500 to-yellow-500' },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon, gradient: 'from-red-500 to-pink-500' },
  { name: 'Customers', href: '/admin/customers', icon: UserGroupIcon, gradient: 'from-teal-500 to-cyan-500' },
  { name: 'Drivers', href: '/admin/drivers', icon: TruckIcon, gradient: 'from-indigo-500 to-purple-500' },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.href === pathname);
    return currentItem?.name || 'Admin Panel';
  };

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <SparklesIcon className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
          </div>
          <p className="text-purple-200 mt-4 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const SidebarContent = () => (
    <>
      {/* Logo Section */}
      <div className={`p-5 border-b border-purple-800/50 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                AdminHub
              </span>
              <p className="text-[10px] text-purple-400">Management Portal</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block p-2 rounded-lg bg-purple-800/30 hover:bg-purple-700/50 transition-all duration-300 border border-purple-500/30"
        >
          {isCollapsed ? (
            <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-4 mx-4 mt-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user.name?.charAt(0) || 'A'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-purple-900"></div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white text-sm">{user.name || 'Administrator'}</p>
              <p className="text-xs text-purple-300 truncate">{user.email || 'admin@example.com'}</p>
              <span className="inline-block mt-1 text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">Super Admin</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                    : 'text-purple-300 hover:bg-purple-800/30 hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : ''}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
                {isCollapsed && (
                  <div className="absolute left-20 ml-2 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-lg border border-purple-500/20">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-purple-800/50">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-purple-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300 ${
            isCollapsed ? 'justify-center' : ''
          } group`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
          {isCollapsed && (
            <div className="absolute left-20 ml-2 px-3 py-1.5 bg-red-500/10 text-red-400 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-red-500/20">
              Logout
            </div>
          )}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-purple-600 text-white p-2.5 rounded-xl shadow-lg shadow-purple-500/30"
      >
        {isMobileMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
      </button>

      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex ${
          isCollapsed ? 'w-20' : 'w-72'
        } bg-gradient-to-b from-gray-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl text-white min-h-screen flex-col fixed left-0 top-0 z-30 border-r border-purple-500/20 shadow-2xl shadow-purple-900/20 transition-all duration-300`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 w-72 h-full bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 text-white z-50 lg:hidden shadow-2xl"
            >
              <div className="h-full overflow-y-auto">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`min-h-screen transition-all duration-300 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-72'} pl-0`}>
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-gray-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-xl border-b border-purple-500/20">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-purple-300 hidden sm:block">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Search Bar - Desktop */}
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-purple-800/30 rounded-xl border border-purple-500/20">
                <MagnifyingGlassIcon className="w-4 h-4 text-purple-300" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-white placeholder-purple-300/50 focus:outline-none w-48"
                />
              </div>
              
              {/* Notification Bell */}
              <button className="relative p-2 rounded-xl bg-purple-800/30 border border-purple-500/20 hover:bg-purple-700/50 transition-colors">
                <BellIcon className="w-5 h-5 text-purple-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Menu - Mobile */}
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{user.name?.charAt(0) || 'A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}