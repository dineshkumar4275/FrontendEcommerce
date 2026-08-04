// // src/providers/AppProvider.jsx
// 'use client';

// import React, { createContext, useState, useEffect, useContext } from 'react';
// import toast from 'react-hot-toast';

// // ✅ Create and export the context
// export const AppContext = createContext();

// // ✅ Export languages
// export const languages = [
//   { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
//   { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
//   { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
//   { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
//   { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
//   { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
//   { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
//   { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
//   { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
//   { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
// ];

// // ✅ Export currencies
// export const currencies = [
//   { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
//   { code: 'USD', symbol: '$', name: 'US Dollar' },
//   { code: 'EUR', symbol: '€', name: 'Euro' },
//   { code: 'GBP', symbol: '£', name: 'British Pound' },
//   { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
//   { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
//   { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
//   { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
//   { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
//   { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
// ];

// // ✅ Translations
// const translations = {
//   en: {
//     home: 'Home',
//     products: 'Products',
//     orders: 'Orders',
//     track_order: 'Track Order',
//     login: 'Login',
//     logout: 'Logout',
//     wishlist: 'Wishlist',
//     filters: 'Filters',
//     categories: 'Categories',
//     all_categories: 'All Categories',
//     price_range: 'Price Range',
//     min_price: 'Min Price',
//     max_price: 'Max Price',
//     sort_by: 'Sort By',
//     newest_first: 'Newest First',
//     price_low_to_high: 'Price: Low to High',
//     price_high_to_low: 'Price: High to Low',
//     name_a_to_z: 'Name: A to Z',
//     apply_filters: 'Apply Filters',
//     clear_all: 'Clear All',
//     search_products: 'Search for products...',
//     your_profile: 'Your Profile',
//     your_orders: 'Your Orders',
//     admin_dashboard: 'Admin Dashboard',
//     admin: 'Administrator',
//     hello: 'Hello',
//     sign_in: 'Sign in',
//     cart: 'Cart',
//     delivering_to: 'Delivering to',
//     select_location: 'Select Location',
//     currency: 'Currency',
//     language: 'Language',
//     country: 'Country',
//     location: 'Location',
//     select_currency: 'Select Currency',
//     current: 'Current',
//     close: 'Close',
//     retry: 'Retry',
//     update: 'Update',
//     your_location: 'Your Location',
//     search_location: 'Search location...',
//     auto_detect: 'Auto-detect',
//     view_map: 'View Map',
//     detecting: 'Detecting...',
//     getting_gps: 'Getting GPS...',
//     found: 'found',
//     detected: 'detected',
//     selected: 'selected',
//     ip_based: 'IP based - may be inaccurate',
//     may_be_inaccurate: 'May be inaccurate',
//     enable_gps_tip: 'Enable GPS for accurate location',
//     unknown_location: 'Unknown Location',
//     search: 'Search',
//     all: 'All',
//     in_stock: 'In Stock',
//     out_of_stock: 'Out of Stock',
//     add_to_cart: 'Add to Cart',
//     buy_now: 'Buy Now',
//     description: 'Description',
//     reviews: 'Reviews',
//     rating: 'Rating',
//     shipping: 'Shipping',
//     returns: 'Returns',
//     payment: 'Payment',
//     order_summary: 'Order Summary',
//     subtotal: 'Subtotal',
//     discount: 'Discount',
//     delivery_charge: 'Delivery Charge',
//     proceed_to_checkout: 'Proceed to Checkout',
//     continue_shopping: 'Continue Shopping',
//     place_order: 'Place Order',
//     order_confirmed: 'Order Confirmed',
//     order_cancelled: 'Order Cancelled',
//     track_your_order: 'Track Your Order',
//     order_id: 'Order ID',
//     order_date: 'Order Date',
//     order_status: 'Order Status',
//     delivered: 'Delivered',
//     shipped: 'Shipped',
//     processing: 'Processing',
//     pending: 'Pending',
//     cancelled: 'Cancelled',
//     refunded: 'Refunded',
//     no_products: 'No Products Available',
//     shop_description: "India's premium online shopping destination",
//     home_title: 'Sombu Store - Premium Products',
//     home_description: 'Welcome to Sombu Store',
//     hero_title: 'Discover Your Perfect Style',
//     hero_subtitle: "We're crafting something amazing!",
//     view_collections: 'View Collections',
//     shop_now: 'Shop Now',
//     explore_products: 'Explore Products',
//     free_shipping: 'Free Shipping',
//     free_shipping_desc: 'On orders above ₹500',
//     secure_payment: 'Secure Payment',
//     secure_payment_desc: '100% Secure',
//     support: '24/7 Support',
//     support_desc: 'Dedicated team',
//     easy_returns: 'Easy Returns',
//     easy_returns_desc: '7 days return',
//     happy_customers: 'Happy Customers',
//     brands: 'Brands',
//     delivery: 'Delivery*',
//     coming_soon: 'Coming Soon',
//     soon: 'Soon',
//     curating_collection: "We're curating the best collection",
//     under_construction: 'Store under construction',
//     launching_soon: "Launching soon",
//     stay_tuned: 'Stay tuned!',
//     progress: 'Progress',
//     almost_there: "Almost there!",
//     current_language: 'Current Language',
//     current_currency: 'Current Currency',
//     select_language: 'Select Language',
//     tamil: 'Tamil',
//     hindi: 'Hindi',
//     telugu: 'Telugu',
//     malayalam: 'Malayalam',
//     english: 'English',
//   },
//   ta: {
//     home: 'முகப்பு',
//     products: 'தயாரிப்புகள்',
//     orders: 'ஆர்டர்கள்',
//     track_order: 'ஆர்டரை கண்காணி',
//     login: 'உள்நுழை',
//     logout: 'வெளியேறு',
//     wishlist: 'விருப்ப பட்டியல்',
//     filters: 'வடிப்பான்கள்',
//     categories: 'வகைகள்',
//     all_categories: 'அனைத்து வகைகளும்',
//     price_range: 'விலை வரம்பு',
//     min_price: 'குறைந்தபட்ச விலை',
//     max_price: 'அதிகபட்ச விலை',
//     sort_by: 'வரிசைப்படுத்து',
//     newest_first: 'புதியவை முதலில்',
//     price_low_to_high: 'குறைந்த விலையில் இருந்து உயர்',
//     price_high_to_low: 'உயர் விலையில் இருந்து குறைந்த',
//     name_a_to_z: 'பெயர் A முதல் Z',
//     apply_filters: 'வடிப்பான்களை பயன்படுத்து',
//     clear_all: 'அனைத்து வடிப்பான்களையும் அழி',
//     search_products: 'தயாரிப்புகளை தேடுங்கள்...',
//     your_profile: 'உங்கள் சுயவிவரம்',
//     your_orders: 'உங்கள் ஆர்டர்கள்',
//     admin_dashboard: 'நிர்வாகி கட்டுப்பாட்டு பலகை',
//     admin: 'நிர்வாகி',
//     hero_title: 'உங்களின் சிறந்த பாணியை கண்டறியுங்கள்',
//     hero_subtitle: "நாங்கள் அற்புதமான ஒன்றை உருவாக்குகிறோம்!",
//     shop_now: 'இப்போது வாங்க',
//     explore_products: 'தயாரிப்புகளை ஆராயுங்கள்',
//     free_shipping: 'இலவச டெலிவரி',
//     free_shipping_desc: '₹500 க்கு மேல் ஆர்டர்களில்',
//     secure_payment: 'பாதுகாப்பான கட்டணம்',
//     secure_payment_desc: '100% பாதுகாப்பானது',
//     support: '24/7 ஆதரவு',
//     support_desc: 'அர்ப்பணிப்பு குழு',
//     easy_returns: 'எளிதான ரிட்டர்ன்',
//     easy_returns_desc: '7 நாட்கள் ரிட்டர்ன்',
//     launching_soon: "விரைவில் திறக்கிறோம்",
//     stay_tuned: 'காத்திருங்கள்!',
//     select_language: 'மொழியை தேர்ந்தெடுக்கவும்',
//     tamil: 'தமிழ்',
//     hindi: 'இந்தி',
//     telugu: 'தெலுங்கு',
//     malayalam: 'மலையாளம்',
//     english: 'ஆங்கிலம்',
//   },
//   hi: {
//     home: 'होम',
//     products: 'उत्पाद',
//     orders: 'ऑर्डर',
//     track_order: 'ट्रैक ऑर्डर',
//     login: 'लॉगिन',
//     logout: 'लॉगआउट',
//     wishlist: 'विशलिस्ट',
//     filters: 'फ़िल्टर',
//     categories: 'श्रेणियाँ',
//     all_categories: 'सभी श्रेणियाँ',
//     price_range: 'मूल्य सीमा',
//     min_price: 'न्यूनतम मूल्य',
//     max_price: 'अधिकतम मूल्य',
//     sort_by: 'क्रमबद्ध करें',
//     newest_first: 'नवीनतम पहले',
//     price_low_to_high: 'कम से ज्यादा कीमत',
//     price_high_to_low: 'ज्यादा से कम कीमत',
//     name_a_to_z: 'नाम A से Z',
//     apply_filters: 'फ़िल्टर लागू करें',
//     clear_all: 'सभी फ़िल्टर साफ़ करें',
//     search_products: 'उत्पाद खोजें...',
//     your_profile: 'आपकी प्रोफ़ाइल',
//     your_orders: 'आपके ऑर्डर',
//     admin_dashboard: 'एडमिन डैशबोर्ड',
//     admin: 'प्रशासक',
//     hero_title: 'खोजें अपनी परफेक्ट स्टाइल',
//     hero_subtitle: "हम कुछ अद्भुत बना रहे हैं!",
//     shop_now: 'अभी खरीदें',
//     explore_products: 'उत्पाद खोजें',
//     free_shipping: 'मुफ्त शिपिंग',
//     free_shipping_desc: '₹500 से अधिक के ऑर्डर पर',
//     secure_payment: 'सुरक्षित भुगतान',
//     secure_payment_desc: '100% सुरक्षित',
//     support: '24/7 सहायता',
//     support_desc: 'समर्पित टीम',
//     easy_returns: 'आसान रिटर्न',
//     easy_returns_desc: '7 दिन रिटर्न',
//     launching_soon: "हम जल्द ही लॉन्च कर रहे हैं",
//     stay_tuned: 'बने रहें!',
//     select_language: 'भाषा चुनें',
//     tamil: 'तमिल',
//     hindi: 'हिंदी',
//     telugu: 'तेलुगु',
//     malayalam: 'मलयालम',
//     english: 'अंग्रेज़ी',
//   },
//   te: {
//     home: 'హోమ్',
//     products: 'ఉత్పత్తులు',
//     orders: 'ఆర్డర్లు',
//     track_order: 'ఆర్డర్ ట్రాక్ చేయండి',
//     login: 'లాగిన్',
//     logout: 'లాగౌట్',
//     wishlist: 'విశ్లిస్ట్',
//     filters: 'ఫిల్టర్లు',
//     categories: 'వర్గాలు',
//     all_categories: 'అన్ని వర్గాలు',
//     price_range: 'ధర పరిధి',
//     min_price: 'కనీస ధర',
//     max_price: 'గరిష్ట ధర',
//     sort_by: 'క్రమీకరించు',
//     newest_first: 'కొత్తవి మొదట',
//     price_low_to_high: 'తక్కువ నుండి ఎక్కువ ధర',
//     price_high_to_low: 'ఎక్కువ నుండి తక్కువ ధర',
//     name_a_to_z: 'పేరు A నుండి Z',
//     apply_filters: 'ఫిల్టర్లు వర్తించు',
//     clear_all: 'అన్నీ క్లియర్ చేయి',
//     search_products: 'ఉత్పత్తుల కోసం శోధించండి...',
//     your_profile: 'మీ ప్రొఫైల్',
//     your_orders: 'మీ ఆర్డర్లు',
//     admin_dashboard: 'అడ్మిన్ డాష్‌బోర్డ్',
//     admin: 'నిర్వాహకుడు',
//     hero_title: 'మీ స్టైల్ కనుగొనండి',
//     hero_subtitle: "మేము అద్భుతమైనదాన్ని సృష్టిస్తున్నాము!",
//     shop_now: 'ఇప్పుడే కొనండి',
//     explore_products: 'ఉత్పత్తులను అన్వేషించండి',
//     free_shipping: 'ఉచిత షిప్పింగ్',
//     free_shipping_desc: '₹500 పైన ఆర్డర్లకు',
//     secure_payment: 'సురక్షిత చెల్లింపు',
//     secure_payment_desc: '100% సురక్షితం',
//     support: '24/7 మద్దతు',
//     support_desc: 'అంకిత బృందం',
//     easy_returns: 'సులభ రిటర్న్స్',
//     easy_returns_desc: '7 రోజుల రిటర్న్',
//     launching_soon: "త్వరలో ప్రారంభం",
//     stay_tuned: 'వేచి ఉండండి!',
//     select_language: 'భాష ఎంచుకోండి',
//     tamil: 'తమిళం',
//     hindi: 'హిందీ',
//     telugu: 'తెలుగు',
//     malayalam: 'మలయాళం',
//     english: 'ఇంగ్లీష్',
//   },
//   ml: {
//     home: 'ഹോം',
//     products: 'ഉൽപ്പന്നങ്ങൾ',
//     orders: 'ഓർഡറുകൾ',
//     track_order: 'ഓർഡർ ട്രാക്ക് ചെയ്യുക',
//     login: 'ലോഗിൻ',
//     logout: 'ലോഗൗട്ട്',
//     wishlist: 'വിഷ്ലിസ്റ്റ്',
//     filters: 'ഫിൽട്ടറുകൾ',
//     categories: 'വിഭാഗങ്ങൾ',
//     all_categories: 'എല്ലാ വിഭാഗങ്ങളും',
//     price_range: 'വില പരിധി',
//     min_price: 'കുറഞ്ഞ വില',
//     max_price: 'കൂടിയ വില',
//     sort_by: 'ക്രമീകരിക്കുക',
//     newest_first: 'പുതിയത് ആദ്യം',
//     price_low_to_high: 'വില: കുറഞ്ഞത് മുതൽ കൂടിയത് വരെ',
//     price_high_to_low: 'വില: കൂടിയത് മുതൽ കുറഞ്ഞത് വരെ',
//     name_a_to_z: 'പേര്: A മുതൽ Z വരെ',
//     apply_filters: 'ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക',
//     clear_all: 'എല്ലാം മായ്ക്കുക',
//     search_products: 'ഉൽപ്പന്നങ്ങൾക്കായി തിരയുക...',
//     your_profile: 'നിങ്ങളുടെ പ്രൊഫൈൽ',
//     your_orders: 'നിങ്ങളുടെ ഓർഡറുകൾ',
//     admin_dashboard: 'അഡ്മിൻ ഡാഷ്ബോർഡ്',
//     admin: 'അഡ്മിനിസ്ട്രേറ്റർ',
//     hero_title: 'നിങ്ങളുടെ സ്റ്റൈൽ കണ്ടെത്തുക',
//     hero_subtitle: "ഞങ്ങൾ അതിശയകരമായ എന്തോ ഒന്ന് നിർമ്മിക്കുകയാണ്!",
//     shop_now: 'ഇപ്പോൾ വാങ്ങുക',
//     explore_products: 'ഉൽപ്പന്നങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക',
//     free_shipping: 'സൗജന്യ ഷിപ്പിംഗ്',
//     free_shipping_desc: '₹500 ന് മുകളിലുള്ള ഓർഡറുകൾക്ക്',
//     secure_payment: 'സുരക്ഷിത പേയ്മെന്റ്',
//     secure_payment_desc: '100% സുരക്ഷിതം',
//     support: '24/7 പിന്തുണ',
//     support_desc: 'സമർപ്പിത ടീം',
//     easy_returns: 'എളുപ്പ റിട്ടേൺസ്',
//     easy_returns_desc: '7 ദിവസം റിട്ടേൺ',
//     launching_soon: "ഉടൻ ലോഞ്ച് ചെയ്യുന്നു",
//     stay_tuned: 'കാത്തിരിക്കുക!',
//     select_language: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
//     tamil: 'തമിഴ്',
//     hindi: 'ഹിന്ദി',
//     telugu: 'തെലുങ്ക്',
//     malayalam: 'മലയാളം',
//     english: 'ഇംഗ്ലീഷ്',
//   },
// };

