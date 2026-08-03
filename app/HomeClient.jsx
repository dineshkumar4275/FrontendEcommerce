// // 'use client';

// // import { Header } from '../src/components/layout/Header';
// // import { Footer } from '../src/components/layout/Footer';
// // import { SEO } from '../src/components/SEO';
// // import { useApp } from '../src/hooks/useApp';
// // import Link from 'next/link';
// // import { 
// //   ArrowRightIcon, 
// //   SparklesIcon, 
// //   ShoppingBagIcon, 
// //   TruckIcon, 
// //   ShieldCheckIcon, 
// //   ClockIcon,
// // } from '@heroicons/react/24/outline';

// // export default function HomeClient() {
// //   // ✅ Use App Context for translations
// //   const { t, formatPrice, currency, currentLanguage } = useApp();

// //   const organizationData = {
// //     name: 'Sombustore',
// //     description: t('shop_description') || 'India\'s premium online shopping destination',
// //     url: 'https://www.sombu.in/',
// //     logo: '/favicon.ico',
// //     phone: '+91-9042909734',
// //     sameAs: ['https://facebook.com/sombustore', 'https://instagram.com/sombustore'],
// //   };

// //   const websiteData = {
// //     name: 'Sombustore',
// //     description: t('shop_description') || 'India\'s premium online shopping destination',
// //     url: 'https://www.sombu.in/',
// //   };

// //   // ✅ Feature data with translations
// //   const features = [ 
// //     { icon: TruckIcon, title: t('free_shipping') || 'Free Shipping', desc: t('free_shipping_desc') || 'On orders above ₹500' },
// //     { icon: ShieldCheckIcon, title: t('secure_payment') || 'Secure Payment', desc: t('secure_payment_desc') || '100% Secure' },
// //     { icon: ClockIcon, title: t('support') || '24/7 Support', desc: t('support_desc') || 'Dedicated team' },
// //     { icon: ArrowRightIcon, title: t('easy_returns') || 'Easy Returns', desc: t('easy_returns_desc') || '7 days return' }
// //   ];

// //   return (
// //     <>
// //       <SEO
// //         pageType="website"
// //         title={t('home_title') || 'Sombustore - Premium Products & Amazing Offers'}
// //         description={t('home_description') || 'Welcome to Sombustore - India\'s premium online shopping destination.'}
// //         canonicalUrl="https://www.sombu.in/"
// //         organization={organizationData}
// //         website={websiteData}
// //         breadcrumbs={[{ name: t('home') || 'Home', url: 'https://www.sombu.in/' }]}
// //       />

// //       <Header />

// //       <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-20">
// //         {/* Hero Section */}
// //         <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-black">
// //           <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
// //             {/* Badge */}
// //             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 backdrop-blur-md border border-slate-700 mb-6 animate-fade-down">
// //               <SparklesIcon className="w-4 h-4 text-yellow-400" />
// //               <span className="text-sm text-slate-300">{t('coming_soon') || '🚀 Coming Soon'}</span>
// //             </div>

// //             {/* Title */}
// //             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
// //               <span className="text-slate-200">{t('discover_your') || 'Discover Your'}</span>
// //               <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mt-2">
// //                 {t('perfect_style') || 'Perfect Style'}
// //               </span>
// //             </h1>

// //             <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-up animation-delay-200">
// //               {t('hero_description') || "🎨 We're crafting something amazing! Our store is launching soon with exclusive collections."}
// //             </p>

// //             {/* Buttons */}
// //             <div className="flex flex-wrap justify-center gap-4 animate-fade-up animation-delay-400">
// //               <div className="group inline-flex items-center gap-2 px-8 py-3 bg-slate-700/50 text-slate-400 rounded-full font-semibold cursor-not-allowed opacity-60">
// //                 <ShoppingBagIcon className="w-5 h-5" />
// //                 <span>{t('shop_now') || 'Shop Now'}</span>
// //                 <ArrowRightIcon className="w-4 h-4" />
// //                 <span className="text-xs bg-slate-600/50 px-2 py-0.5 rounded-full">{t('soon') || 'Soon'}</span>
// //               </div>

