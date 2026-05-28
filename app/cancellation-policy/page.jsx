// app/cancellation-policy/page.jsx
'use client';

import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import Link from 'next/link';

export default function CancellationPolicyPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 pt-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl font-bold mb-6">Cancellation & Return Policy</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-purple-600">Cancellation Policy</h2>
                <div className="space-y-3 text-gray-600">
                  <p>You can cancel your order within <strong>30 minutes</strong> of placing it if the order status is 'Pending' or 'Confirmed'.</p>
                  <p>Once the order is 'Shipped' or 'Out for Delivery', cancellation is not allowed.</p>
                  <p>To cancel an order:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Go to <Link href="/orders" className="text-purple-600 hover:underline">My Orders</Link></li>
                    <li>Click on the order you want to cancel</li>
                    <li>Click the 'Cancel Order' button</li>
                    <li>Select a reason and confirm</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-purple-600">When CANNOT Cancel?</h2>
                <div className="space-y-3 text-gray-600">
                  <p>❌ After order is shipped</p>
                  <p>❌ Digital products, ebooks, courses</p>
                  <p>❌ Gift cards</p>
                  <p>❌ Personalized/custom items</p>
                  <p>❌ Hygiene products (if opened)</p>
                  <p>❌ Clearance/Final sale items</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-purple-600">Return & Refund Policy</h2>
                <div className="space-y-3 text-gray-600">
                  <p>You can request a return within <strong>7 days</strong> of delivery.</p>
                  <p>Eligibility for return:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Item is damaged/defective</li>
                    <li>Wrong item received</li>
                    <li>Size/ fit issues</li>
                    <li>Quality issues</li>
                  </ul>
                  <p className="mt-3">Refund will be processed within 5-7 business days after pickup/verification.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-purple-600">Non-Returnable Items</h2>
                <div className="space-y-3 text-gray-600">
                  <p>❌ Digital products</p>
                  <p>❌ Gift cards</p>
                  <p>❌ Personalized items</p>
                  <p>❌ Hygiene products (opened)</p>
                  <p>❌ Grocery items</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-purple-600">Refund Process</h2>
                <div className="space-y-3 text-gray-600">
                  <p>💰 Refunds are processed within 5-7 business days</p>
                  <p>💳 Refund method: Same as payment method</p>
                  <p>📦 Pickup arranged within 2-3 business days</p>
                  <p>✅ Quality check post pickup</p>
                </div>
              </section>

              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  ⚠️ For any issues or questions, contact our support team at support@example.com or call +91 9876543210
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}