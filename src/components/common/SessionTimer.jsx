'use client'

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';
import toast from 'react-hot-toast';

export default function SessionTimer() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, tokenExpiry } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !tokenExpiry) return;

    const updateTimer = () => {
      const currentTime = Date.now();
      const remaining = tokenExpiry - currentTime;
      
      if (remaining <= 0) {
        // Session expired
        dispatch(logout());
        toast.error('Session expired! Please login again.', {
          duration: 3000,
          icon: '⏰'
        });
        router.push('/login');
        return;
      }
      
      setTimeLeft(Math.floor(remaining / 1000));
      
      // Show warning when 3 seconds left
      if (remaining <= 3000 && remaining > 0 && !showWarning) {
        setShowWarning(true);
        toast.warning('Session will expire in 3 seconds!', {
          duration: 3000,
          icon: '⚠️'
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [token, tokenExpiry, dispatch, router, showWarning]);

  if (!timeLeft || timeLeft <= 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 ${
        timeLeft <= 5 
          ? 'bg-red-500 text-white animate-pulse' 
          : 'bg-gray-800 text-white'
      }`}>
        ⏰ Session expires in: {timeLeft}s
      </div>
    </div>
  );
}