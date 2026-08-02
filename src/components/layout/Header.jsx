// // // // src/components/layout/Header.jsx
// // // 'use client';

// // // import React, { useState, useEffect } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { AutoSuggestSearch } from '../products/AutoSuggestSearch';
// // // import Link from 'next/link';
// // // import { usePathname, useRouter } from 'next/navigation';
// // // import {
// // //   ShoppingCartIcon,
// // //   UserIcon,
// // //   Bars3Icon,
// // //   XMarkIcon,
// // //   HeartIcon,
// // //   ChevronDownIcon,
// // //   ArrowRightOnRectangleIcon,
// // //   TruckIcon,
// // //   CubeIcon,
// // //   SparklesIcon,
// // //   FunnelIcon,
// // // } from '@heroicons/react/24/outline';
// // // import { useCart } from '../../hooks/useCart';
// // // import { useWishlist } from '../../hooks/useWishlist';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { logout } from '../../store/slices/authSlice';
// // // import CartSidebar from '../layout/CartSidebar';
// // // import toast from 'react-hot-toast';

// // // export const Header = ({ 
// // //   categories = [], 
// // //   selectedCategory = '', 
// // //   setSelectedCategory = () => {},
// // //   minPrice = '', 
// // //   setMinPrice = () => {},
// // //   maxPrice = '', 
// // //   setMaxPrice = () => {},
// // //   sortBy = 'newest', 
// // //   setSortBy = () => {},
// // //   onSearch = () => {},
// // //   onFilterChange = () => {}
// // // }) => {
// // //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// // //   const [isCartOpen, setIsCartOpen] = useState(false);
// // //   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
// // //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// // //   const [mounted, setMounted] = useState(false);
// // //   const [userName, setUserName] = useState('');
// // //   const [userEmail, setUserEmail] = useState('');
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const [isScrolled, setIsScrolled] = useState(false);
// // //   const [showMobileSearch, setShowMobileSearch] = useState(false);
  
// // //   const [tempCategory, setTempCategory] = useState(selectedCategory);
// // //   const [tempMinPrice, setTempMinPrice] = useState(minPrice);
// // //   const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
// // //   const [tempSortBy, setTempSortBy] = useState(sortBy);

// // //   const pathname = usePathname();
// // //   const router = useRouter();
// // //   const dispatch = useDispatch();
// // //   const { totalQuantity } = useCart();
// // //   const { wishlistCount, getWishlist } = useWishlist();
// // //   const { user, token } = useSelector((state) => state.auth);

// // //   // Load wishlist when logged in
// // //   useEffect(() => {
// // //     if (isLoggedIn) {
// // //       getWishlist();
// // //     }
// // //   }, [isLoggedIn, getWishlist]);

// // //   // Debug log to check wishlist count
// // //   useEffect(() => {
// // //     console.log('Wishlist Count in Header:', wishlistCount);
// // //   }, [wishlistCount]);

// // //   useEffect(() => {
// // //     setMounted(true);
// // //     const handleScroll = () => setIsScrolled(window.scrollY > 20);
// // //     window.addEventListener('scroll', handleScroll);
// // //     return () => window.removeEventListener('scroll', handleScroll);
// // //   }, []);

// // //   useEffect(() => {
// // //     setTempCategory(selectedCategory);
// // //     setTempMinPrice(minPrice);
// // //     setTempMaxPrice(maxPrice);
// // //     setTempSortBy(sortBy);
// // //   }, [selectedCategory, minPrice, maxPrice, sortBy]);

// // //   useEffect(() => {
// // //     const checkAuth = () => {
// // //       const storedToken = localStorage.getItem('token');
// // //       const storedUser = localStorage.getItem('user');
// // //       if (storedToken && storedUser) {
// // //         try {
// // //           const userData = JSON.parse(storedUser);
// // //           setUserName(userData.name || userData.email?.split('@')[0] || 'User');
// // //           setUserEmail(userData.email || '');
// // //           setIsLoggedIn(true);
// // //         } catch (error) { console.error(error); }
// // //       } else if (user && token) {
// // //         setUserName(user.name || user.email?.split('@')[0] || 'User');
// // //         setUserEmail(user.email || '');
// // //         setIsLoggedIn(true);
// // //       } else {
// // //         setIsLoggedIn(false);
// // //         setUserName('');
// // //         setUserEmail('');
// // //       }
// // //     };
// // //     checkAuth();
// // //     const handleStorageChange = () => checkAuth();
// // //     window.addEventListener('storage', handleStorageChange);
// // //     return () => window.removeEventListener('storage', handleStorageChange);
// // //   }, [user, token]);

// // //   const isAdmin = isLoggedIn && (userEmail === 'admin@example.com' || user?.role === 'admin');

// // //   const handleLogout = () => {
// // //     localStorage.removeItem('token');
// // //     localStorage.removeItem('user');
// // //     localStorage.removeItem('cartItems');
// // //     dispatch(logout());
// // //     setIsLoggedIn(false);
// // //     setUserName('');
// // //     setUserEmail('');
// // //     setIsUserMenuOpen(false);
// // //     if (toast && toast.success) {
// // //       toast.success('Logged out successfully');
// // //     }
// // //     router.push('/');
// // //     router.refresh();
// // //   };

// // //   const handleSearchSelect = (searchTerm) => {
// // //     if (searchTerm) {
// // //       onSearch(searchTerm);
// // //       window.dispatchEvent(new CustomEvent('globalSearch', {
// // //         detail: { query: searchTerm }
// // //       }));
// // //     }
// // //   };

// // //   const handleApplyFilters = () => {
// // //     if (setSelectedCategory) setSelectedCategory(tempCategory);
// // //     if (setMinPrice) setMinPrice(tempMinPrice);
// // //     if (setMaxPrice) setMaxPrice(tempMaxPrice);
// // //     if (setSortBy) setSortBy(tempSortBy);
    
// // //     if (onFilterChange) {
// // //       onFilterChange({
// // //         category: tempCategory,
// // //         minPrice: tempMinPrice,
// // //         maxPrice: tempMaxPrice,
// // //         sortBy: tempSortBy
// // //       });
// // //     }
    
// // //     window.dispatchEvent(new CustomEvent('filterChange', {
// // //       detail: {
// // //         category: tempCategory,
// // //         minPrice: tempMinPrice,
// // //         maxPrice: tempMaxPrice,
// // //         sortBy: tempSortBy
// // //       }
// // //     }));
    
// // //     setIsFilterOpen(false);
// // //     if (toast && toast.success) {
// // //       toast.success('Filters applied');
// // //     }
// // //   };

// // //   const handleClearFilters = () => {
// // //     setTempCategory('');
// // //     setTempMinPrice('');
// // //     setTempMaxPrice('');
// // //     setTempSortBy('newest');
    
// // //     if (setSelectedCategory) setSelectedCategory('');
// // //     if (setMinPrice) setMinPrice('');
// // //     if (setMaxPrice) setMaxPrice('');
// // //     if (setSortBy) setSortBy('newest');
    
// // //     if (onFilterChange) {
// // //       onFilterChange({
// // //         category: '',
// // //         minPrice: '',
// // //         maxPrice: '',
// // //         sortBy: 'newest'
// // //       });
// // //     }
    
// // //     window.dispatchEvent(new CustomEvent('filterChange', {
// // //       detail: {
// // //         category: '',
// // //         minPrice: '',
// // //         maxPrice: '',
// // //         sortBy: 'newest'
// // //       }
// // //     }));
    
// // //     setIsFilterOpen(false);
// // //     if (toast && toast.success) {
// // //       toast.success('All filters cleared');
// // //     }
// // //   };

// // //   const hasActiveFilters = selectedCategory || minPrice || maxPrice || sortBy !== 'newest';
// // //   const activeFilterCount = (selectedCategory ? 1 : 0) + (minPrice || maxPrice ? 1 : 0) + (sortBy !== 'newest' ? 1 : 0);

// // //   const navLinks = [
// // //     { name: 'Home', href: '/', icon: SparklesIcon },
// // //     { name: 'Products', href: '/products', icon: CubeIcon },
// // //     { name: 'Orders', href: '/orders', icon: TruckIcon },
// // //     { name: 'Track Order', href: '/track', icon: TruckIcon },
// // //   ];

// // //   if (!mounted) {
// // //     return (
// // //       <>
// // //         <header className="fixed top-0 w-full z-40 bg-slate-900 border-b border-purple-500/20">
// // //           <nav className="container mx-auto px-4 py-4">
// // //             <div className="flex justify-between items-center">
// // //               <div className="w-10 h-10 bg-purple-500/20 rounded-xl animate-pulse" />
// // //               <div className="flex items-center gap-3">
// // //                 <div className="w-8 h-8 bg-purple-500/10 rounded-xl animate-pulse" />
// // //                 <div className="w-8 h-8 bg-purple-500/10 rounded-xl animate-pulse" />
// // //                 <div className="w-20 h-10 bg-purple-500/20 rounded-xl animate-pulse" />
// // //               </div>
// // //             </div>
// // //           </nav>
// // //         </header>
// // //         <div className="h-20"></div>
// // //       </>
// // //     );
// // //   }

// // //   return (
// // //     <>
// // //       <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${
// // //         isScrolled 
// // //           ? 'bg-slate-900 shadow-lg shadow-purple-900/30 border-b border-purple-500/30' 
// // //           : 'bg-slate-900 border-b border-purple-500/20'
// // //       }`}>
// // //         <nav className="container mx-auto px-4 py-3">
// // //           <div className="flex justify-between items-center gap-4">
// // //             {/* Logo */}
// // //             <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
// // //               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
// // //                 <SparklesIcon className="w-5 h-5 text-white" />
// // //               </div>
// // //               <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent hidden sm:block">
// // //                 ShopHub
// // //               </span>
// // //             </Link>

// // //             {/* Search Bar - Desktop */}
// // //             <div className="hidden md:flex flex-1 max-w-2xl">
// // //               <AutoSuggestSearch 
// // //                 placeholder="Search for products, brands, and categories..."
// // //                 onSelect={handleSearchSelect}
// // //               />
// // //             </div>

// // //             {/* Desktop Navigation */}
// // //             <div className="hidden lg:flex items-center gap-1">
// // //               {navLinks.map((link) => (
// // //                 <Link
// // //                   key={link.href}
// // //                   href={link.href}
// // //                   className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
// // //                     pathname === link.href
// // //                       ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-200 shadow-sm border border-purple-500/20'
// // //                       : 'text-purple-300/70 hover:bg-purple-500/10 hover:text-purple-200'
// // //                   }`}
// // //                 >
// // //                   <link.icon className="w-4 h-4" />
// // //                   {link.name}
// // //                 </Link>
// // //               ))}
// // //             </div>

