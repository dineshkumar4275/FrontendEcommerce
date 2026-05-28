// components/auth/SimpleEmailOTPLogin.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export default function SimpleEmailOTPLogin() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { sendOTP, otpLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOTP = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    const result = await sendOTP(email);
    
    if (result.success) {
      setStep('otp');
      setTimer(60);
      
      if (result.testOTP) {
        console.log('Test OTP:', result.testOTP);
        toast.success(`Test OTP: ${result.testOTP}`, { duration: 10000 });
      }
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter valid 6-digit OTP');
      return;
    }

    setLoading(true);
    const result = await otpLogin(email, otp);
    
    if (result.success) {
      router.push('/');
      router.refresh();
    }
    setLoading(false);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-[#FF9900] to-[#FF8800] rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">🛍️</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">
            {step === 'email' ? 'Welcome to OurStore' : 'Verify Your Email'}
          </h2>
          <p className="text-gray-600 mt-2">
            {step === 'email' 
              ? 'Enter your email to login or sign up' 
              : `OTP sent to ${email}`}
          </p>
        </div>

        {step === 'email' && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-transparent transition"
                placeholder="Enter your email address"
                onKeyPress={(e) => e.key === 'Enter' && handleSendOTP()}
              />
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading || !email}
              className="w-full bg-gradient-to-r from-[#FF9900] to-[#FF8800] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Continue with Email'}
            </button>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-start space-x-2">
                <span className="text-[#FF9900] text-xl">✨</span>
                <div className="text-xs text-gray-700">
                  <p className="font-semibold text-[#FF9900] mb-1">No Registration Needed!</p>
                  <p>✓ Enter your email</p>
                  <p>✓ Receive OTP</p>
                  <p>✓ Verify and you're in!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 text-center font-medium">
                Enter 6-Digit OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="w-full text-center text-2xl py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9900] tracking-wider"
                placeholder="000000"
                onKeyPress={(e) => e.key === 'Enter' && handleVerifyOTP()}
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                OTP expires in {timer} seconds
              </p>
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              className="w-full bg-gradient-to-r from-[#FF9900] to-[#FF8800] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>

            <div className="text-center">
              <button
                onClick={async () => {
                  setLoading(true);
                  await sendOTP(email);
                  setTimer(60);
                  setLoading(false);
                }}
                disabled={timer > 0}
                className="text-sm text-[#FF9900] hover:text-[#FF8800] disabled:text-gray-400"
              >
                {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setTimer(0);
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Use different email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}