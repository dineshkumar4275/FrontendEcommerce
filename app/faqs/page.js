// app/faqs/page.js
import FAQClient from './FAQClient';

export const metadata = {
  title: 'FAQs - ShopHub',
  description: 'Frequently asked questions',
};

// Your FAQ data
const faqs = [
  {
    q: "How do I place an order?",
    a: "Simply browse our products, add items to your cart, and proceed to checkout.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Google Pay, and Apple Pay.",
  },
  // Add your other FAQs here...
];

export default function FAQsPage() {
  return <FAQClient faqs={faqs} />;
}