// // //             {/* Desktop Icons */}
// // //             <div className="flex items-center gap-1 sm:gap-2">
// // //               {/* Mobile Search Icon */}
// // //               <button 
// // //                 onClick={() => setShowMobileSearch(!showMobileSearch)}
// // //                 className="md:hidden p-2 hover:bg-purple-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-purple-200"
// // //               >
// // //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// // //                 </svg>
// // //               </button>

// // //               {/* ✅ WISHLIST HEART WITH NUMBER ON TOP */}
// // //               <Link 
// // //                 href="/wishlist" 
// // //                 className="relative p-2 hover:bg-pink-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-pink-300"
// // //                 aria-label="Wishlist"
// // //               >
// // //                 <HeartIcon className="w-5 h-5" />
// // //                 {wishlistCount > 0 && (
// // //                   <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg z-10">
// // //                     {wishlistCount > 99 ? '99+' : wishlistCount}
// // //                   </div>
// // //                 )}
// // //               </Link>

// // //               {/* Admin Icon */}
// // //               {isAdmin && (
// // //                 <Link
// // //                   href="/admin/dashboard"
// // //                   className="relative p-2 hover:bg-green-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-green-400"
// // //                   title="Admin Dashboard"
// // //                 >
// // //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// // //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // //                   </svg>
// // //                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
// // //                 </Link>
// // //               )}

// // //               {/* Cart Button */}
// // //               <button
// // //                 onClick={() => setIsCartOpen(true)}
// // //                 className="relative p-2 hover:bg-fuchsia-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-fuchsia-300"
// // //               >
// // //                 <ShoppingCartIcon className="w-5 h-5" />
// // //                 {totalQuantity > 0 && (
// // //                   <span className="absolute -top-1 -right-1 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg">
// // //                     {totalQuantity > 99 ? '99+' : totalQuantity}
// // //                   </span>
// // //                 )}
// // //               </button>

// // //               {/* Login/User Button */}
// // //               {isLoggedIn ? (
// // //                 <div className="relative">
// // //                   <button
// // //                     onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
// // //                     className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-purple-500/10 rounded-lg transition-all duration-300"
// // //                   >
// // //                     <div className="relative">
// // //                       <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
// // //                         {userName.charAt(0).toUpperCase()}
// // //                       </div>
// // //                       {isAdmin && (
// // //                         <span className="absolute -top-1 -right-1 text-xs">👑</span>
// // //                       )}
// // //                     </div>
// // //                     <span className="text-purple-200 font-semibold text-sm hidden sm:block">{userName}</span>
// // //                     <ChevronDownIcon className={`w-4 h-4 text-purple-400/60 transition-transform hidden sm:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
// // //                   </button>

// // //                   {isUserMenuOpen && (
// // //                     <>
// // //                       <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
// // //                       <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-2xl shadow-2xl border border-purple-500/30 z-50 overflow-hidden">
// // //                         <div className="px-4 py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-b border-purple-500/30">
// // //                           <div className="flex items-center gap-3">
// // //                             <div className="relative">
// // //                               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold">
// // //                                 {userName.charAt(0).toUpperCase()}
// // //                               </div>
// // //                               {isAdmin && (
// // //                                 <span className="absolute -top-1 -right-1 text-xs">👑</span>
// // //                               )}
// // //                             </div>
// // //                             <div>
// // //                               <p className="text-sm font-bold text-purple-100">{userName}</p>
// // //                               <p className="text-xs text-purple-400">{userEmail}</p>
// // //                               {isAdmin && (
// // //                                 <span className="text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded mt-1 inline-block">
// // //                                   Administrator
// // //                                 </span>
// // //                               )}
// // //                             </div>
// // //                           </div>
// // //                         </div>
// // //                         <div className="py-2">
// // //                           {[
// // //                             { href: '/profile', icon: UserIcon, label: 'Your Profile' },
// // //                             { href: '/orders', icon: TruckIcon, label: 'Your Orders' },
// // //                             { href: '/track', icon: TruckIcon, label: 'Track Order' },
// // //                             { href: '/wishlist', icon: HeartIcon, label: 'Wishlist' },
// // //                           ].map((item) => (
// // //                             <Link
// // //                               key={item.href}
// // //                               href={item.href}
// // //                               onClick={() => setIsUserMenuOpen(false)}
// // //                               className="flex items-center gap-3 px-4 py-2 text-purple-300/80 hover:bg-purple-500/10 hover:text-purple-200 transition-all text-sm"
// // //                             >
// // //                               <item.icon className="w-4 h-4" />
// // //                               {item.label}
// // //                             </Link>
// // //                           ))}
                          
// // //                           {isAdmin && (
// // //                             <>
// // //                               <div className="border-t border-purple-500/20 my-1" />
// // //                               <Link
// // //                                 href="/admin/dashboard"
// // //                                 onClick={() => setIsUserMenuOpen(false)}
// // //                                 className="flex items-center gap-3 px-4 py-2 text-green-400 hover:bg-green-500/10 hover:text-green-300 transition-all text-sm"
// // //                               >
// // //                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// // //                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // //                                 </svg>
// // //                                 Admin Dashboard
// // //                                 <span className="ml-auto text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">Admin</span>
// // //                               </Link>
// // //                             </>
// // //                           )}
                          
// // //                           <div className="border-t border-purple-500/20 my-1" />
// // //                           <button
// // //                             onClick={handleLogout}
// // //                             className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 transition-all text-sm"
// // //                           >
// // //                             <ArrowRightOnRectangleIcon className="w-4 h-4" />
// // //                             Sign Out
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                     </>
// // //                   )}
// // //                 </div>
// // //               ) : (
// // //                 <Link href="/login" className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-lg shadow-purple-500/25 flex items-center gap-1 sm:gap-2">
// // //                   <UserIcon className="w-4 h-4" />
// // //                   <span className="hidden xs:inline text-sm">Login</span>
// // //                 </Link>
// // //               )}

// // //               {/* Mobile Menu Button */}
// // //               <button 
// // //                 onClick={() => setIsMenuOpen(!isMenuOpen)} 
// // //                 className="lg:hidden p-2 hover:bg-purple-500/10 rounded-lg transition"
// // //               >
// // //                 {isMenuOpen ? <XMarkIcon className="h-5 w-5 text-purple-300" /> : <Bars3Icon className="h-5 w-5 text-purple-300" />}
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* Mobile Search Bar */}
// // //           <AnimatePresence>
// // //             {showMobileSearch && (
// // //               <motion.div
// // //                 initial={{ opacity: 0, height: 0 }}
// // //                 animate={{ opacity: 1, height: 'auto' }}
// // //                 exit={{ opacity: 0, height: 0 }}
// // //                 className="md:hidden mt-3 pt-3 border-t border-purple-500/20"
// // //               >
// // //                 <AutoSuggestSearch 
// // //                   placeholder="Search products..."
// // //                   onSelect={(searchTerm) => {
// // //                     handleSearchSelect(searchTerm);
// // //                     setShowMobileSearch(false);
// // //                   }}
// // //                 />
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>

// // //           {/* Mobile Navigation Menu */}
// // //           <AnimatePresence>
// // //             {isMenuOpen && (
// // //               <motion.div
// // //                 initial={{ opacity: 0, height: 0 }}
// // //                 animate={{ opacity: 1, height: 'auto' }}
// // //                 exit={{ opacity: 0, height: 0 }}
// // //                 className="lg:hidden mt-4 pt-4 border-t border-purple-500/20 space-y-1 overflow-hidden"
// // //               >
// // //                 {navLinks.map((link) => (
// // //                   <Link
// // //                     key={link.href}
// // //                     href={link.href}
// // //                     onClick={() => setIsMenuOpen(false)}
// // //                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
// // //                       pathname === link.href
// // //                         ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-200 border border-purple-500/20'
// // //                         : 'text-purple-300/70 hover:bg-purple-500/10'
// // //                     }`}
// // //                   >
// // //                     <link.icon className="w-5 h-5" />
// // //                     {link.name}
// // //                   </Link>
// // //                 ))}

// // //                 {isAdmin && (
// // //                   <Link 
// // //                     href="/admin/dashboard" 
// // //                     onClick={() => setIsMenuOpen(false)}
// // //                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-green-500/10 hover:text-green-300 transition-all font-medium"
// // //                   >
// // //                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// // //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// // //                     </svg>
// // //                     Admin Panel
// // //                     <span className="ml-auto text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">Admin</span>
// // //                   </Link>
// // //                 )}

// // //                 <button
// // //                   onClick={() => {
// // //                     setIsMenuOpen(false);
// // //                     setIsFilterOpen(true);
// // //                   }}
// // //                   className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-purple-500/10 transition-all font-medium w-full"
// // //                 >
// // //                   <FunnelIcon className="w-5 h-5" />
// // //                   Filters
// // //                   {hasActiveFilters && (
// // //                     <span className="bg-purple-500 text-white text-xs font-bold rounded-full px-2 ml-auto">
// // //                       {activeFilterCount}
// // //                     </span>
// // //                   )}
// // //                 </button>

// // //                 <Link 
// // //                   href="/wishlist" 
// // //                   onClick={() => setIsMenuOpen(false)} 
// // //                   className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-pink-500/10 hover:text-pink-300 transition-all font-medium"
// // //                 >
// // //                   <HeartIcon className="w-5 h-5" />
// // //                   Wishlist
// // //                   {wishlistCount > 0 && (
// // //                     <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-auto">
// // //                       {wishlistCount}
// // //                     </span>
// // //                   )}
// // //                 </Link>

// // //                 <div className="pt-3 border-t border-purple-500/20 mt-3">
// // //                   {!isLoggedIn && (
// // //                     <Link 
// // //                       href="/login" 
// // //                       onClick={() => setIsMenuOpen(false)} 
// // //                       className="block w-full text-center py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/25"
// // //                     >
// // //                       Login
// // //                     </Link>
// // //                   )}
// // //                 </div>
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>
// // //         </nav>
// // //       </header>

