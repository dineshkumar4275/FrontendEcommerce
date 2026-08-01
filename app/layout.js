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
import AppProvider from "../src/providers/Appprovider";
import { Header } from "../src/components/layout/Header";
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
  description: "Discover premium fashion and clothing at Sombu Store. Shop the latest trends in ethnic wear, western wear, and accessories.",
  keywords: "fashion, clothing, ethnic wear, western wear, accessories, online shopping",
  authors: [{ name: "Sombu Store" }],
  creator: "Sombu Store",
  publisher: "Sombu Store",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.sombustore.in",
    siteName: "Sombu Store",
    title: "Sombu Store | Premium Fashion & Clothing Online",
    description: "Discover premium fashion and clothing at Sombu Store. Shop the latest trends in ethnic wear, western wear, and accessories.",
    images: [
      {
        url: "/new-logo.png",
        width: 1200,
        height: 630,
        alt: "Sombu Store - Premium Fashion & Clothing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sombu Store | Premium Fashion & Clothing Online",
    description: "Discover premium fashion and clothing at Sombu Store. Shop the latest trends in ethnic wear, western wear, and accessories.",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: "/new-logo.png",
    apple: "/new-logo.png",
  },
};

// ✅ ADD THIS VIEWPORT EXPORT
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gray-100 min-h-screen flex flex-col`}
      >
        <AppProvider>
          <Providers>
            <Header />
            <main className="flex-1">{children}</main>
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
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}