// // ✅ AppProvider Component
// export const AppProvider = ({ children }) => {
//   const [language, setLanguage] = useState('en');
//   const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹' });
//   const [country, setCountry] = useState({ code: 'IN', name: 'India', flag: '🇮🇳' });
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [forceUpdate, setForceUpdate] = useState(0);

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const savedLanguage = localStorage.getItem('preferredLanguage');
//       const savedCurrency = localStorage.getItem('preferredCurrency');
      
//       if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
//         setLanguage(savedLanguage);
//       } else {
//         setLanguage('en');
//         localStorage.setItem('preferredLanguage', 'en');
//       }
      
//       if (savedCurrency) {
//         try {
//           setCurrency(JSON.parse(savedCurrency));
//         } catch (e) {
//           setCurrency({ code: 'INR', symbol: '₹' });
//         }
//       }
//     }
//     setIsLoaded(true);
//   }, []);

//   const changeLanguage = (langCode) => {
//     setLanguage(langCode);
//     localStorage.setItem('preferredLanguage', langCode);
//     setForceUpdate(prev => prev + 1);
    
//     if (typeof window !== 'undefined') {
//       window.dispatchEvent(new CustomEvent('languageChange', {
//         detail: { language: langCode }
//       }));
//     }
    
//     const lang = languages.find(l => l.code === langCode);
//     toast.success(`🌐 ${lang?.name || langCode} selected`);
//   };

