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
  BellIcon,
  MagnifyingGlassIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon, gradient: 'from-violet-500 to-fuchsia-500', badge: null },
  { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon, gradient: 'from-sky-500 to-blue-500', badge: null },
  { name: 'Add Product', href: '/admin/products/new', icon: PlusIcon, gradient: 'from-emerald-500 to-teal-500', badge: 'New' },
  { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon, gradient: 'from-amber-500 to-orange-500', badge: '12' },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon, gradient: 'from-rose-500 to-pink-500', badge: null },
  { name: 'Customers', href: '/admin/customers', icon: UserGroupIcon, gradient: 'from-cyan-500 to-sky-500', badge: null },
  { name: 'Drivers', href: '/admin/drivers', icon: TruckIcon, gradient: 'from-indigo-500 to-violet-500', badge: 'Live' },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [greeting, setGreeting] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
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
    return currentItem?.name || 'Dashboard';
  };

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-purple-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <SparklesIcon className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
          </div>
          <p className="text-purple-200 text-lg font-medium">Initializing Admin Portal...</p>
          <p className="text-purple-400/60 text-sm mt-2">Loading your dashboard</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const SidebarContent = () => (
    <>
      {/* Premium Logo Section */}
      <div className={`p-6 border-b border-white/10 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                AdminHub
              </span>
              <p className="text-[10px] text-purple-400 tracking-wider">PREMIUM DASHBOARD</p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <SparklesIcon className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
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

      {/* Premium User Card */}
      {!isCollapsed && (
        <div className="mx-4 mt-6 p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-purple-500/30">
                {user.name?.charAt(0) || 'A'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-purple-900"></div>
            </div>
            <div className="flex-1">
              <p className="font-bold text-white">{greeting},</p>
              <p className="font-semibold text-white text-sm">{user.name || 'Administrator'}</p>
              <p className="text-xs text-purple-300 truncate">{user.email || 'admin@example.com'}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 text-purple-200 px-2 py-0.5 rounded-full border border-white/10">Super Admin</span>
                <span className="text-[10px] bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/20">Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats - Only when expanded */}
      {!isCollapsed && (
        <div className="mx-4 mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-center">
              <p className="text-[10px] text-purple-400">Today's Visits</p>
              <p className="text-lg font-bold text-white">1,234</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-purple-400">Conversion</p>
              <p className="text-lg font-bold text-green-400">23.5%</p>
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
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-purple-500/25`
                    : 'text-purple-300 hover:bg-white/10 hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : ''}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r -z-10"
                    style={{ backgroundImage: `linear-gradient(to right, ${item.gradient})` }}
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}
                <Icon className={`h-5 w-5 flex-shrink-0 relative z-10 ${isActive ? 'text-white' : ''}`} />
                {!isCollapsed && <span className="text-sm font-medium relative z-10">{item.name}</span>}
                {!isCollapsed && item.badge && (
                  <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full relative z-10 ${
                    item.badge === 'Live' ? 'bg-red-500 text-white animate-pulse' : 'bg-white/20 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10">
                    {item.name}
                    {item.badge && <span className="ml-2 text-xs text-purple-400">{item.badge}</span>}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Premium Upgrade Banner */}
      {!isCollapsed && (
        <div className="mx-4 mb-4 p-3 rounded-xl bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-8 h-8 text-violet-400" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-white">Enterprise Plan</p>
              <p className="text-[10px] text-purple-300">Premium Support</p>
            </div>
            <button className="text-[10px] bg-white/10 px-2 py-1 rounded-lg text-white">Upgrade</button>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
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
            <div className="absolute left-full ml-2 px-3 py-1.5 bg-red-500/10 text-red-400 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-red-500/20">
              Logout
            </div>
          )}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-5 left-5 z-50 lg:hidden bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white p-3 rounded-xl shadow-xl shadow-purple-500/30"
      >
        {isMobileMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
      </button>

      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex ${
          isCollapsed ? 'w-20' : 'w-80'
        } bg-gradient-to-b from-slate-900/95 via-purple-900/95 to-slate-900/95 backdrop-blur-xl text-white min-h-screen flex-col fixed left-0 top-0 z-30 border-r border-white/10 shadow-2xl transition-all duration-300`}
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
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 w-80 h-full bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white z-50 lg:hidden shadow-2xl"
            >
              <div className="h-full overflow-y-auto">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`min-h-screen transition-all duration-300 ${isCollapsed ? 'lg:pl-20' : 'lg:pl-80'} pl-0`}>
        {/* Premium Header Bar */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <div className="lg:hidden">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    {getPageTitle()}
                  </h1>
                  <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 bg-green-500/20 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-green-300">Live</span>
                  </div>
                </div>
                <p className="text-xs text-purple-300 hidden sm:block">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} • {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Premium Search Bar */}
              <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
                <MagnifyingGlassIcon className="w-4 h-4 text-purple-300" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="bg-transparent text-sm text-white placeholder-purple-300/50 focus:outline-none w-64"
                />
                <kbd className="hidden lg:inline text-[10px] text-purple-400 bg-white/5 px-1.5 py-0.5 rounded">⌘K</kbd>
              </div>
              
              {/* Notification Bell with Badge */}
              <button className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <BellIcon className="w-5 h-5 text-purple-300" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              {/* User Avatar - Mobile */}
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">{user.name?.charAt(0) || 'A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Page Content with Fade Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-4 sm:p-6 lg:p-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}