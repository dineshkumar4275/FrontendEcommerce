// frontend/app/login/otp/page.js
import EmailOTPLogin from '@/components/auth/EmailOTPLogin';

export const metadata = {
  title: 'OTP Login - OurStore',
  description: 'Login with OTP',
};

export default function OTPLoginPage() {
  return <EmailOTPLogin />;
}