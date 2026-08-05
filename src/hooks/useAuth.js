// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { logout } from '../store/slices/authSlice';
// import apiClient from '../lib/apiClient';
// import toast from 'react-hot-toast';

// export const useAuth = (redirectTo = '/login') => {
//   const [isValidating, setIsValidating] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const validateAuth = async () => {
//       const token = localStorage.getItem('token');
//       const user = localStorage.getItem('user');
      
//       if (!token || !user) {
//         handleNoAuth();
//         setIsValidating(false);
//         return;
//       }

//       try {
//         const response = await apiClient.get('/auth/validate-token');
//         if (response.data.valid) {
//           setIsAuthenticated(true);
//         } else {
//           handleTokenExpired();
//         }
//       } catch (error) {
//         handleTokenExpired();
//       } finally {
//         setIsValidating(false);
//       }
//     };

//     const handleNoAuth = () => {
//       setIsAuthenticated(false);
//       localStorage.setItem('redirectAfterLogin', window.location.pathname);
//       toast.error('Please login to continue');
//       router.push(redirectTo);
//     };

//     const handleTokenExpired = () => {
//       setIsAuthenticated(false);
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       dispatch(logout());
//       toast.error('Session expired. Please login again.');
//       localStorage.setItem('redirectAfterLogin', window.location.pathname);
//       router.push(redirectTo);
//     };

//     validateAuth();
//   }, [router, dispatch, redirectTo]);

//   return { isValidating, isAuthenticated };
// };
// frontend/hooks/useAuth.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setCredentials } from '../store/slices/authSlice';
import apiClient from '../lib/apiClient';
import toast from 'react-hot-toast';

export const useAuth = (redirectTo = '/login') => {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Get user from Redux
  const { user, token } = useSelector((state) => state.auth || { user: null, token: null });

  // ✅ Login function
  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store token and user
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        
        // Set axios default header
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Update Redux
        dispatch(setCredentials({ user, token }));
        setIsAuthenticated(true);
        
        return { 
          success: true, 
          user, 
          token,
          message: 'Login successful!' 
        };
      } else {
        return { 
          success: false, 
          message: response.data.message || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register function
  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/register', userData);
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch(setCredentials({ user, token }));
        setIsAuthenticated(true);
        
        return { 
          success: true, 
          user, 
          token,
          message: 'Registration successful!' 
        };
      } else {
        return { 
          success: false, 
          message: response.data.message || 'Registration failed' 
        };
      }
    } catch (error) {
      console.error('❌ Register error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
      delete apiClient.defaults.headers.common['Authorization'];
      dispatch(logout());
      setIsAuthenticated(false);
      toast.success('Logged out successfully');
      router.push('/login');
    }
  };

  // ✅ Check if user is admin
  const isAdmin = () => {
    if (!user) return false;
    return user.role === 'admin' || user.email === 'admin@example.com';
  };

  // ✅ Get current user from localStorage
  const getCurrentUser = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData && userData !== 'undefined' && userData !== 'null') {
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  };

  // ✅ Validate token on mount
  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!token || !storedUser || storedUser === 'undefined' || storedUser === 'null') {
        setIsAuthenticated(false);
        setIsValidating(false);
        return;
      }

      try {
        // Try to validate token
        const response = await apiClient.get('/auth/validate-token');
        if (response.data.valid) {
          // Parse user from localStorage
          try {
            const user = JSON.parse(storedUser);
            dispatch(setCredentials({ user, token }));
            setIsAuthenticated(true);
          } catch (parseError) {
            console.error('Error parsing user:', parseError);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setIsAuthenticated(false);
          }
        } else {
          handleTokenExpired();
        }
      } catch (error) {
        console.error('Token validation error:', error);
        // If validation fails but we have a token, try to use it anyway
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser && storedUser !== 'undefined') {
          try {
            const user = JSON.parse(storedUser);
            dispatch(setCredentials({ user, token }));
            setIsAuthenticated(true);
          } catch (e) {
            handleTokenExpired();
          }
        } else {
          handleTokenExpired();
        }
      } finally {
        setIsValidating(false);
      }
    };

    const handleTokenExpired = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
    };

    validateAuth();
  }, [dispatch]);

  return {
    user,
    token,
    isValidating,
    isAuthenticated,
    loading,
    login,
    register,
    logout: handleLogout,
    isAdmin: isAdmin(),
    isAdminCheck: isAdmin,
    getCurrentUser,
  };
};