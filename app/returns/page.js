// app/returns/page.js
import Link from 'next/link';
import { RefreshCw, CheckCircle, Truck, Clock, Shield, CreditCard } from 'lucide-react';

export const metadata = {
  title: 'Returns & Refunds - FrontendEcommerce',
  description: 'Our return policy and refund process',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Returns & Refunds
            </h1>
            <p className="text-gray-600 mt-4 text-lg">Our simple return process</p>
          </div>

          {/* Steps */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">How to Return an Item</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-yellow-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Request Return</h3>
                <p className="text-sm text-gray-600">Submit return request in your account</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-yellow-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Pack & Ship</h3>
                <p className="text-sm text-gray-600">Pack item and ship back to us</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-bold text-yellow-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Get Refund</h3>
                <p className="text-sm text-gray-600">Refund processed within 5-7 days</p>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Return Policy</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>30-day return window from delivery date</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Items must be unused and in original packaging</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Free returns for defective or damaged items</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>Refund issued to original payment method</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-yellow-600 hover:text-yellow-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}