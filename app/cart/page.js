import { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata = {
  title: 'Cart - Sombustore',
  description: 'View your shopping cart.',
  alternates: { canonical: 'https://www.sombu.in//cart' },
  robots: { index: false, follow: false }, // Noindex
};

export default function CartPage() {
  return <CartClient />;
}