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

// ✅ Fallback translations for SSR
const fallbackTranslations = {
  home: 'Home',
  products: 'Products',
  orders: 'Orders',
  track_order: 'Track Order',
  login: 'Login',
  logout: 'Logout',
  wishlist: 'Wishlist',
  filters: 'Filters',
  categories: 'Categories',
  all_categories: 'All Categories',
  price_range: 'Price Range',
  min_price: 'Min Price',
  max_price: 'Max Price',
  sort_by: 'Sort By',
  newest_first: 'Newest First',
  price_low_to_high: 'Price: Low to High',
  price_high_to_low: 'Price: High to Low',
  name_a_to_z: 'Name: A to Z',
  apply_filters: 'Apply Filters',
  clear_all: 'Clear All Filters',
  search_products: 'Search for products...',
  your_profile: 'Your Profile',
  your_orders: 'Your Orders',
  admin_dashboard: 'Admin Dashboard',
  select_language: 'Select Language',
  hello: 'Hello',
  sign_in: 'Sign in',
  cart: 'Cart',
  delivering_to: 'Delivering to',
  select_location: 'Select Location',
  currency: 'Currency',
  language: 'Language',
  country: 'Country',
  location: 'Location',
  select_currency: 'Select Currency',
  current: 'Current',
  close: 'Close',
  retry: 'Retry',
  update: 'Update',
  your_location: 'Your Location',
  search_location: 'Search location...',
  auto_detect: 'Auto-detect',
  view_map: 'View Map',
  detecting: 'Detecting...',
  getting_gps: 'Getting GPS...',
  found: 'found',
  detected: 'detected',
  selected: 'selected',
  ip_based: 'IP based - may be inaccurate',
  may_be_inaccurate: 'May be inaccurate',
  enable_gps_tip: 'Enable GPS for accurate location',
  unknown_location: 'Unknown Location',
  admin: 'Administrator',
  search: 'Search',
  all: 'All',
  in_stock: 'In Stock',
  out_of_stock: 'Out of Stock',
  add_to_cart: 'Add to Cart',
  buy_now: 'Buy Now',
  description: 'Description',
  reviews: 'Reviews',
  rating: 'Rating',
  shipping: 'Shipping',
  returns: 'Returns',
  payment: 'Payment',
  order_summary: 'Order Summary',
  subtotal: 'Subtotal',
  discount: 'Discount',
  delivery_charge: 'Delivery Charge',
  proceed_to_checkout: 'Proceed to Checkout',
  continue_shopping: 'Continue Shopping',
  place_order: 'Place Order',
  order_confirmed: 'Order Confirmed',
  order_cancelled: 'Order Cancelled',
  track_your_order: 'Track Your Order',
  order_id: 'Order ID',
  order_date: 'Order Date',
  order_status: 'Order Status',
  delivered: 'Delivered',
  shipped: 'Shipped',
  processing: 'Processing',
  pending: 'Pending',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  shop_description: "India's premium online shopping destination",
  home_title: 'Sombu Store - Premium Products',
  home_description: "Welcome to Sombu Store",
  coming_soon: 'Coming Soon',
  discover_your: 'Discover Your',
  perfect_style: 'Perfect Style',
  hero_description: "We're crafting something amazing!",
  view_collections: 'View Collections',
  soon: 'Soon',
  happy_customers: 'Happy Customers',
  brands: 'Brands',
  delivery: 'Delivery*',
  free_shipping: 'Free Shipping',
  free_shipping_desc: 'On orders above ₹500',
  secure_payment: 'Secure Payment',
  secure_payment_desc: '100% Secure',
  support: '24/7 Support',
  support_desc: 'Dedicated team',
  easy_returns: 'Easy Returns',
  easy_returns_desc: '7 days return',
  no_products: 'No Products Available',
  curating_collection: "We're curating the best collection",
  under_construction: 'Store under construction',
  launching_soon: "Launching soon",
  stay_tuned: 'Stay tuned!',
  progress: 'Progress',
  almost_there: "Almost there!",
  current_language: 'Current Language',
  current_currency: 'Current Currency',
};

export const useApp = () => {
  try {
    const context = useContext(AppContext);
    
    // ✅ If context exists, return it
    if (context) {
      return context;
    }
  } catch (e) {
    // Context not available
    console.warn('⚠️ AppContext not available, using fallback');
  }
  
  // ✅ Return fallback values for SSR
  return {
    language: 'en',
    currency: { code: 'INR', symbol: '₹' },
    country: { code: 'IN', name: 'India', flag: '🇮🇳' },
    currentLanguage: { code: 'en', name: 'English', flag: '🇬🇧' },
    currentCurrency: { code: 'INR', symbol: '₹' },
    changeLanguage: (langCode) => {
      console.log('🔤 Fallback changeLanguage:', langCode);
      localStorage.setItem('preferredLanguage', langCode);
      // ✅ Reload page to apply changes
      window.location.reload();
    },
    changeCurrency: (currencyData) => {
      console.log('💱 Fallback changeCurrency:', currencyData);
      localStorage.setItem('preferredCurrency', JSON.stringify(currencyData));
    },
    changeCountry: () => {},
    setLanguage: () => {},
    setCurrency: () => {},
    setCountry: () => {},
    t: (key) => fallbackTranslations[key] || key,
    formatPrice: (amount) => `₹ ${Number(amount).toFixed(2)}`,
    languages: [
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'ta', name: 'Tamil', flag: '🇮🇳' },
      { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
      { code: 'te', name: 'Telugu', flag: '🇮🇳' },
      { code: 'ml', name: 'Malayalam', flag: '🇮🇳' },
    ],
    currencies: [
      { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
      { code: 'USD', symbol: '$', name: 'US Dollar' },
      { code: 'EUR', symbol: '€', name: 'Euro' },
      { code: 'GBP', symbol: '£', name: 'British Pound' },
    ],
    isLoaded: false,
    forceUpdate: 0,
  };
};

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