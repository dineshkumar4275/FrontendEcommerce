import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import apiClient from '../lib/apiClient';
import toast from 'react-hot-toast';

export const useAuth = (redirectTo = '/login') => {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const validateAuth = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        handleNoAuth();
        setIsValidating(false);
        return;
      }

      try {
        const response = await apiClient.get('/auth/validate-token');
        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          handleTokenExpired();
        }
      } catch (error) {
        handleTokenExpired();
      } finally {
        setIsValidating(false);
      }
    };

    const handleNoAuth = () => {
      setIsAuthenticated(false);
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      toast.error('Please login to continue');
      router.push(redirectTo);
    };

    const handleTokenExpired = () => {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(logout());
      toast.error('Session expired. Please login again.');
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push(redirectTo);
    };

    validateAuth();
  }, [router, dispatch, redirectTo]);

  return { isValidating, isAuthenticated };
};