// // //       {/* Filter Drawer */}
// // //       <AnimatePresence>
// // //         {isFilterOpen && (
// // //           <>
// // //             <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsFilterOpen(false)} />
// // //             <motion.div
// // //               initial={{ x: '100%' }}
// // //               animate={{ x: 0 }}
// // //               exit={{ x: '100%' }}
// // //               transition={{ type: 'spring', damping: 30 }}
// // //               className="fixed right-0 top-0 h-full w-full max-w-[85%] sm:max-w-md bg-slate-900 shadow-2xl z-50 flex flex-col"
// // //             >
// // //               <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20">
// // //                 <h2 className="text-base sm:text-xl font-bold text-purple-100">Filters</h2>
// // //                 <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-purple-500/10 rounded-xl transition">
// // //                   <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
// // //                 </button>
// // //               </div>

// // //               <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
// // //                 {categories.length > 0 && (
// // //                   <div>
// // //                     <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 sm:mb-3">Categories</h3>
// // //                     <div className="space-y-1.5 sm:space-y-2">
// // //                       <button
// // //                         onClick={() => setTempCategory('')}
// // //                         className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition text-xs sm:text-sm ${tempCategory === '' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-purple-500/20'}`}
// // //                       >
// // //                         All Categories
// // //                       </button>
// // //                       {categories.map((cat) => (
// // //                         <button
// // //                           key={cat}
// // //                           onClick={() => setTempCategory(cat)}
// // //                           className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition capitalize text-xs sm:text-sm ${tempCategory === cat ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-purple-500/20'}`}
// // //                         >
// // //                           {cat}
// // //                         </button>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 <div>
// // //                   <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 sm:mb-3">Price Range (₹)</h3>
// // //                   <div className="flex gap-2 sm:gap-3">
// // //                     <input
// // //                       type="number"
// // //                       placeholder="Min Price"
// // //                       value={tempMinPrice}
// // //                       onChange={(e) => setTempMinPrice(e.target.value)}
// // //                       className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-purple-100 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
// // //                     />
// // //                     <input
// // //                       type="number"
// // //                       placeholder="Max Price"
// // //                       value={tempMaxPrice}
// // //                       onChange={(e) => setTempMaxPrice(e.target.value)}
// // //                       className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-purple-100 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
// // //                     />
// // //                   </div>
// // //                 </div>

// // //                 <div>
// // //                   <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 sm:mb-3">Sort By</h3>
// // //                   <div className="space-y-1.5 sm:space-y-2">
// // //                     {[
// // //                       { value: 'newest', label: 'Newest First' },
// // //                       { value: 'price_low', label: 'Price: Low to High' },
// // //                       { value: 'price_high', label: 'Price: High to Low' },
// // //                       { value: 'name_asc', label: 'Name: A to Z' },
// // //                     ].map((option) => (
// // //                       <button
// // //                         key={option.value}
// // //                         onClick={() => setTempSortBy(option.value)}
// // //                         className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition text-xs sm:text-sm ${tempSortBy === option.value ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-purple-500/20'}`}
// // //                       >
// // //                         {option.label}
// // //                       </button>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="border-t border-purple-500/30 p-4 sm:p-6 space-y-2 sm:space-y-3">
// // //                 <button
// // //                   onClick={handleApplyFilters}
// // //                   className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg transition"
// // //                 >
// // //                   Apply Filters
// // //                 </button>
// // //                 {(tempCategory || tempMinPrice || tempMaxPrice || tempSortBy !== 'newest') && (
// // //                   <button
// // //                     onClick={handleClearFilters}
// // //                     className="w-full bg-slate-800 text-purple-300 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-slate-700 transition"
// // //                   >
// // //                     Clear All Filters
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </motion.div>
// // //           </>
// // //         )}
// // //       </AnimatePresence>

// // //       {/* Cart Sidebar */}
// // //       <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

// // //       <div className="h-20"></div>
// // //     </>
// // //   );
// // // };
// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { AutoSuggestSearch } from '../products/AutoSuggestSearch';
// // import Link from 'next/link';
// // import { usePathname, useRouter } from 'next/navigation';
// // import {
// //   ShoppingCartIcon,
// //   UserIcon,
// //   Bars3Icon,
// //   XMarkIcon,
// //   HeartIcon,
// //   ChevronDownIcon,
// //   ArrowRightOnRectangleIcon,
// //   TruckIcon,
// //   CubeIcon,
// //   SparklesIcon,
// //   FunnelIcon,
// //   GlobeAltIcon,
// // } from '@heroicons/react/24/outline';
// // import { useCart } from '../../hooks/useCart';
// // import { useWishlist } from '../../hooks/useWishlist';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { logout } from '../../store/slices/authSlice';
// // import CartSidebar from '../layout/CartSidebar';
// // import GlobalSelector from '../GlobalSelector';
// // import { useApp } from '../../hooks/useApp';
// // import toast from 'react-hot-toast';

// // export const Header = ({ 
// //   categories = [], 
// //   selectedCategory = '', 
// //   setSelectedCategory = () => {},
// //   minPrice = '', 
// //   setMinPrice = () => {},
// //   maxPrice = '', 
// //   setMaxPrice = () => {},
// //   sortBy = 'newest', 
// //   setSortBy = () => {},
// //   onSearch = () => {},
// //   onFilterChange = () => {}
// // }) => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [isCartOpen, setIsCartOpen] = useState(false);
// //   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
// //   const [isFilterOpen, setIsFilterOpen] = useState(false);
// //   const [mounted, setMounted] = useState(false);
// //   const [userName, setUserName] = useState('');
// //   const [userEmail, setUserEmail] = useState('');
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const [isScrolled, setIsScrolled] = useState(false);
// //   const [showMobileSearch, setShowMobileSearch] = useState(false);
  
// //   const [tempCategory, setTempCategory] = useState(selectedCategory);
// //   const [tempMinPrice, setTempMinPrice] = useState(minPrice);
// //   const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
// //   const [tempSortBy, setTempSortBy] = useState(sortBy);

// //   const pathname = usePathname();
// //   const router = useRouter();
// //   const dispatch = useDispatch();
// //   const { totalQuantity } = useCart();
// //   const { wishlistCount, getWishlist } = useWishlist();
// //   const { user, token } = useSelector((state) => state.auth);
// //   const { t, formatPrice } = useApp(); // ✅ Using useApp for translations

// //   // Load wishlist when logged in
// //   useEffect(() => {
// //     if (isLoggedIn) {
// //       getWishlist();
// //     }
// //   }, [isLoggedIn, getWishlist]);

