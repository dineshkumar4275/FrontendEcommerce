// app/shipping/page.js
import Link from 'next/link';
import { Truck, Clock, Globe, MapPin, Package, CreditCard } from 'lucide-react';

export const metadata = {
  title: 'Shipping Information - FrontendEcommerce',
  description: 'Shipping rates, delivery times, and tracking',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Shipping Information
            </h1>
            <p className="text-gray-600 mt-4 text-lg">Fast, reliable delivery worldwide</p>
          </div>

          {/* Shipping Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <Package className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Standard Shipping</h3>
              <p className="text-sm text-gray-600">3-5 business days</p>
              <p className="text-lg font-bold text-gray-800 mt-2">$4.99</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <Clock className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Express Shipping</h3>
              <p className="text-sm text-gray-600">1-2 business days</p>
              <p className="text-lg font-bold text-gray-800 mt-2">$9.99</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <Globe className="w-10 h-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">International</h3>
              <p className="text-sm text-gray-600">7-14 business days</p>
              <p className="text-lg font-bold text-gray-800 mt-2">$19.99</p>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Free Shipping</h3>
                  <p className="text-gray-600">Free standard shipping on orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Order Tracking</h3>
                  <p className="text-gray-600">Track your order with real-time updates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800">Secure Delivery</h3>
                  <p className="text-gray-600">Signature required for high-value items</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}