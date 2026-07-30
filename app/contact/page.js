import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us - Your Store | Get in Touch',
  description: 'Get in touch with Your Store. We\'re here to help with your queries about products, orders, and more.',
  keywords: 'contact, support, help, customer service',
  alternates: { canonical: 'https://yourstore.com/contact' },
  openGraph: {
    title: 'Contact Us - Your Store | Get in Touch',
    description: 'Get in touch with Your Store.',
    url: 'https://yourstore.com/contact',
    siteName: 'Your Store',
    images: [{ url: '/images/og-contact.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Your Store | Get in Touch',
    description: 'Get in touch with Your Store.',
    images: ['/images/og-contact.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactClient />;
}