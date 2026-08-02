// 'use client';

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

// export default function HomeClient() {
//   // ✅ Use App Context for translations
//   const { t, formatPrice, currency, currentLanguage } = useApp();

//   const organizationData = {
//     name: 'Sombustore',
//     description: t('shop_description') || 'India\'s premium online shopping destination',
//     url: 'https://www.sombu.in/',
//     logo: '/favicon.ico',
//     phone: '+91-9042909734',
//     sameAs: ['https://facebook.com/sombustore', 'https://instagram.com/sombustore'],
//   };

//   const websiteData = {
//     name: 'Sombustore',
//     description: t('shop_description') || 'India\'s premium online shopping destination',
//     url: 'https://www.sombu.in/',
//   };

//   // ✅ Feature data with translations
//   const features = [ 
//     { icon: TruckIcon, title: t('free_shipping') || 'Free Shipping', desc: t('free_shipping_desc') || 'On orders above ₹500' },
//     { icon: ShieldCheckIcon, title: t('secure_payment') || 'Secure Payment', desc: t('secure_payment_desc') || '100% Secure' },
//     { icon: ClockIcon, title: t('support') || '24/7 Support', desc: t('support_desc') || 'Dedicated team' },
//     { icon: ArrowRightIcon, title: t('easy_returns') || 'Easy Returns', desc: t('easy_returns_desc') || '7 days return' }
//   ];

//   return (
//     <>
//       <SEO
//         pageType="website"
//         title={t('home_title') || 'Sombustore - Premium Products & Amazing Offers'}
//         description={t('home_description') || 'Welcome to Sombustore - India\'s premium online shopping destination.'}
//         canonicalUrl="https://www.sombu.in/"
//         organization={organizationData}
//         website={websiteData}
//         breadcrumbs={[{ name: t('home') || 'Home', url: 'https://www.sombu.in/' }]}
//       />

//       <Header />

//       <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-20">
//         {/* Hero Section */}
//         <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-black">
//           <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 backdrop-blur-md border border-slate-700 mb-6 animate-fade-down">
//               <SparklesIcon className="w-4 h-4 text-yellow-400" />
//               <span className="text-sm text-slate-300">{t('coming_soon') || '🚀 Coming Soon'}</span>
//             </div>

//             {/* Title */}
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
//               <span className="text-slate-200">{t('discover_your') || 'Discover Your'}</span>
//               <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mt-2">
//                 {t('perfect_style') || 'Perfect Style'}
//               </span>
//             </h1>

//             <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-up animation-delay-200">
//               {t('hero_description') || "🎨 We're crafting something amazing! Our store is launching soon with exclusive collections."}
//             </p>

//             {/* Buttons */}
//             <div className="flex flex-wrap justify-center gap-4 animate-fade-up animation-delay-400">
//               <div className="group inline-flex items-center gap-2 px-8 py-3 bg-slate-700/50 text-slate-400 rounded-full font-semibold cursor-not-allowed opacity-60">
//                 <ShoppingBagIcon className="w-5 h-5" />
//                 <span>{t('shop_now') || 'Shop Now'}</span>
//                 <ArrowRightIcon className="w-4 h-4" />
//                 <span className="text-xs bg-slate-600/50 px-2 py-0.5 rounded-full">{t('soon') || 'Soon'}</span>
//               </div>

