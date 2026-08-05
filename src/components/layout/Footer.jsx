// // src/components/Footer.jsx
// import React from 'react';
// import Link from 'next/link';
// import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
// import { Sparkles } from 'lucide-react';
// import Image from 'next/image'; 

// export const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const footerSections = {
//     company: {
//       title: 'Company',
//       links: [
//         { name: 'About Us', href: '/about' },
//         { name: 'Careers', href: '/careers' },
//         { name: 'Press', href: '/press' },
//         { name: 'Blog', href: '/blog' },
//       ],
//     },
//     support: {
//       title: 'Support',
//       links: [
//         { name: 'Help Center', href: '/help' },
//         { name: 'Contact Us', href: '/contact' },
//         { name: 'Returns', href: '/returns' },
//         { name: 'Shipping Info', href: '/shipping' },
//         { name: 'FAQs', href: '/faqs' },
//         { name: 'Track Order', href: '/track-order' },
//       ],
//     },
//     legal: {
//       title: 'Legal',
//       links: [
//         { name: 'Privacy Policy', href: '/privacy' },
//         { name: 'Terms of Service', href: '/terms' },
//         { name: 'Cookie Policy', href: '/cookies' },
//         { name: 'GDPR', href: '/gdpr' },
//         { name: 'Disclaimer', href: '/disclaimer' },
//       ],
//     },
//     account: {
//       title: 'Account',
//       links: [
//         { name: 'My Account', href: '/account' },
//         { name: 'Orders', href: '/orders' },
//         { name: 'Wishlist', href: '/wishlist' },
//         { name: 'Cart', href: '/cart' },
//         { name: 'Settings', href: '/settings' },
//       ],
//     },
//   };

//   return (
//     <footer className="bg-gray-900 text-white mt-auto">
//       <div className="container mx-auto px-4 py-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
//           {/* Brand Section */}
//           <div className="lg:col-span-2">
//             <Link href="/" className="flex items-center gap-2 inline-flex mb-4">
//               <Image 
//     src="/favicon.ico"  // Your logo image in public folder
//     alt="Sombu Store Logo"
//     width={40}
//     height={40}
//     className="object-contain"
//     priority
//   />
             
//             </Link>
//             <p className="text-gray-400 mb-4 text-sm">
//               Your one-stop destination for all your shopping needs. Quality products, best prices, and fast delivery.
//             </p>
//             <div className="flex gap-4">
//               <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
//                 <FaFacebook size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
//                 <FaTwitter size={20} />
//               </a>
//               <a href="https://www.instagram.com/sombustore/" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
//                 <FaInstagram size={20} />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
//                 <FaLinkedin size={20} />
//               </a>
//             </div>
//           </div>

//           {Object.values(footerSections).map((section) => (
//             <div key={section.title}>
//               <h3 className="font-semibold mb-4 text-white">{section.title}</h3>
//               <ul className="space-y-2">
//                 {section.links.map((link) => (
//                   <li key={link.name}>
//                     <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors text-sm">
//                       {link.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         <div className="border-t border-gray-800 mt-8 pt-8">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <p className="text-gray-400 text-sm">&copy; {currentYear} Sombustore. All rights reserved.</p>
//             <div className="flex gap-3">
//               <span className="text-gray-400 text-xs">Visa</span>
//               <span className="text-gray-400 text-xs">Mastercard</span>
//               <span className="text-gray-400 text-xs">PayPal</span>
//               <span className="text-gray-400 text-xs">Apple Pay</span>
//               <span className="text-gray-400 text-xs">Google Pay</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };
// src/components/Footer.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import { useApp } from '../../hooks/useApp'; // ✅ Import useApp hook

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useApp(); // ✅ Get translation function

  // ✅ All text now uses t() function
  const footerSections = {
    company: {
      title: t('company') || 'Company',
      links: [
        { name: t('about_us') || 'About Us', href: '/about' },
        { name: t('careers') || 'Careers', href: '/careers' },
        { name: t('press') || 'Press', href: '/press' },
        { name: t('blog') || 'Blog', href: '/blog' },
      ],
    },
    support: {
      title: t('support') || 'Support',
      links: [
        { name: t('help_center') || 'Help Center', href: '/help' },
        { name: t('contact_us') || 'Contact Us', href: '/contact' },
        { name: t('returns') || 'Returns', href: '/returns' },
        { name: t('shipping_info') || 'Shipping Info', href: '/shipping' },
        { name: t('faqs') || 'FAQs', href: '/faqs' },
        { name: t('track_order') || 'Track Order', href: '/track-order' },
      ],
    },
    legal: {
      title: t('legal') || 'Legal',
      links: [
        { name: t('privacy_policy') || 'Privacy Policy', href: '/privacy' },
        { name: t('terms_of_service') || 'Terms of Service', href: '/terms' },
        { name: t('cookie_policy') || 'Cookie Policy', href: '/cookies' },
        { name: t('gdpr') || 'GDPR', href: '/gdpr' },
        { name: t('disclaimer') || 'Disclaimer', href: '/disclaimer' },
      ],
    },
    account: {
      title: t('account') || 'Account',
      links: [
        { name: t('my_account') || 'My Account', href: '/account' },
        { name: t('orders') || 'Orders', href: '/orders' },
        { name: t('wishlist') || 'Wishlist', href: '/wishlist' },
        { name: t('cart') || 'Cart', href: '/cart' },
        { name: t('settings') || 'Settings', href: '/settings' },
      ],
    },
  };

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 inline-flex mb-4">
              <Image 
                src="/favicon.ico"
                alt="Sombu Store Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sombustore
              </span>
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              {t('footer_description') || 'Your one-stop destination for all your shopping needs. Quality products, best prices, and fast delivery.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="https://www.instagram.com/sombustore/" className="text-gray-400 hover:text-pink-500 transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

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

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Sombustore. {t('all_rights_reserved') || 'All rights reserved.'}
            </p>
            <div className="flex gap-3">
              <span className="text-gray-400 text-xs">Visa</span>
              <span className="text-gray-400 text-xs">Mastercard</span>
              <span className="text-gray-400 text-xs">PayPal</span>
              <span className="text-gray-400 text-xs">Apple Pay</span>
              <span className="text-gray-400 text-xs">Google Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};