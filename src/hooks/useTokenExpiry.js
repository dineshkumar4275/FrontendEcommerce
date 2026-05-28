// 'use client'

// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { logout } from '@/store/slices/authSlice';
// import toast from 'react-hot-toast';

// export const useTokenExpiry = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     const checkTokenExpiry = () => {
//       const token = localStorage.getItem('token');
//       if (!token) return;

//       try {
//         // Decode JWT token to get expiry
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const expiryTime = payload.exp * 1000; // Convert to milliseconds
//         const currentTime = Date.now();
//         const timeLeft = expiryTime - currentTime;

//         console.log(`⏰ Token expires in: ${Math.floor(timeLeft / 1000)} seconds`);

//         if (timeLeft <= 0) {
//           // Token already expired
//           handleLogout();
//         } else {
//           // Set timeout to logout when token expires
//           const timeoutId = setTimeout(() => {
//             console.log('🔐 Token expired - logging out');
//             handleLogout();
//           }, timeLeft);

//           return () => clearTimeout(timeoutId);
//         }
//       } catch (error) {
//         console.error('Error checking token expiry:', error);
//       }
//     };

//     const handleLogout = () => {
//       dispatch(logout());
//       toast.error('Session expired! Please login again.', {
//         duration: 3000,
//         icon: '⏰'
//       });
//       router.push('/login');
//     };

//     checkTokenExpiry();
    
//     // Also check on page visibility change
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'visible') {
//         checkTokenExpiry();
//       }
//     };
    
//     document.addEventListener('visibilitychange', handleVisibilityChange);
    
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, [dispatch, router]);
// };

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { toast } from 'react-hot-toast';

export const useTokenExpiry = () => {
  const { token, logoutUser } = useAuth();
  const [timeLeft, setTimeLeft] = useState(null);
  const [isExpiring, setIsExpiring] = useState(false);

  useEffect(() => {
    if (!token) return;

    // Decode JWT token to get expiry
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiry = expiryTime - currentTime;

      if (timeUntilExpiry <= 0) {
        logoutUser();
        toast.error('Session expired. Please login again.');
        return;
      }

      setTimeLeft(timeUntilExpiry);

      // Show warning 5 minutes before expiry
      const warningTime = 5 * 60 * 1000; // 5 minutes
      if (timeUntilExpiry <= warningTime) {
        setIsExpiring(true);
        toast.warning(
          'Your session will expire in 5 minutes. Please save your work.',
          { duration: 10000 }
        );
      }

      // Set timeout for auto logout
      const timeout = setTimeout(() => {
        logoutUser();
        toast.error('Session expired. Please login again.');
      }, timeUntilExpiry);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, [token, logoutUser]);

  // Format time left
  const formatTimeLeft = () => {
    if (!timeLeft) return null;
    
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  // Extend session
  const extendSession = async () => {
    try {
      const response = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        toast.success('Session extended!');
        setIsExpiring(false);
      } else {
        toast.error('Failed to extend session. Please save your work.');
      }
    } catch (error) {
      toast.error('Failed to extend session');
    }
  };

  return {
    timeLeft,
    formattedTimeLeft: formatTimeLeft(),
    isExpiring,
    extendSession,
  };
};