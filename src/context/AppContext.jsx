// src/context/AppContext.jsx
// src/context/AppContext.jsx
'use client';

import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

// ✅ ALL WORLD LANGUAGES
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭' },
  { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
  { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
  { code: 'xh', name: 'isiXhosa', flag: '🇿🇦' },
  { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
];

// ✅ ALL CURRENCIES
const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
];

// ✅ TRANSLATIONS - Only English and Tamil for now
const translations = {
  en: {
    home: 'Home',
    products: 'Products',
    orders: 'Orders',
    track: 'Track Order',
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
    track_order: 'Track Order',
    admin_dashboard: 'Admin Dashboard',
    select_language: 'Select Language',
    shop_now: 'Shop Now',
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
  },
  ta: {
    home: 'முகப்பு',
    products: 'தயாரிப்புகள்',
    orders: 'ஆர்டர்கள்',
    track: 'ஆர்டரை கண்காணி',
    login: 'உள்நுழை',
    logout: 'வெளியேறு',
    wishlist: 'விருப்ப பட்டியல்',
    filters: 'வடிப்பான்கள்',
    categories: 'வகைகள்',
    all_categories: 'அனைத்து வகைகளும்',
    price_range: 'விலை வரம்பு',
    min_price: 'குறைந்தபட்ச விலை',
    max_price: 'அதிகபட்ச விலை',
    sort_by: 'வரிசைப்படுத்து',
    newest_first: 'புதியவை முதலில்',
    price_low_to_high: 'குறைந்த விலையில் இருந்து உயர்',
    price_high_to_low: 'உயர் விலையில் இருந்து குறைந்த',
    name_a_to_z: 'பெயர் A முதல் Z',
    apply_filters: 'வடிப்பான்களை பயன்படுத்து',
    clear_all: 'அனைத்து வடிப்பான்களையும் அழி',
    search_products: 'தயாரிப்புகளை தேடுங்கள்...',
    your_profile: 'உங்கள் சுயவிவரம்',
    your_orders: 'உங்கள் ஆர்டர்கள்',
    track_order: 'ஆர்டரை கண்காணி',
    admin_dashboard: 'நிர்வாகி கட்டுப்பாட்டு பலகை',
    select_language: 'மொழியை தேர்ந்தெடுக்கவும்',
    shop_now: 'இப்போது வாங்க',
    hello: 'வணக்கம்',
    sign_in: 'உள்நுழையவும்',
    cart: 'கார்ட்',
    delivering_to: 'டெலிவரி செய்யப்படுகிறது',
    select_location: 'இருப்பிடத்தை தேர்ந்தெடுக்கவும்',
    currency: 'நாணயம்',
    language: 'மொழி',
    country: 'நாடு',
    location: 'இருப்பிடம்',
    select_currency: 'நாணயத்தை தேர்ந்தெடுக்கவும்',
    current: 'தற்போதைய',
    close: 'மூடு',
    retry: 'மீண்டும் முயற்சி செய்',
    update: 'புதுப்பி',
    your_location: 'உங்கள் இருப்பிடம்',
    search_location: 'இருப்பிடத்தை தேடு...',
    auto_detect: 'தானாக கண்டறி',
    view_map: 'வரைபடத்தை காண்க',
    detecting: 'கண்டறிகிறது...',
    getting_gps: 'GPS பெறுகிறது...',
    found: 'கண்டுபிடிக்கப்பட்டது',
    detected: 'கண்டறியப்பட்டது',
    selected: 'தேர்ந்தெடுக்கப்பட்டது',
    ip_based: 'IP அடிப்படையில் - தவறாக இருக்கலாம்',
    may_be_inaccurate: 'தவறாக இருக்கலாம்',
    enable_gps_tip: 'துல்லியமான இருப்பிடத்திற்கு GPS ஐ இயக்கவும்',
    unknown_location: 'அறியப்படாத இருப்பிடம்',
    admin: 'நிர்வாகி',
    search: 'தேடு',
    all: 'அனைத்தும்',
    in_stock: 'கையிருப்பில் உள்ளது',
    out_of_stock: 'கையிருப்பில் இல்லை',
    add_to_cart: 'கார்டில் சேர்',
    buy_now: 'இப்போது வாங்க',
    description: 'விளக்கம்',
    reviews: 'விமர்சனங்கள்',
    rating: 'மதிப்பீடு',
    shipping: 'கப்பல்',
    returns: 'திரும்பப் பெறுதல்',
    payment: 'கட்டணம்',
    order_summary: 'ஆர்டர் சுருக்கம்',
    subtotal: 'துணை மொத்தம்',
    discount: 'தள்ளுபடி',
    delivery_charge: 'டெலிவரி கட்டணம்',
    proceed_to_checkout: 'செலுத்துவதற்கு செல்லவும்',
    continue_shopping: 'தொடர்ந்து ஷாப்பிங் செய்யுங்கள்',
    place_order: 'ஆர்டர் செய்யுங்கள்',
    order_confirmed: 'ஆர்டர் உறுதி செய்யப்பட்டது',
    order_cancelled: 'ஆர்டர் ரத்து செய்யப்பட்டது',
    track_your_order: 'உங்கள் ஆர்டரை கண்காணிக்கவும்',
    order_id: 'ஆர்டர் ID',
    order_date: 'ஆர்டர் தேதி',
    order_status: 'ஆர்டர் நிலை',
    delivered: 'டெலிவரி செய்யப்பட்டது',
    shipped: 'அனுப்பப்பட்டது',
    processing: 'செயலாக்கம்',
    pending: 'நிலுவையில்',
    cancelled: 'ரத்து செய்யப்பட்டது',
    refunded: 'பணம் திருப்பி வழங்கப்பட்டது',
    shop_description: "இந்தியாவின் பிரீமியம் ஆன்லைன் ஷாப்பிங் இடம்",
    home_title: 'Sombu Store - பிரீமியம் தயாரிப்புகள்',
    home_description: 'Sombu Store - இந்தியாவின் பிரீமியம் ஆன்லைன் ஷாப்பிங் இடம்',
    coming_soon: '🚀 விரைவில் வருகிறது',
    discover_your: 'உங்களின்',
    perfect_style: 'பெர்ஃபெக்ட் ஸ்டைலை கண்டறியுங்கள்',
    hero_description: "🎨 நாங்கள் அற்புதமான ஒன்றை உருவாக்குகிறோம்!",
    view_collections: 'சேகரிப்புகளைக் காண்க',
    soon: 'விரைவில்',
    happy_customers: 'மகிழ்ச்சியான வாடிக்கையாளர்கள்',
    brands: 'பிராண்டுகள்',
    delivery: 'டெலிவரி*',
    free_shipping: 'இலவச டெலிவரி',
    free_shipping_desc: '₹500 க்கு மேல் ஆர்டர்களில்',
    secure_payment: 'பாதுகாப்பான கட்டணம்',
    secure_payment_desc: '100% பாதுகாப்பானது',
    support: '24/7 ஆதரவு',
    support_desc: 'அர்ப்பணிப்பு குழு',
    easy_returns: 'எளிதான ரிட்டர்ன்',
    easy_returns_desc: '7 நாட்கள் ரிட்டர்ன்',
    no_products: 'தயாரிப்புகள் எதுவும் இல்லை',
    curating_collection: "சிறந்த சேகரிப்புகளை தயாரித்து வருகிறோம்",
    under_construction: 'ஸ்டோர் கட்டுமானத்தில் உள்ளது',
    launching_soon: "விரைவில் திறக்கிறோம்",
    stay_tuned: 'காத்திருங்கள்!',
    progress: 'முன்னேற்றம்',
    almost_there: "கிட்டத்தட்ட முடிந்துவிட்டது!",
    current_language: 'தற்போதைய மொழி',
    current_currency: 'தற்போதைய நாணயம்',
  },
};

// ✅ For other languages, use English as fallback
// You can add more language translations here as needed

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹' });
  const [country, setCountry] = useState({ code: 'IN', name: 'India', flag: '🇮🇳' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const savedCurrency = localStorage.getItem('preferredCurrency');
    const savedCountry = localStorage.getItem('preferredCountry');
    
    console.log('🔍 Loading saved language:', savedLanguage);
    
    if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      setLanguage('en');
    }
    
    if (savedCurrency) {
      try {
        setCurrency(JSON.parse(savedCurrency));
      } catch (e) {
        setCurrency({ code: 'INR', symbol: '₹' });
      }
    }
    
    if (savedCountry) {
      try {
        setCountry(JSON.parse(savedCountry));
      } catch (e) {}
    }
    
    setIsLoaded(true);
  }, []);

  const changeLanguage = (langCode) => {
    console.log('🔄 Changing language to:', langCode);
    setLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    
    // ✅ Force re-render
    setForceUpdate(prev => prev + 1);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', {
        detail: { language: langCode }
      }));
    }
    
    // ✅ Show toast
    const lang = languages.find(l => l.code === langCode);
    toast.success(`Language changed to ${lang?.name || langCode}`);
  };

  const changeCurrency = (currencyData) => {
    setCurrency(currencyData);
    localStorage.setItem('preferredCurrency', JSON.stringify(currencyData));
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('currencyChange', {
        detail: { currency: currencyData }
      }));
    }
  };

  const changeCountry = (countryData) => {
    setCountry(countryData);
    localStorage.setItem('preferredCountry', JSON.stringify(countryData));
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('countryChange', {
        detail: { country: countryData }
      }));
    }
  };

  // ✅ Translation function with fallback
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
    changeCountry,
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