// app/help/page.js
import Link from 'next/link';
import { HelpCircle, ShoppingBag, Truck, CreditCard, RefreshCw, Shield, MessageCircle, FileText } from 'lucide-react';

export const metadata = {
  title: 'Help Center - FrontendEcommerce',
  description: 'Find answers to your questions and get support',
};

const helpTopics = [
  { icon: ShoppingBag, title: 'Orders', description: 'Track, modify, or cancel your orders', link: '/help/orders' },
  { icon: Truck, title: 'Shipping', description: 'Delivery times, costs, and tracking', link: '/help/shipping' },
  { icon: CreditCard, title: 'Payments', description: 'Payment methods and billing', link: '/help/payments' },
  { icon: RefreshCw, title: 'Returns', description: 'Return policy and process', link: '/help/returns' },
  { icon: Shield, title: 'Account Security', description: 'Protect your account', link: '/help/security' },
  { icon: MessageCircle, title: 'Contact Us', description: 'Get in touch with support', link: '/contact' },
];

const faqs = [
  { question: 'How do I track my order?', answer: 'Go to Orders section in your account and click "Track Order".' },
  { question: 'What is your return policy?', answer: '30-day return policy for unused items in original packaging.' },
  { question: 'How long does shipping take?', answer: 'Standard shipping takes 3-5 business days.' },
  { question: 'Do you offer international shipping?', answer: 'Yes, we ship to over 50 countries worldwide.' },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="text-gray-600 mt-4 text-lg">How can we help you today?</p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full px-5 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Help Topics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {helpTopics.map((topic, idx) => {
              const Icon = topic.icon;
              return (
                <Link key={idx} href={topic.link} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topic.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Still Need Help */}
          <div className="mt-8 text-center">
            <Link href="/contact" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
              <MessageCircle className="w-4 h-4" />
              Still need help? Contact us
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-gray-500 hover:text-gray-600 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}