// //   useEffect(() => {
// //     setMounted(true);
// //     const handleScroll = () => setIsScrolled(window.scrollY > 20);
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   useEffect(() => {
// //     setTempCategory(selectedCategory);
// //     setTempMinPrice(minPrice);
// //     setTempMaxPrice(maxPrice);
// //     setTempSortBy(sortBy);
// //   }, [selectedCategory, minPrice, maxPrice, sortBy]);

// //   useEffect(() => {
// //     const checkAuth = () => {
// //       const storedToken = localStorage.getItem('token');
// //       const storedUser = localStorage.getItem('user');
// //       if (storedToken && storedUser) {
// //         try {
// //           const userData = JSON.parse(storedUser);
// //           setUserName(userData.name || userData.email?.split('@')[0] || 'User');
// //           setUserEmail(userData.email || '');
// //           setIsLoggedIn(true);
// //         } catch (error) { console.error(error); }
// //       } else if (user && token) {
// //         setUserName(user.name || user.email?.split('@')[0] || 'User');
// //         setUserEmail(user.email || '');
// //         setIsLoggedIn(true);
// //       } else {
// //         setIsLoggedIn(false);
// //         setUserName('');
// //         setUserEmail('');
// //       }
// //     };
// //     checkAuth();
// //     const handleStorageChange = () => checkAuth();
// //     window.addEventListener('storage', handleStorageChange);
// //     return () => window.removeEventListener('storage', handleStorageChange);
// //   }, [user, token]);

// //   const isAdmin = isLoggedIn && (userEmail === 'admin@example.com' || user?.role === 'admin');

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     localStorage.removeItem('user');
// //     localStorage.removeItem('cartItems');
// //     dispatch(logout());
// //     setIsLoggedIn(false);
// //     setUserName('');
// //     setUserEmail('');
// //     setIsUserMenuOpen(false);
// //     if (toast && toast.success) {
// //       toast.success('Logged out successfully');
// //     }
// //     router.push('/');
// //     router.refresh();
// //   };

// //   const handleSearchSelect = (searchTerm) => {
// //     if (searchTerm) {
// //       onSearch(searchTerm);
// //       window.dispatchEvent(new CustomEvent('globalSearch', {
// //         detail: { query: searchTerm }
// //       }));
// //     }
// //   };

// //   const handleApplyFilters = () => {
// //     if (setSelectedCategory) setSelectedCategory(tempCategory);
// //     if (setMinPrice) setMinPrice(tempMinPrice);
// //     if (setMaxPrice) setMaxPrice(tempMaxPrice);
// //     if (setSortBy) setSortBy(tempSortBy);
    
// //     if (onFilterChange) {
// //       onFilterChange({
// //         category: tempCategory,
// //         minPrice: tempMinPrice,
// //         maxPrice: tempMaxPrice,
// //         sortBy: tempSortBy
// //       });
// //     }
    
// //     window.dispatchEvent(new CustomEvent('filterChange', {
// //       detail: {
// //         category: tempCategory,
// //         minPrice: tempMinPrice,
// //         maxPrice: tempMaxPrice,
// //         sortBy: tempSortBy
// //       }
// //     }));
    
// //     setIsFilterOpen(false);
// //     if (toast && toast.success) {
// //       toast.success('Filters applied');
// //     }
// //   };

// //   const handleClearFilters = () => {
// //     setTempCategory('');
// //     setTempMinPrice('');
// //     setTempMaxPrice('');
// //     setTempSortBy('newest');
    
// //     if (setSelectedCategory) setSelectedCategory('');
// //     if (setMinPrice) setMinPrice('');
// //     if (setMaxPrice) setMaxPrice('');
// //     if (setSortBy) setSortBy('newest');
    
// //     if (onFilterChange) {
// //       onFilterChange({
// //         category: '',
// //         minPrice: '',
// //         maxPrice: '',
// //         sortBy: 'newest'
// //       });
// //     }
    
// //     window.dispatchEvent(new CustomEvent('filterChange', {
// //       detail: {
// //         category: '',
// //         minPrice: '',
// //         maxPrice: '',
// //         sortBy: 'newest'
// //       }
// //     }));
    
// //     setIsFilterOpen(false);
// //     if (toast && toast.success) {
// //       toast.success('All filters cleared');
// //     }
// //   };

// //   const hasActiveFilters = selectedCategory || minPrice || maxPrice || sortBy !== 'newest';
// //   const activeFilterCount = (selectedCategory ? 1 : 0) + (minPrice || maxPrice ? 1 : 0) + (sortBy !== 'newest' ? 1 : 0);

// //   const navLinks = [
// //     { name: 'home', href: '/', icon: SparklesIcon },
// //     { name: 'products', href: '/products', icon: CubeIcon },
// //     { name: 'orders', href: '/orders', icon: TruckIcon },
// //     { name: 'track', href: '/track', icon: TruckIcon },
// //   ];

// //   if (!mounted) {
// //     return (
// //       <>
// //         <header className="fixed top-0 w-full z-40 bg-slate-900 border-b border-purple-500/20">
// //           <nav className="container mx-auto px-4 py-4">
// //             <div className="flex justify-between items-center">
// //               <div className="w-10 h-10 bg-purple-500/20 rounded-xl animate-pulse" />
// //               <div className="flex items-center gap-3">
// //                 <div className="w-8 h-8 bg-purple-500/10 rounded-xl animate-pulse" />
// //                 <div className="w-8 h-8 bg-purple-500/10 rounded-xl animate-pulse" />
// //                 <div className="w-20 h-10 bg-purple-500/20 rounded-xl animate-pulse" />
// //               </div>
// //             </div>
// //           </nav>
// //         </header>
// //         <div className="h-20"></div>
// //       </>
// //     );
// //   }

// //   return (
// //     <>
// //       <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${
// //         isScrolled 
// //           ? 'bg-slate-900 shadow-lg shadow-purple-900/30 border-b border-purple-500/30' 
// //           : 'bg-slate-900 border-b border-purple-500/20'
// //       }`}>
// //         <nav className="container mx-auto px-4 py-3">
// //           <div className="flex justify-between items-center gap-4">
// //             {/* Logo */}
// //             <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
// //              <img 
// //         src="/favicon.ico" // or your logo path
// //         alt="Sombu Store Logo"
// //         className="w-10 h-10 object-contain rounded-xl"
// //         width={40}
// //         height={40}
// //       />
            
           
// //             </Link>

// //             {/* Search Bar - Desktop */}
// //             <div className="hidden md:flex flex-1 max-w-2xl">
// //               <AutoSuggestSearch 
// //                 placeholder={t('search_products') || 'Search for products, brands, and categories...'}
// //                 onSelect={handleSearchSelect}
// //               />
// //             </div>

// //             {/* Desktop Navigation */}
// //             <div className="hidden lg:flex items-center gap-1">
// //               {navLinks.map((link) => (
// //                 <Link
// //                   key={link.href}
// //                   href={link.href}
// //                   className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
// //                     pathname === link.href
// //                       ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-200 shadow-sm border border-purple-500/20'
// //                       : 'text-purple-300/70 hover:bg-purple-500/10 hover:text-purple-200'
// //                   }`}
// //                 >
// //                   <link.icon className="w-4 h-4" />
// //                   {t(link.name)}
// //                 </Link>
// //               ))}
// //             </div>

// //             {/* Desktop Icons */}
// //             <div className="flex items-center gap-1 sm:gap-2">
// //               {/* ✅ Global Selector */}
// //               <div className="hidden md:block">
// //                 <GlobalSelector />
// //               </div>

// //               {/* Mobile Search Icon */}
// //               <button 
// //                 onClick={() => setShowMobileSearch(!showMobileSearch)}
// //                 className="md:hidden p-2 hover:bg-purple-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-purple-200"
// //               >
// //                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //                 </svg>
// //               </button>

// //               {/* Wishlist */}
// //               <Link 
// //                 href="/wishlist" 
// //                 className="relative p-2 hover:bg-pink-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-pink-300"
// //                 aria-label="Wishlist"
// //               >
// //                 <HeartIcon className="w-5 h-5" />
// //                 {wishlistCount > 0 && (
// //                   <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg z-10">
// //                     {wishlistCount > 99 ? '99+' : wishlistCount}
// //                   </div>
// //                 )}
// //               </Link>

// //               {/* Admin Icon */}
// //               {isAdmin && (
// //                 <Link
// //                   href="/admin/dashboard"
// //                   className="relative p-2 hover:bg-green-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-green-400"
// //                   title="Admin Dashboard"
// //                 >
// //                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// //                   </svg>
// //                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
// //                 </Link>
// //               )}

// //               {/* Cart Button */}
// //               <button
// //                 onClick={() => setIsCartOpen(true)}
// //                 className="relative p-2 hover:bg-fuchsia-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-fuchsia-300"
// //               >
// //                 <ShoppingCartIcon className="w-5 h-5" />
// //                 {totalQuantity > 0 && (
// //                   <span className="absolute -top-1 -right-1 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg">
// //                     {totalQuantity > 99 ? '99+' : totalQuantity}
// //                   </span>
// //                 )}
// //               </button>

// //               {/* Login/User Button */}
// //               {isLoggedIn ? (
// //                 <div className="relative">
// //                   <button
// //                     onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
// //                     className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-purple-500/10 rounded-lg transition-all duration-300"
// //                   >
// //                     <div className="relative">
// //                       <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
// //                         {userName.charAt(0).toUpperCase()}
// //                       </div>
// //                       {isAdmin && (
// //                         <span className="absolute -top-1 -right-1 text-xs">👑</span>
// //                       )}
// //                     </div>
// //                     <span className="text-purple-200 font-semibold text-sm hidden sm:block">{userName}</span>
// //                     <ChevronDownIcon className={`w-4 h-4 text-purple-400/60 transition-transform hidden sm:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
// //                   </button>

// //                   {isUserMenuOpen && (
// //                     <>
// //                       <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
// //                       <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-2xl shadow-2xl border border-purple-500/30 z-50 overflow-hidden">
// //                         <div className="px-4 py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-b border-purple-500/30">
// //                           <div className="flex items-center gap-3">
// //                             <div className="relative">
// //                               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold">
// //                                 {userName.charAt(0).toUpperCase()}
// //                               </div>
// //                               {isAdmin && (
// //                                 <span className="absolute -top-1 -right-1 text-xs">👑</span>
// //                               )}
// //                             </div>
// //                             <div>
// //                               <p className="text-sm font-bold text-purple-100">{userName}</p>
// //                               <p className="text-xs text-purple-400">{userEmail}</p>
// //                               {isAdmin && (
// //                                 <span className="text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded mt-1 inline-block">
// //                                   Administrator
// //                                 </span>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <div className="py-2">
// //                           {[
// //                             { href: '/profile', icon: UserIcon, label: 'Your Profile' },
// //                             { href: '/orders', icon: TruckIcon, label: 'Your Orders' },
// //                             { href: '/track', icon: TruckIcon, label: 'Track Order' },
// //                             { href: '/wishlist', icon: HeartIcon, label: 'Wishlist' },
// //                           ].map((item) => (
// //                             <Link
// //                               key={item.href}
// //                               href={item.href}
// //                               onClick={() => setIsUserMenuOpen(false)}
// //                               className="flex items-center gap-3 px-4 py-2 text-purple-300/80 hover:bg-purple-500/10 hover:text-purple-200 transition-all text-sm"
// //                             >
// //                               <item.icon className="w-4 h-4" />
// //                               {t(item.label)}
// //                             </Link>
// //                           ))}
                          
// //                           {isAdmin && (
// //                             <>
// //                               <div className="border-t border-purple-500/20 my-1" />
// //                               <Link
// //                                 href="/admin/dashboard"
// //                                 onClick={() => setIsUserMenuOpen(false)}
// //                                 className="flex items-center gap-3 px-4 py-2 text-green-400 hover:bg-green-500/10 hover:text-green-300 transition-all text-sm"
// //                               >
// //                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// //                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// //                                 </svg>
// //                                 Admin Dashboard
// //                                 <span className="ml-auto text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">Admin</span>
// //                               </Link>
// //                             </>
// //                           )}
                          
// //                           <div className="border-t border-purple-500/20 my-1" />
// //                           <button
// //                             onClick={handleLogout}
// //                             className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 transition-all text-sm"
// //                           >
// //                             <ArrowRightOnRectangleIcon className="w-4 h-4" />
// //                             {t('logout')}
// //                           </button>
// //                         </div>
// //                       </div>
// //                     </>
// //                   )}
// //                 </div>
// //               ) : (
// //                 <Link href="/login" className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-lg shadow-purple-500/25 flex items-center gap-1 sm:gap-2">
// //                   <UserIcon className="w-4 h-4" />
// //                   <span className="hidden xs:inline text-sm">{t('login')}</span>
// //                 </Link>
// //               )}

// //               {/* Mobile Menu Button */}
// //               <button 
// //                 onClick={() => setIsMenuOpen(!isMenuOpen)} 
// //                 className="lg:hidden p-2 hover:bg-purple-500/10 rounded-lg transition"
// //               >
// //                 {isMenuOpen ? <XMarkIcon className="h-5 w-5 text-purple-300" /> : <Bars3Icon className="h-5 w-5 text-purple-300" />}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Mobile Search Bar */}
// //           <AnimatePresence>
// //             {showMobileSearch && (
// //               <motion.div
// //                 initial={{ opacity: 0, height: 0 }}
// //                 animate={{ opacity: 1, height: 'auto' }}
// //                 exit={{ opacity: 0, height: 0 }}
// //                 className="md:hidden mt-3 pt-3 border-t border-purple-500/20"
// //               >
// //                 <AutoSuggestSearch 
// //                   placeholder={t('search_products') || 'Search products...'}
// //                   onSelect={(searchTerm) => {
// //                     handleSearchSelect(searchTerm);
// //                     setShowMobileSearch(false);
// //                   }}
// //                 />
// //               </motion.div>
// //             )}
// //           </AnimatePresence>

// //           {/* Mobile Navigation Menu */}
// //           <AnimatePresence>
// //             {isMenuOpen && (
// //               <motion.div
// //                 initial={{ opacity: 0, height: 0 }}
// //                 animate={{ opacity: 1, height: 'auto' }}
// //                 exit={{ opacity: 0, height: 0 }}
// //                 className="lg:hidden mt-4 pt-4 border-t border-purple-500/20 space-y-1 overflow-hidden"
// //               >
// //                 {/* ✅ Global Selector for Mobile */}
// //                 <div className="px-4 py-2 mb-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
// //                   <GlobalSelector />
// //                 </div>

// //                 {navLinks.map((link) => (
// //                   <Link
// //                     key={link.href}
// //                     href={link.href}
// //                     onClick={() => setIsMenuOpen(false)}
// //                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
// //                       pathname === link.href
// //                         ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-200 border border-purple-500/20'
// //                         : 'text-purple-300/70 hover:bg-purple-500/10'
// //                     }`}
// //                   >
// //                     <link.icon className="w-5 h-5" />
// //                     {t(link.name)}
// //                   </Link>
// //                 ))}

// //                 {isAdmin && (
// //                   <Link 
// //                     href="/admin/dashboard" 
// //                     onClick={() => setIsMenuOpen(false)}
// //                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-green-500/10 hover:text-green-300 transition-all font-medium"
// //                   >
// //                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
// //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
// //                     </svg>
// //                     Admin Panel
// //                     <span className="ml-auto text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">Admin</span>
// //                   </Link>
// //                 )}

// //                 <button
// //                   onClick={() => {
// //                     setIsMenuOpen(false);
// //                     setIsFilterOpen(true);
// //                   }}
// //                   className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-purple-500/10 transition-all font-medium w-full"
// //                 >
// //                   <FunnelIcon className="w-5 h-5" />
// //                   {t('filters') || 'Filters'}
// //                   {hasActiveFilters && (
// //                     <span className="bg-purple-500 text-white text-xs font-bold rounded-full px-2 ml-auto">
// //                       {activeFilterCount}
// //                     </span>
// //                   )}
// //                 </button>

// //                 <Link 
// //                   href="/wishlist" 
// //                   onClick={() => setIsMenuOpen(false)} 
// //                   className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-pink-500/10 hover:text-pink-300 transition-all font-medium"
// //                 >
// //                   <HeartIcon className="w-5 h-5" />
// //                   {t('wishlist')}
// //                   {wishlistCount > 0 && (
// //                     <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-auto">
// //                       {wishlistCount}
// //                     </span>
// //                   )}
// //                 </Link>

// //                 <div className="pt-3 border-t border-purple-500/20 mt-3">
// //                   {!isLoggedIn && (
// //                     <Link 
// //                       href="/login" 
// //                       onClick={() => setIsMenuOpen(false)} 
// //                       className="block w-full text-center py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/25"
// //                     >
// //                       {t('login')}
// //                     </Link>
// //                   )}
// //                 </div>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </nav>
// //       </header>

// //       {/* Filter Drawer */}
// //       <AnimatePresence>
// //         {isFilterOpen && (
// //           <>
// //             <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsFilterOpen(false)} />
// //             <motion.div
// //               initial={{ x: '100%' }}
// //               animate={{ x: 0 }}
// //               exit={{ x: '100%' }}
// //               transition={{ type: 'spring', damping: 30 }}
// //               className="fixed right-0 top-0 h-full w-full max-w-[85%] sm:max-w-md bg-slate-900 shadow-2xl z-50 flex flex-col"
// //             >
// //               <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20">
// //                 <h2 className="text-base sm:text-xl font-bold text-purple-100">{t('filters') || 'Filters'}</h2>
// //                 <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-purple-500/10 rounded-xl transition">
// //                   <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
// //                 </button>
// //               </div>

// //               <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
// //                 {categories.length > 0 && (
// //                   <div>
// //                     <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 sm:mb-3">{t('categories') || 'Categories'}</h3>
// //                     <div className="space-y-1.5 sm:space-y-2">
// //                       <button
// //                         onClick={() => setTempCategory('')}
// //                         className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition text-xs sm:text-sm ${tempCategory === '' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-purple-500/20'}`}
// //                       >
// //                         {t('all_categories') || 'All Categories'}
// //                       </button>
// //                       {categories.map((cat) => (
// //                         <button
// //                           key={cat}
// //                           onClick={() => setTempCategory(cat)}
// //                           className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition capitalize text-xs sm:text-sm ${tempCategory === cat ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-purple-500/20'}`}
// //                         >
// //                           {cat}
// //                         </button>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div>
// //                   <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 sm:mb-3">{t('price_range') || 'Price Range (₹)'}</h3>
// //                   <div className="flex gap-2 sm:gap-3">
// //                     <input
// //                       type="number"
// //                       placeholder={t('min_price') || 'Min Price'}
// //                       value={tempMinPrice}
// //                       onChange={(e) => setTempMinPrice(e.target.value)}
// //                       className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-purple-100 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                     />
// //                     <input
// //                       type="number"
// //                       placeholder={t('max_price') || 'Max Price'}
// //                       value={tempMaxPrice}
// //                       onChange={(e) => setTempMaxPrice(e.target.value)}
// //                       className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-purple-100 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 sm:mb-3">{t('sort_by') || 'Sort By'}</h3>
// //                   <div className="space-y-1.5 sm:space-y-2">
// //                     {[
// //                       { value: 'newest', label: 'newest_first' },
// //                       { value: 'price_low', label: 'price_low_to_high' },
// //                       { value: 'price_high', label: 'price_high_to_low' },
// //                       { value: 'name_asc', label: 'name_a_to_z' },
// //                     ].map((option) => (
// //                       <button
// //                         key={option.value}
// //                         onClick={() => setTempSortBy(option.value)}
// //                         className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition text-xs sm:text-sm ${tempSortBy === option.value ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-purple-500/20'}`}
// //                       >
// //                         {t(option.label) || option.label.replace(/_/g, ' ')}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="border-t border-purple-500/30 p-4 sm:p-6 space-y-2 sm:space-y-3">
// //                 <button
// //                   onClick={handleApplyFilters}
// //                   className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg transition"
// //                 >
// //                   {t('apply_filters') || 'Apply Filters'}
// //                 </button>
// //                 {(tempCategory || tempMinPrice || tempMaxPrice || tempSortBy !== 'newest') && (
// //                   <button
// //                     onClick={handleClearFilters}
// //                     className="w-full bg-slate-800 text-purple-300 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-slate-700 transition"
// //                   >
// //                     {t('clear_all') || 'Clear All Filters'}
// //                   </button>
// //                 )}
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* Cart Sidebar */}
// //       <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

// //       <div className="h-20"></div>
// //     </>
// //   );
// // };
// // src/components/layout/Header.jsx 

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { AutoSuggestSearch } from '../products/AutoSuggestSearch';
// import { useApp } from '../../providers/Appprovider';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation';
// import { LocationDisplay } from '../Location';
// import {
//   ShoppingCartIcon,
//   UserIcon,
//   Bars3Icon,
//   XMarkIcon,
//   HeartIcon,
//   ChevronDownIcon,
//   ArrowRightOnRectangleIcon,
//   TruckIcon,
//   CubeIcon,
//   SparklesIcon,
//   FunnelIcon,
// } from '@heroicons/react/24/outline';
// import { useCart } from '../../hooks/useCart';
// import { useWishlist } from '../../hooks/useWishlist';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../store/slices/authSlice';
// import CartSidebar from '../layout/CartSidebar';
// import GlobalSelector from '../GlobalSelector';
// import toast from 'react-hot-toast';

// export const Header = ({ 
//   categories = [], 
//   selectedCategory = '', 
//   setSelectedCategory = () => {},
//   minPrice = '', 
//   setMinPrice = () => {},
//   maxPrice = '', 
//   setMaxPrice = () => {},
//   sortBy = 'newest', 
//   setSortBy = () => {},
//   onSearch = () => {},
//   onFilterChange = () => {}
// }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);
  
//   const [tempCategory, setTempCategory] = useState(selectedCategory);
//   const [tempMinPrice, setTempMinPrice] = useState(minPrice);
//   const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
//   const [tempSortBy, setTempSortBy] = useState(sortBy);

//   const pathname = usePathname();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { totalQuantity } = useCart();
//   const { wishlistCount, getWishlist } = useWishlist();
//   const { user, token } = useSelector((state) => state.auth);

//   // ✅ Use App Context for translations
//   const { t, formatPrice, currency } = useApp();

//   // Load wishlist when logged in
//   useEffect(() => {
//     if (isLoggedIn) {
//       getWishlist();
//     }
//   }, [isLoggedIn, getWishlist]);

//   useEffect(() => {
//     setMounted(true);
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     setTempCategory(selectedCategory);
//     setTempMinPrice(minPrice);
//     setTempMaxPrice(maxPrice);
//     setTempSortBy(sortBy);
//   }, [selectedCategory, minPrice, maxPrice, sortBy]);

//   useEffect(() => {
//     const checkAuth = () => {
//       const storedToken = localStorage.getItem('token');
//       const storedUser = localStorage.getItem('user');
//       if (storedToken && storedUser) {
//         try {
//           const userData = JSON.parse(storedUser);
//           setUserName(userData.name || userData.email?.split('@')[0] || 'User');
//           setUserEmail(userData.email || '');
//           setIsLoggedIn(true);
//         } catch (error) { console.error(error); }
//       } else if (user && token) {
//         setUserName(user.name || user.email?.split('@')[0] || 'User');
//         setUserEmail(user.email || '');
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//         setUserName('');
//         setUserEmail('');
//       }
//     };
//     checkAuth();
//     const handleStorageChange = () => checkAuth();
//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [user, token]);

//   const isAdmin = isLoggedIn && (userEmail === 'admin@example.com' || user?.role === 'admin');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     localStorage.removeItem('cartItems');
//     dispatch(logout());
//     setIsLoggedIn(false);
//     setUserName('');
//     setUserEmail('');
//     setIsUserMenuOpen(false);
//     if (toast && toast.success) {
//       toast.success(t('logout') || 'Logged out successfully');
//     }
//     router.push('/');
//     router.refresh();
//   };

//   const handleSearchSelect = (searchTerm) => {
//     if (searchTerm) {
//       onSearch(searchTerm);
//       window.dispatchEvent(new CustomEvent('globalSearch', {
//         detail: { query: searchTerm }
//       }));
//     }
//   };

//   const handleApplyFilters = () => {
//     if (setSelectedCategory) setSelectedCategory(tempCategory);
//     if (setMinPrice) setMinPrice(tempMinPrice);
//     if (setMaxPrice) setMaxPrice(tempMaxPrice);
//     if (setSortBy) setSortBy(tempSortBy);
    
//     if (onFilterChange) {
//       onFilterChange({
//         category: tempCategory,
//         minPrice: tempMinPrice,
//         maxPrice: tempMaxPrice,
//         sortBy: tempSortBy
//       });
//     }
    
//     window.dispatchEvent(new CustomEvent('filterChange', {
//       detail: {
//         category: tempCategory,
//         minPrice: tempMinPrice,
//         maxPrice: tempMaxPrice,
//         sortBy: tempSortBy
//       }
//     }));
    
//     setIsFilterOpen(false);
//     if (toast && toast.success) {
//       toast.success(t('apply_filters') || 'Filters applied');
//     }
//   };

//   const handleClearFilters = () => {
//     setTempCategory('');
//     setTempMinPrice('');
//     setTempMaxPrice('');
//     setTempSortBy('newest');
    
//     if (setSelectedCategory) setSelectedCategory('');
//     if (setMinPrice) setMinPrice('');
//     if (setMaxPrice) setMaxPrice('');
//     if (setSortBy) setSortBy('newest');
    
//     if (onFilterChange) {
//       onFilterChange({
//         category: '',
//         minPrice: '',
//         maxPrice: '',
//         sortBy: 'newest'
//       });
//     }
    
//     window.dispatchEvent(new CustomEvent('filterChange', {
//       detail: {
//         category: '',
//         minPrice: '',
//         maxPrice: '',
//         sortBy: 'newest'
//       }
//     }));
    
//     setIsFilterOpen(false);
//     if (toast && toast.success) {
//       toast.success(t('clear_all') || 'All filters cleared');
//     }
//   };

//   const hasActiveFilters = selectedCategory || minPrice || maxPrice || sortBy !== 'newest';
//   const activeFilterCount = (selectedCategory ? 1 : 0) + (minPrice || maxPrice ? 1 : 0) + (sortBy !== 'newest' ? 1 : 0);

//   // ✅ Navigation links with translation
//   const navLinks = [
//     { name: 'home', href: '/', icon: SparklesIcon },
//     { name: 'products', href: '/products', icon: CubeIcon },
//     { name: 'orders', href: '/orders', icon: TruckIcon },
//     { name: 'track', href: '/track', icon: TruckIcon },
//   ];

//   if (!mounted) {
//     return (
//       <>
//         <header className="fixed top-0 w-full z-40 bg-slate-900 border-b border-purple-500/20">
//           <nav className="container mx-auto px-4 py-4">
//             <div className="flex justify-between items-center">
//               <div className="w-10 h-10 bg-purple-500/20 rounded-xl animate-pulse" />
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-purple-500/10 rounded-xl animate-pulse" />
//                 <div className="w-8 h-8 bg-purple-500/10 rounded-xl animate-pulse" />
//                 <div className="w-20 h-10 bg-purple-500/20 rounded-xl animate-pulse" />
//               </div>
//             </div>
//           </nav>
//         </header>
//         <div className="h-20"></div>
//       </>
//     );
//   }

//   return (
//     <>
//       <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${
//         isScrolled 
//           ? 'bg-slate-900 shadow-lg shadow-purple-900/30 border-b border-purple-500/30' 
//           : 'bg-slate-900 border-b border-purple-500/20'
//       }`}>
//         <nav className="container mx-auto px-4 py-3">
//           <div className="flex justify-between items-center gap-4">
//             {/* Logo */}
//             <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
//               <img 
//                 src="/favicon.ico"
//                 alt="Sombu Store Logo"
//                 className="w-10 h-10 object-contain rounded-xl"
//                 width={40}
//                 height={40}
//               />
//             </Link>

//             {/* Search Bar - Desktop */}
//             <div className="hidden md:flex flex-1 max-w-2xl">
//               <AutoSuggestSearch 
//                 placeholder={t('search_products')}
//                 onSelect={handleSearchSelect}
//               />
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex items-center gap-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
//                     pathname === link.href
//                       ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-200 shadow-sm border border-purple-500/20'
//                       : 'text-purple-300/70 hover:bg-purple-500/10 hover:text-purple-200'
//                   }`}
//                 >
//                   <link.icon className="w-4 h-4" />
//                   {t(link.name)}
//                 </Link>
//               ))}
//             </div>

//             {/* Desktop Icons */}
//             <div className="flex items-center gap-1 sm:gap-2">
//               {/* ✅ Location Display */}
//               <div className="hidden md:block">
//                 <LocationDisplay />
//               </div>

//               {/* ✅ Global Selector - Language, Currency */}
//               <div className="hidden md:block">
//                 <GlobalSelector />
//               </div>

//               {/* Mobile Search Icon */}
//               <button 
//                 onClick={() => setShowMobileSearch(!showMobileSearch)}
//                 className="md:hidden p-2 hover:bg-purple-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-purple-200"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </button>

//               {/* Wishlist */}
//               <Link 
//                 href="/wishlist" 
//                 className="relative p-2 hover:bg-pink-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-pink-300"
//                 aria-label={t('wishlist')}
//               >
//                 <HeartIcon className="w-5 h-5" />
//                 {wishlistCount > 0 && (
//                   <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg z-10">
//                     {wishlistCount > 99 ? '99+' : wishlistCount}
//                   </div>
//                 )}
//               </Link>

//               {/* Admin Icon */}
//               {isAdmin && (
//                 <Link
//                   href="/admin/dashboard"
//                   className="relative p-2 hover:bg-green-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-green-400"
//                   title={t('admin_dashboard')}
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//                 </Link>
//               )}

//               {/* Cart Button */}
//               <button
//                 onClick={() => setIsCartOpen(true)}
//                 className="relative p-2 hover:bg-fuchsia-500/10 rounded-lg transition-all duration-300 text-purple-300/60 hover:text-fuchsia-300"
//               >
//                 <ShoppingCartIcon className="w-5 h-5" />
//                 {totalQuantity > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg">
//                     {totalQuantity > 99 ? '99+' : totalQuantity}
//                   </span>
//                 )}
//               </button>

//               {/* Login/User Button */}
//               {isLoggedIn ? (
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                     className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-purple-500/10 rounded-lg transition-all duration-300"
//                   >
//                     <div className="relative">
//                       <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
//                         {userName.charAt(0).toUpperCase()}
//                       </div>
//                       {isAdmin && (
//                         <span className="absolute -top-1 -right-1 text-xs">👑</span>
//                       )}
//                     </div>
//                     <span className="text-purple-200 font-semibold text-sm hidden sm:block">{userName}</span>
//                     <ChevronDownIcon className={`w-4 h-4 text-purple-400/60 transition-transform hidden sm:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
//                   </button>

//                   {isUserMenuOpen && (
//                     <>
//                       <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
//                       <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-2xl shadow-2xl border border-purple-500/30 z-50 overflow-hidden">
//                         <div className="px-4 py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-b border-purple-500/30">
//                           <div className="flex items-center gap-3">
//                             <div className="relative">
//                               <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold">
//                                 {userName.charAt(0).toUpperCase()}
//                               </div>
//                               {isAdmin && (
//                                 <span className="absolute -top-1 -right-1 text-xs">👑</span>
//                               )}
//                             </div>
//                             <div>
//                               <p className="text-sm font-bold text-purple-100">{userName}</p>
//                               <p className="text-xs text-purple-400">{userEmail}</p>
//                               {isAdmin && (
//                                 <span className="text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded mt-1 inline-block">
//                                   {t('admin') || 'Administrator'}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="py-2">
//                           {[
//                             { href: '/profile', icon: UserIcon, label: 'your_profile' },
//                             { href: '/orders', icon: TruckIcon, label: 'your_orders' },
//                             { href: '/track', icon: TruckIcon, label: 'track_order' },
//                             { href: '/wishlist', icon: HeartIcon, label: 'wishlist' },
//                           ].map((item) => (
//                             <Link
//                               key={item.href}
//                               href={item.href}
//                               onClick={() => setIsUserMenuOpen(false)}
//                               className="flex items-center gap-3 px-4 py-2 text-purple-300/80 hover:bg-purple-500/10 hover:text-purple-200 transition-all text-sm"
//                             >
//                               <item.icon className="w-4 h-4" />
//                               {t(item.label)}
//                             </Link>
//                           ))}
                          
//                           {isAdmin && (
//                             <>
//                               <div className="border-t border-purple-500/20 my-1" />
//                               <Link
//                                 href="/admin/dashboard"
//                                 onClick={() => setIsUserMenuOpen(false)}
//                                 className="flex items-center gap-3 px-4 py-2 text-green-400 hover:bg-green-500/10 hover:text-green-300 transition-all text-sm"
//                               >
//                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                                 {t('admin_dashboard')}
//                                 <span className="ml-auto text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">Admin</span>
//                               </Link>
//                             </>
//                           )}
                          
//                           <div className="border-t border-purple-500/20 my-1" />
//                           <button
//                             onClick={handleLogout}
//                             className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-red-500/10 transition-all text-sm"
//                           >
//                             <ArrowRightOnRectangleIcon className="w-4 h-4" />
//                             {t('logout')}
//                           </button>
//                         </div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ) : (
//                 <Link href="/login" className="px-3 sm:px-5 py-1.5 sm:py-2.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 shadow-lg shadow-purple-500/25 flex items-center gap-1 sm:gap-2">
//                   <UserIcon className="w-4 h-4" />
//                   <span className="hidden xs:inline text-sm">{t('login')}</span>
//                 </Link>
//               )}

//               {/* Mobile Menu Button */}
//               <button 
//                 onClick={() => setIsMenuOpen(!isMenuOpen)} 
//                 className="lg:hidden p-2 hover:bg-purple-500/10 rounded-lg transition"
//               >
//                 {isMenuOpen ? <XMarkIcon className="h-5 w-5 text-purple-300" /> : <Bars3Icon className="h-5 w-5 text-purple-300" />}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Search Bar */}
//           <AnimatePresence>
//             {showMobileSearch && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="md:hidden mt-3 pt-3 border-t border-purple-500/20"
//               >
//                 <AutoSuggestSearch 
//                   placeholder={t('search_products')}
//                   onSelect={(searchTerm) => {
//                     handleSearchSelect(searchTerm);
//                     setShowMobileSearch(false);
//                   }}
//                 />
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Mobile Navigation Menu */}
//           <AnimatePresence>
//             {isMenuOpen && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="lg:hidden mt-4 pt-4 border-t border-purple-500/20 space-y-1 overflow-hidden"
//               >
//                 {/* Location Display - Mobile */}
//                 <div className="px-2 py-2 mb-2 bg-purple-500/5 rounded-xl border border-purple-500/20">
//                   <LocationDisplay />
//                 </div>

