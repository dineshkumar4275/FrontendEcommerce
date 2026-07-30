import { Metadata } from 'next';

export const metadata = {
  title: 'Privacy Policy - Your Store',
  description: 'Learn about our privacy policy. We value your privacy and protect your data.',
  keywords: 'privacy policy, privacy, data protection',
  alternates: { canonical: 'https://yourstore.com/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
          Privacy Policy
        </h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <p className="text-gray-600">Last updated: July 2024</p>
          <p className="text-gray-600">Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.</p>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Name and contact information</li>
              <li>Payment information</li>
              <li>Order history</li>
              <li>Device and browser information</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Process your orders</li>
              <li>Send order updates</li>
              <li>Improve our services</li>
              <li>Send promotional offers (with your consent)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Security</h2>
            <p className="text-gray-600">We implement appropriate security measures to protect your personal information.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
            <p className="text-gray-600">If you have any questions about this policy, please contact us at privacy@yourstore.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}