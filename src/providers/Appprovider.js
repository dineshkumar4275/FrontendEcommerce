// src/providers/Appprovider.jsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// ✅ Translations
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
    search_products: 'Search for products, brands, and categories...',
    your_profile: 'Your Profile',
    your_orders: 'Your Orders',
    track_order: 'Track Order',
    admin_dashboard: 'Admin Dashboard',
    select_language: 'Select Language',
    shop_now: 'Shop Now',
    featured: 'Featured',
    trending: 'Trending',
    new_arrivals: 'New Arrivals',
    best_sellers: 'Best Sellers',
    added_to_cart: 'Added to cart',
    removed_from_cart: 'Removed from cart',
    cart_empty: 'Your cart is empty',
    checkout: 'Checkout',
    total: 'Total',
    view_cart: 'View Cart',
    delivering_to: 'Delivering to',
    select_location: 'Select Location',
    no_results: 'No locations found',
    try_different: 'Try a different search term',
    currency: 'Currency',
    language: 'Language',
    country: 'Country',
  },
  hi: {
    home: 'होम',
    products: 'उत्पाद',
    orders: 'ऑर्डर',
    track: 'ट्रैक ऑर्डर',
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    wishlist: 'विशलिस्ट',
    filters: 'फ़िल्टर',
    categories: 'श्रेणियाँ',
    all_categories: 'सभी श्रेणियाँ',
    price_range: 'मूल्य सीमा',
    min_price: 'न्यूनतम मूल्य',
    max_price: 'अधिकतम मूल्य',
    sort_by: 'क्रमबद्ध करें',
    newest_first: 'नवीनतम पहले',
    price_low_to_high: 'कम से ज्यादा कीमत',
    price_high_to_low: 'ज्यादा से कम कीमत',
    name_a_to_z: 'नाम A से Z',
    apply_filters: 'फ़िल्टर लागू करें',
    clear_all: 'सभी फ़िल्टर साफ़ करें',
    search_products: 'उत्पाद, ब्रांड और श्रेणियाँ खोजें...',
    your_profile: 'आपकी प्रोफ़ाइल',
    your_orders: 'आपके ऑर्डर',
    track_order: 'ऑर्डर ट्रैक करें',
    admin_dashboard: 'एडमिन डैशबोर्ड',
    select_language: 'भाषा चुनें',
    shop_now: 'अभी खरीदें',
    featured: 'विशेष',
    trending: 'ट्रेंडिंग',
    new_arrivals: 'नए आगमन',
    best_sellers: 'बेस्ट सेलर्स',
    added_to_cart: 'कार्ट में जोड़ा गया',
    removed_from_cart: 'कार्ट से हटाया गया',
    cart_empty: 'आपकी कार्ट खाली है',
    checkout: 'चेकआउट',
    total: 'कुल',
    view_cart: 'कार्ट देखें',
    delivering_to: 'डिलीवरी हो रही है',
    select_location: 'स्थान चुनें',
    no_results: 'कोई स्थान नहीं मिला',
    try_different: 'अलग शब्द खोजें',
    currency: 'मुद्रा',
    language: 'भाषा',
    country: 'देश',
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
    search_products: 'தயாரிப்புகள், பிராண்டுகள் மற்றும் வகைகளை தேடுங்கள்...',
    your_profile: 'உங்கள் சுயவிவரம்',
    your_orders: 'உங்கள் ஆர்டர்கள்',
    track_order: 'ஆர்டரை கண்காணி',
    admin_dashboard: 'நிர்வாகி கட்டுப்பாட்டு பலகை',
    select_language: 'மொழியை தேர்ந்தெடுக்கவும்',
    shop_now: 'இப்போது வாங்க',
    featured: 'சிறப்பு',
    trending: 'பிரபலமானது',
    new_arrivals: 'புதிய வருகை',
    best_sellers: 'சிறந்த விற்பனையாளர்கள்',
    added_to_cart: 'கார்டில் சேர்க்கப்பட்டது',
    removed_from_cart: 'கார்டில் இருந்து நீக்கப்பட்டது',
    cart_empty: 'உங்கள் கார்ட் காலியாக உள்ளது',
    checkout: 'கட்டணம் செலுத்து',
    total: 'மொத்தம்',
    view_cart: 'கார்டை காண்க',
    delivering_to: 'டெலிவரி செய்யப்படுகிறது',
    select_location: 'இருப்பிடத்தை தேர்ந்தெடுக்கவும்',
    no_results: 'இருப்பிடங்கள் எதுவும் இல்லை',
    try_different: 'வேறு சொல்லை முயற்சிக்கவும்',
    currency: 'நாணயம்',
    language: 'மொழி',
    country: 'நாடு',
  },
  te: {
    home: 'హోమ్',
    products: 'ఉత్పత్తులు',
    orders: 'ఆర్డర్లు',
    track: 'ఆర్డర్ ట్రాక్',
    login: 'లాగిన్',
    logout: 'లాగౌట్',
    wishlist: 'విష్‌లిస్ట్',
    filters: 'ఫిల్టర్లు',
    categories: 'వర్గాలు',
    all_categories: 'అన్ని వర్గాలు',
    price_range: 'ధర పరిధి',
    min_price: 'కనిష్ట ధర',
    max_price: 'గరిష్ట ధర',
    sort_by: 'క్రమీకరించు',
    newest_first: 'కొత్తవి మొదట',
    price_low_to_high: 'తక్కువ నుండి ఎక్కువ ధర',
    price_high_to_low: 'ఎక్కువ నుండి తక్కువ ధర',
    name_a_to_z: 'పేరు A నుండి Z',
    apply_filters: 'ఫిల్టర్లు వర్తింపజేయి',
    clear_all: 'అన్ని ఫిల్టర్లు క్లియర్',
    search_products: 'ఉత్పత్తులు, బ్రాండ్‌లు మరియు వర్గాలను శోధించండి...',
    your_profile: 'మీ ప్రొఫైల్',
    your_orders: 'మీ ఆర్డర్లు',
    track_order: 'ఆర్డర్ ట్రాక్',
    admin_dashboard: 'నిర్వాహక డాష్‌బోర్డ్',
    select_language: 'భాషను ఎంచుకోండి',
    shop_now: 'ఇప్పుడే కొనుగోలు చేయండి',
    featured: 'ప్రత్యేక',
    trending: 'ట్రెండింగ్',
    new_arrivals: 'కొత్త ఆగమనాలు',
    best_sellers: 'అత్యంత అమ్ముడైనవి',
    added_to_cart: 'కార్ట్‌కి జోడించబడింది',
    removed_from_cart: 'కార్ట్ నుండి తీసివేయబడింది',
    cart_empty: 'మీ కార్ట్ ఖాళీగా ఉంది',
    checkout: 'చెకౌట్',
    total: 'మొత్తం',
    view_cart: 'కార్ట్ వీక్షించండి',
    delivering_to: 'డెలివరీ చేస్తున్నాము',
    select_location: 'స్థానాన్ని ఎంచుకోండి',
    no_results: 'స్థానాలు కనుగొనబడలేదు',
    try_different: 'వేరే పదాన్ని ప్రయత్నించండి',
    currency: 'కరెన్సీ',
    language: 'భాష',
    country: 'దేశం',
  },
  ml: {
    home: 'ഹോം',
    products: 'ഉൽപ്പന്നങ്ങൾ',
    orders: 'ഓർഡറുകൾ',
    track: 'ഓർഡർ ട്രാക്ക്',
    login: 'ലോഗിൻ',
    logout: 'ലോഗൗട്ട്',
    wishlist: 'വിഷ്ലിസ്റ്റ്',
    filters: 'ഫിൽട്ടറുകൾ',
    categories: 'വിഭാഗങ്ങൾ',
    all_categories: 'എല്ലാ വിഭാഗങ്ങളും',
    price_range: 'വില പരിധി',
    min_price: 'ഏറ്റവും കുറഞ്ഞ വില',
    max_price: 'ഏറ്റവും കൂടിയ വില',
    sort_by: 'അടുക്കുക',
    newest_first: 'ഏറ്റവും പുതിയത് ആദ്യം',
    price_low_to_high: 'കുറഞ്ഞതിൽ നിന്ന് ഉയർന്ന വില',
    price_high_to_low: 'ഉയർന്നതിൽ നിന്ന് കുറഞ്ഞ വില',
    name_a_to_z: 'പേര് A മുതൽ Z',
    apply_filters: 'ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക',
    clear_all: 'എല്ലാ ഫിൽട്ടറുകളും മായ്ക്കുക',
    search_products: 'ഉൽപ്പന്നങ്ങൾ, ബ്രാൻഡുകൾ, വിഭാഗങ്ങൾ എന്നിവ തിരയുക...',
    your_profile: 'നിങ്ങളുടെ പ്രൊഫൈൽ',
    your_orders: 'നിങ്ങളുടെ ഓർഡറുകൾ',
    track_order: 'ഓർഡർ ട്രാക്ക്',
    admin_dashboard: 'അഡ്മിൻ ഡാഷ്‌ബോർഡ്',
    select_language: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    shop_now: 'ഇപ്പോൾ വാങ്ങുക',
    featured: 'ഫീച്ചർ ചെയ്തത്',
    trending: 'ട്രെൻഡിംഗ്',
    new_arrivals: 'പുതിയ എത്തിച്ചേരലുകൾ',
    best_sellers: 'ബെസ്റ്റ് സെല്ലേഴ്സ്',
    added_to_cart: 'കാർട്ടിൽ ചേർത്തു',
    removed_from_cart: 'കാർട്ടിൽ നിന്ന് നീക്കം ചെയ്തു',
    cart_empty: 'നിങ്ങളുടെ കാർട്ട് ശൂന്യമാണ്',
    checkout: 'ചെക്കൗട്ട്',
    total: 'ആകെ',
    view_cart: 'കാർട്ട് കാണുക',
    delivering_to: 'ഡെലിവറി ചെയ്യുന്നു',
    select_location: 'സ്ഥാനം തിരഞ്ഞെടുക്കുക',
    no_results: 'സ്ഥാനങ്ങൾ കണ്ടെത്തിയില്ല',
    try_different: 'മറ്റൊരു പദം പരീക്ഷിക്കുക',
    currency: 'കറൻസി',
    language: 'ഭാഷ',
    country: 'രാജ്യം',
  },
};