//               <div className="inline-flex items-center gap-2 px-8 py-3 bg-slate-800/60 backdrop-blur-md border border-slate-700 text-slate-400 rounded-full font-semibold cursor-not-allowed opacity-60">
//                 {t('view_collections') || 'View Collections'}
//                 <span className="text-xs bg-slate-700/50 px-2 py-0.5 rounded-full">{t('soon') || 'Soon'}</span>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-800 animate-fade-up animation-delay-600">
//               <div>
//                 <div className="text-2xl font-bold text-slate-200">{t('soon') || 'Soon'}</div>
//                 <div className="text-sm text-slate-500">{t('happy_customers') || 'Happy Customers'}</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-slate-200">{t('soon') || 'Soon'}</div>
//                 <div className="text-sm text-slate-500">{t('brands') || 'Brands'}</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-slate-200">24/7</div>
//                 <div className="text-sm text-slate-500">{t('support') || 'Support'}</div>
//               </div>
//               <div>
//                 <div className="text-2xl font-bold text-slate-200">{t('soon') || 'Soon'}</div>
//                 <div className="text-sm text-slate-500">{t('delivery') || 'Delivery*'}</div>
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
//             <h2 className="text-3xl font-bold text-slate-200 mb-4">{t('no_products') || 'No Products Available'}</h2>
//             <p className="text-slate-400 mb-2">{t('curating_collection') || "We're currently curating the best collection for you."}</p>
//             <p className="text-slate-500 text-sm mb-8">{t('under_construction') || 'Our store is under construction. Check back soon for amazing products!'}</p>

//             <div className="inline-flex items-center gap-4 px-6 py-4 bg-slate-800/60 rounded-2xl border border-slate-700">
//               <div className="flex items-center gap-3">
//                 <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
//                 <span className="text-slate-300">{t('launching_soon') || "We're launching soon"}</span>
//               </div>
//               <div className="w-px h-6 bg-slate-700"></div>
//               <div className="flex items-center gap-2">
//                 <span className="text-slate-500 text-sm">📅</span>
//                 <span className="text-yellow-400 text-sm font-medium">{t('stay_tuned') || 'Stay tuned!'}</span>
//               </div>
//             </div>

//             <div className="mt-8 max-w-md mx-auto">
//               <div className="flex justify-between text-sm text-slate-500 mb-1">
//                 <span>{t('progress') || 'Progress'}</span>
//                 <span>75%</span>
//               </div>
//               <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
//                 <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
//               </div>
//               <p className="text-xs text-slate-600 mt-2">{t('almost_there') || 'Almost there! We\'re preparing something special for you.'}</p>
//             </div>

//             {/* ✅ Language & Currency Display */}
//             <div className="mt-12 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
//               <p className="text-sm text-slate-400">
//                 {t('current_language') || 'Current Language'}: <span className="text-slate-200 font-semibold">{currentLanguage?.flag} {currentLanguage?.name}</span>
//               </p>
//               <p className="text-sm text-slate-400 mt-1">
//                 {t('current_currency') || 'Current Currency'}: <span className="text-slate-200 font-semibold">{currency?.symbol} {currency?.code}</span>
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
//     </>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { Header } from '../src/components/layout/Header';
import { Footer } from '../src/components/layout/Footer';
import { SEO } from '../src/components/SEO';
import { useApp } from '../src/hooks/useApp';
import Link from 'next/link';
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  ClockIcon,
} from '@heroicons/react/24/outline';