// //               <div className="inline-flex items-center gap-2 px-8 py-3 bg-slate-800/60 backdrop-blur-md border border-slate-700 text-slate-400 rounded-full font-semibold cursor-not-allowed opacity-60">
// //                 {t('view_collections') || 'View Collections'}
// //                 <span className="text-xs bg-slate-700/50 px-2 py-0.5 rounded-full">{t('soon') || 'Soon'}</span>
// //               </div>
// //             </div>

// //             {/* Stats */}
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-800 animate-fade-up animation-delay-600">
// //               <div>
// //                 <div className="text-2xl font-bold text-slate-200">{t('soon') || 'Soon'}</div>
// //                 <div className="text-sm text-slate-500">{t('happy_customers') || 'Happy Customers'}</div>
// //               </div>
// //               <div>
// //                 <div className="text-2xl font-bold text-slate-200">{t('soon') || 'Soon'}</div>
// //                 <div className="text-sm text-slate-500">{t('brands') || 'Brands'}</div>
// //               </div>
// //               <div>
// //                 <div className="text-2xl font-bold text-slate-200">24/7</div>
// //                 <div className="text-sm text-slate-500">{t('support') || 'Support'}</div>
// //               </div>
// //               <div>
// //                 <div className="text-2xl font-bold text-slate-200">{t('soon') || 'Soon'}</div>
// //                 <div className="text-sm text-slate-500">{t('delivery') || 'Delivery*'}</div>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Waves */}
// //           <div className="relative mt-16 overflow-hidden h-32">
// //             <svg className="absolute top-0 left-0 w-full h-40 animate-wave-down-slow opacity-40" viewBox="0 0 1440 120">
// //               <path fill="#020617" d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z" />
// //             </svg>
// //             <svg className="absolute top-0 left-0 w-full h-40 animate-wave-down-fast" viewBox="0 0 1440 120">
// //               <path fill="#020617" d="M0,70 C300,100 600,20 900,60 C1200,100 1440,40 1440,40 L1440,120 L0,120 Z" />
// //             </svg>
// //           </div>
// //         </div>

// //         {/* Features */}
// //         <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-12">
// //           <div className="container mx-auto px-4">
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //               {features.map((item, i) => (
// //                 <div key={i} className="text-center">
// //                   <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
// //                     <item.icon className="w-6 h-6 text-purple-400" />
// //                   </div>
// //                   <h3 className="font-semibold text-slate-200">{item.title}</h3>
// //                   <p className="text-sm text-slate-500">{item.desc}</p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* No Products Message */}
// //         <div className="container mx-auto px-4 py-16 bg-slate-950">
// //           <div className="max-w-2xl mx-auto text-center">
// //             <div className="text-7xl mb-6">🛍️</div>
// //             <h2 className="text-3xl font-bold text-slate-200 mb-4">{t('no_products') || 'No Products Available'}</h2>
// //             <p className="text-slate-400 mb-2">{t('curating_collection') || "We're currently curating the best collection for you."}</p>
// //             <p className="text-slate-500 text-sm mb-8">{t('under_construction') || 'Our store is under construction. Check back soon for amazing products!'}</p>

// //             <div className="inline-flex items-center gap-4 px-6 py-4 bg-slate-800/60 rounded-2xl border border-slate-700">
// //               <div className="flex items-center gap-3">
// //                 <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
// //                 <span className="text-slate-300">{t('launching_soon') || "We're launching soon"}</span>
// //               </div>
// //               <div className="w-px h-6 bg-slate-700"></div>
// //               <div className="flex items-center gap-2">
// //                 <span className="text-slate-500 text-sm">📅</span>
// //                 <span className="text-yellow-400 text-sm font-medium">{t('stay_tuned') || 'Stay tuned!'}</span>
// //               </div>
// //             </div>

// //             <div className="mt-8 max-w-md mx-auto">
// //               <div className="flex justify-between text-sm text-slate-500 mb-1">
// //                 <span>{t('progress') || 'Progress'}</span>
// //                 <span>75%</span>
// //               </div>
// //               <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
// //                 <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
// //               </div>
// //               <p className="text-xs text-slate-600 mt-2">{t('almost_there') || 'Almost there! We\'re preparing something special for you.'}</p>
// //             </div>