// ✅ Currency options
const currencies = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
];

// ✅ Language options
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
];

// ✅ Create Context
const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// ✅ Provider Component
const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹' });
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Load saved preferences on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const savedCurrency = localStorage.getItem('preferredCurrency');
    
    if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
    
    if (savedCurrency) {
      try {
        setCurrency(JSON.parse(savedCurrency));
      } catch (e) {
        setCurrency({ code: 'INR', symbol: '₹' });
      }
    }
    
    setIsLoaded(true);
  }, []);

  // ✅ Change language
  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('languageChange', {
        detail: { language: langCode }
      }));
    }
  };

  // ✅ Change currency
  const changeCurrency = (currencyData) => {
    setCurrency(currencyData);
    localStorage.setItem('preferredCurrency', JSON.stringify(currencyData));
    
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('currencyChange', {
        detail: { currency: currencyData }
      }));
    }
  };

  // ✅ Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // ✅ Format price with currency
  const formatPrice = (amount) => {
    const symbol = currency.symbol || '₹';
    return `${symbol} ${Number(amount).toFixed(2)}`;
  };

  // ✅ Get current language object
  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  // ✅ Get current currency object
  const currentCurrency = currency;

  const value = {
    language,
    currency,
    currentLanguage,
    currentCurrency,
    changeLanguage,
    changeCurrency,
    t,
    formatPrice,
    languages,
    currencies,
    isLoaded,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;