//                 {/* Global Selector - Mobile */}
//                 <div className="px-2 py-2 mb-2 bg-purple-500/5 rounded-xl border border-purple-500/20">
//                   <GlobalSelector />
//                 </div>

//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     onClick={() => setIsMenuOpen(false)}
//                     className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
//                       pathname === link.href
//                         ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-200 border border-purple-500/20'
//                         : 'text-purple-300/70 hover:bg-purple-500/10'
//                     }`}
//                   >
//                     <link.icon className="w-5 h-5" />
//                     {t(link.name)}
//                   </Link>
//                 ))}

//                 {isAdmin && (
//                   <Link 
//                     href="/admin/dashboard" 
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-green-500/10 hover:text-green-300 transition-all font-medium"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     {t('admin_dashboard')}
//                     <span className="ml-auto text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">Admin</span>
//                   </Link>
//                 )}

//                 <button
//                   onClick={() => {
//                     setIsMenuOpen(false);
//                     setIsFilterOpen(true);
//                   }}
//                   className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-purple-500/10 transition-all font-medium w-full"
//                 >
//                   <FunnelIcon className="w-5 h-5" />
//                   {t('filters')}
//                   {hasActiveFilters && (
//                     <span className="bg-purple-500 text-white text-xs font-bold rounded-full px-2 ml-auto">
//                       {activeFilterCount}
//                     </span>
//                   )}
//                 </button>

