// // app/layout.js

// import { Inter, Poppins } from "next/font/google";
// import { Providers } from "../src/store/providers";
// import "../src/styles/globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-poppins",
// });

// export const metadata = {
//   metadataBase: new URL("https://www.sombustore.in"),

//   title: {
//     default: "Sombu Store | Premium Fashion & Clothing Online",
//     template: "%s | Sombu Store",
//   },

//   verification: {
//     google: "mU95eQ4I6n2hX9jrd-kHnA5Dh_G5PMXmtUV2GD368l8",
//   },

//   description:
//     "Shop premium oversized t-shirts, hoodies, shirts, cargo pants and fashion essentials online. Fast delivery, secure payments and easy returns across India.",

//   authors: [
//     {
//       name: "Sombu Store",
//     },
//   ],

//   creator: "Sombu Store",

//   publisher: "Sombu Store",

//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//       "max-video-preview": -1,
//     },
//   },

//   alternates: {
//     canonical: "https://www.sombustore.in",
//   },

//   openGraph: {
//     type: "website",
//     locale: "en_IN",
//     url: "https://www.sombustore.in",
//     siteName: "Sombu Store",
//     title: "Sombu Store | Premium Fashion & Clothing Online",
//     description:
//       "Shop premium oversized t-shirts, hoodies, shirts, cargo pants and fashion essentials online.",

//     images: [
//       {
//         url: "https://www.sombustore.in/images/og-image.jpg",
//         width: 1200,
//         height: 630,
//         alt: "Sombu Store",
//       },
//     ],
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Sombu Store",
//     description:
//       "Premium fashion & clothing online.",

//     images: [
//       "https://www.sombustore.in/images/og-image.jpg",
//     ],
//   },

//   icons: {
//     icon: "/favicon.ico",
//     apple: "/apple-touch-icon.png",
//   },

//   category: "shopping",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gray-100 min-h-screen flex flex-col`}
//       >
//         <Providers>
//           <main className="flex-1">{children}</main>
//         </Providers>
//       </body>
//     </html>
//   );
// }
// app/layout.jsx

import { Inter, Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Providers } from "../src/store/providers";
import AppProvider from "../src/providers/Appprovider";  // ✅ Default import, correct case
import GlobalSelector from "../src/components/GlobalSelector";  // ✅ Default import (check this too)
import "../src/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://www.sombustore.in"),

  title: {
    default: "Sombu Store | Premium Fashion & Clothing Online",
    template: "%s | Sombu Store",
  },

  verification: {
    google: "mU95eQ4I6n2hX9jrd-kHnA5Dh_G5PMXmtUV2GD368l8",
  },

  description:
    "Shop premium oversized t-shirts, hoodies, shirts, cargo pants and fashion essentials online. Fast delivery, secure payments and easy returns across India.",

  keywords: [
    "Sombu Store",
    "online clothing store",
    "oversized t shirts",
    "premium fashion",
    "men clothing",
    "women clothing",
    "streetwear",
    "hoodies",
    "shirts",
    "cargo pants",
    "fashion india",
  ],

  authors: [
    {
      name: "Sombu Store",
    },
  ],

  creator: "Sombu Store",

  publisher: "Sombu Store",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.sombustore.in",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.sombustore.in",
    siteName: "Sombu Store",
    title: "Sombu Store | Premium Fashion & Clothing Online",
    description:
      "Shop premium oversized t-shirts, hoodies, shirts, cargo pants and fashion essentials online.",
    images: [
      {
        url: "https://www.sombustore.in/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sombu Store",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sombu Store",
    description: "Premium fashion & clothing online.",
    images: [
      "https://www.sombustore.in/images/og-image.jpg",
    ],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gray-100 min-h-screen flex flex-col`}
      >
        <AppProvider>
          <Providers>
            {/* Header with Global Selector */}
            <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Sombu Store
                    </span>
                  </div>

                  {/* Navigation - Center */}
                  <nav className="hidden md:flex items-center gap-6">
                    <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Home
                    </a>
                    <a href="/products" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Products
                    </a>
                    <a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      About
                    </a>
                    <a href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      Contact
                    </a>
                  </nav>

                  {/* Right Side - Global Selector */}
                  <div className="flex items-center gap-3">
                    <GlobalSelector />
                    
                    {/* Cart Icon */}
                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
                      <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                        0
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    © 2024 Sombu Store. All rights reserved.
                  </p>
                  <div className="flex items-center gap-4">
                    <a href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                      Privacy
                    </a>
                    <a href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                      Terms
                    </a>
                    <a href="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </Providers>
        </AppProvider>
      </body>

      {/* Google Analytics */}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}