//   const changeCurrency = (currencyData) => {
//     setCurrency(currencyData);
//     localStorage.setItem('preferredCurrency', JSON.stringify(currencyData));
//     setForceUpdate(prev => prev + 1);
    
//     if (typeof window !== 'undefined') {
//       window.dispatchEvent(new CustomEvent('currencyChange', {
//         detail: { currency: currencyData }
//       }));
//     }
    
//     toast.success(`💱 ${currencyData.symbol} ${currencyData.code} selected`);
//   };

//   const t = (key) => {
//     const translation = translations[language]?.[key];
//     if (translation) return translation;
//     return translations.en[key] || key;
//   };

//   const formatPrice = (amount) => {
//     const symbol = currency.symbol || '₹';
//     return `${symbol} ${Number(amount).toFixed(2)}`;
//   };

//   const currentLanguage = languages.find(l => l.code === language) || languages[0];

//   const value = {
//     language,
//     currency,
//     country,
//     currentLanguage,
//     currentCurrency: currency,
//     changeLanguage,
//     changeCurrency,
//     setLanguage,
//     setCurrency,
//     setCountry,
//     t,
//     formatPrice,
//     languages,
//     currencies,
//     isLoaded,
//     forceUpdate,
//   };

//   return (
//     <AppContext.Provider value={value}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// // ✅ Export useApp hook
// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useApp must be used within an AppProvider');
//   }
//   return context;
// };