export default function HomeClient() {
  // ✅ State to track if component is mounted (client-side)
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Always call useApp (don't conditionally call hooks)
  const app = useApp();
  
  // ✅ Use app values only when mounted, otherwise use fallbacks
  const t = mounted ? app.t : (key) => {
    const fallback = {
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
    };
    return fallback[key] || key;
  };

  const formatPrice = mounted ? app.formatPrice : (amount) => `₹ ${Number(amount).toFixed(2)}`;
  const currency = mounted ? app.currency : { symbol: '₹', code: 'INR' };
  const currentLanguage = mounted ? app.currentLanguage : { name: 'Loading...', flag: '🌍' };

  // ✅ Use t function for translations
  const translate = t;

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

  // ✅ Feature data with translations
  const features = [ 
    { icon: TruckIcon, title: translate('free_shipping'), desc: translate('free_shipping_desc') },
    { icon: ShieldCheckIcon, title: translate('secure_payment'), desc: translate('secure_payment_desc') },
    { icon: ClockIcon, title: translate('support'), desc: translate('support_desc') },
    { icon: ArrowRightIcon, title: translate('easy_returns'), desc: translate('easy_returns_desc') }
  ];

  return (
    <>
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

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-black">
          <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 backdrop-blur-md border border-slate-700 mb-6 animate-fade-down">
              <SparklesIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">{translate('coming_soon')}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
              <span className="text-slate-200">{translate('discover_your')}</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mt-2">
                {translate('perfect_style')}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-up animation-delay-200">
              {translate('hero_description')}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 animate-fade-up animation-delay-400">
              <div className="group inline-flex items-center gap-2 px-8 py-3 bg-slate-700/50 text-slate-400 rounded-full font-semibold cursor-not-allowed opacity-60">
                <ShoppingBagIcon className="w-5 h-5" />
                <span>{translate('shop_now')}</span>
                <ArrowRightIcon className="w-4 h-4" />
                <span className="text-xs bg-slate-600/50 px-2 py-0.5 rounded-full">{translate('soon')}</span>
              </div>

              <div className="inline-flex items-center gap-2 px-8 py-3 bg-slate-800/60 backdrop-blur-md border border-slate-700 text-slate-400 rounded-full font-semibold cursor-not-allowed opacity-60">
                {translate('view_collections')}
                <span className="text-xs bg-slate-700/50 px-2 py-0.5 rounded-full">{translate('soon')}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-800 animate-fade-up animation-delay-600">
              <div>
                <div className="text-2xl font-bold text-slate-200">{translate('soon')}</div>
                <div className="text-sm text-slate-500">{translate('happy_customers')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-200">{translate('soon')}</div>
                <div className="text-sm text-slate-500">{translate('brands')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-200">24/7</div>
                <div className="text-sm text-slate-500">{translate('support')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-200">{translate('soon')}</div>
                <div className="text-sm text-slate-500">{translate('delivery')}</div>
              </div>
            </div>
          </div>

          {/* Waves */}
          <div className="relative mt-16 overflow-hidden h-32">
            <svg className="absolute top-0 left-0 w-full h-40 animate-wave-down-slow opacity-40" viewBox="0 0 1440 120">
              <path fill="#020617" d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z" />
            </svg>
            <svg className="absolute top-0 left-0 w-full h-40 animate-wave-down-fast" viewBox="0 0 1440 120">
              <path fill="#020617" d="M0,70 C300,100 600,20 900,60 C1200,100 1440,40 1440,40 L1440,120 L0,120 Z" />
            </svg>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-slate-200">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* No Products Message */}
        <div className="container mx-auto px-4 py-16 bg-slate-950">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-7xl mb-6">🛍️</div>
            <h2 className="text-3xl font-bold text-slate-200 mb-4">{translate('no_products')}</h2>
            <p className="text-slate-400 mb-2">{translate('curating_collection')}</p>
            <p className="text-slate-500 text-sm mb-8">{translate('under_construction')}</p>

            <div className="inline-flex items-center gap-4 px-6 py-4 bg-slate-800/60 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-300">{translate('launching_soon')}</span>
              </div>
              <div className="w-px h-6 bg-slate-700"></div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm">📅</span>
                <span className="text-yellow-400 text-sm font-medium">{translate('stay_tuned')}</span>
              </div>
            </div>

            <div className="mt-8 max-w-md mx-auto">
              <div className="flex justify-between text-sm text-slate-500 mb-1">
                <span>{translate('progress')}</span>
                <span>75%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-slate-600 mt-2">{translate('almost_there')}</p>
            </div>

            {/* ✅ Language & Currency Display (only shows on client) */}
            {mounted && (
              <div className="mt-12 p-4 bg-slate-800/40 rounded-xl border border-slate-700">
                <p className="text-sm text-slate-400">
                  {translate('current_language')}: <span className="text-slate-200 font-semibold">{currentLanguage?.flag} {currentLanguage?.name}</span>
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  {translate('current_currency')}: <span className="text-slate-200 font-semibold">{currency?.symbol} {currency?.code}</span>
                </p>
              </div>
            )}
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
      `}</style>

      <Footer />
    </>
  );
}