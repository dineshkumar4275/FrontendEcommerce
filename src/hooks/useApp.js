// src/hooks/useApp.js
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useApp = () => {
  // ✅ Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';
  
  try {
    const context = useContext(AppContext);
    if (!context && isBrowser) {
      // Only throw error on client, not during SSR
      throw new Error('useApp must be used within an AppProvider');
    }
    return context || getDefaultContext();
  } catch (e) {
    // Return default values for SSR
    return getDefaultContext();
  }
};

// ✅ Helper function for default values
const getDefaultContext = () => ({
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
  t: (key) => {
    const fallback = {
      'shop_description': "India's premium online shopping destination",
      'home_title': 'Sombustore - Premium Products & Amazing Offers',
      'home_description': "Welcome to Sombustore - India's premium online shopping destination.",
      'coming_soon': '🚀 Coming Soon',
      'discover_your': 'Discover Your',
      'perfect_style': 'Perfect Style',
      'hero_description': "🎨 We're crafting something amazing!",
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
      'under_construction': 'Our store is under construction.',
      'launching_soon': "We're launching soon",
      'stay_tuned': 'Stay tuned!',
      'progress': 'Progress',
      'almost_there': "Almost there!",
      'current_language': 'Current Language',
      'current_currency': 'Current Currency',
      'home': 'Home',
      'shop_now': 'Shop Now',
    };
    return fallback[key] || key;
  },
  formatPrice: (amount) => `₹ ${Number(amount).toFixed(2)}`,
  languages: [],
  currencies: [],
  isLoaded: false,
});

export const useCurrency = () => {
  const { currency, setCurrency, formatPrice } = useApp();
  return { currency, setCurrency, formatPrice };
};

export const useCountry = () => {
  const { country, setCountry } = useApp();
  return { country, setCountry };
};

export const useLanguage = () => {
  const { language, setLanguage, t } = useApp();
  return { language, setLanguage, t };
};

export default useApp;