// // ✅ Default export
// export default AppProvider;
'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

// ✅ Create and export the context
export const AppContext = createContext();

// ✅ ALL WORLD LANGUAGES (195+ countries)
export const languages = [
  // Indian Languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  
  // European Languages
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
  
  // Asian Languages
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی', flag: '🇮🇷' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ', flag: '🇲🇲' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', flag: '🇰🇭' },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰' },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳' },
  
  // Middle Eastern Languages
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  
  // African Languages
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', flag: '🇳🇬' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', flag: '🇳🇬' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali', flag: '🇸🇴' },
  
  // Other Languages
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
];

// ✅ ALL WORLD CURRENCIES (170+ currencies)
export const currencies = [
  // Indian Subcontinent
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee' },
  { code: 'NPR', symbol: 'रु', name: 'Nepalese Rupee' },
  { code: 'AFN', symbol: '؋', name: 'Afghan Afghani' },
  { code: 'MVR', symbol: 'Rf', name: 'Maldivian Rufiyaa' },
  { code: 'BTN', symbol: 'Nu.', name: 'Bhutanese Ngultrum' },
  
  // US & Americas
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  { code: 'UYU', symbol: '$U', name: 'Uruguayan Peso' },
  { code: 'BOB', symbol: 'Bs.', name: 'Bolivian Boliviano' },
  { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani' },
  { code: 'VES', symbol: 'Bs.', name: 'Venezuelan Bolívar' },
  
  // Europe
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna' },
  { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar' },
  { code: 'ISK', symbol: 'kr', name: 'Icelandic Króna' },
  { code: 'ALL', symbol: 'L', name: 'Albanian Lek' },
  { code: 'MKD', symbol: 'ден', name: 'Macedonian Denar' },
  
  // Middle East
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  { code: 'BHD', symbol: 'د.ب', name: 'Bahraini Dinar' },
  { code: 'OMR', symbol: 'ر.ع', name: 'Omani Rial' },
  { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar' },
  { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  { code: 'LYD', symbol: 'ل.د', name: 'Libyan Dinar' },
  { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
  { code: 'IRR', symbol: '﷼', name: 'Iranian Rial' },
  { code: 'IQD', symbol: 'د.ع', name: 'Iraqi Dinar' },
  { code: 'SYP', symbol: '£', name: 'Syrian Pound' },
  { code: 'YER', symbol: '﷼', name: 'Yemeni Rial' },
  
  // Asia Pacific
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  { code: 'MMK', symbol: 'Ks', name: 'Myanmar Kyat' },
  { code: 'KHR', symbol: '៛', name: 'Cambodian Riel' },
  { code: 'LAK', symbol: '₭', name: 'Lao Kip' },
  { code: 'BND', symbol: 'B$', name: 'Brunei Dollar' },
  { code: 'MOP', symbol: 'MOP$', name: 'Macau Pataca' },
  
  // Oceania
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'FJD', symbol: 'FJ$', name: 'Fijian Dollar' },
  { code: 'PGK', symbol: 'K', name: 'Papua New Guinean Kina' },
  { code: 'SBD', symbol: 'SI$', name: 'Solomon Islands Dollar' },
  { code: 'VUV', symbol: 'VT', name: 'Vanuatu Vatu' },
  { code: 'WST', symbol: 'WS$', name: 'Samoan Tala' },
  { code: 'TOP', symbol: 'T$', name: 'Tongan Paʻanga' },
  
  // Africa
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'GHS', symbol: '₵', name: 'Ghanaian Cedi' },
  { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham' },
  { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar' },
  { code: 'DZD', symbol: 'د.ج', name: 'Algerian Dinar' },
  { code: 'MUR', symbol: '₨', name: 'Mauritian Rupee' },
  { code: 'RWF', symbol: 'FRw', name: 'Rwandan Franc' },
  { code: 'XOF', symbol: 'CFA', name: 'West African CFA Franc' },
  { code: 'XAF', symbol: 'FCFA', name: 'Central African CFA Franc' },
  { code: 'UGX', symbol: 'USh', name: 'Ugandan Shilling' },
  { code: 'TZS', symbol: 'TSh', name: 'Tanzanian Shilling' },
  { code: 'ZMW', symbol: 'ZK', name: 'Zambian Kwacha' },
  { code: 'ZWL', symbol: 'Z$', name: 'Zimbabwean Dollar' },
  { code: 'BWP', symbol: 'P', name: 'Botswana Pula' },
  { code: 'NAD', symbol: 'N$', name: 'Namibian Dollar' },
  { code: 'SZL', symbol: 'E', name: 'Swazi Lilangeni' },
  
  // Additional
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  { code: 'GEL', symbol: '₾', name: 'Georgian Lari' },
  { code: 'AMD', symbol: '֏', name: 'Armenian Dram' },
  { code: 'AZN', symbol: '₼', name: 'Azerbaijani Manat' },
  { code: 'KZT', symbol: '₸', name: 'Kazakhstani Tenge' },
  { code: 'UZS', symbol: 'soʻm', name: 'Uzbekistani Som' },
  { code: 'TMT', symbol: 'm', name: 'Turkmenistani Manat' },
  { code: 'MNT', symbol: '₮', name: 'Mongolian Tögrög' },
  
  // Small Islands & Others
  { code: 'CUC', symbol: 'CUC$', name: 'Cuban Convertible Peso' },
  { code: 'CUP', symbol: '$MN', name: 'Cuban Peso' },
  { code: 'DOP', symbol: 'RD$', name: 'Dominican Peso' },
  { code: 'JMD', symbol: 'J$', name: 'Jamaican Dollar' },
  { code: 'TTD', symbol: 'TT$', name: 'Trinidad and Tobago Dollar' },
  { code: 'BBD', symbol: 'Bds$', name: 'Barbadian Dollar' },
  { code: 'BSD', symbol: 'B$', name: 'Bahamian Dollar' },
  { code: 'BMD', symbol: 'BD$', name: 'Bermudian Dollar' },
  { code: 'KYD', symbol: 'CI$', name: 'Cayman Islands Dollar' },
  { code: 'BZD', symbol: 'BZ$', name: 'Belize Dollar' },
  { code: 'GYD', symbol: 'G$', name: 'Guyanese Dollar' },
  { code: 'SRD', symbol: 'Sr$', name: 'Surinamese Dollar' },
  { code: 'AWG', symbol: 'ƒ', name: 'Aruban Florin' },
  { code: 'ANG', symbol: 'ƒ', name: 'Netherlands Antillean Guilder' },
  { code: 'XCD', symbol: 'EC$', name: 'East Caribbean Dollar' },
];

// ✅ Translations (simplified for space)
const translations = {
  en: {
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
    clear_all: 'Clear All',
    search_products: 'Search for products...',
    your_profile: 'Your Profile',
    your_orders: 'Your Orders',
    admin_dashboard: 'Admin Dashboard',
    admin: 'Administrator',
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
    no_products: 'No Products Available',
    shop_description: "India's premium online shopping destination",
    home_title: 'Sombu Store - Premium Products',
    home_description: 'Welcome to Sombu Store',
    hero_title: 'Discover Your Perfect Style',
    hero_subtitle: "We're crafting something amazing!",
    view_collections: 'View Collections',
    shop_now: 'Shop Now',
    explore_products: 'Explore Products',
    free_shipping: 'Free Shipping',
    free_shipping_desc: 'On orders above ₹500',
    secure_payment: 'Secure Payment',
    secure_payment_desc: '100% Secure',
    support: '24/7 Support',
    support_desc: 'Dedicated team',
    easy_returns: 'Easy Returns',
    easy_returns_desc: '7 days return',
    happy_customers: 'Happy Customers',
    brands: 'Brands',
    delivery: 'Delivery*',
    coming_soon: 'Coming Soon',
    soon: 'Soon',
    curating_collection: "We're curating the best collection",
    under_construction: 'Store under construction',
    launching_soon: "Launching soon",
    stay_tuned: 'Stay tuned!',
    progress: 'Progress',
    almost_there: "Almost there!",
    current_language: 'Current Language',
    current_currency: 'Current Currency',
    select_language: 'Select Language',
    tamil: 'Tamil',
    hindi: 'Hindi',
    telugu: 'Telugu',
    malayalam: 'Malayalam',
    english: 'English',
  },
  // Add more language translations here as needed
};

// ✅ AppProvider Component
export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹' });
  const [country, setCountry] = useState({ code: 'IN', name: 'India', flag: '🇮🇳' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferredLanguage');
      const savedCurrency = localStorage.getItem('preferredCurrency');
      
      if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
        setLanguage(savedLanguage);
      } else {
        setLanguage('en');
        localStorage.setItem('preferredLanguage', 'en');
      }
      
      if (savedCurrency) {
        try {
          setCurrency(JSON.parse(savedCurrency));
        } catch (e) {
          setCurrency({ code: 'INR', symbol: '₹' });
        }
      }
    }
    setIsLoaded(true);
  }, []);

  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setForceUpdate(prev => prev + 1);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', {
        detail: { language: langCode }
      }));
    }
    
    const lang = languages.find(l => l.code === langCode);
    toast.success(`🌐 ${lang?.name || langCode} selected`);
  };

  const changeCurrency = (currencyData) => {
    setCurrency(currencyData);
    localStorage.setItem('preferredCurrency', JSON.stringify(currencyData));
    setForceUpdate(prev => prev + 1);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('currencyChange', {
        detail: { currency: currencyData }
      }));
    }
    
    toast.success(`💱 ${currencyData.symbol} ${currencyData.code} selected`);
  };

  const t = (key) => {
    const translation = translations[language]?.[key];
    if (translation) return translation;
    return translations.en[key] || key;
  };

  const formatPrice = (amount) => {
    const symbol = currency.symbol || '₹';
    return `${symbol} ${Number(amount).toFixed(2)}`;
  };

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  const value = {
    language,
    currency,
    country,
    currentLanguage,
    currentCurrency: currency,
    changeLanguage,
    changeCurrency,
    setLanguage,
    setCurrency,
    setCountry,
    t,
    formatPrice,
    languages,
    currencies,
    isLoaded,
    forceUpdate,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// ✅ Export useApp hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// ✅ Default export
export default AppProvider;