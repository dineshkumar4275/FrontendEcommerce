// // // // src/components/GlobalSelector.jsx
// // // 'use client';

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import {
// // //   GlobeAltIcon,
// // //   ChevronDownIcon,
// // //   CheckIcon,
// // //   XMarkIcon,
// // //   MapPinIcon,
// // //   CurrencyDollarIcon,
// // //   LanguageIcon
// // // } from '@heroicons/react/24/outline';
// // // import toast from 'react-hot-toast';

// // // // ✅ Country Data with Currency, Language, and Flag
// // // const COUNTRY_DATA = {
// // //   IN: {
// // //     code: 'IN',
// // //     name: 'India',
// // //     flag: '🇮🇳',
// // //     currency: '₹',
// // //     currencyCode: 'INR',
// // //     languages: ['hi', 'en', 'ta', 'te', 'ml', 'bn', 'mr', 'gu', 'kn', 'or', 'pa', 'ur'],
// // //     defaultLanguage: 'en',
// // //     timezone: 'Asia/Kolkata',
// // //     phoneCode: '+91',
// // //   },
// // //   US: {
// // //     code: 'US',
// // //     name: 'United States',
// // //     flag: '🇺🇸',
// // //     currency: '$',
// // //     currencyCode: 'USD',
// // //     languages: ['en'],
// // //     defaultLanguage: 'en',
// // //     timezone: 'America/New_York',
// // //     phoneCode: '+1',
// // //   },
// // //   GB: {
// // //     code: 'GB',
// // //     name: 'United Kingdom',
// // //     flag: '🇬🇧',
// // //     currency: '£',
// // //     currencyCode: 'GBP',
// // //     languages: ['en'],
// // //     defaultLanguage: 'en',
// // //     timezone: 'Europe/London',
// // //     phoneCode: '+44',
// // //   },
// // //   AE: {
// // //     code: 'AE',
// // //     name: 'UAE',
// // //     flag: '🇦🇪',
// // //     currency: 'د.إ',
// // //     currencyCode: 'AED',
// // //     languages: ['ar', 'en'],
// // //     defaultLanguage: 'en',
// // //     timezone: 'Asia/Dubai',
// // //     phoneCode: '+971',
// // //   },
// // //   SA: {
// // //     code: 'SA',
// // //     name: 'Saudi Arabia',
// // //     flag: '🇸🇦',
// // //     currency: 'ر.س',
// // //     currencyCode: 'SAR',
// // //     languages: ['ar', 'en'],
// // //     defaultLanguage: 'ar',
// // //     timezone: 'Asia/Riyadh',
// // //     phoneCode: '+966',
// // //   },
// // //   SG: {
// // //     code: 'SG',
// // //     name: 'Singapore',
// // //     flag: '🇸🇬',
// // //     currency: 'S$',
// // //     currencyCode: 'SGD',
// // //     languages: ['en', 'zh', 'ms', 'ta'],
// // //     defaultLanguage: 'en',
// // //     timezone: 'Asia/Singapore',
// // //     phoneCode: '+65',
// // //   },
// // //   MY: {
// // //     code: 'MY',
// // //     name: 'Malaysia',
// // //     flag: '🇲🇾',
// // //     currency: 'RM',
// // //     currencyCode: 'MYR',
// // //     languages: ['ms', 'en', 'zh', 'ta'],
// // //     defaultLanguage: 'ms',
// // //     timezone: 'Asia/Kuala_Lumpur',
// // //     phoneCode: '+60',
// // //   },
// // //   AU: {
// // //     code: 'AU',
// // //     name: 'Australia',
// // //     flag: '🇦🇺',
// // //     currency: '$',
// // //     currencyCode: 'AUD',
// // //     languages: ['en'],
// // //     defaultLanguage: 'en',
// // //     timezone: 'Australia/Sydney',
// // //     phoneCode: '+61',
// // //   },
// // //   CA: {
// // //     code: 'CA',
// // //     name: 'Canada',
// // //     flag: '🇨🇦',
// // //     currency: 'C$',
// // //     currencyCode: 'CAD',
// // //     languages: ['en', 'fr'],
// // //     defaultLanguage: 'en',
// // //     timezone: 'America/Toronto',
// // //     phoneCode: '+1',
// // //   },
// // //   DE: {
// // //     code: 'DE',
// // //     name: 'Germany',
// // //     flag: '🇩🇪',
// // //     currency: '€',
// // //     currencyCode: 'EUR',
// // //     languages: ['de', 'en'],
// // //     defaultLanguage: 'de',
// // //     timezone: 'Europe/Berlin',
// // //     phoneCode: '+49',
// // //   },
// // //   FR: {
// // //     code: 'FR',
// // //     name: 'France',
// // //     flag: '🇫🇷',
// // //     currency: '€',
// // //     currencyCode: 'EUR',
// // //     languages: ['fr', 'en'],
// // //     defaultLanguage: 'fr',
// // //     timezone: 'Europe/Paris',
// // //     phoneCode: '+33',
// // //   },
// // //   JP: {
// // //     code: 'JP',
// // //     name: 'Japan',
// // //     flag: '🇯🇵',
// // //     currency: '¥',
// // //     currencyCode: 'JPY',
// // //     languages: ['ja', 'en'],
// // //     defaultLanguage: 'ja',
// // //     timezone: 'Asia/Tokyo',
// // //     phoneCode: '+81',
// // //   },
// // //   CN: {
// // //     code: 'CN',
// // //     name: 'China',
// // //     flag: '🇨🇳',
// // //     currency: '¥',
// // //     currencyCode: 'CNY',
// // //     languages: ['zh', 'en'],
// // //     defaultLanguage: 'zh',
// // //     timezone: 'Asia/Shanghai',
// // //     phoneCode: '+86',
// // //   },
// // //   BR: {
// // //     code: 'BR',
// // //     name: 'Brazil',
// // //     flag: '🇧🇷',
// // //     currency: 'R$',
// // //     currencyCode: 'BRL',
// // //     languages: ['pt', 'en'],
// // //     defaultLanguage: 'pt',
// // //     timezone: 'America/Sao_Paulo',
// // //     phoneCode: '+55',
// // //   },
// // //   RU: {
// // //     code: 'RU',
// // //     name: 'Russia',
// // //     flag: '🇷🇺',
// // //     currency: '₽',
// // //     currencyCode: 'RUB',
// // //     languages: ['ru', 'en'],
// // //     defaultLanguage: 'ru',
// // //     timezone: 'Europe/Moscow',
// // //     phoneCode: '+7',
// // //   },
// // //   ZA: {
// // //     code: 'ZA',
// // //     name: 'South Africa',
// // //     flag: '🇿🇦',
// // //     currency: 'R',
// // //     currencyCode: 'ZAR',
// // //     languages: ['en', 'af', 'zu', 'xh'],
// // //     defaultLanguage: 'en',
// // //     timezone: 'Africa/Johannesburg',
// // //     phoneCode: '+27',
// // //   },
// // //   NZ: {
// // //     code: 'NZ',
// // //     name: 'New Zealand',
// // //     flag: '🇳🇿',
// // //     currency: '$',
// // //     currencyCode: 'NZD',
// // //     languages: ['en', 'mi'],
// // //     defaultLanguage: 'en',
// // //     timezone: 'Pacific/Auckland',
// // //     phoneCode: '+64',
// // //   },
// // // };

// // // // ✅ Language Data
// // // const LANGUAGE_DATA = {
// // //   en: { code: 'en', name: 'English', flag: '🇬🇧', direction: 'ltr' },
// // //   hi: { code: 'hi', name: 'हिंदी', flag: '🇮🇳', direction: 'ltr' },
// // //   ta: { code: 'ta', name: 'தமிழ்', flag: '🇮🇳', direction: 'ltr' },
// // //   te: { code: 'te', name: 'తెలుగు', flag: '🇮🇳', direction: 'ltr' },
// // //   ml: { code: 'ml', name: 'മലയാളം', flag: '🇮🇳', direction: 'ltr' },
// // //   bn: { code: 'bn', name: 'বাংলা', flag: '🇮🇳', direction: 'ltr' },
// // //   mr: { code: 'mr', name: 'मराठी', flag: '🇮🇳', direction: 'ltr' },
// // //   gu: { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳', direction: 'ltr' },
// // //   kn: { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳', direction: 'ltr' },
// // //   or: { code: 'or', name: 'ଓଡ଼ିଆ', flag: '🇮🇳', direction: 'ltr' },
// // //   pa: { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳', direction: 'ltr' },
// // //   ur: { code: 'ur', name: 'اردو', flag: '🇮🇳', direction: 'rtl' },
// // //   ar: { code: 'ar', name: 'العربية', flag: '🇦🇪', direction: 'rtl' },
// // //   fr: { code: 'fr', name: 'Français', flag: '🇫🇷', direction: 'ltr' },
// // //   de: { code: 'de', name: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
// // //   ja: { code: 'ja', name: '日本語', flag: '🇯🇵', direction: 'ltr' },
// // //   zh: { code: 'zh', name: '中文', flag: '🇨🇳', direction: 'ltr' },
// // //   pt: { code: 'pt', name: 'Português', flag: '🇧🇷', direction: 'ltr' },
// // //   ru: { code: 'ru', name: 'Русский', flag: '🇷🇺', direction: 'ltr' },
// // //   es: { code: 'es', name: 'Español', flag: '🇪🇸', direction: 'ltr' },
// // //   it: { code: 'it', name: 'Italiano', flag: '🇮🇹', direction: 'ltr' },
// // //   ko: { code: 'ko', name: '한국어', flag: '🇰🇷', direction: 'ltr' },
// // //   ms: { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾', direction: 'ltr' },
// // // };

// // // const GlobalSelector = () => {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [isDetecting, setIsDetecting] = useState(false);
// // //   const [selectedCountry, setSelectedCountry] = useState(null);
// // //   const [selectedLanguage, setSelectedLanguage] = useState(null);
// // //   const [selectedCurrency, setSelectedCurrency] = useState(null);
// // //   const [detectedCountry, setDetectedCountry] = useState(null);
// // //   const [availableLanguages, setAvailableLanguages] = useState([]);
// // //   const [activeTab, setActiveTab] = useState('country');
// // //   const [isMobile, setIsMobile] = useState(false);
// // //   const dropdownRef = useRef(null);
// // //   const [toastShown, setToastShown] = useState(false);

// // //   // ✅ Detect mobile device
// // //   useEffect(() => {
// // //     const checkMobile = () => {
// // //       setIsMobile(window.innerWidth < 768);
// // //     };
// // //     checkMobile();
// // //     window.addEventListener('resize', checkMobile);
// // //     return () => window.removeEventListener('resize', checkMobile);
// // //   }, []);

// // //   // ✅ Auto-detect user location
// // //   const detectLocation = async () => {
// // //     setIsDetecting(true);
// // //     setToastShown(false);
    
// // //     try {
// // //       const response = await fetch('https://ipapi.co/json/');
// // //       const data = await response.json();
      
// // //       if (data && data.country_code) {
// // //         const countryCode = data.country_code.toUpperCase();
// // //         const country = COUNTRY_DATA[countryCode];
        
// // //         if (country) {
// // //           setDetectedCountry(country);
// // //           setSelectedCountry(country);
          
// // //           const defaultLang = country.defaultLanguage || 'en';
// // //           const language = LANGUAGE_DATA[defaultLang];
// // //           if (language) {
// // //             setSelectedLanguage(language);
// // //             setAvailableLanguages(getCountryLanguages(countryCode));
// // //           }
          
// // //           setSelectedCurrency({
// // //             code: country.currencyCode,
// // //             symbol: country.currency,
// // //           });
          
// // //           localStorage.setItem('preferredCountry', countryCode);
// // //           localStorage.setItem('preferredLanguage', defaultLang);
// // //           localStorage.setItem('preferredCurrency', country.currencyCode);
          
// // //           if (!toastShown) {
// // //             toast.success(`📍 ${country.flag} ${country.name} detected`);
// // //             setToastShown(true);
// // //           }
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error('Location detection failed:', error);
// // //       fallbackDetection();
// // //     } finally {
// // //       setIsDetecting(false);
// // //     }
// // //   };

// // //   const fallbackDetection = () => {
// // //     try {
// // //       const browserLang = navigator.language.split('-')[0];
// // //       const matchedLang = LANGUAGE_DATA[browserLang];
      
// // //       let fallbackCountry = COUNTRY_DATA.US;
// // //       for (const [code, country] of Object.entries(COUNTRY_DATA)) {
// // //         if (country.languages.includes(browserLang)) {
// // //           fallbackCountry = country;
// // //           break;
// // //         }
// // //       }
      
// // //       setSelectedCountry(fallbackCountry);
// // //       setSelectedLanguage(matchedLang || LANGUAGE_DATA.en);
// // //       setAvailableLanguages(getCountryLanguages(fallbackCountry.code));
      
// // //       setSelectedCurrency({
// // //         code: fallbackCountry.currencyCode,
// // //         symbol: fallbackCountry.currency,
// // //       });
      
// // //       localStorage.setItem('preferredCountry', fallbackCountry.code);
// // //       localStorage.setItem('preferredLanguage', matchedLang?.code || 'en');
// // //       localStorage.setItem('preferredCurrency', fallbackCountry.currencyCode);
// // //     } catch (error) {
// // //       const defaultCountry = COUNTRY_DATA.US;
// // //       setSelectedCountry(defaultCountry);
// // //       setSelectedLanguage(LANGUAGE_DATA.en);
// // //       setAvailableLanguages(['en']);
// // //       setSelectedCurrency({ code: 'USD', symbol: '$' });
// // //     }
// // //   };

// // //   const getCountryLanguages = (countryCode) => {
// // //     const country = COUNTRY_DATA[countryCode];
// // //     if (!country) return ['en'];
// // //     return country.languages.filter(lang => LANGUAGE_DATA[lang]);
// // //   };

// // //   useEffect(() => {
// // //     const savedCountry = localStorage.getItem('preferredCountry');
// // //     const savedLanguage = localStorage.getItem('preferredLanguage');
// // //     const savedCurrency = localStorage.getItem('preferredCurrency');
    
// // //     if (savedCountry && COUNTRY_DATA[savedCountry]) {
// // //       const country = COUNTRY_DATA[savedCountry];
// // //       setSelectedCountry(country);
// // //       setAvailableLanguages(getCountryLanguages(savedCountry));
      
// // //       if (savedLanguage && LANGUAGE_DATA[savedLanguage]) {
// // //         setSelectedLanguage(LANGUAGE_DATA[savedLanguage]);
// // //       } else {
// // //         setSelectedLanguage(LANGUAGE_DATA[country.defaultLanguage]);
// // //       }
      
// // //       if (savedCurrency) {
// // //         setSelectedCurrency({ code: savedCurrency, symbol: country.currency });
// // //       } else {
// // //         setSelectedCurrency({ code: country.currencyCode, symbol: country.currency });
// // //       }
// // //     } else {
// // //       detectLocation();
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // //         setIsOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener('mousedown', handleClickOutside);
// // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // //   }, []);

// // //   const handleCountryChange = (countryCode) => {
// // //     const country = COUNTRY_DATA[countryCode];
// // //     if (!country) return;
    
// // //     setSelectedCountry(country);
// // //     setAvailableLanguages(getCountryLanguages(countryCode));
    
// // //     const defaultLang = country.defaultLanguage;
// // //     setSelectedLanguage(LANGUAGE_DATA[defaultLang]);
    
// // //     setSelectedCurrency({
// // //       code: country.currencyCode,
// // //       symbol: country.currency,
// // //     });
    
// // //     localStorage.setItem('preferredCountry', countryCode);
// // //     localStorage.setItem('preferredLanguage', defaultLang);
// // //     localStorage.setItem('preferredCurrency', country.currencyCode);
    
// // //     window.dispatchEvent(new CustomEvent('locationChange', {
// // //       detail: { country, language: LANGUAGE_DATA[defaultLang], currency: country.currencyCode }
// // //     }));
    
// // //     toast.success(`🌍 ${country.flag} ${country.name} selected`);
// // //     setIsOpen(false);
// // //   };

// // //   const handleLanguageChange = (langCode) => {
// // //     const language = LANGUAGE_DATA[langCode];
// // //     if (!language) return;
    
// // //     setSelectedLanguage(language);
// // //     localStorage.setItem('preferredLanguage', langCode);
    
// // //     window.dispatchEvent(new CustomEvent('languageChange', {
// // //       detail: { language }
// // //     }));
    
// // //     toast.success(`🌐 ${language.flag} ${language.name} selected`);
// // //     setIsOpen(false);
// // //   };

// // //   const handleCurrencyChange = (currencyCode) => {
// // //     const country = selectedCountry;
// // //     if (!country) return;
    
// // //     let newCountry = country;
// // //     for (const [code, c] of Object.entries(COUNTRY_DATA)) {
// // //       if (c.currencyCode === currencyCode) {
// // //         newCountry = c;
// // //         break;
// // //       }
// // //     }
    
// // //     setSelectedCurrency({
// // //       code: currencyCode,
// // //       symbol: newCountry.currency,
// // //     });
    
// // //     localStorage.setItem('preferredCurrency', currencyCode);
    
// // //     window.dispatchEvent(new CustomEvent('currencyChange', {
// // //       detail: { currency: { code: currencyCode, symbol: newCountry.currency } }
// // //     }));
    
// // //     toast.success(`💱 Currency changed to ${newCountry.currency} ${currencyCode}`);
// // //     setIsOpen(false);
// // //   };

// // //   const getUniqueCurrencies = () => {
// // //     const currencies = {};
// // //     for (const [code, country] of Object.entries(COUNTRY_DATA)) {
// // //       if (!currencies[country.currencyCode]) {
// // //         currencies[country.currencyCode] = {
// // //           code: country.currencyCode,
// // //           symbol: country.currency,
// // //           countries: [code]
// // //         };
// // //       } else {
// // //         currencies[country.currencyCode].countries.push(code);
// // //       }
// // //     }
// // //     return Object.values(currencies);
// // //   };

// // //   const getAllCountries = () => {
// // //     return Object.values(COUNTRY_DATA).sort((a, b) => a.name.localeCompare(b.name));
// // //   };

// // //   // ✅ Toggle dropdown
// // //   const toggleDropdown = () => {
// // //     setIsOpen(!isOpen);
// // //   };

// // //   if (!selectedCountry) {
// // //     return (
// // //       <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg">
// // //         <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
// // //         <span className="text-[10px] sm:text-xs text-purple-300">Detecting...</span>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="relative w-full sm:w-auto" ref={dropdownRef}>
// // //       {/* ✅ Main Button - Mobile Optimized */}
// // //       <button
// // //         onClick={toggleDropdown}
// // //         className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:bg-purple-500/15 group w-full sm:w-auto"
// // //         aria-label="Global settings"
// // //       >
// // //         <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
// // //         <span className="text-sm sm:text-base font-semibold hidden xs:inline">{selectedCountry.flag}</span>
// // //         <span className="text-[10px] sm:text-xs font-medium uppercase hidden sm:inline text-purple-300/80">
// // //           {selectedCountry.code}
// // //         </span>
// // //         <span className="text-[10px] sm:text-xs text-purple-400/60 hidden md:inline">
// // //           {selectedCurrency?.symbol}
// // //         </span>
// // //         <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-purple-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
// // //       </button>

// // //       {/* ✅ Dropdown - Mobile Full Screen */}
// // //       {isOpen && (
// // //         <>
// // //           {/* Mobile Overlay */}
// // //           {isMobile && (
// // //             <div 
// // //               className="fixed inset-0 bg-black/60 z-40"
// // //               onClick={() => setIsOpen(false)}
// // //             />
// // //           )}
          
// // //           <div className={`
// // //             ${isMobile 
// // //               ? 'fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh] w-full z-50' 
// // //               : 'absolute right-0 mt-2 w-[380px] sm:w-[420px] z-50'
// // //             } 
// // //             bg-slate-800 shadow-2xl border border-purple-500/30 overflow-hidden transition-all duration-300
// // //           `}>
// // //             {/* Mobile Drag Handle */}
// // //             {isMobile && (
// // //               <div className="flex justify-center py-2">
// // //                 <div className="w-12 h-1 bg-purple-500/30 rounded-full" />
// // //               </div>
// // //             )}

// // //             {/* Header */}
// // //             <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-b border-purple-500/30 flex items-center justify-between">
// // //               <div className="flex items-center gap-1.5 sm:gap-2">
// // //                 <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
// // //                 <h3 className="text-sm sm:text-base font-bold text-purple-200">Global Settings</h3>
// // //               </div>
// // //               <div className="flex items-center gap-1.5 sm:gap-2">
// // //                 <button
// // //                   onClick={detectLocation}
// // //                   disabled={isDetecting}
// // //                   className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition disabled:opacity-50"
// // //                 >
// // //                   {isDetecting ? (
// // //                     <>
// // //                       <div className="animate-spin rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 border-2 border-purple-500 border-t-transparent" />
// // //                       <span className="hidden xs:inline">Detecting...</span>
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
// // //                       <span className="hidden xs:inline">Auto</span>
// // //                     </>
// // //                   )}
// // //                 </button>
// // //                 {isMobile && (
// // //                   <button
// // //                     onClick={() => setIsOpen(false)}
// // //                     className="p-1 hover:bg-purple-500/10 rounded-lg transition"
// // //                   >
// // //                     <XMarkIcon className="w-5 h-5 text-purple-400" />
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Tabs - Scrollable on mobile */}
// // //             <div className="flex border-b border-purple-500/20 overflow-x-auto scrollbar-hide">
// // //               {[
// // //                 { id: 'country', label: 'Country', icon: MapPinIcon },
// // //                 { id: 'currency', label: 'Currency', icon: CurrencyDollarIcon },
// // //                 { id: 'language', label: 'Language', icon: LanguageIcon },
// // //               ].map((tab) => (
// // //                 <button
// // //                   key={tab.id}
// // //                   onClick={() => setActiveTab(tab.id)}
// // //                   className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap ${
// // //                     activeTab === tab.id
// // //                       ? 'text-purple-200 border-b-2 border-purple-500 bg-purple-500/5'
// // //                       : 'text-purple-400 hover:text-purple-300'
// // //                   }`}
// // //                 >
// // //                   <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
// // //                   <span className="hidden xs:inline">{tab.label}</span>
// // //                 </button>
// // //               ))}
// // //             </div>

