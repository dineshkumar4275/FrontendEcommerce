// app/profile/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  ShoppingBagIcon, 
  HeartIcon,
  TruckIcon,
  SparklesIcon,
  PencilIcon,
  ShieldCheckIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user: reduxUser, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }
    
    if (reduxUser) {
      setUser(reduxUser);
      setLoading(false);
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        router.push('/login');
      }
    }
  }, [token, reduxUser, router]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const memberSince = new Date().getFullYear();
  const joinDate = new Date(2024, 0, 1); // Example date, replace with actual user.created_at

  const quickLinks = [
    { href: '/orders', icon: ShoppingBagIcon, label: 'My Orders', color: 'purple', desc: 'View your order history' },
    { href: '/wishlist', icon: HeartIcon, label: 'Wishlist', color: 'pink', desc: 'Your saved items' },
    { href: '/cart', icon: TruckIcon, label: 'Cart', color: 'blue', desc: 'Items in your cart' },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-purple-600 transition">Home</Link>
                <span>/</span>
                <span className="text-purple-600 font-medium">My Profile</span>
              </div>
            </div>

            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl mb-6"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg border-2 border-white/30">
                    {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition">
                    <PencilIcon className="w-3 h-3 text-purple-600" />
                  </button>
                </div>
                
                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl md:text-3xl font-bold">{user?.name || 'User'}</h1>
                  <p className="text-white/80 mt-1">{user?.email}</p>
                  <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 rounded-lg text-xs">
                      <CalendarIcon className="w-3 h-3" />
                      Member since {memberSince}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                      user?.role === 'admin' ? 'bg-yellow-500/30' : 'bg-green-500/30'
                    }`}>
                      <ShieldCheckIcon className="w-3 h-3" />
                      {user?.role === 'admin' ? 'Administrator' : 'Premium Customer'}
                    </span>
                  </div>
                </div>

                {/* Edit Button */}
                <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition flex items-center gap-2">
                  <PencilIcon className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Personal Information Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-purple-600" />
                    Personal Information
                  </h2>
                </div>
                
                <div className="p-6 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Full Name
                      </label>
                      <div className="text-gray-900 font-medium">
                        {user?.name || 'Not provided'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Email Address
                      </label>
                      <div className="text-gray-900 font-medium">
                        {user?.email || 'Not provided'}
                      </div>
                    </div>
                  </div>

                  {user?.phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <PhoneIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                          Phone Number
                        </label>
                        <div className="text-gray-900 font-medium">
                          {user?.phone}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                        Member Since
                      </label>
                      <div className="text-gray-900 font-medium">
                        {joinDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Links Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-purple-600" />
                    Quick Links
                  </h2>
                </div>
                
                <div className="p-4 space-y-3">
                  {quickLinks.map((link, idx) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block p-4 rounded-xl transition-all duration-300 group ${
                        link.color === 'purple' ? 'hover:bg-purple-50' :
                        link.color === 'pink' ? 'hover:bg-pink-50' : 'hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          link.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                          link.color === 'pink' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'
                        } group-hover:scale-110 transition-transform`}>
                          <link.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{link.label}</h3>
                          <p className="text-xs text-gray-400">{link.desc}</p>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Stats */}
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Account Status</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Active
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Security Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5 text-purple-600" />
                  Security & Privacy
                </h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Password</p>
                    <p className="text-sm text-gray-500">Last changed 30 days ago</p>
                  </div>
                  <button className="px-4 py-2 text-purple-600 border border-purple-200 rounded-xl text-sm font-medium hover:bg-purple-50 transition">
                    Change Password
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}