//                 <Link 
//                   href="/wishlist" 
//                   onClick={() => setIsMenuOpen(false)} 
//                   className="flex items-center gap-3 px-4 py-3 rounded-xl text-purple-300/70 hover:bg-pink-500/10 hover:text-pink-300 transition-all font-medium"
//                 >
//                   <HeartIcon className="w-5 h-5" />
//                   {t('wishlist')}
//                   {wishlistCount > 0 && (
//                     <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-auto">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </Link>

//                 <div className="pt-3 border-t border-purple-500/20 mt-3">
//                   {!isLoggedIn && (
//                     <Link 
//                       href="/login" 
//                       onClick={() => setIsMenuOpen(false)} 
//                       className="block w-full text-center py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/25"
//                     >
//                       {t('login')}
//                     </Link>
//                   )}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </nav>
//       </header>

//       {/* Filter Drawer */}
//       <AnimatePresence>
//         {isFilterOpen && (
//           <>
//             <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsFilterOpen(false)} />
//             <motion.div
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'spring', damping: 30 }}
//               className="fixed right-0 top-0 h-full w-full max-w-[85%] sm:max-w-md bg-slate-900 shadow-2xl z-50 flex flex-col"
//             >
//               <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20">
//                 <h2 className="text-base sm:text-xl font-bold text-purple-100">{t('filters')}</h2>
//                 <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-purple-500/10 rounded-xl transition">
//                   <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300" />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
//                 {categories.length > 0 && (
//                   <div>
//                     <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 sm:mb-3">{t('categories')}</h3>
//                     <div className="space-y-1.5 sm:space-y-2">
//                       <button
//                         onClick={() => setTempCategory('')}
//                         className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition text-xs sm:text-sm ${tempCategory === '' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-purple-500/20'}`}
//                       >
//                         {t('all_categories')}
//                       </button>
//                       {categories.map((cat) => (
//                         <button
//                           key={cat}
//                           onClick={() => setTempCategory(cat)}
//                           className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition capitalize text-xs sm:text-sm ${tempCategory === cat ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-purple-500/20'}`}
//                         >
//                           {cat}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 sm:mb-3">{t('price_range')}</h3>
//                   <div className="flex gap-2 sm:gap-3">
//                     <input
//                       type="number"
//                       placeholder={t('min_price')}
//                       value={tempMinPrice}
//                       onChange={(e) => setTempMinPrice(e.target.value)}
//                       className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-purple-100 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                     <input
//                       type="number"
//                       placeholder={t('max_price')}
//                       value={tempMaxPrice}
//                       onChange={(e) => setTempMaxPrice(e.target.value)}
//                       className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-800 border border-purple-500/30 rounded-lg text-purple-100 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-xs sm:text-sm font-bold text-purple-300 uppercase tracking-wider mb-2 sm:mb-3">{t('sort_by')}</h3>
//                   <div className="space-y-1.5 sm:space-y-2">
//                     {[
//                       { value: 'newest', label: 'newest_first' },
//                       { value: 'price_low', label: 'price_low_to_high' },
//                       { value: 'price_high', label: 'price_high_to_low' },
//                       { value: 'name_asc', label: 'name_a_to_z' },
//                     ].map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => setTempSortBy(option.value)}
//                         className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition text-xs sm:text-sm ${tempSortBy === option.value ? 'bg-purple-600 text-white' : 'text-purple-300 hover:bg-purple-500/20'}`}
//                       >
//                         {t(option.label)}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <div className="border-t border-purple-500/30 p-4 sm:p-6 space-y-2 sm:space-y-3">
//                 <button
//                   onClick={handleApplyFilters}
//                   className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:shadow-lg transition"
//                 >
//                   {t('apply_filters')}
//                 </button>
//                 {(tempCategory || tempMinPrice || tempMaxPrice || tempSortBy !== 'newest') && (
//                   <button
//                     onClick={handleClearFilters}
//                     className="w-full bg-slate-800 text-purple-300 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-slate-700 transition"
//                   >
//                     {t('clear_all')}
//                   </button>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