// //             {/* ✅ Language & Currency Display */}
// //             <div className="mt-12 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
// //               <p className="text-sm text-slate-400">
// //                 {t('current_language') || 'Current Language'}: <span className="text-slate-200 font-semibold">{currentLanguage?.flag} {currentLanguage?.name}</span>
// //               </p>
// //               <p className="text-sm text-slate-400 mt-1">
// //                 {t('current_currency') || 'Current Currency'}: <span className="text-slate-200 font-semibold">{currency?.symbol} {currency?.code}</span>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <style jsx global>{`
// //         @keyframes fade-up {
// //           from { opacity: 0; transform: translateY(30px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes fade-down {
// //           from { opacity: 0; transform: translateY(-30px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //         .animate-fade-up { animation: fade-up 0.6s ease-out forwards; }
// //         .animate-fade-down { animation: fade-down 0.6s ease-out forwards; }
// //         .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
// //         .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
// //         .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
// //         @keyframes waveDown {
// //           0% { transform: translateY(-40px); }
// //           50% { transform: translateY(20px); }
// //           100% { transform: translateY(-40px); }
// //         }
// //         .animate-wave-down-fast { animation: waveDown 4s ease-in-out infinite; }
// //         .animate-wave-down-slow { animation: waveDown 7s ease-in-out infinite; }
// //       `}</style>

// //       <Footer />
// //     </>
// //   );
// // }

// 'use client';

// import { useState, useEffect } from 'react';
// import { Header } from '../src/components/layout/Header';
// import { Footer } from '../src/components/layout/Footer';
// import { SEO } from '../src/components/SEO';
// import { useApp } from '../src/hooks/useApp';
// import Link from 'next/link';
// import { 
//   ArrowRightIcon, 
//   SparklesIcon, 
//   ShoppingBagIcon, 
//   TruckIcon, 
//   ShieldCheckIcon, 
//   ClockIcon,
// } from '@heroicons/react/24/outline';

// // ✅ Fallback translations (for SSR)
// const FALLBACK_TRANSLATIONS = {
//   'shop_description': "India's premium online shopping destination",
//   'home_title': 'Sombustore - Premium Products & Amazing Offers',
//   'home_description': "Welcome to Sombustore - India's premium online shopping destination.",
//   'coming_soon': '🚀 Coming Soon',
//   'discover_your': 'Discover Your',
//   'perfect_style': 'Perfect Style',
//   'hero_description': "🎨 We're crafting something amazing! Our store is launching soon with exclusive collections.",
//   'view_collections': 'View Collections',
//   'soon': 'Soon',
//   'happy_customers': 'Happy Customers',
//   'brands': 'Brands',
//   'delivery': 'Delivery*',
//   'free_shipping': 'Free Shipping',
//   'free_shipping_desc': 'On orders above ₹500',
//   'secure_payment': 'Secure Payment',
//   'secure_payment_desc': '100% Secure',
//   'support': '24/7 Support',
//   'support_desc': 'Dedicated team',
//   'easy_returns': 'Easy Returns',
//   'easy_returns_desc': '7 days return',
//   'no_products': 'No Products Available',
//   'curating_collection': "We're currently curating the best collection for you.",
//   'under_construction': 'Our store is under construction. Check back soon for amazing products!',
//   'launching_soon': "We're launching soon",
//   'stay_tuned': 'Stay tuned!',
//   'progress': 'Progress',
//   'almost_there': "Almost there! We're preparing something special for you.",
//   'current_language': 'Current Language',
//   'current_currency': 'Current Currency',
//   'home': 'Home',
//   'shop_now': 'Shop Now',
// };

// export default function HomeClient() {
//   // ✅ Call useApp at the TOP level
//   const { t, formatPrice, currency, currentLanguage, language, forceUpdate } = useApp();
  
//   // ✅ State for client-side mounting
//   const [mounted, setMounted] = useState(false);
//   // ✅ Add state to track language changes
//   const [langKey, setLangKey] = useState(0);
  
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // ✅ Listen for language change events
//   useEffect(() => {
//     const handleLanguageChange = (event) => {
//       console.log('🔄 HomeClient: Language changed to:', event.detail?.language);
//       // Force re-render by updating state
//       setLangKey(prev => prev + 1);
//     };

//     window.addEventListener('languageChange', handleLanguageChange);
//     return () => window.removeEventListener('languageChange', handleLanguageChange);
//   }, []);

//   // ✅ Also update when forceUpdate changes from context
//   useEffect(() => {
//     if (forceUpdate) {
//       setLangKey(prev => prev + 1);
//     }
//   }, [forceUpdate]);

