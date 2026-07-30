import { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata = {
  title: 'Cart - Your Store',
  description: 'View your shopping cart.',
  alternates: { canonical: 'https://yourstore.com/cart' },
  robots: { index: false, follow: false }, // Noindex
};

export default function CartPage() {
  return <CartClient />;
}