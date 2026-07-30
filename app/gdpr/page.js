// app/gdpr/page.js
import Link from 'next/link';
import { Shield, User, Database, Eye, Trash, FileText } from 'lucide-react';

export const metadata = {
  title: 'GDPR Compliance -sombustore',
  description: 'Learn about our GDPR compliance and data protection practices.',
};

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            GDPR Compliance
          </h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <User className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Data Rights</h3>
                <p className="text-sm text-gray-600">You have the right to access, modify, or delete your data.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <Database className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Data Storage</h3>
                <p className="text-sm text-gray-600">Your data is stored securely in compliance with GDPR.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <Eye className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Data Transparency</h3>
                <p className="text-sm text-gray-600">We are transparent about how we collect and use your data.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <Trash className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800">Data Deletion</h3>
                <p className="text-sm text-gray-600">You can request deletion of your data at any time.</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-800 mt-6">Our Commitment</h2>
            <p className="text-gray-600">
              We are committed to protecting your privacy and ensuring your data is handled responsibly. 
              Our practices are designed to comply with the General Data Protection Regulation (GDPR).
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}