//   // ✅ Translation function with fallback
//   const translate = (key) => {
//     if (mounted) {
//       return t(key);
//     }
//     return FALLBACK_TRANSLATIONS[key] || key;
//   };

//   // ✅ Format price with fallback
//   const formatPriceWithFallback = (amount) => {
//     if (mounted) {
//       return formatPrice(amount);
//     }
//     return `₹ ${Number(amount).toFixed(2)}`;
//   };

//   // ✅ Currency with fallback
//   const currentCurrency = mounted ? currency : { symbol: '₹', code: 'INR' };
//   const currentLang = mounted ? currentLanguage : { name: 'Loading...', flag: '🌍' };

//   const organizationData = {
//     name: 'Sombustore',
//     description: translate('shop_description'),
//     url: 'https://www.sombu.in/',
//     logo: '/favicon.ico',
//     phone: '+91-9042909734',
//     sameAs: ['https://facebook.com/sombustore', 'https://instagram.com/sombustore'],
//   };

//   const websiteData = {
//     name: 'Sombustore',
//     description: translate('shop_description'),
//     url: 'https://www.sombu.in/',
//   };

//   const features = [ 
//     { icon: TruckIcon, title: translate('free_shipping'), desc: translate('free_shipping_desc') },
//     { icon: ShieldCheckIcon, title: translate('secure_payment'), desc: translate('secure_payment_desc') },
//     { icon: ClockIcon, title: translate('support'), desc: translate('support_desc') },
//     { icon: ArrowRightIcon, title: translate('easy_returns'), desc: translate('easy_returns_desc') }
//   ];

//   // ✅ Add key to force re-render on language change
//   const pageKey = `home-${language}-${langKey}-${forceUpdate}`;

//   return (
//     <div key={pageKey}>
//       <SEO
//         pageType="website"
//         title={translate('home_title')}
//         description={translate('home_description')}
//         canonicalUrl="https://www.sombu.in/"
//         organization={organizationData}
//         website={websiteData}
//         breadcrumbs={[{ name: translate('home'), url: 'https://www.sombu.in/' }]}
//       />

//       <Header />

//       <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-20">
//         {/* Hero Section */}
//         <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-black">
//           <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 backdrop-blur-md border border-slate-700 mb-6 animate-fade-down">
//               <SparklesIcon className="w-4 h-4 text-yellow-400" />
//               <span className="text-sm text-slate-300">{translate('coming_soon')}</span>
//             </div>

//             {/* Title */}
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
//               <span className="text-slate-200">{translate('discover_your')}</span>
//               <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mt-2">
//                 {translate('perfect_style')}
//               </span>
//             </h1>

//             <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-up animation-delay-200">
//               {translate('hero_description')}
//             </p>

//             {/* Buttons */}
//             <div className="flex flex-wrap justify-center gap-4 animate-fade-up animation-delay-400">
//               <div className="group inline-flex items-center gap-2 px-8 py-3 bg-slate-700/50 text-slate-400 rounded-full font-semibold cursor-not-allowed opacity-60">
//                 <ShoppingBagIcon className="w-5 h-5" />
//                 <span>{translate('shop_now')}</span>
//                 <ArrowRightIcon className="w-4 h-4" />
//                 <span className="text-xs bg-slate-600/50 px-2 py-0.5 rounded-full">{translate('soon')}</span>
//               </div>

//               <div className="inline-flex items-center gap-2 px-8 py-3 bg-slate-800/60 backdrop-blur-md border border-slate-700 text-slate-400 rounded-full font-semibold cursor-not-allowed opacity-60">
//                 {translate('view_collections')}
//                 <span className="text-xs bg-slate-700/50 px-2 py-0.5 rounded-full">{translate('soon')}</span>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-800 animate-fade-up animation-delay-600">
//               <div>
//                 <div className="text-2xl font-bold text-slate-200">{translate('soon')}</div>
//                 <div className="text-sm text-slate-500">{translate('happy_customers')}</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-slate-200">{translate('soon')}</div>
//                 <div className="text-sm text-slate-500">{translate('brands')}</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-slate-200">24/7</div>
//                 <div className="text-sm text-slate-500">{translate('support')}</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-slate-200">{translate('soon')}</div>
//                 <div className="text-sm text-slate-500">{translate('delivery')}</div>
//               </div>
//             </div>
//           </div>