// // //             <div className={`${isMobile ? 'max-h-[55vh]' : 'max-h-[400px]'} overflow-y-auto`}>
// // //               {/* Country Tab */}
// // //               {activeTab === 'country' && (
// // //                 <div className="p-2 sm:p-3">
// // //                   {/* Detected Location */}
// // //                   {detectedCountry && (
// // //                     <div className="mb-2 sm:mb-3 p-2 sm:p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
// // //                       <p className="text-[8px] sm:text-[10px] text-purple-400/70 mb-1">📍 Detected Location</p>
// // //                       <div className="flex items-center gap-2">
// // //                         <span className="text-xl sm:text-2xl">{detectedCountry.flag}</span>
// // //                         <div className="flex-1 min-w-0">
// // //                           <p className="text-xs sm:text-sm font-semibold text-purple-200 truncate">{detectedCountry.name}</p>
// // //                           <p className="text-[8px] sm:text-[10px] text-purple-400">
// // //                             {detectedCountry.currency} {detectedCountry.currencyCode}
// // //                           </p>
// // //                         </div>
// // //                         <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
// // //                       </div>
// // //                     </div>
// // //                   )}

// // //                   <h4 className="text-[8px] sm:text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1.5 sm:mb-2">
// // //                     Select Country
// // //                   </h4>
// // //                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 max-h-40 sm:max-h-48 overflow-y-auto">
// // //                     {getAllCountries().map((country) => (
// // //                       <button
// // //                         key={country.code}
// // //                         onClick={() => handleCountryChange(country.code)}
// // //                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// // //                           selectedCountry?.code === country.code
// // //                             ? 'bg-purple-600 text-white'
// // //                             : 'text-purple-300/80 hover:bg-purple-500/10'
// // //                         }`}
// // //                       >
// // //                         <span className="text-sm sm:text-base">{country.flag}</span>
// // //                         <span className="flex-1 text-left truncate text-[10px] sm:text-xs">{country.name}</span>
// // //                         {selectedCountry?.code === country.code && (
// // //                           <CheckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
// // //                         )}
// // //                       </button>
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {/* Currency Tab */}
// // //               {activeTab === 'currency' && (
// // //                 <div className="p-2 sm:p-3">
// // //                   <h4 className="text-[8px] sm:text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1.5 sm:mb-2">
// // //                     Select Currency
// // //                   </h4>
// // //                   <div className="grid grid-cols-2 sm:grid-cols-2 gap-1">
// // //                     {getUniqueCurrencies().map((currency) => (
// // //                       <button
// // //                         key={currency.code}
// // //                         onClick={() => handleCurrencyChange(currency.code)}
// // //                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// // //                           selectedCurrency?.code === currency.code
// // //                             ? 'bg-purple-600 text-white'
// // //                             : 'text-purple-300/80 hover:bg-purple-500/10'
// // //                         }`}
// // //                       >
// // //                         <span className="text-sm sm:text-base font-medium">{currency.symbol}</span>
// // //                         <span className="text-[10px] sm:text-xs">{currency.code}</span>
// // //                         {selectedCurrency?.code === currency.code && (
// // //                           <CheckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-auto flex-shrink-0" />
// // //                         )}
// // //                       </button>
// // //                     ))}
// // //                   </div>
// // //                   {selectedCurrency && (
// // //                     <div className="mt-2 sm:mt-3 p-1.5 sm:p-2 bg-purple-500/10 rounded-lg">
// // //                       <p className="text-[8px] sm:text-[10px] text-purple-400/70">
// // //                         Current: <span className="text-purple-200 font-semibold text-[10px] sm:text-xs">
// // //                           {selectedCurrency.symbol} {selectedCurrency.code}
// // //                         </span>
// // //                       </p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               )}

