// app/layout.js
import { Inter, Poppins } from 'next/font/google';
import { Providers } from '../src/store/providers';
import { Footer } from '@/src/components/layout/Footer'; // ✅ FIXED: Added '/layout' to the path
import '../src/styles/globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'ShopHub - Premium E-Commerce',
  description: 'Your one-stop shop for quality products at best prices',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gray-100 min-h-screen flex flex-col`}>
        <Providers>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}