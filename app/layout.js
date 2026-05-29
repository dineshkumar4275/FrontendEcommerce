// // app/layout.js
// import { Inter, Poppins } from 'next/font/google';
// import { Providers } from '../src/store/providers';
// import { Footer } from '@/components/Footer';
// import Link from 'next/link';
// import { ShoppingCart, User, Search, Menu, Sparkles } from 'lucide-react';
// import '../src/styles/globals.css';

// const inter = Inter({ 
//   subsets: ['latin'],
//   variable: '--font-inter',
// });

// const poppins = Poppins({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   variable: '--font-poppins',
// });

// export const metadata = {
//   title: 'ShopHub - Premium E-Commerce',
//   description: 'Your one-stop shop for quality products at best prices',
//   keywords: 'ecommerce, shop, online shopping, best deals',
//   authors: [{ name: 'ShopHub Team' }],
//   viewport: 'width=device-width, initial-scale=1',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gray-50 min-h-screen flex flex-col`}>
//         <Providers>
//           {/* Header / Navbar */}
//           <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
//             <div className="container mx-auto px-4 py-3">
//               <div className="flex items-center justify-between gap-4">
//                 {/* Logo */}
//                 <Link href="/" className="flex items-center gap-2 flex-shrink-0">
//                   <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
//                     <Sparkles className="w-4 h-4 text-white" />
//                   </div>
//                   <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                     ShopHub
//                   </span>
//                 </Link>

//                 {/* Search Bar - Desktop */}
//                 <div className="hidden md:flex flex-1 max-w-md">
//                   <div className="relative w-full">
//                     <input
//                       type="text"
//                       placeholder="Search products..."
//                       className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     />
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   </div>
//                 </div>

//                 {/* Navigation Links */}
//                 <nav className="hidden md:flex items-center gap-6">
//                   <Link href="/" className="text-gray-600 hover:text-purple-600 transition">
//                     Home
//                   </Link>
//                   <Link href="/products" className="text-gray-600 hover:text-purple-600 transition">
//                     Products
//                   </Link>
//                   <Link href="/about" className="text-gray-600 hover:text-purple-600 transition">
//                     About
//                   </Link>
//                   <Link href="/contact" className="text-gray-600 hover:text-purple-600 transition">
//                     Contact
//                   </Link>
//                 </nav>

//                 {/* Action Buttons */}
//                 <div className="flex items-center gap-2">
//                   <Link 
//                     href="/account" 
//                     className="p-2 rounded-lg hover:bg-gray-100 transition"
//                     aria-label="Account"
//                   >
//                     <User className="w-5 h-5 text-gray-600" />
//                   </Link>
//                   <Link 
//                     href="/cart" 
//                     className="p-2 rounded-lg hover:bg-gray-100 transition relative"
//                     aria-label="Cart"
//                   >
//                     <ShoppingCart className="w-5 h-5 text-gray-600" />
//                     <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white text-[10px] rounded-full flex items-center justify-center">
//                       0
//                     </span>
//                   </Link>
//                   <button 
//                     className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
//                     aria-label="Menu"
//                   >
//                     <Menu className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Main Content */}
//           <main className="flex-1">
//             {children}
//           </main>

//           {/* Footer */}
//           <Footer />
//         </Providers>
//       </body>
//     </html>
//   );
// }
// app/layout.js
import { Inter, Poppins } from 'next/font/google';
import { Providers } from '../src/store/providers';
import { Footer } from '@/components/Footer';
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
          {/* Header is already inside your components */}
          <main className="flex-1">
            {children}
          </main>
          {/* ✅ ADD FOOTER HERE */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}