// // //               {/* Language Tab */}
// // //               {activeTab === 'language' && (
// // //                 <div className="p-2 sm:p-3">
// // //                   <h4 className="text-[8px] sm:text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1.5 sm:mb-2">
// // //                     Select Language
// // //                   </h4>
// // //                   <div className="grid grid-cols-2 sm:grid-cols-2 gap-1">
// // //                     {availableLanguages.map((langCode) => {
// // //                       const lang = LANGUAGE_DATA[langCode];
// // //                       if (!lang) return null;
// // //                       return (
// // //                         <button
// // //                           key={langCode}
// // //                           onClick={() => handleLanguageChange(langCode)}
// // //                           className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// // //                             selectedLanguage?.code === langCode
// // //                               ? 'bg-purple-600 text-white'
// // //                               : 'text-purple-300/80 hover:bg-purple-500/10'
// // //                           }`}
// // //                         >
// // //                           <span className="text-sm sm:text-base">{lang.flag}</span>
// // //                           <span className="truncate text-[10px] sm:text-xs">{lang.name}</span>
// // //                           {selectedLanguage?.code === langCode && (
// // //                             <CheckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-auto flex-shrink-0" />
// // //                           )}
// // //                         </button>
// // //                       );
// // //                     })}
// // //                   </div>
// // //                   {selectedLanguage && (
// // //                     <div className="mt-2 sm:mt-3 p-1.5 sm:p-2 bg-purple-500/10 rounded-lg">
// // //                       <p className="text-[8px] sm:text-[10px] text-purple-400/70">
// // //                         Current: <span className="text-purple-200 font-semibold text-[10px] sm:text-xs">
// // //                           {selectedLanguage.flag} {selectedLanguage.name}
// // //                         </span>
// // //                       </p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Footer */}
// // //             <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-t border-purple-500/30 bg-slate-800/50">
// // //               <p className="text-[8px] sm:text-[10px] text-purple-400/60 text-center truncate">
// // //                 {selectedCountry?.flag} {selectedCountry?.name} · {selectedLanguage?.flag} {selectedLanguage?.name} · {selectedCurrency?.symbol} {selectedCurrency?.code}
// // //               </p>
// // //             </div>

