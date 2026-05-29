// app/admin/layout.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home,
  ShoppingBag,
  ClipboardList,
  Users,
  Truck,
  LogOut,
  Plus,
  Menu,
  X,
  Sparkles,
  BarChart3,
  Bell,
  Search,
  Settings,
  HelpCircle,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Gauge,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Add Product', href: '/admin/products/new', icon: Plus },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Drivers', href: '/admin/drivers', icon: Truck },
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
    return currentItem?.name || 'Dashboard';
  };

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const SidebarContent = () => (
    <>
      {/* Logo Section - Glass Effect */}
      <div className={`px-4 py-5 ${isCollapsed ? 'flex justify-center' : 'flex justify-between items-center'}`}>
        {!isCollapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-white/40 rounded-lg blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <span className="font-bold text-white drop-shadow-md">AdminHub</span>
              <p className="text-[10px] text-white/70">Management Portal</p>
            </div>
          </Link>
        )}
        {isCollapsed && (
          <Link href="/admin/dashboard" className="group relative">
            <div className="absolute inset-0 bg-white/40 rounded-lg blur-md group-hover:blur-lg transition-all"></div>
            <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block p-1 rounded-md hover:bg-white/20 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white/70" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white/70" />
          )}
        </button>
      </div>

      {/* User Info - Glass Card Effect */}
      {!isCollapsed && (
        <div className="mx-4 mb-4 p-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
                {user.name?.charAt(0) || 'A'}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white/80"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm truncate drop-shadow-sm">{user.name || 'Administrator'}</p>
              <p className="text-xs text-white/70 truncate">{user.email || 'admin@example.com'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation - Glass Effect on Hover */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-r from-white/30 to-white/20 backdrop-blur-sm text-white shadow-lg border border-white/30'
                    : 'text-white/80 hover:bg-white/20 hover:backdrop-blur-sm hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : ''}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-sm"></div>
                )}
                
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : ''}`} />
                
                {!isCollapsed && <span className="drop-shadow-sm">{item.name}</span>}
                
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-white/95 backdrop-blur-md text-gray-800 text-xs rounded-md shadow-xl border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout Button - Glass Effect */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2 w-full rounded-xl text-sm text-white/80 hover:bg-red-500/30 hover:backdrop-blur-sm hover:text-white transition-all duration-300 ${
            isCollapsed ? 'justify-center' : ''
          } group`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span>Logout</span>}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-white/95 backdrop-blur-md text-red-600 text-xs rounded-md shadow-xl border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50">
      {/* Mobile Menu Button - Glass Style */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl bg-white/80 backdrop-blur-md text-blue-600 shadow-lg border border-white/30"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Desktop Sidebar - GLASS MORPHISM EFFECT */}
      <aside 
        className={`hidden lg:flex ${
          isCollapsed ? 'w-16' : 'w-64'
        } bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border-r border-white/30 shadow-2xl flex-col fixed left-0 top-0 h-full z-30 transition-all duration-300`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay - Glass Effect */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 w-64 h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border-r border-white/30 shadow-2xl z-50 lg:hidden"
            >
              <div className="h-full overflow-y-auto">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content - CLEAN, NO GLASS */}
      <main className={`min-h-screen transition-all duration-300 ${isCollapsed ? 'lg:pl-16' : 'lg:pl-64'} pl-0`}>
        {/* Header Bar - Clean White */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="lg:hidden">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">{getPageTitle()}</h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Search - Clean Style */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white shadow-sm">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm focus:outline-none w-48"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-4 w-4 text-gray-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Settings */}
              <button className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="h-4 w-4 text-gray-500" />
              </button>
              
              {/* Help */}
              <button className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <HelpCircle className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}