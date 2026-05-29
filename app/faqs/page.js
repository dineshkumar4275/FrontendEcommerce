// app/faqs/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'FAQs - ShopHub',
  description: 'Frequently asked questions',
};

const faqs = [
  {
    q: "How do I place an order?",
    a: "Simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in to complete your purchase."
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Google Pay, Apple Pay, and Cash on Delivery."
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping takes 7-14 business days."
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard."
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day return policy for unused items in original packaging. Free returns for defective items."
  },
  {
    q: "How do I contact customer support?",
    a: "You can contact us via email at support@shophub.com, call us at +1 (800) 123-4567, or use our live chat feature."
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mt-2">Find answers to common questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800 text-left">{faq.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-purple-600 hover:text-purple-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}