// // //             {/* Close Button - Mobile Only */}
// // //             {isMobile && (
// // //               <button
// // //                 onClick={() => setIsOpen(false)}
// // //                 className="w-full py-3 text-xs text-purple-400 hover:bg-slate-700/50 transition border-t border-purple-500/20 font-medium"
// // //               >
// // //                 Close
// // //               </button>
// // //             )}
// // //           </div>
// // //         </>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default GlobalSelector;
// // // src/components/GlobalSelector.jsx
// // 'use client';

// // import React, { useState, useEffect, useRef } from 'react';
// // import {
// //   GlobeAltIcon,
// //   ChevronDownIcon,
// //   CheckIcon,
// //   XMarkIcon,
// //   MapPinIcon,
// //   CurrencyDollarIcon,
// //   LanguageIcon
// // } from '@heroicons/react/24/outline';
// // import { useApp } from '../providers/Appprovider';
// // import toast from 'react-hot-toast';

// // const GlobalSelector = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isDetecting, setIsDetecting] = useState(false);
// //   const [detectedCountry, setDetectedCountry] = useState(null);
// //   const [activeTab, setActiveTab] = useState('currency');
// //   const [isMobile, setIsMobile] = useState(false);
// //   const dropdownRef = useRef(null);
  
// //   // ✅ Use App Context
// //   const { 
// //     language, 
// //     currency, 
// //     currentLanguage, 
// //     currentCurrency,
// //     changeLanguage, 
// //     changeCurrency,
// //     languages,
// //     currencies,
// //     t
// //   } = useApp();

