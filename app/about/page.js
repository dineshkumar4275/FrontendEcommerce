// app/about/page.js
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About Us - FrontendEcommerce',
  description: 'Learn more about our company and mission',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-gray-600 mt-4 text-lg">Learn more about our story and mission</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Welcome to FrontendEcommerce, your trusted online shopping destination. 
                We started with a simple mission: to provide high-quality products at affordable prices, 
                with exceptional customer service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize the online shopping experience by offering a seamless, 
                secure, and enjoyable platform where customers can find everything they need 
                in one place.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Why Choose Us?</h2>
              <ul className="space-y-2 text-gray-600">
                <li>✓ Wide selection of quality products</li>
                <li>✓ Competitive prices and regular deals</li>
                <li>✓ Fast and reliable shipping</li>
                <li>✓ Secure payment options</li>
                <li>✓ 24/7 customer support</li>
              </ul>
            </div>

            <div className="pt-4">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}