//           {/* Waves */}
//           <div className="relative mt-16 overflow-hidden h-32">
//             <svg className="absolute top-0 left-0 w-full h-40 animate-wave-down-slow opacity-40" viewBox="0 0 1440 120">
//               <path fill="#020617" d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z" />
//             </svg>
//             <svg className="absolute top-0 left-0 w-full h-40 animate-wave-down-fast" viewBox="0 0 1440 120">
//               <path fill="#020617" d="M0,70 C300,100 600,20 900,60 C1200,100 1440,40 1440,40 L1440,120 L0,120 Z" />
//             </svg>
//           </div>
//         </div>

//         {/* Features */}
//         <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-12">
//           <div className="container mx-auto px-4">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//               {features.map((item, i) => (
//                 <div key={i} className="text-center">
//                   <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
//                     <item.icon className="w-6 h-6 text-purple-400" />
//                   </div>
//                   <h3 className="font-semibold text-slate-200">{item.title}</h3>
//                   <p className="text-sm text-slate-500">{item.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* No Products Message */}
//         <div className="container mx-auto px-4 py-16 bg-slate-950">
//           <div className="max-w-2xl mx-auto text-center">
//             <div className="text-7xl mb-6">🛍️</div>
//             <h2 className="text-3xl font-bold text-slate-200 mb-4">{translate('no_products')}</h2>
//             <p className="text-slate-400 mb-2">{translate('curating_collection')}</p>
//             <p className="text-slate-500 text-sm mb-8">{translate('under_construction')}</p>

//             <div className="inline-flex items-center gap-4 px-6 py-4 bg-slate-800/60 rounded-2xl border border-slate-700">
//               <div className="flex items-center gap-3">
//                 <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//                 <span className="text-slate-300">{translate('launching_soon')}</span>
//               </div>
//               <div className="w-px h-6 bg-slate-700"></div>
//               <div className="flex items-center gap-2">
//                 <span className="text-slate-500 text-sm">📅</span>
//                 <span className="text-yellow-400 text-sm font-medium">{translate('stay_tuned')}</span>
//               </div>
//             </div>

//             <div className="mt-8 max-w-md mx-auto">
//               <div className="flex justify-between text-sm text-slate-500 mb-1">
//                 <span>{translate('progress')}</span>
//                 <span>75%</span>
//               </div>
//               <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
//                 <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
//               </div>
//               <p className="text-xs text-slate-600 mt-2">{translate('almost_there')}</p>
//             </div>

//             {/* ✅ Language & Currency Display */}
//             <div className="mt-12 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
//               <p className="text-sm text-slate-400">
//                 {translate('current_language')}: <span className="text-slate-200 font-semibold">{currentLang?.flag} {currentLang?.name}</span>
//               </p>
//               <p className="text-sm text-slate-400 mt-1">
//                 {translate('current_currency')}: <span className="text-slate-200 font-semibold">{currentCurrency?.symbol} {currentCurrency?.code}</span>
//               </p>
//               <p className="text-xs text-slate-500 mt-2">
//                 Language Code: <span className="text-purple-400">{language}</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes fade-up {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fade-down {
//           from { opacity: 0; transform: translateY(-30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-up { animation: fade-up 0.6s ease-out forwards; }
//         .animate-fade-down { animation: fade-down 0.6s ease-out forwards; }
//         .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
//         .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
//         .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
//         @keyframes waveDown {
//           0% { transform: translateY(-40px); }
//           50% { transform: translateY(20px); }
//           100% { transform: translateY(-40px); }
//         }
//         .animate-wave-down-fast { animation: waveDown 4s ease-in-out infinite; }
//         .animate-wave-down-slow { animation: waveDown 7s ease-in-out infinite; }
//       `}</style>

//       <Footer />
//     </div>
//   );
// }
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from '../src/components/layout/Header';
import { Footer } from '../src/components/layout/Footer';
import { SEO } from '../src/components/SEO';
import { useApp } from '../src/providers/AppProvider';
import Link from 'next/link';
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  ClockIcon,
  GlobeAltIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

