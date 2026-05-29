// app/gdpr/page.js
import Link from 'next/link';
import { Shield, UserCheck, Database, Eye, Trash2, FileText } from 'lucide-react';

export const metadata = {
  title: 'GDPR Compliance - ShopHub',
  description: 'Your data protection rights under GDPR',
};

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            GDPR Compliance
          </h1>
          <p className="text-gray-600 mt-2">Your data protection rights under EU law</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-500" />
              Your Rights Under GDPR
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Right to access - Request a copy of your data</li>
              <li>Right to rectification - Correct inaccurate data</li>
              <li>Right to erasure - Request deletion of your data</li>
              <li>Right to restrict processing - Limit how we use your data</li>
              <li>Right to data portability - Transfer your data elsewhere</li>
              <li>Right to object - Object to certain data processing</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-500" />
              What Data We Collect
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Name and contact information</li>
              <li>Email address and phone number</li>
              <li>Order history and preferences</li>
              <li>IP address and browsing data</li>
              <li>Payment information</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-500" />
              Data Retention
            </h2>
            <p className="text-gray-600">
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, 
              including for the purposes of satisfying any legal, accounting, or reporting requirements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-blue-500" />
              How to Exercise Your Rights
            </h2>
            <p className="text-gray-600">
              To exercise any of your GDPR rights, please contact us at{' '}
              <a href="mailto:privacy@shophub.com" className="text-blue-600 hover:text-blue-700">
                privacy@shophub.com
              </a>
              . We will respond to your request within 30 days.
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Data Controller Information</h3>
            <p className="text-sm text-blue-700">
              ShopHub Inc.<br />
              123 E-commerce Street<br />
              New York, NY 10001<br />
              Email: dpo@shophub.com
            </p>
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