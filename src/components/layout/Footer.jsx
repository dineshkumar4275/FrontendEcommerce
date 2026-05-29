// components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Returns', href: '/returns' },
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Track Order', href: '/track-order' },
      ],
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
        { name: 'Disclaimer', href: '/disclaimer' },
      ],
    },
    account: {
      title: 'Account',
      links: [
        { name: 'My Account', href: '/account' },
        { name: 'Orders', href: '/orders' },
        { name: 'Wishlist', href: '/wishlist' },
        { name: 'Cart', href: '/cart' },
        { name: 'Settings', href: '/settings' },
      ],
    },
  };

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold inline-block mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ShopHub
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              Your one-stop destination for all your shopping needs. Quality products, best prices, and fast delivery.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {Object.values(footerSections).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              &copy; {currentYear} ShopHub. All rights reserved.
            </p>
            <div className="flex gap-3">
              <span className="text-gray-400 text-sm">Visa</span>
              <span className="text-gray-400 text-sm">Mastercard</span>
              <span className="text-gray-400 text-sm">PayPal</span>
              <span className="text-gray-400 text-sm">Apple Pay</span>
              <span className="text-gray-400 text-sm">Google Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};