// ✅ Fallback translations (for SSR)
const FALLBACK_TRANSLATIONS = {
  'shop_description': "India's premium online shopping destination",
  'home_title': 'Sombustore - Premium Products & Amazing Offers',
  'home_description': "Welcome to Sombustore - India's premium online shopping destination.",
  'coming_soon': '🚀 Coming Soon',
  'discover_your': 'Discover Your',
  'perfect_style': 'Perfect Style',
  'hero_description': "🎨 We're crafting something amazing! Our store is launching soon with exclusive collections.",
  'view_collections': 'View Collections',
  'soon': 'Soon',
  'happy_customers': 'Happy Customers',
  'brands': 'Brands',
  'delivery': 'Delivery*',
  'free_shipping': 'Free Shipping',
  'free_shipping_desc': 'On orders above ₹500',
  'secure_payment': 'Secure Payment',
  'secure_payment_desc': '100% Secure',
  'support': '24/7 Support',
  'support_desc': 'Dedicated team',
  'easy_returns': 'Easy Returns',
  'easy_returns_desc': '7 days return',
  'no_products': 'No Products Available',
  'curating_collection': "We're currently curating the best collection for you.",
  'under_construction': 'Our store is under construction. Check back soon for amazing products!',
  'launching_soon': "We're launching soon",
  'stay_tuned': 'Stay tuned!',
  'progress': 'Progress',
  'almost_there': "Almost there! We're preparing something special for you.",
  'current_language': 'Current Language',
  'current_currency': 'Current Currency',
  'home': 'Home',
  'shop_now': 'Shop Now',
  'select_language': 'Select Language',
  'tamil': 'Tamil',
  'hindi': 'Hindi',
  'telugu': 'Telugu',
  'malayalam': 'Malayalam',
  'english': 'English',
};

