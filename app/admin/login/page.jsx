// // app/admin/login/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import apiClient from '@/lib/apiClient';
// import { setCredentials } from '@/store/slices/authSlice';

// export default function AdminLogin() {
//   const [email, setEmail] = useState('admin@example.com');
//   const [password, setPassword] = useState('admin123');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!email || !password) {
//       toast.error('Please enter email and password');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const { data } = await apiClient.post('/auth/login', { email, password });
      
//       if (data.role !== 'admin') {
//         toast.error('Access denied. Admin only!');
//         return;
//       }
      
//       dispatch(setCredentials({ 
//         user: { 
//           id: data.id, 
//           name: data.name, 
//           email: data.email, 
//           role: data.role 
//         }, 
//         token: data.token 
//       }));
      
//       toast.success('Admin login successful!');
      
//       // Safe redirect after mount
//       if (isMounted) {
//         router.push('/admin/dashboard');
//       } else {
//         setTimeout(() => router.push('/admin/dashboard'), 100);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Don't render until mounted
//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 py-12 px-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
//       >
//         <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8 text-center">
//           <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-4xl">👑</span>
//           </div>
//           <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
//           <p className="text-purple-200 mt-1">Login to access dashboard</p>
//         </div>
        
//         <div className="p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Admin Email
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-3 text-gray-400">📧</span>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="admin@example.com"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <span className="absolute left-3 top-3 text-gray-400">🔒</span>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Enter password"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? '👁️' : '👁️‍🗨️'}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
//             >
//               {loading ? 'Logging in...' : 'Admin Login'}
//             </button>
//           </form>

//           {/* Demo Credentials */}
//           <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//             <p className="text-xs text-gray-600 text-center font-semibold">Demo Admin Credentials:</p>
//             <p className="text-xs text-gray-500 text-center mt-1">
//               Email: <span className="font-mono font-bold">admin@example.com</span>
//             </p>
//             <p className="text-xs text-gray-500 text-center">
//               Password: <span className="font-mono font-bold">admin123</span>
//             </p>
//           </div>

//           <div className="text-center mt-4">
//             <a href="/login" className="text-sm text-purple-600 hover:underline">
//               ← User Login
//             </a>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
// frontend/app/admin/login/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import apiClient from '@/lib/apiClient';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [step, setStep] = useState('password'); // 'password' | '2fa'
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        code: '',
        rememberMe: false
    });
    const [timer, setTimer] = useState(0);
    const [canResend, setCanResend] = useState(true);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.email || !formData.password) {
            toast.error('Please enter email and password');
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post('/admin/auth/login', {
                email: formData.email,
                password: formData.password
            });

            if (response.data.success) {
                setUserId(response.data.userId);
                setStep('2fa');
                setTimer(60);
                setCanResend(false);
                toast.success('2FA code sent to your email!');
                
                if (response.data.testCode) {
                    console.log('📱 Test 2FA Code:', response.data.testCode);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handle2FASubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.code || formData.code.length !== 6) {
            toast.error('Please enter a valid 6-digit 2FA code');
            return;
        }

        setLoading(true);
        try {
            const response = await apiClient.post('/admin/auth/verify-2fa', {
                userId: userId,
                code: formData.code
            });

            if (response.data.success) {
                const { user, token, sessionToken } = response.data.data;
                
                // Store credentials
                localStorage.setItem('token', token);
                localStorage.setItem('sessionToken', sessionToken);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('isAdmin', 'true');
                
                // Set axios default header
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                // Update Redux
                dispatch(setCredentials({ user, token }));
                
                toast.success('Welcome Admin!');
                router.push('/admin/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || '2FA verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!canResend) return;
        
        setLoading(true);
        try {
            const response = await apiClient.post('/admin/auth/resend-2fa', {
                userId: userId
            });
            
            if (response.data.success) {
                setTimer(60);
                setCanResend(false);
                toast.success('New 2FA code sent!');
                if (response.data.testCode) {
                    console.log('📱 New Test 2FA Code:', response.data.testCode);
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <span className="text-4xl">🛡️</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">
                        {step === 'password' ? 'Admin Login' : '2FA Verification'}
                    </h2>
                    {step === '2fa' && (
                        <p className="text-sm text-gray-500 mt-1">
                            Enter the 6-digit code sent to <strong>{formData.email}</strong>
                        </p>
                    )}
                </div>

                {step === 'password' && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition"
                        >
                            {loading ? 'Verifying...' : 'Continue'}
                        </button>
                    </form>
                )}

                {step === '2fa' && (
                    <form onSubmit={handle2FASubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Enter 2FA Code
                            </label>
                            <input
                                type="text"
                                maxLength="6"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.replace(/\D/g, '') })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:border-red-500"
                                placeholder="000000"
                                required
                            />
                            <p className="text-xs text-gray-500 text-center mt-2">
                                Code expires in {timer} seconds
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || formData.code.length !== 6}
                            className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition"
                        >
                            {loading ? 'Verifying...' : 'Verify & Login'}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={!canResend || loading}
                                className="text-sm text-red-600 hover:text-red-700 disabled:text-gray-400 transition"
                            >
                                {canResend ? 'Resend Code' : `Resend in ${timer}s`}
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Secure admin access with 2FA</p>
                    <p className="text-xs mt-1">🔒 Military-grade security</p>
                </div>
            </div>
        </div>
    );
}