// //   // ✅ Detect mobile device
// //   useEffect(() => {
// //     const checkMobile = () => {
// //       setIsMobile(window.innerWidth < 768);
// //     };
// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);
// //     return () => window.removeEventListener('resize', checkMobile);
// //   }, []);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setIsOpen(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   // ✅ Auto-detect location
// //   const detectLocation = async () => {
// //     setIsDetecting(true);
    
// //     try {
// //       const response = await fetch('https://ipapi.co/json/');
// //       const data = await response.json();
      
// //       if (data && data.country_code) {
// //         const countryCode = data.country_code.toUpperCase();
// //         setDetectedCountry({
// //           code: countryCode,
// //           name: data.country_name,
// //           flag: getCountryFlag(countryCode),
// //           currency: data.currency || 'USD',
// //           currencyCode: data.currency_code || 'USD',
// //         });
        
// //         // Auto-select currency based on country
// //         const currencyMap = {
// //           'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
// //           'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
// //           'AE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
// //           'SA': { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
// //           'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
// //           'MY': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
// //           'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
// //           'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
// //           'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
// //           'IT': { code: 'EUR', symbol: '€', name: 'Euro' },
// //         };
        
// //         const detectedCurrency = currencyMap[countryCode];
// //         if (detectedCurrency) {
// //           changeCurrency(detectedCurrency);
// //         }
        
// //         toast.success(`📍 ${data.country_name} detected`);
// //       }
// //     } catch (error) {
// //       console.error('Location detection failed:', error);
// //     } finally {
// //       setIsDetecting(false);
// //     }
// //   };

// //   // ✅ Get country flag
// //   function getCountryFlag(countryCode) {
// //     if (!countryCode) return '🌍';
// //     try {
// //       const codePoints = countryCode.toUpperCase().split('').map(
// //         char => 127397 + char.charCodeAt()
// //       );
// //       return String.fromCodePoint(...codePoints);
// //     } catch (error) {
// //       return '🌍';
// //     }
// //   }

// //   // ✅ Toggle dropdown
// //   const toggleDropdown = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   return (
// //     <div className="relative w-full sm:w-auto" ref={dropdownRef}>
// //       {/* ✅ Main Button */}
// //       <button
// //         onClick={toggleDropdown}
// //         className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:bg-purple-500/15 group w-full sm:w-auto"
// //         aria-label="Global settings"
// //       >
// //         <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
// //         <span className="text-sm sm:text-base font-semibold hidden xs:inline">
// //           {currentLanguage?.flag || '🌍'}
// //         </span>
// //         <span className="text-[10px] sm:text-xs font-medium uppercase hidden sm:inline text-purple-300/80">
// //           {currentLanguage?.code || 'EN'}
// //         </span>
// //         <span className="text-[10px] sm:text-xs text-purple-400/60 hidden md:inline">
// //           {currentCurrency?.symbol || '₹'}
// //         </span>
// //         <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-purple-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
// //       </button>

// //       {/* ✅ Dropdown */}
// //       {isOpen && (
// //         <>
// //           {isMobile && (
// //             <div 
// //               className="fixed inset-0 bg-black/60 z-40"
// //               onClick={() => setIsOpen(false)}
// //             />
// //           )}
          
// //           <div className={`
// //             ${isMobile 
// //               ? 'fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh] w-full z-50' 
// //               : 'absolute right-0 mt-2 w-[380px] sm:w-[420px] z-50'
// //             } 
// //             bg-slate-800 shadow-2xl border border-purple-500/30 overflow-hidden transition-all duration-300
// //           `}>
// //             {isMobile && (
// //               <div className="flex justify-center py-2">
// //                 <div className="w-12 h-1 bg-purple-500/30 rounded-full" />
// //               </div>
// //             )}

