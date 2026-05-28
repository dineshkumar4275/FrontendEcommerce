// app/layout.js
import { Inter, Poppins } from 'next/font/google';
import { Providers } from '../src/store/providers';
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
  title: 'OurStore - Premium E-Commerce',
  description: 'Your one-stop shop for everything you need',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gray-100`}>
        <Providers>
          {children}
          {/* ✅ NO Toaster here - already in Providers */}
        </Providers>
      </body>
    </html>
  );
}