'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import apiClient from '../../lib/apiClient';
import toast from 'react-hot-toast';

export default function EmailOTPLogin() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const emailInputRef = useRef(null);
  const otpInputRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (mounted && step === 'email' && emailInputRef.current) emailInputRef.current.focus();
    if (mounted && step === 'otp' && otpInputRef.current) otpInputRef.current.focus();
  }, [mounted, step]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOTP = async () => {
    if (!email) { toast.error('Please enter your email address'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { toast.error('Please enter a valid email address'); return; }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/send-otp', { email });
      if (response.data.success) {
        toast.success('OTP sent to your email!');
        setStep('otp');
        setTimer(60);
        setResendDisabled(true);
        if (response.data.testOTP) {
          console.log('Test OTP:', response.data.testOTP);
          toast.success(`Test OTP: ${response.data.testOTP}`, { duration: 10000 });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) { toast.error('Please enter valid 6-digit OTP'); return; }

    setLoading(true);
    try {
      const response = await apiClient.post('/auth/verify-otp', { email, otp });
      if (response.data.success) {
        const { token, user, isNewUser } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch(setCredentials({ user, token }));
        
        if (isNewUser) {
          toast.success(`🎉 Welcome ${user.name}! Account created successfully!`);
        } else {
          toast.success(`👋 Welcome back, ${user.name}!`);
        }
        
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin');
        router.push(redirectUrl);
      } else {
        toast.error(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;
    setResendDisabled(true);
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/send-otp', { email });
      if (response.data.success) {
        setTimer(60);
        toast.success('OTP resent successfully');
      }
    } catch (error) {
      toast.error('Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9900]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-[#FF9900] to-[#FF8800] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <span className="text-4xl">🛍️</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            {step === 'email' ? 'Welcome to OurStore' : 'Verify Your Email'}
          </h2>
        </div>

        {step === 'email' && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
              <input ref={emailInputRef} type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#FF9900]" placeholder="Enter your email address" onKeyPress={(e) => e.key === 'Enter' && handleSendOTP()} />
            </div>
            <button onClick={handleSendOTP} disabled={loading || !email} className="w-full bg-gradient-to-r from-[#FF9900] to-[#FF8800] text-white py-3 rounded-lg font-semibold disabled:opacity-50">
              {loading ? 'Sending OTP...' : 'Continue with Email'}
            </button>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-start gap-2">
                <span className="text-[#FF9900] text-xl">✨</span>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-[#FF9900] mb-1">No Registration Needed!</p>
                  <p>✓ Enter your email ✓ Receive OTP ✓ Verify and you're in!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 text-center font-medium">Enter 6-Digit OTP</label>
              <input ref={otpInputRef} type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} maxLength={6} className="w-full text-center text-2xl py-3 border-2 border-gray-200 rounded-lg tracking-wider" placeholder="000000" onKeyPress={(e) => e.key === 'Enter' && handleVerifyOTP()} />
              <p className="text-xs text-gray-500 text-center mt-2">OTP expires in {timer} seconds</p>
            </div>
            <button onClick={handleVerifyOTP} disabled={loading || otp.length !== 6} className="w-full bg-gradient-to-r from-[#FF9900] to-[#FF8800] text-white py-3 rounded-lg font-semibold disabled:opacity-50">
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <div className="text-center">
              <button onClick={handleResendOTP} disabled={resendDisabled} className="text-sm text-[#FF9900] disabled:text-gray-400">
                {resendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
              </button>
            </div>
            <div className="text-center">
              <button onClick={() => { setStep('email'); setOtp(''); setTimer(0); }} className="text-sm text-gray-500 hover:text-gray-700">← Use different email</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}