// //             {/* Header */}
// //             <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-b border-purple-500/30 flex items-center justify-between">
// //               <div className="flex items-center gap-1.5 sm:gap-2">
// //                 <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
// //                 <h3 className="text-sm sm:text-base font-bold text-purple-200">{t('select_language')}</h3>
// //               </div>
// //               <div className="flex items-center gap-1.5 sm:gap-2">
// //                 <button
// //                   onClick={detectLocation}
// //                   disabled={isDetecting}
// //                   className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition disabled:opacity-50"
// //                 >
// //                   {isDetecting ? (
// //                     <>
// //                       <div className="animate-spin rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 border-2 border-purple-500 border-t-transparent" />
// //                       <span className="hidden xs:inline">Detecting...</span>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
// //                       <span className="hidden xs:inline">Auto</span>
// //                     </>
// //                   )}
// //                 </button>
// //                 {isMobile && (
// //                   <button
// //                     onClick={() => setIsOpen(false)}
// //                     className="p-1 hover:bg-purple-500/10 rounded-lg transition"
// //                   >
// //                     <XMarkIcon className="w-5 h-5 text-purple-400" />
// //                   </button>
// //                 )}
// //               </div>
// //             </div>

// //             {/* Tabs */}
// //             <div className="flex border-b border-purple-500/20 overflow-x-auto scrollbar-hide">
// //               {[
// //                 { id: 'currency', label: t('currency'), icon: CurrencyDollarIcon },
// //                 { id: 'language', label: t('language'), icon: LanguageIcon },
// //               ].map((tab) => (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => setActiveTab(tab.id)}
// //                   className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap ${
// //                     activeTab === tab.id
// //                       ? 'text-purple-200 border-b-2 border-purple-500 bg-purple-500/5'
// //                       : 'text-purple-400 hover:text-purple-300'
// //                   }`}
// //                 >
// //                   <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
// //                   <span className="hidden xs:inline">{tab.label}</span>
// //                 </button>
// //               ))}
// //             </div>

// //             <div className={`${isMobile ? 'max-h-[55vh]' : 'max-h-[400px]'} overflow-y-auto`}>
// //               {/* Currency Tab */}
// //               {activeTab === 'currency' && (
// //                 <div className="p-2 sm:p-3">
// //                   <h4 className="text-[8px] sm:text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1.5 sm:mb-2">
// //                     Select Currency
// //                   </h4>
// //                   <div className="grid grid-cols-2 sm:grid-cols-2 gap-1">
// //                     {currencies.map((curr) => (
// //                       <button
// //                         key={curr.code}
// //                         onClick={() => changeCurrency(curr)}
// //                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// //                           currency?.code === curr.code
// //                             ? 'bg-purple-600 text-white'
// //                             : 'text-purple-300/80 hover:bg-purple-500/10'
// //                         }`}
// //                       >
// //                         <span className="text-sm sm:text-base font-medium">{curr.symbol}</span>
// //                         <span className="text-[10px] sm:text-xs">{curr.code}</span>
// //                         {currency?.code === curr.code && (
// //                           <CheckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-auto flex-shrink-0" />
// //                         )}
// //                       </button>
// //                     ))}
// //                   </div>
// //                   {currency && (
// //                     <div className="mt-2 sm:mt-3 p-1.5 sm:p-2 bg-purple-500/10 rounded-lg">
// //                       <p className="text-[8px] sm:text-[10px] text-purple-400/70">
// //                         Current: <span className="text-purple-200 font-semibold text-[10px] sm:text-xs">
// //                           {currency.symbol} {currency.code} - {currency.name}
// //                         </span>
// //                       </p>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}

// //               {/* Language Tab */}
// //               {activeTab === 'language' && (
// //                 <div className="p-2 sm:p-3">
// //                   <h4 className="text-[8px] sm:text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1.5 sm:mb-2">
// //                     Select Language
// //                   </h4>
// //                   <div className="grid grid-cols-2 sm:grid-cols-2 gap-1">
// //                     {languages.map((lang) => (
// //                       <button
// //                         key={lang.code}
// //                         onClick={() => changeLanguage(lang.code)}
// //                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// //                           language === lang.code
// //                             ? 'bg-purple-600 text-white'
// //                             : 'text-purple-300/80 hover:bg-purple-500/10'
// //                         }`}
// //                       >
// //                         <span className="text-sm sm:text-base">{lang.flag}</span>
// //                         <span className="truncate text-[10px] sm:text-xs">{lang.name}</span>
// //                         {language === lang.code && (
// //                           <CheckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-auto flex-shrink-0" />
// //                         )}
// //                       </button>
// //                     ))}
// //                   </div>
// //                   {currentLanguage && (
// //                     <div className="mt-2 sm:mt-3 p-1.5 sm:p-2 bg-purple-500/10 rounded-lg">
// //                       <p className="text-[8px] sm:text-[10px] text-purple-400/70">
// //                         Current: <span className="text-purple-200 font-semibold text-[10px] sm:text-xs">
// //                           {currentLanguage.flag} {currentLanguage.name}
// //                         </span>
// //                       </p>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Footer */}
// //             <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-t border-purple-500/30 bg-slate-800/50">
// //               <p className="text-[8px] sm:text-[10px] text-purple-400/60 text-center truncate">
// //                 {currentLanguage?.flag} {currentLanguage?.name} · {currency?.symbol} {currency?.code}
// //               </p>
// //             </div>

// //             {isMobile && (
// //               <button
// //                 onClick={() => setIsOpen(false)}
// //                 className="w-full py-3 text-xs text-purple-400 hover:bg-slate-700/50 transition border-t border-purple-500/20 font-medium"
// //               >
// //                 Close
// //               </button>
// //             )}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default GlobalSelector;
// // src/components/GlobalSelector.jsx
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   GlobeAltIcon,
//   ChevronDownIcon,
//   CheckIcon,
//   XMarkIcon,
//   MapPinIcon,
//   CurrencyDollarIcon,
//   LanguageIcon,
//   MagnifyingGlassIcon,
// } from '@heroicons/react/24/outline';
// import { useApp } from '../hooks/useApp';
// import toast from 'react-hot-toast';

// const GlobalSelector = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isDetecting, setIsDetecting] = useState(false);
//   const [detectedCountry, setDetectedCountry] = useState(null);
//   const [activeTab, setActiveTab] = useState('language');
//   const [isMobile, setIsMobile] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const dropdownRef = useRef(null);
//   const searchInputRef = useRef(null);
  
