// app/cookies/page.js
import Link from 'next/link';
import { Cookie, Shield, Eye, Database } from 'lucide-react';

export const metadata = {
  title: 'Cookie Policy - ShopHub',
  description: 'Learn about how we use cookies on our website',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-gray-600 mt-2">Last updated: January 1, 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">What Are Cookies</h2>
            <p className="text-gray-600">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They help us provide you with a better experience and improve our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Cookies</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Essential cookies - Required for website functionality</li>
              <li>Analytics cookies - Help us understand how visitors use our site</li>
              <li>Functional cookies - Remember your preferences and settings</li>
              <li>Advertising cookies - Deliver relevant ads to you</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Managing Cookies</h2>
            <p className="text-gray-600">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer 
              and set most browsers to prevent them from being placed. However, doing this may prevent you from using certain features on our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Cookies</h2>
            <p className="text-gray-600">
              We may also use third-party services that place cookies on our behalf for analytics and advertising purposes. 
              These include Google Analytics, Facebook Pixel, and other marketing platforms.
            </p>
          </div>

          <div className="pt-4 text-center">
            <Link href="/" className="text-yellow-600 hover:text-yellow-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}