//       <div className="h-20"></div>
//     </>
//   );
// };
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AutoSuggestSearch } from '../products/AutoSuggestSearch';
import { useApp } from '../../providers/Appprovider';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LocationDisplay } from '../Location';
import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  TruckIcon,
  CubeIcon,
  SparklesIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import CartSidebar from '../layout/CartSidebar';
import GlobalSelector from '../GlobalSelector';
import toast from 'react-hot-toast';

export const Header = ({ 
  categories = [], 
  selectedCategory = '', 
  setSelectedCategory = () => {},
  minPrice = '', 
  setMinPrice = () => {},
  maxPrice = '', 
  setMaxPrice = () => {},
  sortBy = 'newest', 
  setSortBy = () => {},
  onSearch = () => {},
  onFilterChange = () => {}
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  const [tempCategory, setTempCategory] = useState(selectedCategory);
  const [tempMinPrice, setTempMinPrice] = useState(minPrice);
  const [tempMaxPrice, setTempMaxPrice] = useState(maxPrice);
  const [tempSortBy, setTempSortBy] = useState(sortBy);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { totalQuantity } = useCart();
  const { wishlistCount, getWishlist } = useWishlist();
  const { user, token } = useSelector((state) => state.auth);

  // ✅ Use App Context for translations
  const { t, formatPrice, currency } = useApp();

  // Load wishlist when logged in
  useEffect(() => {
    if (isLoggedIn) {
      getWishlist();
    }
  }, [isLoggedIn, getWishlist]);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setTempCategory(selectedCategory);
    setTempMinPrice(minPrice);
    setTempMaxPrice(maxPrice);
    setTempSortBy(sortBy);
  }, [selectedCategory, minPrice, maxPrice, sortBy]);

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUserName(userData.name || userData.email?.split('@')[0] || 'User');
          setUserEmail(userData.email || '');
          setIsLoggedIn(true);
        } catch (error) { console.error(error); }
      } else if (user && token) {
        setUserName(user.name || user.email?.split('@')[0] || 'User');
        setUserEmail(user.email || '');
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserName('');
        setUserEmail('');
      }
    };
    checkAuth();
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user, token]);

  const isAdmin = isLoggedIn && (userEmail === 'admin@example.com' || user?.role === 'admin');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    dispatch(logout());
    setIsLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setIsUserMenuOpen(false);
    if (toast && toast.success) {
      toast.success(t('logout') || 'Logged out successfully');
    }
    router.push('/');
    router.refresh();
  };

  const handleSearchSelect = (searchTerm) => {
    if (searchTerm) {
      onSearch(searchTerm);
      window.dispatchEvent(new CustomEvent('globalSearch', {
        detail: { query: searchTerm }
      }));
    }
  };

  const handleApplyFilters = () => {
    if (setSelectedCategory) setSelectedCategory(tempCategory);
    if (setMinPrice) setMinPrice(tempMinPrice);
    if (setMaxPrice) setMaxPrice(tempMaxPrice);
    if (setSortBy) setSortBy(tempSortBy);
    
    if (onFilterChange) {
      onFilterChange({
        category: tempCategory,
        minPrice: tempMinPrice,
        maxPrice: tempMaxPrice,
        sortBy: tempSortBy
      });
    }
    
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: {
        category: tempCategory,
        minPrice: tempMinPrice,
        maxPrice: tempMaxPrice,
        sortBy: tempSortBy
      }
    }));
    
    setIsFilterOpen(false);
    if (toast && toast.success) {
      toast.success(t('apply_filters') || 'Filters applied');
    }
  };

  const handleClearFilters = () => {
    setTempCategory('');
    setTempMinPrice('');
    setTempMaxPrice('');
    setTempSortBy('newest');
    
    if (setSelectedCategory) setSelectedCategory('');
    if (setMinPrice) setMinPrice('');
    if (setMaxPrice) setMaxPrice('');
    if (setSortBy) setSortBy('newest');
    
    if (onFilterChange) {
      onFilterChange({
        category: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'newest'
      });
    }
    
    window.dispatchEvent(new CustomEvent('filterChange', {
      detail: {
        category: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'newest'
      }
    }));
    
    setIsFilterOpen(false);
    if (toast && toast.success) {
      toast.success(t('clear_all') || 'All filters cleared');
    }
  };

  const hasActiveFilters = selectedCategory || minPrice || maxPrice || sortBy !== 'newest';
  const activeFilterCount = (selectedCategory ? 1 : 0) + (minPrice || maxPrice ? 1 : 0) + (sortBy !== 'newest' ? 1 : 0);

  // ✅ Navigation links
  const navLinks = [
    { name: 'home', href: '/', icon: SparklesIcon },
    { name: 'products', href: '/products', icon: CubeIcon },
    { name: 'orders', href: '/orders', icon: TruckIcon },
    { name: 'track', href: '/track', icon: TruckIcon },
  ];

  if (!mounted) {
    return (
      <>
        <header className="fixed top-0 w-full z-40 bg-[#131921] border-b border-[#3a4553]">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 bg-[#232f3e] rounded animate-pulse" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#232f3e] rounded animate-pulse" />
                <div className="w-8 h-8 bg-[#232f3e] rounded animate-pulse" />
                <div className="w-20 h-10 bg-[#232f3e] rounded animate-pulse" />
              </div>
            </div>
          </nav>
        </header>
        <div className="h-16"></div>
      </>
    );
  }

  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#131921] shadow-lg border-b border-[#3a4553]' 
          : 'bg-[#131921] border-b border-[#3a4553]'
      }`}>
        <nav className="container mx-auto px-2 sm:px-4 py-1.5 sm:py-2">
          {/* ✅ Amazon Style - First Row */}
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <img 
                src="/favicon.ico"
                alt="Sombu Store"
                className="h-8 sm:h-10 w-auto object-contain hover:border hover:border-white/20 rounded p-0.5 transition-all"
                width={40}
                height={40}
              />
            </Link>

            {/* ✅ Location Display - Amazon Style (Desktop) */}
            <div className="hidden lg:block">
              <LocationDisplay />
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-2">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={t('search_products')}
                  className="w-full px-4 py-2 rounded-l-md rounded-r-none border-0 focus:outline-none focus:ring-2 focus:ring-[#febd69] text-gray-900"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      handleSearchSelect(e.target.value);
                    }
                  }}
                />
                <button 
                  className="absolute right-0 top-0 h-full px-4 bg-[#febd69] rounded-r-md hover:bg-[#f3a847] transition-colors"
                  onClick={() => {
                    const input = document.querySelector('.search-input');
                    if (input && input.value) {
                      handleSearchSelect(input.value);
                    }
                  }}
                >
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Right Side - Amazon Style */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* ✅ Location Display - Amazon Style (Mobile) */}
              <div className="lg:hidden flex-shrink-0 max-w-[100px]">
                <LocationDisplay />
              </div>

              {/* Language/Currency - Amazon Style */}
              <div className="hidden sm:block">
                <GlobalSelector />
              </div>

              {/* Mobile Language - Compact */}
              <div className="sm:hidden">
                <GlobalSelector />
              </div>

              {/* Wishlist - Amazon Style */}
              <Link 
                href="/wishlist" 
                className="relative hidden sm:block p-1.5 hover:border hover:border-white/20 rounded transition-all"
                aria-label={t('wishlist')}
              >
                <HeartIcon className="w-5 h-5 text-white/90" />
                {wishlistCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-[#febd69] text-[#131921] text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-lg">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </div>
                )}
              </Link>

              {/* Admin Icon */}
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="hidden lg:block p-1.5 hover:border hover:border-white/20 rounded transition-all"
                  title={t('admin_dashboard')}
                >
                  <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </Link>
              )}

              {/* Cart - Amazon Style */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 hover:border hover:border-white/20 rounded transition-all flex items-center"
              >
                <ShoppingCartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#febd69] text-[#131921] text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg">
                    {totalQuantity > 99 ? '99+' : totalQuantity}
                  </span>
                )}
                <span className="hidden lg:inline text-white/80 text-sm font-bold ml-1">
                  {t('cart') || 'Cart'}
                </span>
              </button>

              {/* Login/User - Amazon Style */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1 px-2 py-1 hover:border hover:border-white/20 rounded transition-all"
                  >
                    <div className="relative">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-[#febd69] to-[#f3a847] rounded-full flex items-center justify-center text-[#131921] font-bold text-xs shadow-md">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      {isAdmin && (
                        <span className="absolute -top-1 -right-1 text-[8px]">👑</span>
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-[10px] text-white/60 leading-none">{t('hello') || 'Hello'}</div>
                      <div className="text-xs font-bold text-white/90 leading-tight">{userName}</div>
                    </div>
                    <ChevronDownIcon className={`w-3 h-3 text-white/60 transition-transform hidden sm:block ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
                        <div className="px-4 py-3 bg-[#131921] text-white border-b border-gray-700">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#febd69] to-[#f3a847] rounded-full flex items-center justify-center text-[#131921] font-bold">
                                {userName.charAt(0).toUpperCase()}
                              </div>
                              {isAdmin && <span className="absolute -top-1 -right-1 text-xs">👑</span>}
                            </div>
                            <div>
                              <p className="text-sm font-bold">{userName}</p>
                              <p className="text-xs text-white/60">{userEmail}</p>
                              {isAdmin && (
                                <span className="text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded mt-1 inline-block">
                                  {t('admin') || 'Administrator'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          {[
                            { href: '/profile', icon: UserIcon, label: 'your_profile' },
                            { href: '/orders', icon: TruckIcon, label: 'your_orders' },
                            { href: '/track', icon: TruckIcon, label: 'track_order' },
                            { href: '/wishlist', icon: HeartIcon, label: 'wishlist' },
                          ].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                            >
                              <item.icon className="w-4 h-4 text-gray-500" />
                              {t(item.label)}
                            </Link>
                          ))}
                          
                          {isAdmin && (
                            <>
                              <div className="border-t border-gray-200 my-1" />
                              <Link
                                href="/admin/dashboard"
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-green-600 hover:bg-gray-100 transition-all"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {t('admin_dashboard')}
                                <span className="ml-auto text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded">Admin</span>
                              </Link>
                            </>
                          )}
                          
                          <div className="border-t border-gray-200 my-1" />
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-all text-left"
                          >
                            <ArrowRightOnRectangleIcon className="w-4 h-4" />
                            {t('logout')}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-1 px-2 py-1 hover:border hover:border-white/20 rounded transition-all">
                  <div className="hidden sm:block text-left">
                    <div className="text-[10px] text-white/60 leading-none">{t('hello') || 'Hello'}</div>
                    <div className="text-xs font-bold text-white/90 leading-tight">{t('sign_in') || 'Sign in'}</div>
                  </div>
                  <UserIcon className="w-5 h-5 text-white/90 sm:hidden" />
                </Link>
              )}

              {/* Mobile Menu Button - Amazon Style */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="lg:hidden p-1.5 hover:border hover:border-white/20 rounded transition-all"
              >
                {isMenuOpen ? <XMarkIcon className="h-5 w-5 text-white" /> : <Bars3Icon className="h-5 w-5 text-white" />}
              </button>
            </div>
          </div>

          {/* ✅ Amazon Style - Second Row (Mobile Search) */}
          <div className="md:hidden mt-1">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t('search_products')}
                className="w-full px-4 py-1.5 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-[#febd69] text-gray-900 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    handleSearchSelect(e.target.value);
                  }
                }}
              />
              <button 
                className="absolute right-0 top-0 h-full px-3 bg-[#febd69] rounded-r-md hover:bg-[#f3a847] transition-colors"
                onClick={() => {
                  const input = document.querySelector('.mobile-search-input');
                  if (input && input.value) {
                    handleSearchSelect(input.value);
                  }
                }}
              >
                <MagnifyingGlassIcon className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-2 pt-2 border-t border-[#3a4553] space-y-1 overflow-hidden"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all font-medium ${
                      pathname === link.href
                        ? 'bg-[#febd69]/10 text-[#febd69]'
                        : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {t(link.name)}
                  </Link>
                ))}

                {isAdmin && (
                  <Link 
                    href="/admin/dashboard" 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-green-400 hover:bg-white/5 transition-all font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t('admin_dashboard')}
                    <span className="ml-auto text-[10px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded">Admin</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsFilterOpen(true);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/80 hover:bg-white/5 transition-all font-medium w-full"
                >
                  <FunnelIcon className="w-5 h-5" />
                  {t('filters')}
                  {hasActiveFilters && (
                    <span className="bg-[#febd69] text-[#131921] text-xs font-bold rounded-full px-2 ml-auto">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <div className="pt-2 border-t border-[#3a4553] mt-2">
                  {!isLoggedIn && (
                    <Link 
                      href="/login" 
                      onClick={() => setIsMenuOpen(false)} 
                      className="block w-full text-center py-2.5 bg-[#febd69] text-[#131921] rounded-lg font-bold hover:bg-[#f3a847] transition"
                    >
                      {t('login')}
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Filter Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsFilterOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed right-0 top-0 h-full w-full max-w-[85%] sm:max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 bg-[#131921]">
                <h2 className="text-base sm:text-xl font-bold text-white">{t('filters')}</h2>
                <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition">
                  <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
                {categories.length > 0 && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">{t('categories')}</h3>
                    <div className="space-y-1.5 sm:space-y-2">
                      <button
                        onClick={() => setTempCategory('')}
                        className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition text-xs sm:text-sm ${tempCategory === '' ? 'bg-[#febd69] text-[#131921]' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {t('all_categories')}
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setTempCategory(cat)}
                          className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition capitalize text-xs sm:text-sm ${tempCategory === cat ? 'bg-[#febd69] text-[#131921]' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">{t('price_range')}</h3>
                  <div className="flex gap-2 sm:gap-3">
                    <input
                      type="number"
                      placeholder={t('min_price')}
                      value={tempMinPrice}
                      onChange={(e) => setTempMinPrice(e.target.value)}
                      className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                    />
                    <input
                      type="number"
                      placeholder={t('max_price')}
                      value={tempMaxPrice}
                      onChange={(e) => setTempMaxPrice(e.target.value)}
                      className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#febd69]"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">{t('sort_by')}</h3>
                  <div className="space-y-1.5 sm:space-y-2">
                    {[
                      { value: 'newest', label: 'newest_first' },
                      { value: 'price_low', label: 'price_low_to_high' },
                      { value: 'price_high', label: 'price_high_to_low' },
                      { value: 'name_asc', label: 'name_a_to_z' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTempSortBy(option.value)}
                        className={`w-full text-left px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition text-xs sm:text-sm ${tempSortBy === option.value ? 'bg-[#febd69] text-[#131921]' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {t(option.label)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4 sm:p-6 space-y-2 sm:space-y-3 bg-gray-50">
                <button
                  onClick={handleApplyFilters}
                  className="w-full bg-[#febd69] text-[#131921] py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#f3a847] transition"
                >
                  {t('apply_filters')}
                </button>
                {(tempCategory || tempMinPrice || tempMaxPrice || tempSortBy !== 'newest') && (
                  <button
                    onClick={handleClearFilters}
                    className="w-full bg-gray-200 text-gray-700 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-gray-300 transition"
                  >
                    {t('clear_all')}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="h-16 sm:h-20"></div>
    </>
  );
};