//   // ✅ Use App Context
//   const { 
//     language, 
//     currency, 
//     currentLanguage, 
//     currentCurrency,
//     changeLanguage,
//     changeCurrency,
//     languages,
//     currencies,
//     t
//   } = useApp();

//   // ✅ Filter languages based on search
//   const filteredLanguages = languages.filter(lang =>
//     lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     lang.code.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // ✅ Filter currencies based on search
//   const filteredCurrencies = currencies.filter(curr =>
//     curr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     curr.code.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // ✅ Debug: Log current language
//   useEffect(() => {
//     console.log('🔤 Current Language:', language);
//     console.log('💱 Current Currency:', currency);
//   }, [language, currency]);

//   // ✅ Detect mobile device
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setSearchQuery('');
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // ✅ Focus search when dropdown opens
//   useEffect(() => {
//     if (isOpen && searchInputRef.current) {
//       setTimeout(() => {
//         searchInputRef.current.focus();
//       }, 300);
//     }
//   }, [isOpen]);

//   // ✅ Auto-detect location
//   const detectLocation = async () => {
//     setIsDetecting(true);
    
//     try {
//       const response = await fetch('https://ipapi.co/json/');
//       const data = await response.json();
      
//       if (data && data.country_code) {
//         const countryCode = data.country_code.toUpperCase();
//         setDetectedCountry({
//           code: countryCode,
//           name: data.country_name,
//           flag: getCountryFlag(countryCode),
//           currency: data.currency || 'USD',
//           currencyCode: data.currency_code || 'USD',
//         });
        
//         // Auto-select currency based on country
//         const currencyMap = {
//           'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
//           'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
//           'AE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
//           'SA': { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
//           'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
//           'MY': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
//           'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
//           'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
//           'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
//           'IT': { code: 'EUR', symbol: '€', name: 'Euro' },
//         };
        
//         const detectedCurrency = currencyMap[countryCode];
//         if (detectedCurrency) {
//           changeCurrency(detectedCurrency);
//         }
        
//         toast.success(`📍 ${data.country_name} detected`);
//       }
//     } catch (error) {
//       console.error('Location detection failed:', error);
//     } finally {
//       setIsDetecting(false);
//     }
//   };

//   // ✅ Get country flag
//   function getCountryFlag(countryCode) {
//     if (!countryCode) return '🌍';
//     try {
//       const codePoints = countryCode.toUpperCase().split('').map(
//         char => 127397 + char.charCodeAt()
//       );
//       return String.fromCodePoint(...codePoints);
//     } catch (error) {
//       return '🌍';
//     }
//   }

//   // ✅ Toggle dropdown
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//     if (isOpen) {
//       setSearchQuery('');
//     }
//   };

//   // ✅ Handle language change
//   const handleLanguageChange = (langCode) => {
//     console.log('🔄 Changing language to:', langCode);
//     changeLanguage(langCode);
//     setIsOpen(false);
//     setSearchQuery('');
//     const lang = languages.find(l => l.code === langCode);
//     toast.success(`Language changed to ${lang?.name || langCode}`);
//   };

//   // ✅ Handle currency change
//   const handleCurrencyChange = (curr) => {
//     console.log('🔄 Changing currency to:', curr);
//     changeCurrency(curr);
//     setIsOpen(false);
//     setSearchQuery('');
//     toast.success(`Currency changed to ${curr.symbol} ${curr.code}`);
//   };

//   return (
//     <div className="relative w-full sm:w-auto" ref={dropdownRef}>
//       {/* Main Button */}
//       <button
//         onClick={toggleDropdown}
//         className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:bg-purple-500/15 group w-full sm:w-auto"
//         aria-label="Global settings"
//       >
//         <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
//         <span className="text-sm sm:text-base font-semibold hidden xs:inline">
//           {currentLanguage?.flag || '🌍'}
//         </span>
//         <span className="text-[10px] sm:text-xs font-medium uppercase hidden sm:inline text-purple-300/80">
//           {currentLanguage?.code || 'EN'}
//         </span>
//         <span className="text-[10px] sm:text-xs text-purple-400/60 hidden md:inline">
//           {currentCurrency?.symbol || '₹'}
//         </span>
//         <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-purple-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       {/* Dropdown */}
//       {isOpen && (
//         <>
//           {isMobile && (
//             <div 
//               className="fixed inset-0 bg-black/60 z-40"
//               onClick={() => setIsOpen(false)}
//             />
//           )}
          
//           <div className={`
//             ${isMobile 
//               ? 'fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh] w-full z-50' 
//               : 'absolute right-0 mt-2 w-[400px] sm:w-[440px] z-50'
//             } 
//             bg-slate-800 shadow-2xl border border-purple-500/30 overflow-hidden transition-all duration-300
//           `}>
//             {isMobile && (
//               <div className="flex justify-center py-2">
//                 <div className="w-12 h-1 bg-purple-500/30 rounded-full" />
//               </div>
//             )}

