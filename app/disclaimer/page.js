// app/disclaimer/page.js
import Link from 'next/link';
import { AlertTriangle, Info, Shield, FileWarning } from 'lucide-react';

export const metadata = {
  title: 'Disclaimer - ShopHub',
  description: 'Legal disclaimer and terms of use',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Disclaimer
          </h1>
          <p className="text-gray-600 mt-2">Last updated: January 1, 2024</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-6">
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-800">
                The information provided on this website is for general informational purposes only.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FileWarning className="w-5 h-5 text-orange-500" />
              General Information
            </h2>
            <p className="text-gray-600">
              The content on this website is provided "as is" without any representations or warranties, 
              express or implied. ShopHub makes no representations or warranties in relation to the 
              completeness, accuracy, reliability, suitability, or availability of the information contained on this website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Product Information</h2>
            <p className="text-gray-600">
              Product images are for illustration purposes only. Actual products may vary slightly from the images shown. 
              We strive to display accurate product information, but we cannot guarantee that colors, specifications, 
              or details are completely error-free.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Pricing Disclaimer</h2>
            <p className="text-gray-600">
              Prices are subject to change without notice. We reserve the right to modify or discontinue any product 
              at any time without prior notice. In the event of a pricing error, we reserve the right to cancel 
              any orders placed with incorrect pricing.
          </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">External Links</h2>
            <p className="text-gray-600">
              Our website may contain links to external websites. We have no control over the content and practices 
              of these sites and cannot accept responsibility or liability for their respective privacy policies or terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Limitation of Liability</h2>
            <p className="text-gray-600">
              To the fullest extent permitted by law, ShopHub shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
              directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </div>

          <div className="pt-4 text-center">
            <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}