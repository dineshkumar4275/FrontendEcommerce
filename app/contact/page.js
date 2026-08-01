import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us - Sombustore | Get in Touch',
  description: 'Get in touch with Sombustore. We\'re here to help with your queries about products, orders, and more.',
  keywords: 'contact, support, help, customer service',
  alternates: { canonical: 'https://www.sombu.in//contact' },
  openGraph: {
    title: 'Contact Us - Sombustore | Get in Touch',
    description: 'Get in touch with Sombustore.',
    url: 'https://www.sombu.in//contact',
    siteName: 'Sombustore',
    images: [{ url: '/favicon.ico', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Sombustore | Get in Touch',
    description: 'Get in touch with Sombustore.',
    images: ['/favicon.ico'],
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactClient />;
}