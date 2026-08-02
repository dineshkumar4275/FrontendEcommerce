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

  description:
    "Discover premium fashion and clothing at Sombu Store. Shop the latest trends in ethnic wear, western wear, and accessories.",

  keywords: [
    "fashion",
    "clothing",
    "online shopping",
    "ethnic wear",
    "western wear",
    "Sombu Store",
  ],

  authors: [{ name: "Sombu Store" }],
  creator: "Sombu Store",
  publisher: "Sombu Store",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.sombustore.in",
    siteName: "Sombu Store",
    title: "Sombu Store | Premium Fashion & Clothing Online",
    description:
      "Discover premium fashion and clothing at Sombu Store.",
    images: [
      {
        url: "/new-logo.png",
        width: 1200,
        height: 630,
        alt: "Sombu Store",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sombu Store",
    description:
      "Discover premium fashion and clothing at Sombu Store.",
    images: ["/twitter-image.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gray-100 min-h-screen flex flex-col`}
      >
        {/* ✅ AppProvider must wrap everything */}
        <AppProvider>
          <Providers>
            <Header />
            <main className="flex-1">{children}</main>
          </Providers>
        </AppProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}