export default function HomeClient() {
  const { t, formatPrice, currency, currentLanguage, language, forceUpdate, changeLanguage, languages } = useApp();
  
  const [mounted, setMounted] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = (event) => {
      console.log('🔄 HomeClient: Language changed to:', event.detail?.language);
      setRenderCount(prev => prev + 1);
      setIsLanguageMenuOpen(false);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    if (forceUpdate) {
      console.log('🔄 HomeClient: forceUpdate changed, re-rendering');
      setRenderCount(prev => prev + 1);
    }
  }, [forceUpdate]);

  const translate = useCallback((key) => {
    if (mounted) {
      return t(key);
    }
    return FALLBACK_TRANSLATIONS[key] || key;
  }, [mounted, t, language, renderCount]);

  const formatPriceWithFallback = useCallback((amount) => {
    if (mounted) {
      return formatPrice(amount);
    }
    return `₹ ${Number(amount).toFixed(2)}`;
  }, [mounted, formatPrice, currency, renderCount]);

  const features = useMemo(() => [ 
    { icon: TruckIcon, title: translate('free_shipping'), desc: translate('free_shipping_desc') },
    { icon: ShieldCheckIcon, title: translate('secure_payment'), desc: translate('secure_payment_desc') },
    { icon: ClockIcon, title: translate('support'), desc: translate('support_desc') },
    { icon: ArrowRightIcon, title: translate('easy_returns'), desc: translate('easy_returns_desc') }
  ], [translate]);

  const currentLang = useMemo(() => 
    mounted ? currentLanguage : { name: 'English', flag: '🇬🇧' },
    [mounted, currentLanguage, renderCount]
  );

  const currentCurrency = useMemo(() => 
    mounted ? currency : { symbol: '₹', code: 'INR' },
    [mounted, currency, renderCount]
  );

  // ✅ Mobile language change handler
  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLanguageMenuOpen(false);
  };

  const organizationData = {
    name: 'Sombustore',
    description: translate('shop_description'),
    url: 'https://www.sombu.in/',
    logo: '/favicon.ico',
    phone: '+91-9042909734',
    sameAs: ['https://facebook.com/sombustore', 'https://instagram.com/sombustore'],
  };

  const websiteData = {
    name: 'Sombustore',
    description: translate('shop_description'),
    url: 'https://www.sombu.in/',
  };

  const pageKey = `home-${language}-${renderCount}-${forceUpdate}`;

  return (
    <div key={pageKey}>
      <SEO
        pageType="website"
        title={translate('home_title')}
        description={translate('home_description')}
        canonicalUrl="https://www.sombu.in/"
        organization={organizationData}
        website={websiteData}
        breadcrumbs={[{ name: translate('home'), url: 'https://www.sombu.in/' }]}
      />

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-16 md:pt-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-black">
          <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 text-center">
            {/* Badge - Mobile Responsive */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-slate-800/60 backdrop-blur-md border border-slate-700 mb-4 sm:mb-6 animate-fade-down">
              <SparklesIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
              <span className="text-xs sm:text-sm text-slate-300">{translate('coming_soon')}</span>
            </div>

            {/* Title - Mobile Responsive */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-up">
              <span className="text-slate-200 text-lg sm:text-xl md:text-3xl lg:text-4xl block">{translate('discover_your')}</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mt-1 sm:mt-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {translate('perfect_style')}
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2 animate-fade-up animation-delay-200">
              {translate('hero_description')}
            </p>

            {/* Buttons - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 animate-fade-up animation-delay-400">
              <div className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-slate-700/50 text-slate-400 rounded-full font-semibold cursor-not-allowed opacity-60 text-sm sm:text-base">
                <ShoppingBagIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{translate('shop_now')}</span>
                <ArrowRightIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs bg-slate-600/50 px-1.5 sm:px-2 py-0.5 rounded-full">{translate('soon')}</span>
              </div>

              <div className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-slate-800/60 backdrop-blur-md border border-slate-700 text-slate-400 rounded-full font-semibold cursor-not-allowed opacity-60 text-sm sm:text-base">
                {translate('view_collections')}
                <span className="text-[10px] sm:text-xs bg-slate-700/50 px-1.5 sm:px-2 py-0.5 rounded-full">{translate('soon')}</span>
              </div>
            </div>

            {/* Stats - Mobile Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto mt-10 sm:mt-12 md:mt-16 pt-6 sm:pt-8 border-t border-slate-800 animate-fade-up animation-delay-600">
              <div className="p-2">
                <div className="text-xl sm:text-2xl font-bold text-slate-200">{translate('soon')}</div>
                <div className="text-[10px] sm:text-sm text-slate-500">{translate('happy_customers')}</div>
              </div>
              <div className="p-2">
                <div className="text-xl sm:text-2xl font-bold text-slate-200">{translate('soon')}</div>
                <div className="text-[10px] sm:text-sm text-slate-500">{translate('brands')}</div>
              </div>
              <div className="p-2">
                <div className="text-xl sm:text-2xl font-bold text-slate-200">24/7</div>
                <div className="text-[10px] sm:text-sm text-slate-500">{translate('support')}</div>
              </div>
              <div className="p-2">
                <div className="text-xl sm:text-2xl font-bold text-slate-200">{translate('soon')}</div>
                <div className="text-[10px] sm:text-sm text-slate-500">{translate('delivery')}</div>
              </div>
            </div>
          </div>

          {/* Waves - Mobile Responsive */}
          <div className="relative mt-8 sm:mt-12 md:mt-16 overflow-hidden h-20 sm:h-24 md:h-32">
            <svg className="absolute top-0 left-0 w-full h-24 sm:h-32 md:h-40 animate-wave-down-slow opacity-40" viewBox="0 0 1440 120">
              <path fill="#020617" d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z" />
            </svg>
            <svg className="absolute top-0 left-0 w-full h-24 sm:h-32 md:h-40 animate-wave-down-fast" viewBox="0 0 1440 120">
              <path fill="#020617" d="M0,70 C300,100 600,20 900,60 C1200,100 1440,40 1440,40 L1440,120 L0,120 Z" />
            </svg>
          </div>
        </div>

        {/* Features - Mobile Responsive */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {features.map((item, i) => (
                <div key={i} className="text-center p-3 sm:p-4 bg-slate-800/30 rounded-xl sm:rounded-2xl border border-slate-700/30">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-200">{item.title}</h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* No Products Message - Mobile Responsive */}
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 bg-slate-950">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6">🛍️</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 mb-3 sm:mb-4">{translate('no_products')}</h2>
            <p className="text-sm sm:text-base text-slate-400 mb-2">{translate('curating_collection')}</p>
            <p className="text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8">{translate('under_construction')}</p>

            {/* Status Card - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/60 rounded-xl sm:rounded-2xl border border-slate-700">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm text-slate-300">{translate('launching_soon')}</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-slate-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-xs sm:text-sm">📅</span>
                <span className="text-yellow-400 text-xs sm:text-sm font-medium">{translate('stay_tuned')}</span>
              </div>
            </div>

            {/* Progress Bar - Mobile Responsive */}
            <div className="mt-6 sm:mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-xs sm:text-sm text-slate-500 mb-1">
                <span>{translate('progress')}</span>
                <span>75%</span>
              </div>
              <div className="w-full h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-600 mt-1.5 sm:mt-2">{translate('almost_there')}</p>
            </div>

            {/* ✅ Language & Currency Display - Mobile Responsive */}
            <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-slate-800/40 rounded-xl sm:rounded-2xl border border-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="text-left">
                  <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">
                    {translate('current_language')}
                  </p>
                  <p className="text-base sm:text-lg text-slate-200 font-semibold mt-1">
                    {currentLang?.flag} {currentLang?.name}
                  </p>
                  <p className="text-[10px] sm:text-xs text-purple-400 mt-0.5">
                    Code: {language}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">
                    {translate('current_currency')}
                  </p>
                  <p className="text-base sm:text-lg text-slate-200 font-semibold mt-1">
                    {currentCurrency?.symbol} {currentCurrency?.code}
                  </p>
                  <p className="text-[10px] sm:text-xs text-purple-400 mt-0.5">
                    {currentCurrency?.name}
                  </p>
                </div>
              </div>
              
              {/* Render count for debugging */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700">
                <p className="text-[10px] sm:text-xs text-slate-500">
                  🔄 Render count: {renderCount} | Language: {language}
                </p>
              </div>

              {/* ✅ Language Switcher - Mobile Responsive Dropdown */}
              <div className="mt-4 sm:mt-6 relative">
                <button
                  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25"
                >
                  <span className="flex items-center gap-2">
                    <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    {translate('select_language')}
                  </span>
                  <ChevronDownIcon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Language Dropdown */}
                {isLanguageMenuOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-xl border border-purple-500/30 shadow-2xl overflow-hidden z-50">
                    <div className="p-2 max-h-60 overflow-y-auto">
                      {languages && languages.slice(0, 6).map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all ${
                            language === lang.code
                              ? 'bg-purple-600/30 text-purple-200 border border-purple-500/30'
                              : 'text-slate-300 hover:bg-purple-500/10 hover:text-slate-200'
                          }`}
                        >
                          <span className="text-lg sm:text-xl">{lang.flag}</span>
                          <div className="flex-1 text-left">
                            <p className="text-sm sm:text-base font-medium">{lang.name}</p>
                            <p className="text-[10px] sm:text-xs text-slate-400">{lang.nativeName}</p>
                          </div>
                          {language === lang.code && (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Language Buttons - Mobile Responsive */}
              <div className="mt-3 sm:mt-4 grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
                {['en', 'ta', 'hi', 'te', 'ml'].map((code) => {
                  const lang = languages?.find(l => l.code === code);
                  if (!lang) return null;
                  return (
                    <button
                      key={code}
                      onClick={() => handleLanguageChange(code)}
                      className={`flex flex-col items-center gap-0.5 px-1 sm:px-2 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs transition-all ${
                        language === code
                          ? 'bg-purple-600/40 text-purple-200 border border-purple-500/30'
                          : 'bg-slate-700/30 text-slate-400 hover:bg-purple-500/10 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-sm sm:text-base">{lang.flag}</span>
                      <span className="hidden xs:inline">{lang.code.toUpperCase()}</span>
                      <span className="inline xs:hidden">{lang.code.toUpperCase().slice(0, 2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.6s ease-out forwards; }
        .animate-fade-down { animation: fade-down 0.6s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
        
        @keyframes waveDown {
          0% { transform: translateY(-40px); }
          50% { transform: translateY(20px); }
          100% { transform: translateY(-40px); }
        }
        .animate-wave-down-fast { animation: waveDown 4s ease-in-out infinite; }
        .animate-wave-down-slow { animation: waveDown 7s ease-in-out infinite; }

        /* Mobile responsive breakpoints */
        @media (max-width: 480px) {
          .xs\\:inline { display: inline !important; }
        }
        @media (min-width: 481px) {
          .xs\\:inline { display: none; }
        }
      `}</style>

      <Footer />
    </div>
  );
}