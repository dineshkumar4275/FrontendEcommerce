// app/faqs/page.js
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import FAQClient from './FAQClient';

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
  return <FAQClient faqs={faqs} />;
}