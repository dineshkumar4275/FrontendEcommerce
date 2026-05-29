// app/terms/page.js
import Link from 'next/link';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service - ShopHub',
  description: 'Read our terms and conditions',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-600 mt-2">Last updated: January 1, 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Account Terms</h2>
            <p className="text-gray-600">You are responsible for maintaining the security of your account and password.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Ordering and Payments</h2>
            <p className="text-gray-600">All orders are subject to acceptance and availability. Prices are subject to change.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Returns and Refunds</h2>
            <p className="text-gray-600">Please refer to our Return Policy for detailed information about returns and refunds.</p>
          </div>

          <div className="pt-4 text-center">
            <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}