//             {/* Header */}
//             <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-b border-purple-500/30 flex items-center justify-between">
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                 <h3 className="text-sm sm:text-base font-bold text-purple-200">{t('select_language')}</h3>
//               </div>
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <button
//                   onClick={detectLocation}
//                   disabled={isDetecting}
//                   className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition disabled:opacity-50"
//                 >
//                   {isDetecting ? (
//                     <>
//                       <div className="animate-spin rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 border-2 border-purple-500 border-t-transparent" />
//                       <span className="hidden xs:inline">Detecting...</span>
//                     </>
//                   ) : (
//                     <>
//                       <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       <span className="hidden xs:inline">Auto</span>
//                     </>
//                   )}
//                 </button>
//                 {isMobile && (
//                   <button
//                     onClick={() => setIsOpen(false)}
//                     className="p-1 hover:bg-purple-500/10 rounded-lg transition"
//                   >
//                     <XMarkIcon className="w-5 h-5 text-purple-400" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Search Bar */}
//             <div className="p-3 border-b border-purple-500/20">
//               <div className="relative">
//                 <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/50" />
//                 <input
//                   ref={searchInputRef}
//                   type="text"
//                   placeholder="Search language or currency..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-9 pr-8 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-purple-200 text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={() => setSearchQuery('')}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/50 hover:text-purple-300 transition"
//                   >
//                     <XMarkIcon className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b border-purple-500/20 overflow-x-auto scrollbar-hide">
//               {[
//                 { id: 'language', label: t('language') || 'Language', icon: LanguageIcon },
//                 { id: 'currency', label: t('currency') || 'Currency', icon: CurrencyDollarIcon },
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap ${
//                     activeTab === tab.id
//                       ? 'text-purple-200 border-b-2 border-purple-500 bg-purple-500/5'
//                       : 'text-purple-400 hover:text-purple-300'
//                   }`}
//                 >
//                   <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   <span className="hidden xs:inline">{tab.label}</span>
//                 </button>
//               ))}
//             </div>

//             <div className={`${isMobile ? 'max-h-[50vh]' : 'max-h-[400px]'} overflow-y-auto`}>
//               {/* Language Tab */}
//               {activeTab === 'language' && (
//                 <div className="p-2 sm:p-3">
//                   <h4 className="text-[8px] sm:text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1.5 sm:mb-2">
//                     {t('select_language') || 'Select Language'}
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
//                     {filteredLanguages.map((lang) => (
//                       <button
//                         key={lang.code}
//                         onClick={() => handleLanguageChange(lang.code)}
//                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
//                           language === lang.code
//                             ? 'bg-purple-600 text-white'
//                             : 'text-purple-300/80 hover:bg-purple-500/10'
//                         }`}
//                       >
//                         <span className="text-sm sm:text-base">{lang.flag}</span>
//                         <span className="truncate text-[10px] sm:text-xs">{lang.name}</span>
//                         <span className="text-[8px] sm:text-[10px] text-purple-400/50 ml-auto">{lang.code.toUpperCase()}</span>
//                         {language === lang.code && (
//                           <CheckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                   {filteredLanguages.length === 0 && (
//                     <div className="py-6 text-center text-purple-400/60 text-sm">
//                       No languages found
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Currency Tab */}
//               {activeTab === 'currency' && (
//                 <div className="p-2 sm:p-3">
//                   <h4 className="text-[8px] sm:text-[10px] font-semibold text-purple-400 uppercase tracking-wider mb-1.5 sm:mb-2">
//                     {t('select_currency') || 'Select Currency'}
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
//                     {filteredCurrencies.map((curr) => (
//                       <button
//                         key={curr.code}
//                         onClick={() => handleCurrencyChange(curr)}
//                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
//                           currency?.code === curr.code
//                             ? 'bg-purple-600 text-white'
//                             : 'text-purple-300/80 hover:bg-purple-500/10'
//                         }`}
//                       >
//                         <span className="text-sm sm:text-base font-medium">{curr.symbol}</span>
//                         <span className="truncate text-[10px] sm:text-xs">{curr.code}</span>
//                         <span className="text-[8px] sm:text-[10px] text-purple-400/50 ml-auto">{curr.name}</span>
//                         {currency?.code === curr.code && (
//                           <CheckIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                   {filteredCurrencies.length === 0 && (
//                     <div className="py-6 text-center text-purple-400/60 text-sm">
//                       No currencies found
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="px-3 sm:px-4 py-2 sm:py-2.5 border-t border-purple-500/30 bg-slate-800/50">
//               <p className="text-[8px] sm:text-[10px] text-purple-400/60 text-center truncate">
//                 {currentLanguage?.flag} {currentLanguage?.name} · {currency?.symbol} {currency?.code}
//               </p>
//             </div>

//             {isMobile && (
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="w-full py-3 text-xs text-purple-400 hover:bg-slate-700/50 transition border-t border-purple-500/20 font-medium"
//               >
//                 {t('close') || 'Close'}
//               </button>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default GlobalSelector;
// src/components/GlobalSelector.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  GlobeAltIcon,
  ChevronDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useApp } from '../hooks/useApp';
import toast from 'react-hot-toast';

const GlobalSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  
  // ✅ Use App Context
  const { 
    language, 
    currency, 
    currentLanguage, 
    currentCurrency,
    changeLanguage,
    changeCurrency,
    languages,
    currencies,
    t
  } = useApp();

  // ✅ Log current language for debugging
  useEffect(() => {
    console.log('🔤 GlobalSelector - Current Language:', language);
  }, [language]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // ✅ Handle language change - Force page refresh
  const handleLanguageChange = (langCode) => {
    console.log('🔄 GlobalSelector - Changing language to:', langCode);
    changeLanguage(langCode);
    setIsOpen(false);
    
    // ✅ Show toast
    const lang = languages.find(l => l.code === langCode);
    toast.success(`Language changed to ${lang?.name || langCode}`);
    
    // ✅ Force reload after 500ms to apply translations
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // ✅ Handle currency change
  const handleCurrencyChange = (curr) => {
    console.log('🔄 GlobalSelector - Changing currency to:', curr);
    changeCurrency(curr);
    setIsOpen(false);
    toast.success(`Currency changed to ${curr.symbol} ${curr.code}`);
  };

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:bg-purple-500/15 group w-full sm:w-auto"
        aria-label="Global settings"
      >
        <GlobeAltIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
        <span className="text-sm sm:text-base font-semibold hidden xs:inline">
          {currentLanguage?.flag || '🌍'}
        </span>
        <span className="text-[10px] sm:text-xs font-medium uppercase hidden sm:inline text-purple-300/80">
          {currentLanguage?.code || 'EN'}
        </span>
        <span className="text-[10px] sm:text-xs text-purple-400/60 hidden md:inline">
          {currentCurrency?.symbol || '₹'}
        </span>
        <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-purple-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {isMobile && (
            <div 
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
          
          <div className={`
            ${isMobile 
              ? 'fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh] w-full z-50' 
              : 'absolute right-0 mt-2 w-[280px] z-50'
            } 
            bg-white shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300
          `}>
            {isMobile && (
              <div className="flex justify-center py-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>
            )}

            {/* Header */}
            <div className="px-4 py-3 bg-[#131921] border-b border-[#3a4553] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">{t('select_language')}</h3>
              {!isMobile && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Language Section */}
            <div className="py-2">
              <div className="px-3 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Language</p>
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 transition-all text-sm ${
                    language === lang.code
                      ? 'bg-purple-50 text-purple-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.name}</span>
                  {language === lang.code && (
                    <CheckIcon className="w-4 h-4 text-purple-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 mx-4"></div>

            {/* Currency Section */}
            <div className="py-2">
              <div className="px-3 py-1">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Currency</p>
              </div>
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  onClick={() => handleCurrencyChange(curr)}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 transition-all text-sm ${
                    currency?.code === curr.code
                      ? 'bg-purple-50 text-purple-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-base font-medium w-8 text-center">{curr.symbol}</span>
                  <span className="flex-1 text-left">{curr.code}</span>
                  <span className="text-xs text-gray-400">{curr.name}</span>
                  {currency?.code === curr.code && (
                    <CheckIcon className="w-4 h-4 text-purple-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
              <p className="text-[10px] text-gray-400 text-center truncate">
                {currentLanguage?.flag} {currentLanguage?.name} · {currency?.symbol} {currency?.code}
              </p>
            </div>

            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 text-sm text-gray-600 hover:bg-gray-50 transition border-t border-gray-200 font-medium"
              >
                {t('close') || 'Close'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalSelector;