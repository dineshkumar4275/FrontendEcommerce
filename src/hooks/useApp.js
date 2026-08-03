// // src/hooks/useApp.js
// import { useContext } from 'react';
// import { AppContext } from '../context/AppContext';

// // ✅ Fallback translations
// const fallbackTranslations = {
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

// export const useApp = () => {
//   try {
//     const context = useContext(AppContext);
    
//     // ✅ If context exists, return it
//     if (context) {
//       return context;
//     }
//   } catch (e) {
//     // Context not available
//   }
  
//   // ✅ Return fallback values for SSR
//   return {
//     language: 'en',
//     currency: { code: 'INR', symbol: '₹' },
//     country: { code: 'IN', name: 'India', flag: '🇮🇳' },
//     currentLanguage: { code: 'en', name: 'English', flag: '🇬🇧' },
//     currentCurrency: { code: 'INR', symbol: '₹' },
//     changeLanguage: () => {},
//     changeCurrency: () => {},
//     changeCountry: () => {},
//     setLanguage: () => {},
//     setCurrency: () => {},
//     setCountry: () => {},
//     t: (key) => fallbackTranslations[key] || key,
//     formatPrice: (amount) => `₹ ${Number(amount).toFixed(2)}`,
//     languages: [],
//     currencies: [],
//     isLoaded: false,
//   };
// };

// export const useCurrency = () => {
//   const { currency, setCurrency, formatPrice } = useApp();
//   return { currency, setCurrency, formatPrice };
// };

// export const useCountry = () => {
//   const { country, setCountry } = useApp();
//   return { country, setCountry };
// };

// export const useLanguage = () => {
//   const { language, setLanguage, t } = useApp();
//   return { language, setLanguage, t };
// };

// export default useApp;
// src/hooks/useApp.js
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useApp = () => {
  const context = useContext(AppContext);
  
  // ✅ If context is not available (SSR), return default values
  if (!context) {
    return {
      language: 'en',
      currency: { code: 'INR', symbol: '₹' },
      country: { code: 'IN', name: 'India', flag: '🇮🇳' },
      currentLanguage: { code: 'en', name: 'English', flag: '🇬🇧' },
      currentCurrency: { code: 'INR', symbol: '₹' },
      changeLanguage: () => {},
      changeCurrency: () => {},
      changeCountry: () => {},
      setLanguage: () => {},
      setCurrency: () => {},
      setCountry: () => {},
      t: (key) => key,
      formatPrice: (amount) => `₹ ${Number(amount).toFixed(2)}`,
      languages: [],
      currencies: [],
      isLoaded: false,
      forceUpdate: 0,
    };
  }
  
  return context;
};

export const useCurrency = () => {
  const { currency, changeCurrency, formatPrice } = useApp();
  return { currency, changeCurrency, formatPrice };
};

export const useCountry = () => {
  const { country, changeCountry } = useApp();
  return { country, changeCountry };
};

export const useLanguage = () => {
  const { language, changeLanguage, t } = useApp();
  return { language, changeLanguage, t };
};

export default useApp;