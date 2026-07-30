// app/layout.js

import { Inter, Poppins } from "next/font/google";
import { Providers } from "../src/store/providers";
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
    google: "google-site-verification: googleb181e800db31c273.html",
  },

  description:
    "Shop premium oversized t-shirts, hoodies, shirts, cargos and fashion essentials online. Fast delivery, secure payments and easy returns across India.",

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
    "dressshop online",
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
      "Shop premium oversized t-shirts, hoodies, shirts and fashion products online.",

    images: [
      {
        url: "/images/og-image.jpg",
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
      "Premium fashion & clothing online.",

    images: ["/images/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gray-100 min-h-screen flex flex-col`}
      >
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}