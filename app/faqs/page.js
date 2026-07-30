import { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata = {
  title: 'FAQ - Frequently Asked Questions | Sombustore',
  description: 'Find answers to frequently asked questions about shipping, returns, payments, and more.',
  keywords: 'faq, frequently asked questions, help, support',
  alternates: { canonical: 'https://www.sombu.in//faqs' },
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | Sombustore',
    description: 'Find answers to frequently asked questions.',
    url: 'https://www.sombu.in//faqs',
    siteName: 'Sombustore',
    images: [{ url: '/images/og-faq.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Frequently Asked Questions | Sombustore',
    description: 'Find answers to frequently asked questions.',
    images: ['/images/og-faq.jpg'],
  },
  robots: { index: true, follow: true },
};

// Your FAQ data
const faqs = [
  { question: 'How do I place an order?', answer: 'Simply browse our products, add items to your cart, and proceed to checkout.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Google Pay, and Apple Pay.' },
  { question: 'How long does shipping take?', answer: 'Shipping typically takes 3-5 business days. Free shipping on orders above ₹500.' },
  { question: 'What is your return policy?', answer: 'We offer a 7-day easy return policy. Items must be unused and in original packaging.' },
  { question: 'Do you offer cash on delivery?', answer: 'Yes, we offer cash on delivery for all orders within India.' },
];

export default function FAQPage() {
  return <FAQClient faqs={faqs} />;
}