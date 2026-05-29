// app/privacy/page.js
import Link from 'next/link';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - ShopHub',
  description: 'Learn how we protect your personal information',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mt-2">Last updated: January 1, 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h2>
            <p className="text-gray-600">We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Process your orders and payments</li>
              <li>Communicate with you about your orders</li>
              <li>Improve our products and services</li>
              <li>Send promotional emails (with your consent)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Information Security</h2>
            <p className="text-gray-600">We implement security measures to protect your personal information from unauthorized access.</p>
          </div>

          <div className="pt-4 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}