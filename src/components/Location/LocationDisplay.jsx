// // // // // src/components/Location/LocationDisplay.jsx
// // // // 'use client';

// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { 
// // // //   MapPinIcon, 
// // // //   ChevronDownIcon, 
// // // //   ArrowPathIcon,
// // // //   CurrencyDollarIcon,
// // // //   LanguageIcon,
// // // //   MagnifyingGlassIcon,
// // // //   XMarkIcon
// // // // } from '@heroicons/react/24/outline';
// // // // import { MapPinIcon as MapPinSolid } from '@heroicons/react/24/solid';
// // // // import toast from 'react-hot-toast';

// // // // const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// // // // const LocationDisplay = () => {
// // // //   const [location, setLocation] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [showDropdown, setShowDropdown] = useState(false);
// // // //   const [searchQuery, setSearchQuery] = useState('');
// // // //   const [searchResults, setSearchResults] = useState([]);
// // // //   const [searching, setSearching] = useState(false);
// // // //   const [activeTab, setActiveTab] = useState('location');
// // // //   const [currencies, setCurrencies] = useState([]);
// // // //   const [languages, setLanguages] = useState([]);
// // // //   const [selectedCurrency, setSelectedCurrency] = useState(null);
// // // //   const [selectedLanguage, setSelectedLanguage] = useState(null);
// // // //   const dropdownRef = useRef(null);
// // // //   const searchInputRef = useRef(null);
// // // //   const searchTimeoutRef = useRef(null);
  
// // // //   const [toastShown, setToastShown] = useState(false);
// // // //   const [locationSet, setLocationSet] = useState(false);
// // // //   const [isMobile, setIsMobile] = useState(false);

// // // //   // ✅ Detect mobile device
// // // //   useEffect(() => {
// // // //     const checkMobile = () => {
// // // //       setIsMobile(window.innerWidth < 768);
// // // //     };
// // // //     checkMobile();
// // // //     window.addEventListener('resize', checkMobile);
// // // //     return () => window.removeEventListener('resize', checkMobile);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     detectLocation();
// // // //     loadSavedPreferences();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // // //         setShowDropdown(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener('mousedown', handleClickOutside);
// // // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (showDropdown && searchInputRef.current) {
// // // //       setTimeout(() => {
// // // //         searchInputRef.current.focus();
// // // //       }, 300);
// // // //     }
// // // //   }, [showDropdown]);

// // // //   const loadSavedPreferences = () => {
// // // //     const savedCurrency = localStorage.getItem('selectedCurrency');
// // // //     const savedLanguage = localStorage.getItem('selectedLanguage');
    
// // // //     if (savedCurrency) {
// // // //       try {
// // // //         setSelectedCurrency(JSON.parse(savedCurrency));
// // // //       } catch (e) {}
// // // //     }
    
// // // //     if (savedLanguage) {
// // // //       try {
// // // //         setSelectedLanguage(JSON.parse(savedLanguage));
// // // //       } catch (e) {}
// // // //     }
// // // //   };

// // // //   // ✅ Detect location - Main function
// // // //   const detectLocation = async () => {
// // // //     if (locationSet && !toastShown) {
// // // //       return;
// // // //     }
    
// // // //     setLoading(true);
// // // //     setError(null);
// // // //     setToastShown(false);

// // // //     try {
// // // //       if (navigator.geolocation) {
// // // //         navigator.geolocation.getCurrentPosition(
// // // //           async (position) => {
// // // //             const { latitude, longitude } = position.coords;
// // // //             console.log('📍 GPS Position:', { latitude, longitude });
// // // //             await getLocationFromCoords(latitude, longitude);
// // // //           },
// // // //           async (error) => {
// // // //             console.warn('⚠️ GPS failed:', error.message);
// // // //             await detectLocationByIP();
// // // //           },
// // // //           { 
// // // //             enableHighAccuracy: true, 
// // // //             timeout: 15000,
// // // //             maximumAge: 0
// // // //           }
// // // //         );
// // // //       } else {
// // // //         await detectLocationByIP();
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ Location detection error:', error);
// // // //       setError('Unable to detect location');
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ✅ Get location from coordinates
// // // //   const getLocationFromCoords = async (lat, lng) => {
// // // //     try {
// // // //       console.log(`📍 Getting address from: lat=${lat}, lng=${lng}`);
      
// // // //       const url = `${API_URL}/location/reverse?lat=${lat}&lng=${lng}`;
// // // //       console.log('📤 Request URL:', url);

// // // //       const response = await fetch(url, {
// // // //         method: 'GET',
// // // //         credentials: 'include',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //           'Accept': 'application/json',
// // // //         },
// // // //       });

// // // //       console.log('📥 Response status:', response.status);

// // // //       if (!response.ok) {
// // // //         const errorData = await response.json();
// // // //         console.error('❌ Error response:', errorData);
// // // //         throw new Error(errorData.message || `HTTP ${response.status}`);
// // // //       }

// // // //       const data = await response.json();
// // // //       console.log('✅ Location data:', data);

// // // //       if (data.success && data.data) {
// // // //         const locData = data.data;
        
// // // //         if (!locationSet) {
// // // //           const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
// // // //           setLocation({
// // // //             latitude: lat,
// // // //             longitude: lng,
// // // //             ...locData,
// // // //             displayStreet: displayStreet,
// // // //             method: 'browser'
// // // //           });
          
// // // //           localStorage.setItem('userLocation', JSON.stringify(locData));
// // // //           updateCurrenciesAndLanguages(locData);
          
// // // //           if (!toastShown && !locationSet) {
// // // //             toast.success(`📍 ${displayStreet} found`);
// // // //             setToastShown(true);
// // // //             setLocationSet(true);
// // // //           }
// // // //         }
// // // //       } else {
// // // //         throw new Error(data.message || 'No location data');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ Geocoding error:', error);
// // // //       await detectLocationByIP();
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ✅ Detect by IP
// // // //   const detectLocationByIP = async () => {
// // // //     try {
// // // //       console.log('📍 Detecting via IP...');
// // // //       const response = await fetch(`${API_URL}/location/detect`, {
// // // //         method: 'GET',
// // // //         credentials: 'include',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //           'Accept': 'application/json',
// // // //         },
// // // //       });
      
// // // //       if (!response.ok) {
// // // //         throw new Error(`HTTP ${response.status}`);
// // // //       }
      
// // // //       const data = await response.json();
// // // //       console.log('📍 IP Location:', data);

// // // //       if (data.success && data.data) {
// // // //         if (!locationSet) {
// // // //           const locData = data.data;
// // // //           const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
// // // //           setLocation({
// // // //             ...locData,
// // // //             displayStreet: displayStreet,
// // // //             method: 'ip'
// // // //           });
          
// // // //           updateCurrenciesAndLanguages(locData);
// // // //           localStorage.setItem('userLocation', JSON.stringify(locData));
          
// // // //           if (!toastShown && !locationSet) {
// // // //             toast.success(`📍 ${displayStreet} detected`);
// // // //             setToastShown(true);
// // // //             setLocationSet(true);
// // // //           }
// // // //         }
// // // //       } else {
// // // //         setError('Could not detect location');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ IP location error:', error);
// // // //       setError('Location detection failed');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ✅ Update currencies and languages
// // // //   const updateCurrenciesAndLanguages = (locationData) => {
// // // //     const currencyMap = {
// // // //       'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
// // // //       'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
// // // //       'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
// // // //       'AE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
// // // //       'SA': { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
// // // //       'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
// // // //       'MY': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
// // // //       'AU': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
// // // //       'CA': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
// // // //       'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
// // // //       'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
// // // //       'JP': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
// // // //       'CN': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
// // // //       'BR': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
// // // //       'RU': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
// // // //       'ZA': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
// // // //       'NZ': { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
// // // //     };

// // // //     const countryCode = locationData.countryCode || 'US';
// // // //     const defaultCurrency = currencyMap[countryCode] || currencyMap['US'];
    
// // // //     const allCurrencies = Object.values(currencyMap).reduce((acc, curr) => {
// // // //       if (!acc.find(c => c.code === curr.code)) {
// // // //         acc.push(curr);
// // // //       }
// // // //       return acc;
// // // //     }, []);

// // // //     setCurrencies(allCurrencies);
    
// // // //     if (!selectedCurrency) {
// // // //       setSelectedCurrency(defaultCurrency);
// // // //       localStorage.setItem('selectedCurrency', JSON.stringify(defaultCurrency));
// // // //     }

// // // //     const languageMap = {
// // // //       'IN': [
// // // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // // //         { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
// // // //         { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
// // // //         { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
// // // //         { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
// // // //       ],
// // // //       'US': [
// // // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // // //         { code: 'es', name: 'Español', flag: '🇪🇸' },
// // // //       ],
// // // //       'AE': [
// // // //         { code: 'ar', name: 'العربية', flag: '🇦🇪' },
// // // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // // //       ],
// // // //       'DE': [
// // // //         { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
// // // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // // //       ],
// // // //       'FR': [
// // // //         { code: 'fr', name: 'Français', flag: '🇫🇷' },
// // // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // // //       ],
// // // //       'JP': [
// // // //         { code: 'ja', name: '日本語', flag: '🇯🇵' },
// // // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // // //       ],
// // // //     };

// // // //     const countryLanguages = languageMap[countryCode] || languageMap['US'];
// // // //     setLanguages(countryLanguages);
    
// // // //     if (!selectedLanguage) {
// // // //       setSelectedLanguage(countryLanguages[0]);
// // // //       localStorage.setItem('selectedLanguage', JSON.stringify(countryLanguages[0]));
// // // //     }
// // // //   };

// // // //   // ✅ Search location with debounce
// // // //   const searchLocation = async (query) => {
// // // //     if (!query || query.length < 2) {
// // // //       setSearchResults([]);
// // // //       return;
// // // //     }
    
// // // //     setSearching(true);
// // // //     try {
// // // //       const response = await fetch(
// // // //         `${API_URL}/location/search/${encodeURIComponent(query)}`,
// // // //         {
// // // //           method: 'GET',
// // // //           credentials: 'include',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //             'Accept': 'application/json',
// // // //           },
// // // //         }
// // // //       );
      
// // // //       if (!response.ok) {
// // // //         throw new Error(`HTTP ${response.status}`);
// // // //       }
      
// // // //       const data = await response.json();
// // // //       console.log('🔍 Search results:', data);
      
// // // //       if (data.success) {
// // // //         setSearchResults(data.data || []);
// // // //       } else {
// // // //         setSearchResults([]);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Search error:', error);
// // // //       setSearchResults([]);
// // // //     } finally {
// // // //       setSearching(false);
// // // //     }
// // // //   };

// // // //   // ✅ Handle search with debounce
// // // //   const handleSearch = (e) => {
// // // //     const query = e.target.value;
// // // //     setSearchQuery(query);
    
// // // //     // Clear previous timeout
// // // //     if (searchTimeoutRef.current) {
// // // //       clearTimeout(searchTimeoutRef.current);
// // // //     }
    
// // // //     if (query.length >= 2) {
// // // //       // Debounce search to avoid too many requests
// // // //       searchTimeoutRef.current = setTimeout(() => {
// // // //         searchLocation(query);
// // // //       }, 500);
// // // //     } else {
// // // //       setSearchResults([]);
// // // //     }
// // // //   };

// // // //   // ✅ Select location from search
// // // //   const selectLocation = (result) => {
// // // //     setToastShown(false);
// // // //     setLocationSet(true);
    
// // // //     const displayStreet = result.street || result.name || result.displayName?.split(',')[0] || 'Location';
    
// // // //     setLocation({
// // // //       ...location,
// // // //       street: result.street || result.name || null,
// // // //       displayStreet: displayStreet,
// // // //       city: result.city || '',
// // // //       state: result.state || '',
// // // //       country: result.country || '',
// // // //       latitude: result.lat,
// // // //       longitude: result.lon,
// // // //       fullAddress: result.fullAddress || result.displayName,
// // // //       method: 'search'
// // // //     });
// // // //     setShowDropdown(false);
// // // //     setSearchQuery('');
// // // //     setSearchResults([]);
    
// // // //     toast.success(`📍 ${displayStreet} selected`);
// // // //   };

// // // //   // ✅ Handle currency change
// // // //   const handleCurrencyChange = (currency) => {
// // // //     setSelectedCurrency(currency);
// // // //     localStorage.setItem('selectedCurrency', JSON.stringify(currency));
    
// // // //     window.dispatchEvent(new CustomEvent('currencyChange', {
// // // //       detail: { currency }
// // // //     }));
    
// // // //     toast.success(`Currency changed to ${currency.symbol} ${currency.code}`);
// // // //     setShowDropdown(false);
// // // //   };

// // // //   // ✅ Handle language change
// // // //   const handleLanguageChange = (language) => {
// // // //     setSelectedLanguage(language);
// // // //     localStorage.setItem('selectedLanguage', JSON.stringify(language));
    
// // // //     window.dispatchEvent(new CustomEvent('languageChange', {
// // // //       detail: { language }
// // // //     }));
    
// // // //     toast.success(`Language changed to ${language.name}`);
// // // //     setShowDropdown(false);
// // // //   };

// // // //   // ✅ Get display street name
// // // //   const getStreetName = () => {
// // // //     if (!location) return 'Select Location';
// // // //     return location.displayStreet || location.street || location.city || location.formattedAddress || 'Unknown Location';
// // // //   };

// // // //   // ✅ Get display city/state
// // // //   const getCityState = () => {
// // // //     if (!location) return '';
// // // //     const parts = [];
// // // //     if (location.city) parts.push(location.city);
// // // //     if (location.state) parts.push(location.state);
// // // //     if (location.country) parts.push(location.country);
// // // //     return parts.join(', ');
// // // //   };

// // // //   // ✅ Clear search
// // // //   const clearSearch = () => {
// // // //     setSearchQuery('');
// // // //     setSearchResults([]);
// // // //     if (searchInputRef.current) {
// // // //       searchInputRef.current.focus();
// // // //     }
// // // //   };

// // // //   // ✅ Toggle dropdown
// // // //   const toggleDropdown = () => {
// // // //     setShowDropdown(!showDropdown);
// // // //     if (!showDropdown) {
// // // //       setTimeout(() => {
// // // //         if (dropdownRef.current) {
// // // //           dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
// // // //         }
// // // //       }, 100);
// // // //     }
// // // //   };

// // // //   // ✅ Loading state
// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg animate-pulse">
// // // //         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
// // // //         <span className="text-xs sm:text-sm text-purple-300">Detecting...</span>
// // // //         <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ✅ Error state
// // // //   if (error) {
// // // //     return (
// // // //       <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500/10 rounded-lg border border-red-500/20">
// // // //         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
// // // //         <span className="text-xs sm:text-sm text-red-300 truncate max-w-[80px] sm:max-w-none">{error}</span>
// // // //         <button
// // // //           onClick={detectLocation}
// // // //           className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition flex-shrink-0"
// // // //         >
// // // //           Retry
// // // //         </button>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // ✅ Main render
// // // //   return (
// // // //     <div className="relative w-full sm:w-auto" ref={dropdownRef}>
// // // //       {/* Main Button */}
// // // //       <button
// // // //         onClick={toggleDropdown}
// // // //         className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:bg-purple-500/15 group w-full sm:w-auto"
// // // //         aria-label="Select location"
// // // //       >
// // // //         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
// // // //         <div className="text-left min-w-0 flex-1">
// // // //           <div className="text-[10px] sm:text-xs text-purple-400/70 leading-none">Delivering to</div>
// // // //           <div className="text-xs sm:text-sm font-semibold text-purple-200 truncate max-w-[80px] sm:max-w-[120px] md:max-w-[180px]">
// // // //             {getStreetName()}
// // // //           </div>
// // // //         </div>
// // // //         <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-purple-400 transition-transform flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
// // // //       </button>

// // // //       {/* Dropdown */}
// // // //       {showDropdown && (
// // // //         <>
// // // //           {/* Mobile Overlay */}
// // // //           {isMobile && (
// // // //             <div 
// // // //               className="fixed inset-0 bg-black/60 z-40"
// // // //               onClick={() => setShowDropdown(false)}
// // // //             />
// // // //           )}
          
// // // //           <div className={`
// // // //             ${isMobile 
// // // //               ? 'fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh] w-full z-50' 
// // // //               : 'absolute right-0 mt-2 w-[380px] sm:w-[440px] z-50'
// // // //             } 
// // // //             bg-slate-800 shadow-2xl border border-purple-500/30 overflow-hidden transition-all duration-300
// // // //           `}>
// // // //             {/* Mobile Drag Handle */}
// // // //             {isMobile && (
// // // //               <div className="flex justify-center py-2">
// // // //                 <div className="w-12 h-1 bg-purple-500/30 rounded-full" />
// // // //               </div>
// // // //             )}

// // // //             {/* Header */}
// // // //             <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-b border-purple-500/30 flex items-center justify-between">
// // // //               <div className="flex items-center gap-1.5 sm:gap-2">
// // // //                 <MapPinSolid className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
// // // //                 <h3 className="text-sm sm:text-base font-bold text-purple-200">Your Location</h3>
// // // //               </div>
// // // //               <div className="flex items-center gap-1.5 sm:gap-2">
// // // //                 <button
// // // //                   onClick={detectLocation}
// // // //                   className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition"
// // // //                 >
// // // //                   <ArrowPathIcon className="w-3 h-3 sm:w-4 sm:h-4" />
// // // //                   <span className="hidden xs:inline">Update</span>
// // // //                 </button>
// // // //                 {isMobile && (
// // // //                   <button
// // // //                     onClick={() => setShowDropdown(false)}
// // // //                     className="p-1 hover:bg-purple-500/10 rounded-lg transition"
// // // //                   >
// // // //                     <XMarkIcon className="w-5 h-5 text-purple-400" />
// // // //                   </button>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             {/* Tabs */}
// // // //             <div className="flex border-b border-purple-500/20 overflow-x-auto scrollbar-hide">
// // // //               {[
// // // //                 { id: 'location', label: 'Location', icon: MapPinIcon },
// // // //                 { id: 'currency', label: 'Currency', icon: CurrencyDollarIcon },
// // // //                 { id: 'language', label: 'Language', icon: LanguageIcon },
// // // //               ].map((tab) => (
// // // //                 <button
// // // //                   key={tab.id}
// // // //                   onClick={() => setActiveTab(tab.id)}
// // // //                   className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap ${
// // // //                     activeTab === tab.id
// // // //                       ? 'text-purple-200 border-b-2 border-purple-500 bg-purple-500/5'
// // // //                       : 'text-purple-400 hover:text-purple-300'
// // // //                   }`}
// // // //                 >
// // // //                   <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
// // // //                   <span className="hidden xs:inline">{tab.label}</span>
// // // //                 </button>
// // // //               ))}
// // // //             </div>

// // // //             {/* Content */}
// // // //             <div className={`${isMobile ? 'max-h-[60vh]' : 'max-h-[400px]'} overflow-y-auto`}>
// // // //               {/* Location Tab */}
// // // //               {activeTab === 'location' && (
// // // //                 <div>
// // // //                   {/* Current Location */}
// // // //                   {location && (
// // // //                     <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-purple-500/5 border-b border-purple-500/20">
// // // //                       <div className="flex items-start gap-2 sm:gap-3">
// // // //                         <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
// // // //                           <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
// // // //                         </div>
// // // //                         <div className="flex-1 min-w-0">
// // // //                           <p className="text-xs sm:text-sm font-semibold text-purple-200 truncate">{getStreetName()}</p>
// // // //                           <p className="text-[10px] sm:text-xs text-purple-400 truncate">{getCityState()}</p>
// // // //                           {location.fullAddress && (
// // // //                             <p className="text-[10px] sm:text-xs text-purple-400/60 truncate mt-0.5 hidden sm:block">{location.fullAddress}</p>
// // // //                           )}
// // // //                           {location.latitude && location.longitude && (
// // // //                             <p className="text-[8px] sm:text-[10px] text-purple-400/40 mt-0.5">
// // // //                               {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
// // // //                             </p>
// // // //                           )}
// // // //                         </div>
// // // //                         <span className="text-[8px] sm:text-[10px] bg-green-500/20 text-green-400 px-1.5 sm:px-2 py-0.5 rounded flex-shrink-0">
// // // //                           {location.method === 'browser' ? 'GPS' : 'IP'}
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* Search Input */}
// // // //                   <div className="p-3 border-b border-purple-500/20">
// // // //                     <div className="relative">
// // // //                       <MagnifyingGlassIcon className="absolute left-2.5 sm:left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400/50" />
// // // //                       <input
// // // //                         ref={searchInputRef}
// // // //                         type="text"
// // // //                         placeholder="Search for a location..."
// // // //                         value={searchQuery}
// // // //                         onChange={handleSearch}
// // // //                         className="w-full pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 sm:py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-purple-200 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
// // // //                       />
// // // //                       {searchQuery && (
// // // //                         <button
// // // //                           onClick={clearSearch}
// // // //                           className="absolute right-2 sm:right-3 top-2 text-purple-400/50 hover:text-purple-300 transition"
// // // //                         >
// // // //                           <XMarkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
// // // //                         </button>
// // // //                       )}
// // // //                       {searching && (
// // // //                         <div className="absolute right-2 sm:right-3 top-2">
// // // //                           <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
// // // //                         </div>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>

// // // //                   {/* Search Results */}
// // // //                   {searchResults.length > 0 && (
// // // //                     <div className="max-h-40 sm:max-h-48 overflow-y-auto">
// // // //                       {searchResults.map((result, index) => (
// // // //                         <button
// // // //                           key={index}
// // // //                           onClick={() => selectLocation(result)}
// // // //                           className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left hover:bg-purple-500/10 transition flex items-start gap-2 sm:gap-3"
// // // //                         >
// // // //                           <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0 mt-0.5" />
// // // //                           <div className="min-w-0 flex-1">
// // // //                             <p className="text-xs sm:text-sm text-purple-200 truncate">
// // // //                               {result.street || result.name || result.displayName?.split(',')[0] || 'Unknown'}
// // // //                             </p>
// // // //                             <p className="text-[10px] sm:text-xs text-purple-400 truncate">
// // // //                               {result.city || result.state || result.country || result.displayName}
// // // //                             </p>
// // // //                           </div>
// // // //                         </button>
// // // //                       ))}
// // // //                     </div>
// // // //                   )}

// // // //                   {/* No Results */}
// // // //                   {searchQuery.length >= 2 && searchResults.length === 0 && !searching && (
// // // //                     <div className="px-4 py-6 text-center">
// // // //                       <MapPinIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400/30 mx-auto mb-2" />
// // // //                       <p className="text-xs sm:text-sm text-purple-400">No locations found</p>
// // // //                       <p className="text-[10px] sm:text-xs text-purple-400/60 mt-1">
// // // //                         Try searching by area name (e.g., "Ramapuram", "Chennai")
// // // //                       </p>
// // // //                     </div>
// // // //                   )}

// // // //                   {/* Actions */}
// // // //                   <div className="px-2 sm:px-3 py-2 border-t border-purple-500/20 bg-slate-800/50 flex gap-1.5 sm:gap-2">
// // // //                     <button
// // // //                       onClick={detectLocation}
// // // //                       className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition py-1.5 sm:py-2 px-1.5 sm:px-2 bg-purple-500/10 rounded-lg"
// // // //                     >
// // // //                       <ArrowPathIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
// // // //                       <span>Auto-detect</span>
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={() => {
// // // //                         if (location?.latitude && location?.longitude) {
// // // //                           window.open(
// // // //                             `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}&zoom=15`,
// // // //                             '_blank'
// // // //                           );
// // // //                         }
// // // //                       }}
// // // //                       className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition py-1.5 sm:py-2 px-1.5 sm:px-2 bg-purple-500/10 rounded-lg"
// // // //                     >
// // // //                       <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
// // // //                       <span>View Map</span>
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {/* Currency Tab */}
// // // //               {activeTab === 'currency' && (
// // // //                 <div className="p-3">
// // // //                   <p className="text-[10px] sm:text-xs text-purple-400/70 mb-3">Select your preferred currency</p>
// // // //                   <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
// // // //                     {currencies.map((currency) => (
// // // //                       <button
// // // //                         key={currency.code}
// // // //                         onClick={() => handleCurrencyChange(currency)}
// // // //                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// // // //                           selectedCurrency?.code === currency.code
// // // //                             ? 'bg-purple-600 text-white'
// // // //                             : 'text-purple-300/80 hover:bg-purple-500/10'
// // // //                         }`}
// // // //                       >
// // // //                         <span className="text-base sm:text-lg font-medium">{currency.symbol}</span>
// // // //                         <span className="text-[10px] sm:text-xs">{currency.code}</span>
// // // //                         {selectedCurrency?.code === currency.code && (
// // // //                           <span className="ml-auto text-[10px] sm:text-xs text-purple-300">✓</span>
// // // //                         )}
// // // //                       </button>
// // // //                     ))}
// // // //                   </div>
// // // //                   {selectedCurrency && (
// // // //                     <div className="mt-3 p-2 bg-purple-500/10 rounded-lg">
// // // //                       <p className="text-[10px] sm:text-xs text-purple-400/70">
// // // //                         Current: <span className="text-purple-200 font-semibold">
// // // //                           {selectedCurrency.symbol} {selectedCurrency.code} - {selectedCurrency.name}
// // // //                         </span>
// // // //                       </p>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               )}

// // // //               {/* Language Tab */}
// // // //               {activeTab === 'language' && (
// // // //                 <div className="p-3">
// // // //                   <p className="text-[10px] sm:text-xs text-purple-400/70 mb-3">Select your preferred language</p>
// // // //                   <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
// // // //                     {languages.map((language) => (
// // // //                       <button
// // // //                         key={language.code}
// // // //                         onClick={() => handleLanguageChange(language)}
// // // //                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// // // //                           selectedLanguage?.code === language.code
// // // //                             ? 'bg-purple-600 text-white'
// // // //                             : 'text-purple-300/80 hover:bg-purple-500/10'
// // // //                         }`}
// // // //                       >
// // // //                         <span className="text-base sm:text-lg">{language.flag}</span>
// // // //                         <span className="text-[10px] sm:text-xs truncate">{language.name}</span>
// // // //                         {selectedLanguage?.code === language.code && (
// // // //                           <span className="ml-auto text-[10px] sm:text-xs text-purple-300">✓</span>
// // // //                         )}
// // // //                       </button>
// // // //                     ))}
// // // //                   </div>
// // // //                   {selectedLanguage && (
// // // //                     <div className="mt-3 p-2 bg-purple-500/10 rounded-lg">
// // // //                       <p className="text-[10px] sm:text-xs text-purple-400/70">
// // // //                         Current: <span className="text-purple-200 font-semibold">
// // // //                           {selectedLanguage.flag} {selectedLanguage.name}
// // // //                         </span>
// // // //                       </p>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             {/* Close Button - Mobile Only */}
// // // //             {isMobile && (
// // // //               <button
// // // //                 onClick={() => setShowDropdown(false)}
// // // //                 className="w-full py-3 text-xs text-purple-400 hover:bg-slate-700/50 transition border-t border-purple-500/20 font-medium"
// // // //               >
// // // //                 Close
// // // //               </button>
// // // //             )}
// // // //           </div>
// // // //         </>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default LocationDisplay;
// // // // src/components/Location/LocationDisplay.jsx
// // // 'use client';

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { 
// // //   MapPinIcon, 
// // //   ChevronDownIcon, 
// // //   ArrowPathIcon,
// // //   CurrencyDollarIcon,
// // //   LanguageIcon,
// // //   MagnifyingGlassIcon,
// // //   XMarkIcon
// // // } from '@heroicons/react/24/outline';
// // // import { MapPinIcon as MapPinSolid } from '@heroicons/react/24/solid';
// // // import toast from 'react-hot-toast';

// // // // ✅ Use environment variable with fallback
// // // const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.sombu.in';

// // // const LocationDisplay = () => {
// // //   const [location, setLocation] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [showDropdown, setShowDropdown] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const [searchResults, setSearchResults] = useState([]);
// // //   const [searching, setSearching] = useState(false);
// // //   const [activeTab, setActiveTab] = useState('location');
// // //   const [currencies, setCurrencies] = useState([]);
// // //   const [languages, setLanguages] = useState([]);
// // //   const [selectedCurrency, setSelectedCurrency] = useState(null);
// // //   const [selectedLanguage, setSelectedLanguage] = useState(null);
// // //   const dropdownRef = useRef(null);
// // //   const searchInputRef = useRef(null);
// // //   const searchTimeoutRef = useRef(null);
  
// // //   const [toastShown, setToastShown] = useState(false);
// // //   const [locationSet, setLocationSet] = useState(false);
// // //   const [isMobile, setIsMobile] = useState(false);

// // //   // ✅ Detect mobile device
// // //   useEffect(() => {
// // //     const checkMobile = () => {
// // //       setIsMobile(window.innerWidth < 768);
// // //     };
// // //     checkMobile();
// // //     window.addEventListener('resize', checkMobile);
// // //     return () => window.removeEventListener('resize', checkMobile);
// // //   }, []);

// // //   useEffect(() => {
// // //     detectLocation();
// // //     loadSavedPreferences();
// // //   }, []);

// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // //         setShowDropdown(false);
// // //       }
// // //     };
// // //     document.addEventListener('mousedown', handleClickOutside);
// // //     return () => document.removeEventListener('mousedown', handleClickOutside);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (showDropdown && searchInputRef.current) {
// // //       setTimeout(() => {
// // //         searchInputRef.current.focus();
// // //       }, 300);
// // //     }
// // //   }, [showDropdown]);

// // //   const loadSavedPreferences = () => {
// // //     const savedCurrency = localStorage.getItem('selectedCurrency');
// // //     const savedLanguage = localStorage.getItem('selectedLanguage');
    
// // //     if (savedCurrency) {
// // //       try {
// // //         setSelectedCurrency(JSON.parse(savedCurrency));
// // //       } catch (e) {}
// // //     }
    
// // //     if (savedLanguage) {
// // //       try {
// // //         setSelectedLanguage(JSON.parse(savedLanguage));
// // //       } catch (e) {}
// // //     }
// // //   };

// // //   // ✅ Detect location - Main function
// // //   const detectLocation = async () => {
// // //     if (locationSet && !toastShown) {
// // //       return;
// // //     }
    
// // //     setLoading(true);
// // //     setError(null);
// // //     setToastShown(false);

// // //     try {
// // //       if (navigator.geolocation) {
// // //         navigator.geolocation.getCurrentPosition(
// // //           async (position) => {
// // //             const { latitude, longitude } = position.coords;
// // //             console.log('📍 GPS Position:', { latitude, longitude });
// // //             await getLocationFromCoords(latitude, longitude);
// // //           },
// // //           async (error) => {
// // //             console.warn('⚠️ GPS failed:', error.message);
// // //             await detectLocationByIP();
// // //           },
// // //           { 
// // //             enableHighAccuracy: true, 
// // //             timeout: 15000,
// // //             maximumAge: 0
// // //           }
// // //         );
// // //       } else {
// // //         await detectLocationByIP();
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ Location detection error:', error);
// // //       setError('Unable to detect location');
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ✅ Get location from coordinates
// // //   const getLocationFromCoords = async (lat, lng) => {
// // //     try {
// // //       console.log(`📍 Getting address from: lat=${lat}, lng=${lng}`);
      
// // //       // ✅ CORRECT: Use /api prefix in URL
// // //       const url = `${API_URL}/api/location/reverse?lat=${lat}&lng=${lng}`;
// // //       console.log('📤 Request URL:', url);

// // //       const response = await fetch(url, {
// // //         method: 'GET',
// // //         credentials: 'include',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Accept': 'application/json',
// // //         },
// // //       });

// // //       console.log('📥 Response status:', response.status);

// // //       if (!response.ok) {
// // //         const errorData = await response.json();
// // //         console.error('❌ Error response:', errorData);
// // //         throw new Error(errorData.message || `HTTP ${response.status}`);
// // //       }

// // //       const data = await response.json();
// // //       console.log('✅ Location data:', data);

// // //       if (data.success && data.data) {
// // //         const locData = data.data;
        
// // //         if (!locationSet) {
// // //           const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
// // //           setLocation({
// // //             latitude: lat,
// // //             longitude: lng,
// // //             ...locData,
// // //             displayStreet: displayStreet,
// // //             method: 'browser'
// // //           });
          
// // //           localStorage.setItem('userLocation', JSON.stringify(locData));
// // //           updateCurrenciesAndLanguages(locData);
          
// // //           if (!toastShown && !locationSet) {
// // //             toast.success(`📍 ${displayStreet} found`);
// // //             setToastShown(true);
// // //             setLocationSet(true);
// // //           }
// // //         }
// // //       } else {
// // //         throw new Error(data.message || 'No location data');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ Geocoding error:', error);
// // //       await detectLocationByIP();
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ✅ Detect by IP
// // //   const detectLocationByIP = async () => {
// // //     try {
// // //       console.log('📍 Detecting via IP...');
// // //       // ✅ CORRECT: Use /api prefix in URL
// // //       const response = await fetch(`${API_URL}/api/location/detect`, {
// // //         method: 'GET',
// // //         credentials: 'include',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Accept': 'application/json',
// // //         },
// // //       });
      
// // //       if (!response.ok) {
// // //         throw new Error(`HTTP ${response.status}`);
// // //       }
      
// // //       const data = await response.json();
// // //       console.log('📍 IP Location:', data);

// // //       if (data.success && data.data) {
// // //         if (!locationSet) {
// // //           const locData = data.data;
// // //           const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
// // //           setLocation({
// // //             ...locData,
// // //             displayStreet: displayStreet,
// // //             method: 'ip'
// // //           });
          
// // //           updateCurrenciesAndLanguages(locData);
// // //           localStorage.setItem('userLocation', JSON.stringify(locData));
          
// // //           if (!toastShown && !locationSet) {
// // //             toast.success(`📍 ${displayStreet} detected`);
// // //             setToastShown(true);
// // //             setLocationSet(true);
// // //           }
// // //         }
// // //       } else {
// // //         setError('Could not detect location');
// // //       }
// // //     } catch (error) {
// // //       console.error('❌ IP location error:', error);
// // //       setError('Location detection failed');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ✅ Update currencies and languages
// // //   const updateCurrenciesAndLanguages = (locationData) => {
// // //     const currencyMap = {
// // //       'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
// // //       'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
// // //       'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
// // //       'AE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
// // //       'SA': { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
// // //       'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
// // //       'MY': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
// // //       'AU': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
// // //       'CA': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
// // //       'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
// // //       'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
// // //       'JP': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
// // //       'CN': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
// // //       'BR': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
// // //       'RU': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
// // //       'ZA': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
// // //       'NZ': { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
// // //     };

// // //     const countryCode = locationData.countryCode || 'US';
// // //     const defaultCurrency = currencyMap[countryCode] || currencyMap['US'];
    
// // //     const allCurrencies = Object.values(currencyMap).reduce((acc, curr) => {
// // //       if (!acc.find(c => c.code === curr.code)) {
// // //         acc.push(curr);
// // //       }
// // //       return acc;
// // //     }, []);

// // //     setCurrencies(allCurrencies);
    
// // //     if (!selectedCurrency) {
// // //       setSelectedCurrency(defaultCurrency);
// // //       localStorage.setItem('selectedCurrency', JSON.stringify(defaultCurrency));
// // //     }

// // //     const languageMap = {
// // //       'IN': [
// // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // //         { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
// // //         { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
// // //         { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
// // //         { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
// // //       ],
// // //       'US': [
// // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // //         { code: 'es', name: 'Español', flag: '🇪🇸' },
// // //       ],
// // //       'AE': [
// // //         { code: 'ar', name: 'العربية', flag: '🇦🇪' },
// // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // //       ],
// // //       'DE': [
// // //         { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
// // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // //       ],
// // //       'FR': [
// // //         { code: 'fr', name: 'Français', flag: '🇫🇷' },
// // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // //       ],
// // //       'JP': [
// // //         { code: 'ja', name: '日本語', flag: '🇯🇵' },
// // //         { code: 'en', name: 'English', flag: '🇬🇧' },
// // //       ],
// // //     };

// // //     const countryLanguages = languageMap[countryCode] || languageMap['US'];
// // //     setLanguages(countryLanguages);
    
// // //     if (!selectedLanguage) {
// // //       setSelectedLanguage(countryLanguages[0]);
// // //       localStorage.setItem('selectedLanguage', JSON.stringify(countryLanguages[0]));
// // //     }
// // //   };

// // //   // ✅ Search location with debounce
// // //   const searchLocation = async (query) => {
// // //     if (!query || query.length < 2) {
// // //       setSearchResults([]);
// // //       return;
// // //     }
    
// // //     setSearching(true);
// // //     try {
// // //       // ✅ CORRECT: Use /api prefix in URL
// // //       const response = await fetch(
// // //         `${API_URL}/api/location/search/${encodeURIComponent(query)}`,
// // //         {
// // //           method: 'GET',
// // //           credentials: 'include',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //             'Accept': 'application/json',
// // //           },
// // //         }
// // //       );
      
// // //       if (!response.ok) {
// // //         throw new Error(`HTTP ${response.status}`);
// // //       }
      
// // //       const data = await response.json();
// // //       console.log('🔍 Search results:', data);
      
// // //       if (data.success) {
// // //         setSearchResults(data.data || []);
// // //       } else {
// // //         setSearchResults([]);
// // //       }
// // //     } catch (error) {
// // //       console.error('Search error:', error);
// // //       setSearchResults([]);
// // //     } finally {
// // //       setSearching(false);
// // //     }
// // //   };

// // //   // ✅ Handle search with debounce
// // //   const handleSearch = (e) => {
// // //     const query = e.target.value;
// // //     setSearchQuery(query);
    
// // //     // Clear previous timeout
// // //     if (searchTimeoutRef.current) {
// // //       clearTimeout(searchTimeoutRef.current);
// // //     }
    
// // //     if (query.length >= 2) {
// // //       // Debounce search to avoid too many requests
// // //       searchTimeoutRef.current = setTimeout(() => {
// // //         searchLocation(query);
// // //       }, 500);
// // //     } else {
// // //       setSearchResults([]);
// // //     }
// // //   };

// // //   // ✅ Select location from search
// // //   const selectLocation = (result) => {
// // //     setToastShown(false);
// // //     setLocationSet(true);
    
// // //     const displayStreet = result.street || result.name || result.displayName?.split(',')[0] || 'Location';
    
// // //     setLocation({
// // //       ...location,
// // //       street: result.street || result.name || null,
// // //       displayStreet: displayStreet,
// // //       city: result.city || '',
// // //       state: result.state || '',
// // //       country: result.country || '',
// // //       latitude: result.lat,
// // //       longitude: result.lon,
// // //       fullAddress: result.fullAddress || result.displayName,
// // //       method: 'search'
// // //     });
// // //     setShowDropdown(false);
// // //     setSearchQuery('');
// // //     setSearchResults([]);
    
// // //     toast.success(`📍 ${displayStreet} selected`);
// // //   };

// // //   // ✅ Handle currency change
// // //   const handleCurrencyChange = (currency) => {
// // //     setSelectedCurrency(currency);
// // //     localStorage.setItem('selectedCurrency', JSON.stringify(currency));
    
// // //     window.dispatchEvent(new CustomEvent('currencyChange', {
// // //       detail: { currency }
// // //     }));
    
// // //     toast.success(`Currency changed to ${currency.symbol} ${currency.code}`);
// // //     setShowDropdown(false);
// // //   };

// // //   // ✅ Handle language change
// // //   const handleLanguageChange = (language) => {
// // //     setSelectedLanguage(language);
// // //     localStorage.setItem('selectedLanguage', JSON.stringify(language));
    
// // //     window.dispatchEvent(new CustomEvent('languageChange', {
// // //       detail: { language }
// // //     }));
    
// // //     toast.success(`Language changed to ${language.name}`);
// // //     setShowDropdown(false);
// // //   };

// // //   // ✅ Get display street name
// // //   const getStreetName = () => {
// // //     if (!location) return 'Select Location';
// // //     return location.displayStreet || location.street || location.city || location.formattedAddress || 'Unknown Location';
// // //   };

// // //   // ✅ Get display city/state
// // //   const getCityState = () => {
// // //     if (!location) return '';
// // //     const parts = [];
// // //     if (location.city) parts.push(location.city);
// // //     if (location.state) parts.push(location.state);
// // //     if (location.country) parts.push(location.country);
// // //     return parts.join(', ');
// // //   };

// // //   // ✅ Clear search
// // //   const clearSearch = () => {
// // //     setSearchQuery('');
// // //     setSearchResults([]);
// // //     if (searchInputRef.current) {
// // //       searchInputRef.current.focus();
// // //     }
// // //   };

// // //   // ✅ Toggle dropdown
// // //   const toggleDropdown = () => {
// // //     setShowDropdown(!showDropdown);
// // //     if (!showDropdown) {
// // //       setTimeout(() => {
// // //         if (dropdownRef.current) {
// // //           dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
// // //         }
// // //       }, 100);
// // //     }
// // //   };

// // //   // ✅ Loading state
// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg animate-pulse">
// // //         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
// // //         <span className="text-xs sm:text-sm text-purple-300">Detecting...</span>
// // //         <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
// // //       </div>
// // //     );
// // //   }

// // //   // ✅ Error state
// // //   if (error) {
// // //     return (
// // //       <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500/10 rounded-lg border border-red-500/20">
// // //         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
// // //         <span className="text-xs sm:text-sm text-red-300 truncate max-w-[80px] sm:max-w-none">{error}</span>
// // //         <button
// // //           onClick={detectLocation}
// // //           className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition flex-shrink-0"
// // //         >
// // //           Retry
// // //         </button>
// // //       </div>
// // //     );
// // //   }

// // //   // ✅ Main render
// // //   return (
// // //     <div className="relative w-full sm:w-auto" ref={dropdownRef}>
// // //       {/* Main Button */}
// // //       <button
// // //         onClick={toggleDropdown}
// // //         className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:bg-purple-500/15 group w-full sm:w-auto"
// // //         aria-label="Select location"
// // //       >
// // //         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
// // //         <div className="text-left min-w-0 flex-1">
// // //           <div className="text-[10px] sm:text-xs text-purple-400/70 leading-none">Delivering to</div>
// // //           <div className="text-xs sm:text-sm font-semibold text-purple-200 truncate max-w-[80px] sm:max-w-[120px] md:max-w-[180px]">
// // //             {getStreetName()}
// // //           </div>
// // //         </div>
// // //         <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-purple-400 transition-transform flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
// // //       </button>

// // //       {/* Dropdown */}
// // //       {showDropdown && (
// // //         <>
// // //           {/* Mobile Overlay */}
// // //           {isMobile && (
// // //             <div 
// // //               className="fixed inset-0 bg-black/60 z-40"
// // //               onClick={() => setShowDropdown(false)}
// // //             />
// // //           )}
          
// // //           <div className={`
// // //             ${isMobile 
// // //               ? 'fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh] w-full z-50' 
// // //               : 'absolute right-0 mt-2 w-[380px] sm:w-[440px] z-50'
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
// // //                 <MapPinSolid className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
// // //                 <h3 className="text-sm sm:text-base font-bold text-purple-200">Your Location</h3>
// // //               </div>
// // //               <div className="flex items-center gap-1.5 sm:gap-2">
// // //                 <button
// // //                   onClick={detectLocation}
// // //                   className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition"
// // //                 >
// // //                   <ArrowPathIcon className="w-3 h-3 sm:w-4 sm:h-4" />
// // //                   <span className="hidden xs:inline">Update</span>
// // //                 </button>
// // //                 {isMobile && (
// // //                   <button
// // //                     onClick={() => setShowDropdown(false)}
// // //                     className="p-1 hover:bg-purple-500/10 rounded-lg transition"
// // //                   >
// // //                     <XMarkIcon className="w-5 h-5 text-purple-400" />
// // //                   </button>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Tabs */}
// // //             <div className="flex border-b border-purple-500/20 overflow-x-auto scrollbar-hide">
// // //               {[
// // //                 { id: 'location', label: 'Location', icon: MapPinIcon },
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

// // //             {/* Content */}
// // //             <div className={`${isMobile ? 'max-h-[60vh]' : 'max-h-[400px]'} overflow-y-auto`}>
// // //               {/* Location Tab */}
// // //               {activeTab === 'location' && (
// // //                 <div>
// // //                   {/* Current Location */}
// // //                   {location && (
// // //                     <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-purple-500/5 border-b border-purple-500/20">
// // //                       <div className="flex items-start gap-2 sm:gap-3">
// // //                         <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
// // //                           <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
// // //                         </div>
// // //                         <div className="flex-1 min-w-0">
// // //                           <p className="text-xs sm:text-sm font-semibold text-purple-200 truncate">{getStreetName()}</p>
// // //                           <p className="text-[10px] sm:text-xs text-purple-400 truncate">{getCityState()}</p>
// // //                           {location.fullAddress && (
// // //                             <p className="text-[10px] sm:text-xs text-purple-400/60 truncate mt-0.5 hidden sm:block">{location.fullAddress}</p>
// // //                           )}
// // //                           {location.latitude && location.longitude && (
// // //                             <p className="text-[8px] sm:text-[10px] text-purple-400/40 mt-0.5">
// // //                               {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
// // //                             </p>
// // //                           )}
// // //                         </div>
// // //                         <span className="text-[8px] sm:text-[10px] bg-green-500/20 text-green-400 px-1.5 sm:px-2 py-0.5 rounded flex-shrink-0">
// // //                           {location.method === 'browser' ? 'GPS' : 'IP'}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   )}

// // //                   {/* Search Input */}
// // //                   <div className="p-3 border-b border-purple-500/20">
// // //                     <div className="relative">
// // //                       <MagnifyingGlassIcon className="absolute left-2.5 sm:left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400/50" />
// // //                       <input
// // //                         ref={searchInputRef}
// // //                         type="text"
// // //                         placeholder="Search for a location..."
// // //                         value={searchQuery}
// // //                         onChange={handleSearch}
// // //                         className="w-full pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 sm:py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-purple-200 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
// // //                       />
// // //                       {searchQuery && (
// // //                         <button
// // //                           onClick={clearSearch}
// // //                           className="absolute right-2 sm:right-3 top-2 text-purple-400/50 hover:text-purple-300 transition"
// // //                         >
// // //                           <XMarkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
// // //                         </button>
// // //                       )}
// // //                       {searching && (
// // //                         <div className="absolute right-2 sm:right-3 top-2">
// // //                           <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
// // //                         </div>
// // //                       )}
// // //                     </div>
// // //                   </div>

// // //                   {/* Search Results */}
// // //                   {searchResults.length > 0 && (
// // //                     <div className="max-h-40 sm:max-h-48 overflow-y-auto">
// // //                       {searchResults.map((result, index) => (
// // //                         <button
// // //                           key={index}
// // //                           onClick={() => selectLocation(result)}
// // //                           className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left hover:bg-purple-500/10 transition flex items-start gap-2 sm:gap-3"
// // //                         >
// // //                           <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0 mt-0.5" />
// // //                           <div className="min-w-0 flex-1">
// // //                             <p className="text-xs sm:text-sm text-purple-200 truncate">
// // //                               {result.street || result.name || result.displayName?.split(',')[0] || 'Unknown'}
// // //                             </p>
// // //                             <p className="text-[10px] sm:text-xs text-purple-400 truncate">
// // //                               {result.city || result.state || result.country || result.displayName}
// // //                             </p>
// // //                           </div>
// // //                         </button>
// // //                       ))}
// // //                     </div>
// // //                   )}

// // //                   {/* No Results */}
// // //                   {searchQuery.length >= 2 && searchResults.length === 0 && !searching && (
// // //                     <div className="px-4 py-6 text-center">
// // //                       <MapPinIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400/30 mx-auto mb-2" />
// // //                       <p className="text-xs sm:text-sm text-purple-400">No locations found</p>
// // //                       <p className="text-[10px] sm:text-xs text-purple-400/60 mt-1">
// // //                         Try searching by area name (e.g., "Ramapuram", "Chennai")
// // //                       </p>
// // //                     </div>
// // //                   )}

// // //                   {/* Actions */}
// // //                   <div className="px-2 sm:px-3 py-2 border-t border-purple-500/20 bg-slate-800/50 flex gap-1.5 sm:gap-2">
// // //                     <button
// // //                       onClick={detectLocation}
// // //                       className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition py-1.5 sm:py-2 px-1.5 sm:px-2 bg-purple-500/10 rounded-lg"
// // //                     >
// // //                       <ArrowPathIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
// // //                       <span>Auto-detect</span>
// // //                     </button>
// // //                     <button
// // //                       onClick={() => {
// // //                         if (location?.latitude && location?.longitude) {
// // //                           window.open(
// // //                             `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}&zoom=15`,
// // //                             '_blank'
// // //                           );
// // //                         }
// // //                       }}
// // //                       className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition py-1.5 sm:py-2 px-1.5 sm:px-2 bg-purple-500/10 rounded-lg"
// // //                     >
// // //                       <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
// // //                       <span>View Map</span>
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {/* Currency Tab */}
// // //               {activeTab === 'currency' && (
// // //                 <div className="p-3">
// // //                   <p className="text-[10px] sm:text-xs text-purple-400/70 mb-3">Select your preferred currency</p>
// // //                   <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
// // //                     {currencies.map((currency) => (
// // //                       <button
// // //                         key={currency.code}
// // //                         onClick={() => handleCurrencyChange(currency)}
// // //                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// // //                           selectedCurrency?.code === currency.code
// // //                             ? 'bg-purple-600 text-white'
// // //                             : 'text-purple-300/80 hover:bg-purple-500/10'
// // //                         }`}
// // //                       >
// // //                         <span className="text-base sm:text-lg font-medium">{currency.symbol}</span>
// // //                         <span className="text-[10px] sm:text-xs">{currency.code}</span>
// // //                         {selectedCurrency?.code === currency.code && (
// // //                           <span className="ml-auto text-[10px] sm:text-xs text-purple-300">✓</span>
// // //                         )}
// // //                       </button>
// // //                     ))}
// // //                   </div>
// // //                   {selectedCurrency && (
// // //                     <div className="mt-3 p-2 bg-purple-500/10 rounded-lg">
// // //                       <p className="text-[10px] sm:text-xs text-purple-400/70">
// // //                         Current: <span className="text-purple-200 font-semibold">
// // //                           {selectedCurrency.symbol} {selectedCurrency.code} - {selectedCurrency.name}
// // //                         </span>
// // //                       </p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               )}

// // //               {/* Language Tab */}
// // //               {activeTab === 'language' && (
// // //                 <div className="p-3">
// // //                   <p className="text-[10px] sm:text-xs text-purple-400/70 mb-3">Select your preferred language</p>
// // //                   <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
// // //                     {languages.map((language) => (
// // //                       <button
// // //                         key={language.code}
// // //                         onClick={() => handleLanguageChange(language)}
// // //                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// // //                           selectedLanguage?.code === language.code
// // //                             ? 'bg-purple-600 text-white'
// // //                             : 'text-purple-300/80 hover:bg-purple-500/10'
// // //                         }`}
// // //                       >
// // //                         <span className="text-base sm:text-lg">{language.flag}</span>
// // //                         <span className="text-[10px] sm:text-xs truncate">{language.name}</span>
// // //                         {selectedLanguage?.code === language.code && (
// // //                           <span className="ml-auto text-[10px] sm:text-xs text-purple-300">✓</span>
// // //                         )}
// // //                       </button>
// // //                     ))}
// // //                   </div>
// // //                   {selectedLanguage && (
// // //                     <div className="mt-3 p-2 bg-purple-500/10 rounded-lg">
// // //                       <p className="text-[10px] sm:text-xs text-purple-400/70">
// // //                         Current: <span className="text-purple-200 font-semibold">
// // //                           {selectedLanguage.flag} {selectedLanguage.name}
// // //                         </span>
// // //                       </p>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               )}
// // //             </div>

// // //             {/* Close Button - Mobile Only */}
// // //             {isMobile && (
// // //               <button
// // //                 onClick={() => setShowDropdown(false)}
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

// // // export default LocationDisplay;
// // // src/components/Location/LocationDisplay.jsx
// // 'use client';

// // import React, { useState, useEffect, useRef } from 'react';
// // import { 
// //   MapPinIcon, 
// //   ChevronDownIcon, 
// //   ArrowPathIcon,
// //   CurrencyDollarIcon,
// //   LanguageIcon,
// //   MagnifyingGlassIcon,
// //   XMarkIcon
// // } from '@heroicons/react/24/outline';
// // import { MapPinIcon as MapPinSolid } from '@heroicons/react/24/solid';
// // import toast from 'react-hot-toast';
// // import apiClient from '../../lib/apiClient'; // ✅ Import apiClient

// // const LocationDisplay = () => {
// //   const [location, setLocation] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showDropdown, setShowDropdown] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [searching, setSearching] = useState(false);
// //   const [activeTab, setActiveTab] = useState('location');
// //   const [currencies, setCurrencies] = useState([]);
// //   const [languages, setLanguages] = useState([]);
// //   const [selectedCurrency, setSelectedCurrency] = useState(null);
// //   const [selectedLanguage, setSelectedLanguage] = useState(null);
// //   const dropdownRef = useRef(null);
// //   const searchInputRef = useRef(null);
// //   const searchTimeoutRef = useRef(null);
  
// //   const [toastShown, setToastShown] = useState(false);
// //   const [locationSet, setLocationSet] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);

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
// //     detectLocation();
// //     loadSavedPreferences();
// //   }, []);

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setShowDropdown(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   useEffect(() => {
// //     if (showDropdown && searchInputRef.current) {
// //       setTimeout(() => {
// //         searchInputRef.current.focus();
// //       }, 300);
// //     }
// //   }, [showDropdown]);

// //   const loadSavedPreferences = () => {
// //     const savedCurrency = localStorage.getItem('selectedCurrency');
// //     const savedLanguage = localStorage.getItem('selectedLanguage');
    
// //     if (savedCurrency) {
// //       try {
// //         setSelectedCurrency(JSON.parse(savedCurrency));
// //       } catch (e) {}
// //     }
    
// //     if (savedLanguage) {
// //       try {
// //         setSelectedLanguage(JSON.parse(savedLanguage));
// //       } catch (e) {}
// //     }
// //   };

// //   // ✅ Detect location - Main function
// //   const detectLocation = async () => {
// //     if (locationSet && !toastShown) {
// //       return;
// //     }
    
// //     setLoading(true);
// //     setError(null);
// //     setToastShown(false);

// //     try {
// //       if (navigator.geolocation) {
// //         navigator.geolocation.getCurrentPosition(
// //           async (position) => {
// //             const { latitude, longitude } = position.coords;
// //             console.log('📍 GPS Position:', { latitude, longitude });
// //             await getLocationFromCoords(latitude, longitude);
// //           },
// //           async (error) => {
// //             console.warn('⚠️ GPS failed:', error.message);
// //             await detectLocationByIP();
// //           },
// //           { 
// //             enableHighAccuracy: true, 
// //             timeout: 15000,
// //             maximumAge: 0
// //           }
// //         );
// //       } else {
// //         await detectLocationByIP();
// //       }
// //     } catch (error) {
// //       console.error('❌ Location detection error:', error);
// //       setError('Unable to detect location');
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ Get location from coordinates - Using apiClient
// //   const getLocationFromCoords = async (lat, lng) => {
// //     try {
// //       console.log(`📍 Getting address from: lat=${lat}, lng=${lng}`);
      
// //       // ✅ Use apiClient instead of fetch
// //       const response = await apiClient.get(`/location/reverse?lat=${lat}&lng=${lng}`);
// //       console.log('✅ Location data:', response.data);

// //       if (response.data.success && response.data.data) {
// //         const locData = response.data.data;
        
// //         if (!locationSet) {
// //           const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
// //           setLocation({
// //             latitude: lat,
// //             longitude: lng,
// //             ...locData,
// //             displayStreet: displayStreet,
// //             method: 'browser'
// //           });
          
// //           localStorage.setItem('userLocation', JSON.stringify(locData));
// //           updateCurrenciesAndLanguages(locData);
          
// //           if (!toastShown && !locationSet) {
// //             toast.success(`📍 ${displayStreet} found`);
// //             setToastShown(true);
// //             setLocationSet(true);
// //           }
// //         }
// //       } else {
// //         throw new Error(response.data.message || 'No location data');
// //       }
// //     } catch (error) {
// //       console.error('❌ Geocoding error:', error);
// //       await detectLocationByIP();
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ Detect by IP - Using apiClient
// //   const detectLocationByIP = async () => {
// //     try {
// //       console.log('📍 Detecting via IP...');
      
// //       // ✅ Use apiClient instead of fetch
// //       const response = await apiClient.get('/location/detect');
// //       console.log('📍 IP Location:', response.data);

// //       if (response.data.success && response.data.data) {
// //         if (!locationSet) {
// //           const locData = response.data.data;
// //           const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
// //           setLocation({
// //             ...locData,
// //             displayStreet: displayStreet,
// //             method: 'ip'
// //           });
          
// //           updateCurrenciesAndLanguages(locData);
// //           localStorage.setItem('userLocation', JSON.stringify(locData));
          
// //           if (!toastShown && !locationSet) {
// //             toast.success(`📍 ${displayStreet} detected`);
// //             setToastShown(true);
// //             setLocationSet(true);
// //           }
// //         }
// //       } else {
// //         setError('Could not detect location');
// //       }
// //     } catch (error) {
// //       console.error('❌ IP location error:', error);
// //       setError('Location detection failed');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ Update currencies and languages
// //   const updateCurrenciesAndLanguages = (locationData) => {
// //     const currencyMap = {
// //       'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
// //       'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
// //       'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
// //       'AE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
// //       'SA': { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
// //       'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
// //       'MY': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
// //       'AU': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
// //       'CA': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
// //       'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
// //       'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
// //       'JP': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
// //       'CN': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
// //       'BR': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
// //       'RU': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
// //       'ZA': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
// //       'NZ': { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
// //     };

// //     const countryCode = locationData.countryCode || 'US';
// //     const defaultCurrency = currencyMap[countryCode] || currencyMap['US'];
    
// //     const allCurrencies = Object.values(currencyMap).reduce((acc, curr) => {
// //       if (!acc.find(c => c.code === curr.code)) {
// //         acc.push(curr);
// //       }
// //       return acc;
// //     }, []);

// //     setCurrencies(allCurrencies);
    
// //     if (!selectedCurrency) {
// //       setSelectedCurrency(defaultCurrency);
// //       localStorage.setItem('selectedCurrency', JSON.stringify(defaultCurrency));
// //     }

// //     const languageMap = {
// //       'IN': [
// //         { code: 'en', name: 'English', flag: '🇬🇧' },
// //         { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
// //         { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
// //         { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
// //         { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
// //       ],
// //       'US': [
// //         { code: 'en', name: 'English', flag: '🇬🇧' },
// //         { code: 'es', name: 'Español', flag: '🇪🇸' },
// //       ],
// //       'AE': [
// //         { code: 'ar', name: 'العربية', flag: '🇦🇪' },
// //         { code: 'en', name: 'English', flag: '🇬🇧' },
// //       ],
// //       'DE': [
// //         { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
// //         { code: 'en', name: 'English', flag: '🇬🇧' },
// //       ],
// //       'FR': [
// //         { code: 'fr', name: 'Français', flag: '🇫🇷' },
// //         { code: 'en', name: 'English', flag: '🇬🇧' },
// //       ],
// //       'JP': [
// //         { code: 'ja', name: '日本語', flag: '🇯🇵' },
// //         { code: 'en', name: 'English', flag: '🇬🇧' },
// //       ],
// //     };

// //     const countryLanguages = languageMap[countryCode] || languageMap['US'];
// //     setLanguages(countryLanguages);
    
// //     if (!selectedLanguage) {
// //       setSelectedLanguage(countryLanguages[0]);
// //       localStorage.setItem('selectedLanguage', JSON.stringify(countryLanguages[0]));
// //     }
// //   };

// //   // ✅ Search location with debounce - Using apiClient
// //   const searchLocation = async (query) => {
// //     if (!query || query.length < 2) {
// //       setSearchResults([]);
// //       return;
// //     }
    
// //     setSearching(true);
// //     try {
// //       // ✅ Use apiClient instead of fetch
// //       const response = await apiClient.get(`/location/search/${encodeURIComponent(query)}`);
// //       console.log('🔍 Search results:', response.data);
      
// //       if (response.data.success) {
// //         setSearchResults(response.data.data || []);
// //       } else {
// //         setSearchResults([]);
// //       }
// //     } catch (error) {
// //       console.error('Search error:', error);
// //       setSearchResults([]);
// //     } finally {
// //       setSearching(false);
// //     }
// //   };

// //   // ✅ Handle search with debounce
// //   const handleSearch = (e) => {
// //     const query = e.target.value;
// //     setSearchQuery(query);
    
// //     // Clear previous timeout
// //     if (searchTimeoutRef.current) {
// //       clearTimeout(searchTimeoutRef.current);
// //     }
    
// //     if (query.length >= 2) {
// //       // Debounce search to avoid too many requests
// //       searchTimeoutRef.current = setTimeout(() => {
// //         searchLocation(query);
// //       }, 500);
// //     } else {
// //       setSearchResults([]);
// //     }
// //   };

// //   // ✅ Select location from search
// //   const selectLocation = (result) => {
// //     setToastShown(false);
// //     setLocationSet(true);
    
// //     const displayStreet = result.street || result.name || result.displayName?.split(',')[0] || 'Location';
    
// //     setLocation({
// //       ...location,
// //       street: result.street || result.name || null,
// //       displayStreet: displayStreet,
// //       city: result.city || '',
// //       state: result.state || '',
// //       country: result.country || '',
// //       latitude: result.lat,
// //       longitude: result.lon,
// //       fullAddress: result.fullAddress || result.displayName,
// //       method: 'search'
// //     });
// //     setShowDropdown(false);
// //     setSearchQuery('');
// //     setSearchResults([]);
    
// //     toast.success(`📍 ${displayStreet} selected`);
// //   };

// //   // ✅ Handle currency change
// //   const handleCurrencyChange = (currency) => {
// //     setSelectedCurrency(currency);
// //     localStorage.setItem('selectedCurrency', JSON.stringify(currency));
    
// //     window.dispatchEvent(new CustomEvent('currencyChange', {
// //       detail: { currency }
// //     }));
    
// //     toast.success(`Currency changed to ${currency.symbol} ${currency.code}`);
// //     setShowDropdown(false);
// //   };

// //   // ✅ Handle language change
// //   const handleLanguageChange = (language) => {
// //     setSelectedLanguage(language);
// //     localStorage.setItem('selectedLanguage', JSON.stringify(language));
    
// //     window.dispatchEvent(new CustomEvent('languageChange', {
// //       detail: { language }
// //     }));
    
// //     toast.success(`Language changed to ${language.name}`);
// //     setShowDropdown(false);
// //   };

// //   // ✅ Get display street name
// //   const getStreetName = () => {
// //     if (!location) return 'Select Location';
// //     return location.displayStreet || location.street || location.city || location.formattedAddress || 'Unknown Location';
// //   };

// //   // ✅ Get display city/state
// //   const getCityState = () => {
// //     if (!location) return '';
// //     const parts = [];
// //     if (location.city) parts.push(location.city);
// //     if (location.state) parts.push(location.state);
// //     if (location.country) parts.push(location.country);
// //     return parts.join(', ');
// //   };

// //   // ✅ Clear search
// //   const clearSearch = () => {
// //     setSearchQuery('');
// //     setSearchResults([]);
// //     if (searchInputRef.current) {
// //       searchInputRef.current.focus();
// //     }
// //   };

// //   // ✅ Toggle dropdown
// //   const toggleDropdown = () => {
// //     setShowDropdown(!showDropdown);
// //     if (!showDropdown) {
// //       setTimeout(() => {
// //         if (dropdownRef.current) {
// //           dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
// //         }
// //       }, 100);
// //     }
// //   };

// //   // ✅ Loading state
// //   if (loading) {
// //     return (
// //       <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg animate-pulse">
// //         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
// //         <span className="text-xs sm:text-sm text-purple-300">Detecting...</span>
// //         <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
// //       </div>
// //     );
// //   }

// //   // ✅ Error state
// //   if (error) {
// //     return (
// //       <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500/10 rounded-lg border border-red-500/20">
// //         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
// //         <span className="text-xs sm:text-sm text-red-300 truncate max-w-[80px] sm:max-w-none">{error}</span>
// //         <button
// //           onClick={detectLocation}
// //           className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition flex-shrink-0"
// //         >
// //           Retry
// //         </button>
// //       </div>
// //     );
// //   }

// //   // ✅ Main render
// //   return (
// //     <div className="relative w-full sm:w-auto" ref={dropdownRef}>
// //       {/* Main Button */}
// //       <button
// //         onClick={toggleDropdown}
// //         className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:bg-purple-500/15 group w-full sm:w-auto"
// //         aria-label="Select location"
// //       >
// //         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
// //         <div className="text-left min-w-0 flex-1">
// //           <div className="text-[10px] sm:text-xs text-purple-400/70 leading-none">Delivering to</div>
// //           <div className="text-xs sm:text-sm font-semibold text-purple-200 truncate max-w-[80px] sm:max-w-[120px] md:max-w-[180px]">
// //             {getStreetName()}
// //           </div>
// //         </div>
// //         <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-purple-400 transition-transform flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
// //       </button>

// //       {/* Dropdown */}
// //       {showDropdown && (
// //         <>
// //           {/* Mobile Overlay */}
// //           {isMobile && (
// //             <div 
// //               className="fixed inset-0 bg-black/60 z-40"
// //               onClick={() => setShowDropdown(false)}
// //             />
// //           )}
          
// //           <div className={`
// //             ${isMobile 
// //               ? 'fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh] w-full z-50' 
// //               : 'absolute right-0 mt-2 w-[380px] sm:w-[440px] z-50'
// //             } 
// //             bg-slate-800 shadow-2xl border border-purple-500/30 overflow-hidden transition-all duration-300
// //           `}>
// //             {/* Mobile Drag Handle */}
// //             {isMobile && (
// //               <div className="flex justify-center py-2">
// //                 <div className="w-12 h-1 bg-purple-500/30 rounded-full" />
// //               </div>
// //             )}

// //             {/* Header */}
// //             <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-b border-purple-500/30 flex items-center justify-between">
// //               <div className="flex items-center gap-1.5 sm:gap-2">
// //                 <MapPinSolid className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
// //                 <h3 className="text-sm sm:text-base font-bold text-purple-200">Your Location</h3>
// //               </div>
// //               <div className="flex items-center gap-1.5 sm:gap-2">
// //                 <button
// //                   onClick={detectLocation}
// //                   className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition"
// //                 >
// //                   <ArrowPathIcon className="w-3 h-3 sm:w-4 sm:h-4" />
// //                   <span className="hidden xs:inline">Update</span>
// //                 </button>
// //                 {isMobile && (
// //                   <button
// //                     onClick={() => setShowDropdown(false)}
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
// //                 { id: 'location', label: 'Location', icon: MapPinIcon },
// //                 { id: 'currency', label: 'Currency', icon: CurrencyDollarIcon },
// //                 { id: 'language', label: 'Language', icon: LanguageIcon },
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

// //             {/* Content */}
// //             <div className={`${isMobile ? 'max-h-[60vh]' : 'max-h-[400px]'} overflow-y-auto`}>
// //               {/* Location Tab */}
// //               {activeTab === 'location' && (
// //                 <div>
// //                   {/* Current Location */}
// //                   {location && (
// //                     <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-purple-500/5 border-b border-purple-500/20">
// //                       <div className="flex items-start gap-2 sm:gap-3">
// //                         <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
// //                           <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
// //                         </div>
// //                         <div className="flex-1 min-w-0">
// //                           <p className="text-xs sm:text-sm font-semibold text-purple-200 truncate">{getStreetName()}</p>
// //                           <p className="text-[10px] sm:text-xs text-purple-400 truncate">{getCityState()}</p>
// //                           {location.fullAddress && (
// //                             <p className="text-[10px] sm:text-xs text-purple-400/60 truncate mt-0.5 hidden sm:block">{location.fullAddress}</p>
// //                           )}
// //                           {location.latitude && location.longitude && (
// //                             <p className="text-[8px] sm:text-[10px] text-purple-400/40 mt-0.5">
// //                               {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
// //                             </p>
// //                           )}
// //                         </div>
// //                         <span className="text-[8px] sm:text-[10px] bg-green-500/20 text-green-400 px-1.5 sm:px-2 py-0.5 rounded flex-shrink-0">
// //                           {location.method === 'browser' ? 'GPS' : 'IP'}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* Search Input */}
// //                   <div className="p-3 border-b border-purple-500/20">
// //                     <div className="relative">
// //                       <MagnifyingGlassIcon className="absolute left-2.5 sm:left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400/50" />
// //                       <input
// //                         ref={searchInputRef}
// //                         type="text"
// //                         placeholder="Search for a location..."
// //                         value={searchQuery}
// //                         onChange={handleSearch}
// //                         className="w-full pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 sm:py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-purple-200 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
// //                       />
// //                       {searchQuery && (
// //                         <button
// //                           onClick={clearSearch}
// //                           className="absolute right-2 sm:right-3 top-2 text-purple-400/50 hover:text-purple-300 transition"
// //                         >
// //                           <XMarkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
// //                         </button>
// //                       )}
// //                       {searching && (
// //                         <div className="absolute right-2 sm:right-3 top-2">
// //                           <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   {/* Search Results */}
// //                   {searchResults.length > 0 && (
// //                     <div className="max-h-40 sm:max-h-48 overflow-y-auto">
// //                       {searchResults.map((result, index) => (
// //                         <button
// //                           key={index}
// //                           onClick={() => selectLocation(result)}
// //                           className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left hover:bg-purple-500/10 transition flex items-start gap-2 sm:gap-3"
// //                         >
// //                           <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0 mt-0.5" />
// //                           <div className="min-w-0 flex-1">
// //                             <p className="text-xs sm:text-sm text-purple-200 truncate">
// //                               {result.street || result.name || result.displayName?.split(',')[0] || 'Unknown'}
// //                             </p>
// //                             <p className="text-[10px] sm:text-xs text-purple-400 truncate">
// //                               {result.city || result.state || result.country || result.displayName}
// //                             </p>
// //                           </div>
// //                         </button>
// //                       ))}
// //                     </div>
// //                   )}

// //                   {/* No Results */}
// //                 // In the search results section

// // {searchQuery.length >= 2 && searchResults.length === 0 && !searching && (
// //   <div className="px-4 py-6 text-center">
// //     <MapPinIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400/30 mx-auto mb-2" />
// //     <p className="text-xs sm:text-sm text-purple-400">No locations found</p>
// //     <p className="text-[10px] sm:text-xs text-purple-400/60 mt-1">
// //       Try searching by area name (e.g., "Coimbatore", "Ramapuram")<br />
// //       or try a simpler search term
// //     </p>
// //   </div>
// // )}

// //                   {/* Actions */}
// //                   <div className="px-2 sm:px-3 py-2 border-t border-purple-500/20 bg-slate-800/50 flex gap-1.5 sm:gap-2">
// //                     <button
// //                       onClick={detectLocation}
// //                       className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition py-1.5 sm:py-2 px-1.5 sm:px-2 bg-purple-500/10 rounded-lg"
// //                     >
// //                       <ArrowPathIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
// //                       <span>Auto-detect</span>
// //                     </button>
// //                     <button
// //                       onClick={() => {
// //                         if (location?.latitude && location?.longitude) {
// //                           window.open(
// //                             `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}&zoom=15`,
// //                             '_blank'
// //                           );
// //                         }
// //                       }}
// //                       className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition py-1.5 sm:py-2 px-1.5 sm:px-2 bg-purple-500/10 rounded-lg"
// //                     >
// //                       <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
// //                       <span>View Map</span>
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Currency Tab */}
// //               {activeTab === 'currency' && (
// //                 <div className="p-3">
// //                   <p className="text-[10px] sm:text-xs text-purple-400/70 mb-3">Select your preferred currency</p>
// //                   <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
// //                     {currencies.map((currency) => (
// //                       <button
// //                         key={currency.code}
// //                         onClick={() => handleCurrencyChange(currency)}
// //                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// //                           selectedCurrency?.code === currency.code
// //                             ? 'bg-purple-600 text-white'
// //                             : 'text-purple-300/80 hover:bg-purple-500/10'
// //                         }`}
// //                       >
// //                         <span className="text-base sm:text-lg font-medium">{currency.symbol}</span>
// //                         <span className="text-[10px] sm:text-xs">{currency.code}</span>
// //                         {selectedCurrency?.code === currency.code && (
// //                           <span className="ml-auto text-[10px] sm:text-xs text-purple-300">✓</span>
// //                         )}
// //                       </button>
// //                     ))}
// //                   </div>
// //                   {selectedCurrency && (
// //                     <div className="mt-3 p-2 bg-purple-500/10 rounded-lg">
// //                       <p className="text-[10px] sm:text-xs text-purple-400/70">
// //                         Current: <span className="text-purple-200 font-semibold">
// //                           {selectedCurrency.symbol} {selectedCurrency.code} - {selectedCurrency.name}
// //                         </span>
// //                       </p>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}

// //               {/* Language Tab */}
// //               {activeTab === 'language' && (
// //                 <div className="p-3">
// //                   <p className="text-[10px] sm:text-xs text-purple-400/70 mb-3">Select your preferred language</p>
// //                   <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
// //                     {languages.map((language) => (
// //                       <button
// //                         key={language.code}
// //                         onClick={() => handleLanguageChange(language)}
// //                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
// //                           selectedLanguage?.code === language.code
// //                             ? 'bg-purple-600 text-white'
// //                             : 'text-purple-300/80 hover:bg-purple-500/10'
// //                         }`}
// //                       >
// //                         <span className="text-base sm:text-lg">{language.flag}</span>
// //                         <span className="text-[10px] sm:text-xs truncate">{language.name}</span>
// //                         {selectedLanguage?.code === language.code && (
// //                           <span className="ml-auto text-[10px] sm:text-xs text-purple-300">✓</span>
// //                         )}
// //                       </button>
// //                     ))}
// //                   </div>
// //                   {selectedLanguage && (
// //                     <div className="mt-3 p-2 bg-purple-500/10 rounded-lg">
// //                       <p className="text-[10px] sm:text-xs text-purple-400/70">
// //                         Current: <span className="text-purple-200 font-semibold">
// //                           {selectedLanguage.flag} {selectedLanguage.name}
// //                         </span>
// //                       </p>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Close Button - Mobile Only */}
// //             {isMobile && (
// //               <button
// //                 onClick={() => setShowDropdown(false)}
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

// // export default LocationDisplay;
// // src/components/Location/LocationDisplay.jsx
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   MapPinIcon, 
//   ChevronDownIcon, 
//   ArrowPathIcon,
//   CurrencyDollarIcon,
//   LanguageIcon,
//   MagnifyingGlassIcon,
//   XMarkIcon
// } from '@heroicons/react/24/outline';
// import { MapPinIcon as MapPinSolid } from '@heroicons/react/24/solid';
// import toast from 'react-hot-toast';
// import apiClient from '../../lib/apiClient';
// import { useApp } from '../../providers/AppProvider';
// const LocationDisplay = () => {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [activeTab, setActiveTab] = useState('location');
//   const [currencies, setCurrencies] = useState([]);
//   const [languages, setLanguages] = useState([]);
//   const [selectedCurrency, setSelectedCurrency] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState(null);
//   const dropdownRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const searchTimeoutRef = useRef(null);
  
//   const [toastShown, setToastShown] = useState(false);
//   const [locationSet, setLocationSet] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
// const { t } = useApp();
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
//     detectLocation();
//     loadSavedPreferences();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (showDropdown && searchInputRef.current) {
//       setTimeout(() => {
//         searchInputRef.current.focus();
//       }, 300);
//     }
//   }, [showDropdown]);

//   const loadSavedPreferences = () => {
//     const savedCurrency = localStorage.getItem('selectedCurrency');
//     const savedLanguage = localStorage.getItem('selectedLanguage');
    
//     if (savedCurrency) {
//       try {
//         setSelectedCurrency(JSON.parse(savedCurrency));
//       } catch (e) {}
//     }
    
//     if (savedLanguage) {
//       try {
//         setSelectedLanguage(JSON.parse(savedLanguage));
//       } catch (e) {}
//     }
//   };

//   // ✅ Detect location - Main function (GPS First)
//   const detectLocation = async () => {
//     if (locationSet && !toastShown) {
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
//     setToastShown(false);

//     try {
//       // ✅ FIRST: Try browser geolocation (GPS) - Most accurate
//       if (navigator.geolocation) {
//         console.log('📍 Trying GPS location...');
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             const { latitude, longitude } = position.coords;
//             console.log('📍 GPS Position:', { latitude, longitude });
//             await getLocationFromCoords(latitude, longitude);
//           },
//           async (error) => {
//             console.warn('⚠️ GPS failed:', error.message);
//             console.log('📍 Falling back to IP detection...');
//             await detectLocationByIP();
//           },
//           { 
//             enableHighAccuracy: true, 
//             timeout: 15000,
//             maximumAge: 0
//           }
//         );
//       } else {
//         console.log('📍 No GPS available, using IP...');
//         await detectLocationByIP();
//       }
//     } catch (error) {
//       console.error('❌ Location detection error:', error);
//       setError('Unable to detect location');
//       setLoading(false);
//     }
//   };

//   // ✅ Get location from coordinates (GPS)
//   const getLocationFromCoords = async (lat, lng) => {
//     try {
//       console.log(`📍 Getting address from: lat=${lat}, lng=${lng}`);
      
//       const response = await apiClient.get(`/location/reverse?lat=${lat}&lng=${lng}`);
//       console.log('✅ Location data:', response.data);

//       if (response.data.success && response.data.data) {
//         const locData = response.data.data;
        
//         if (!locationSet) {
//           const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
//           setLocation({
//             latitude: lat,
//             longitude: lng,
//             ...locData,
//             displayStreet: displayStreet,
//             method: 'gps'  // ✅ Mark as GPS
//           });
          
//           localStorage.setItem('userLocation', JSON.stringify(locData));
//           updateCurrenciesAndLanguages(locData);
          
//           if (!toastShown && !locationSet) {
//             // toast.success(`📍 ${displayStreet} found`);
//             setToastShown(true);
//             setLocationSet(true);
//           }
//         }
//       } else {
//         throw new Error(response.data.message || 'No location data');
//       }
//     } catch (error) {
//       console.error('❌ Geocoding error:', error);
//       await detectLocationByIP();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Detect by IP (Fallback)
//   const detectLocationByIP = async () => {
//     try {
//       console.log('📍 Detecting via IP...');
      
//       const response = await apiClient.get('/location/detect');
//       console.log('📍 IP Location:', response.data);

//       if (response.data.success && response.data.data) {
//         if (!locationSet) {
//           const locData = response.data.data;
//           const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
//           setLocation({
//             ...locData,
//             displayStreet: displayStreet,
//             method: 'ip'  // ✅ Mark as IP
//           });
          
//           updateCurrenciesAndLanguages(locData);
//           localStorage.setItem('userLocation', JSON.stringify(locData));
          
//           if (!toastShown && !locationSet) {
//             toast.success(`📍 ${displayStreet} detected`);
//             setToastShown(true);
//             setLocationSet(true);
//           }
//         }
//       } else {
//         setError('Could not detect location');
//       }
//     } catch (error) {
//       console.error('❌ IP location error:', error);
//       setError('Location detection failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Update currencies and languages
//   const updateCurrenciesAndLanguages = (locationData) => {
//     const currencyMap = {
//       'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
//       'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
//       'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
//       'AE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
//       'SA': { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
//       'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
//       'MY': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
//       'AU': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
//       'CA': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
//       'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
//       'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
//       'JP': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
//       'CN': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
//       'BR': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
//       'RU': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
//       'ZA': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
//       'NZ': { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
//     };

//     const countryCode = locationData.countryCode || 'US';
//     const defaultCurrency = currencyMap[countryCode] || currencyMap['US'];
    
//     const allCurrencies = Object.values(currencyMap).reduce((acc, curr) => {
//       if (!acc.find(c => c.code === curr.code)) {
//         acc.push(curr);
//       }
//       return acc;
//     }, []);

//     setCurrencies(allCurrencies);
    
//     if (!selectedCurrency) {
//       setSelectedCurrency(defaultCurrency);
//       localStorage.setItem('selectedCurrency', JSON.stringify(defaultCurrency));
//     }

//     const languageMap = {
//       'IN': [
//         { code: 'en', name: 'English', flag: '🇬🇧' },
//         { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
//         { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
//         { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
//         { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
//       ],
//       'US': [
//         { code: 'en', name: 'English', flag: '🇬🇧' },
//         { code: 'es', name: 'Español', flag: '🇪🇸' },
//       ],
//       'AE': [
//         { code: 'ar', name: 'العربية', flag: '🇦🇪' },
//         { code: 'en', name: 'English', flag: '🇬🇧' },
//       ],
//       'DE': [
//         { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
//         { code: 'en', name: 'English', flag: '🇬🇧' },
//       ],
//       'FR': [
//         { code: 'fr', name: 'Français', flag: '🇫🇷' },
//         { code: 'en', name: 'English', flag: '🇬🇧' },
//       ],
//       'JP': [
//         { code: 'ja', name: '日本語', flag: '🇯🇵' },
//         { code: 'en', name: 'English', flag: '🇬🇧' },
//       ],
//     };

//     const countryLanguages = languageMap[countryCode] || languageMap['US'];
//     setLanguages(countryLanguages);
    
//     if (!selectedLanguage) {
//       setSelectedLanguage(countryLanguages[0]);
//       localStorage.setItem('selectedLanguage', JSON.stringify(countryLanguages[0]));
//     }
//   };

//   // ✅ Search location with debounce
//   const searchLocation = async (query) => {
//     if (!query || query.length < 2) {
//       setSearchResults([]);
//       return;
//     }
    
//     setSearching(true);
//     try {
//       const response = await apiClient.get(`/location/search/${encodeURIComponent(query)}`);
//       console.log('🔍 Search results:', response.data);
      
//       if (response.data.success) {
//         setSearchResults(response.data.data || []);
//       } else {
//         setSearchResults([]);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults([]);
//     } finally {
//       setSearching(false);
//     }
//   };

//   // ✅ Handle search with debounce
//   const handleSearch = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
    
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }
    
//     if (query.length >= 2) {
//       searchTimeoutRef.current = setTimeout(() => {
//         searchLocation(query);
//       }, 500);
//     } else {
//       setSearchResults([]);
//     }
//   };

//   // ✅ Select location from search
//   const selectLocation = (result) => {
//     setToastShown(false);
//     setLocationSet(true);
    
//     const displayStreet = result.street || result.name || result.displayName?.split(',')[0] || 'Location';
    
//     setLocation({
//       ...location,
//       street: result.street || result.name || null,
//       displayStreet: displayStreet,
//       city: result.city || '',
//       state: result.state || '',
//       country: result.country || '',
//       latitude: result.lat,
//       longitude: result.lon,
//       fullAddress: result.fullAddress || result.displayName,
//       method: 'search'
//     });
//     setShowDropdown(false);
//     setSearchQuery('');
//     setSearchResults([]);
    
//     // toast.success(`📍 ${displayStreet} selected`);
//   };

//   // ✅ Handle currency change
//   const handleCurrencyChange = (currency) => {
//     setSelectedCurrency(currency);
//     localStorage.setItem('selectedCurrency', JSON.stringify(currency));
    
//     window.dispatchEvent(new CustomEvent('currencyChange', {
//       detail: { currency }
//     }));
    
//     toast.success(`Currency changed to ${currency.symbol} ${currency.code}`);
//     setShowDropdown(false);
//   };

//   // ✅ Handle language change
//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//     localStorage.setItem('selectedLanguage', JSON.stringify(language));
    
//     window.dispatchEvent(new CustomEvent('languageChange', {
//       detail: { language }
//     }));
    
//     toast.success(`Language changed to ${language.name}`);
//     setShowDropdown(false);
//   };

//   // ✅ Get display street name
//   const getStreetName = () => {
//     if (!location) return 'Select Location';
//     return location.displayStreet || location.street || location.city || location.formattedAddress || 'Unknown Location';
//   };

//   // ✅ Get display city/state
//   const getCityState = () => {
//     if (!location) return '';
//     const parts = [];
//     if (location.city) parts.push(location.city);
//     if (location.state) parts.push(location.state);
//     if (location.country) parts.push(location.country);
//     return parts.join(', ');
//   };

//   // ✅ Clear search
//   const clearSearch = () => {
//     setSearchQuery('');
//     setSearchResults([]);
//     if (searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   };

//   // ✅ Toggle dropdown
//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//     if (!showDropdown) {
//       setTimeout(() => {
//         if (dropdownRef.current) {
//           dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//         }
//       }, 100);
//     }
//   };

//   // ✅ Show method badge
//   const getMethodBadge = () => {
//     if (!location) return null;
//     const method = location.method || 'unknown';
//     const badges = {
//       'gps': { label: 'GPS', color: 'text-green-400 bg-green-500/20' },
//       'ip': { label: 'IP', color: 'text-yellow-400 bg-yellow-500/20' },
//       'search': { label: 'Search', color: 'text-blue-400 bg-blue-500/20' },
//       'browser': { label: 'GPS', color: 'text-green-400 bg-green-500/20' },
//     };
//     return badges[method] || badges['ip'];
//   };

//   // ✅ Loading state
//   if (loading) {
//     return (
//       <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg animate-pulse">
//         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//         <span className="text-xs sm:text-sm text-purple-300">Detecting...</span>
//         <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
//       </div>
//     );
//   }

//   // ✅ Error state
//   if (error) {
//     return (
//       <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500/10 rounded-lg border border-red-500/20">
//         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
//         <span className="text-xs sm:text-sm text-red-300 truncate max-w-[80px] sm:max-w-none">{error}</span>
//         <button
//           onClick={detectLocation}
//           className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition flex-shrink-0"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // ✅ Main render
//   return (
//     <div className="relative w-full sm:w-auto" ref={dropdownRef}>
//       <button
//         onClick={toggleDropdown}
//         className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:bg-purple-500/15 group w-full sm:w-auto"
//         aria-label="Select location"
//       >
//         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
//         <div className="text-left min-w-0 flex-1">
//           <div className="text-[10px] sm:text-xs text-purple-400/70 leading-none">Delivering to</div>
//           <div className="text-xs sm:text-sm font-semibold text-purple-200 truncate max-w-[80px] sm:max-w-[120px] md:max-w-[180px]">
//             {getStreetName()}
//           </div>
//         </div>
//         <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-purple-400 transition-transform flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
//       </button>

//       {showDropdown && (
//         <>
//           {isMobile && (
//             <div 
//               className="fixed inset-0 bg-black/60 z-40"
//               onClick={() => setShowDropdown(false)}
//             />
//           )}
          
//           <div className={`
//             ${isMobile 
//               ? 'fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh] w-full z-50' 
//               : 'absolute right-0 mt-2 w-[380px] sm:w-[440px] z-50'
//             } 
//             bg-slate-800 shadow-2xl border border-purple-500/30 overflow-hidden transition-all duration-300
//           `}>
//             {isMobile && (
//               <div className="flex justify-center py-2">
//                 <div className="w-12 h-1 bg-purple-500/30 rounded-full" />
//               </div>
//             )}

//             <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-b border-purple-500/30 flex items-center justify-between">
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <MapPinSolid className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//                 <h3 className="text-sm sm:text-base font-bold text-purple-200">Your Location</h3>
//               </div>
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <button
//                   onClick={detectLocation}
//                   className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition"
//                 >
//                   <ArrowPathIcon className="w-3 h-3 sm:w-4 sm:h-4" />
//                   <span className="hidden xs:inline">Update</span>
//                 </button>
//                 {isMobile && (
//                   <button
//                     onClick={() => setShowDropdown(false)}
//                     className="p-1 hover:bg-purple-500/10 rounded-lg transition"
//                   >
//                     <XMarkIcon className="w-5 h-5 text-purple-400" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div className="flex border-b border-purple-500/20 overflow-x-auto scrollbar-hide">
//               {[
//                 { id: 'location', label: 'Location', icon: MapPinIcon },
//                 { id: 'currency', label: 'Currency', icon: CurrencyDollarIcon },
//                 { id: 'language', label: 'Language', icon: LanguageIcon },
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

//             <div className={`${isMobile ? 'max-h-[60vh]' : 'max-h-[400px]'} overflow-y-auto`}>
//               {activeTab === 'location' && (
//                 <div>
//                   {location && (
//                     <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-purple-500/5 border-b border-purple-500/20">
//                       <div className="flex items-start gap-2 sm:gap-3">
//                         <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
//                           <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-xs sm:text-sm font-semibold text-purple-200 truncate">{getStreetName()}</p>
//                           <p className="text-[10px] sm:text-xs text-purple-400 truncate">{getCityState()}</p>
//                           {location.fullAddress && (
//                             <p className="text-[10px] sm:text-xs text-purple-400/60 truncate mt-0.5 hidden sm:block">{location.fullAddress}</p>
//                           )}
//                           <div className="flex items-center gap-2 mt-1">
//                             {location.latitude && location.longitude && (
//                               <span className="text-[8px] sm:text-[10px] text-purple-400/40">
//                                 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
//                               </span>
//                             )}
//                             {(() => {
//                               const badge = getMethodBadge();
//                               return badge ? (
//                                 <span className={`text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded ${badge.color}`}>
//                                   {badge.label}
//                                 </span>
//                               ) : null;
//                             })()}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <div className="p-3 border-b border-purple-500/20">
//                     <div className="relative">
//                       <MagnifyingGlassIcon className="absolute left-2.5 sm:left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400/50" />
//                       <input
//                         ref={searchInputRef}
//                         type="text"
//                         placeholder="Search for a location..."
//                         value={searchQuery}
//                         onChange={handleSearch}
//                         className="w-full pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 sm:py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-purple-200 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                       />
//                       {searchQuery && (
//                         <button
//                           onClick={clearSearch}
//                           className="absolute right-2 sm:right-3 top-2 text-purple-400/50 hover:text-purple-300 transition"
//                         >
//                           <XMarkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         </button>
//                       )}
//                       {searching && (
//                         <div className="absolute right-2 sm:right-3 top-2">
//                           <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {searchResults.length > 0 && (
//                     <div className="max-h-40 sm:max-h-48 overflow-y-auto">
//                       {searchResults.map((result, index) => (
//                         <button
//                           key={index}
//                           onClick={() => selectLocation(result)}
//                           className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left hover:bg-purple-500/10 transition flex items-start gap-2 sm:gap-3"
//                         >
//                           <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0 mt-0.5" />
//                           <div className="min-w-0 flex-1">
//                             <p className="text-xs sm:text-sm text-purple-200 truncate">
//                               {result.street || result.name || result.displayName?.split(',')[0] || 'Unknown'}
//                             </p>
//                             <p className="text-[10px] sm:text-xs text-purple-400 truncate">
//                               {result.city || result.state || result.country || result.displayName}
//                             </p>
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   )}

//                   {searchQuery.length >= 2 && searchResults.length === 0 && !searching && (
//                     <div className="px-4 py-6 text-center">
//                       <MapPinIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400/30 mx-auto mb-2" />
//                       <p className="text-xs sm:text-sm text-purple-400">No locations found</p>
//                       <p className="text-[10px] sm:text-xs text-purple-400/60 mt-1">
//                         Try searching by area name (e.g., "Ramapuram", "Chennai")
//                       </p>
//                     </div>
//                   )}

//                   <div className="px-2 sm:px-3 py-2 border-t border-purple-500/20 bg-slate-800/50 flex gap-1.5 sm:gap-2">
//                     <button
//                       onClick={detectLocation}
//                       className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition py-1.5 sm:py-2 px-1.5 sm:px-2 bg-purple-500/10 rounded-lg"
//                     >
//                       <ArrowPathIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       <span>Auto-detect</span>
//                     </button>
//                     <button
//                       onClick={() => {
//                         if (location?.latitude && location?.longitude) {
//                           window.open(
//                             `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}&zoom=15`,
//                             '_blank'
//                           );
//                         }
//                       }}
//                       className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition py-1.5 sm:py-2 px-1.5 sm:px-2 bg-purple-500/10 rounded-lg"
//                     >
//                       <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
//                       <span>View Map</span>
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {/* Currency Tab */}
//               {activeTab === 'currency' && (
//                 <div className="p-3">
//                   <p className="text-[10px] sm:text-xs text-purple-400/70 mb-3">Select your preferred currency</p>
//                   <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
//                     {currencies.map((currency) => (
//                       <button
//                         key={currency.code}
//                         onClick={() => handleCurrencyChange(currency)}
//                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
//                           selectedCurrency?.code === currency.code
//                             ? 'bg-purple-600 text-white'
//                             : 'text-purple-300/80 hover:bg-purple-500/10'
//                         }`}
//                       >
//                         <span className="text-base sm:text-lg font-medium">{currency.symbol}</span>
//                         <span className="text-[10px] sm:text-xs">{currency.code}</span>
//                         {selectedCurrency?.code === currency.code && (
//                           <span className="ml-auto text-[10px] sm:text-xs text-purple-300">✓</span>
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                   {selectedCurrency && (
//                     <div className="mt-3 p-2 bg-purple-500/10 rounded-lg">
//                       <p className="text-[10px] sm:text-xs text-purple-400/70">
//                         Current: <span className="text-purple-200 font-semibold">
//                           {selectedCurrency.symbol} {selectedCurrency.code} - {selectedCurrency.name}
//                         </span>
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Language Tab */}
//               {activeTab === 'language' && (
//                 <div className="p-3">
//                   <p className="text-[10px] sm:text-xs text-purple-400/70 mb-3">Select your preferred language</p>
//                   <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
//                     {languages.map((language) => (
//                       <button
//                         key={language.code}
//                         onClick={() => handleLanguageChange(language)}
//                         className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
//                           selectedLanguage?.code === language.code
//                             ? 'bg-purple-600 text-white'
//                             : 'text-purple-300/80 hover:bg-purple-500/10'
//                         }`}
//                       >
//                         <span className="text-base sm:text-lg">{language.flag}</span>
//                         <span className="text-[10px] sm:text-xs truncate">{language.name}</span>
//                         {selectedLanguage?.code === language.code && (
//                           <span className="ml-auto text-[10px] sm:text-xs text-purple-300">✓</span>
//                         )}
//                       </button>
//                     ))}
//                   </div>
//                   {selectedLanguage && (
//                     <div className="mt-3 p-2 bg-purple-500/10 rounded-lg">
//                       <p className="text-[10px] sm:text-xs text-purple-400/70">
//                         Current: <span className="text-purple-200 font-semibold">
//                           {selectedLanguage.flag} {selectedLanguage.name}
//                         </span>
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {isMobile && (
//               <button
//                 onClick={() => setShowDropdown(false)}
//                 className="w-full py-3 text-xs text-purple-400 hover:bg-slate-700/50 transition border-t border-purple-500/20 font-medium"
//               >
//                 Close
//               </button>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default LocationDisplay;
// src/components/Location/LocationDisplay.jsx
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { 
//   MapPinIcon, 
//   ArrowPathIcon,
// } from '@heroicons/react/24/outline';
// import { MapPinIcon as MapPinSolid } from '@heroicons/react/24/solid';
// import toast from 'react-hot-toast';
// import apiClient from '../../lib/apiClient';
// import { useApp } from '../../providers/AppProvider';

// const LocationDisplay = () => {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [toastShown, setToastShown] = useState(false);
//   const [locationSet, setLocationSet] = useState(false);
//   const [locationMethod, setLocationMethod] = useState('unknown');
  
//   const { t } = useApp();
//   const detectionAttempted = useRef(false);

//   // ✅ Detect location ONCE on mount
//   useEffect(() => {
//     // Check if we already have location in localStorage
//     const savedLocation = localStorage.getItem('userLocation');
    
//     if (savedLocation) {
//       try {
//         const parsed = JSON.parse(savedLocation);
//         setLocation({
//           ...parsed,
//           displayStreet: parsed.street || parsed.locationName || parsed.city || 'Location',
//           method: 'saved'
//         });
//         setLocationSet(true);
//         setLoading(false);
//         console.log('✅ Location loaded from localStorage');
//         return; // ✅ Exit - don't detect again
//       } catch (e) {
//         console.log('⚠️ Error parsing saved location:', e);
//       }
//     }
    
//     // ✅ Only detect if not already attempted
//     if (!detectionAttempted.current) {
//       detectionAttempted.current = true;
//       detectLocation();
//     }
//   }, []);

//   // ✅ Detect location - Main function
//   const detectLocation = async () => {
//     if (locationSet) {
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
//     setToastShown(false);

//     try {
//       // ✅ FIRST: Try browser geolocation (GPS) - Most accurate
//       if (navigator.geolocation) {
//         console.log('📍 Trying GPS location...');
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             const { latitude, longitude } = position.coords;
//             console.log('📍 GPS Position:', { latitude, longitude });
//             await getLocationFromCoords(latitude, longitude);
//           },
//           async (error) => {
//             console.warn('⚠️ GPS failed:', error.message);
//             console.log('📍 Falling back to IP detection...');
//             await detectLocationByIP();
//           },
//           { 
//             enableHighAccuracy: true, 
//             timeout: 15000,
//             maximumAge: 0
//           }
//         );
//       } else {
//         console.log('📍 No GPS available, using IP...');
//         await detectLocationByIP();
//       }
//     } catch (error) {
//       console.error('❌ Location detection error:', error);
//       setError('Unable to detect location');
//       setLoading(false);
//     }
//   };

//   // ✅ Get location from coordinates (GPS)
//   const getLocationFromCoords = async (lat, lng) => {
//     try {
//       console.log(`📍 Getting address from: lat=${lat}, lng=${lng}`);
      
//       const response = await apiClient.get(`/location/reverse?lat=${lat}&lng=${lng}`);
//       console.log('✅ Location data:', response.data);

//       if (response.data.success && response.data.data) {
//         const locData = response.data.data;
        
//         if (!locationSet) {
//           const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
//           setLocation({
//             latitude: lat,
//             longitude: lng,
//             ...locData,
//             displayStreet: displayStreet,
//             method: 'gps'
//           });
//           setLocationMethod('gps');
          
//           localStorage.setItem('userLocation', JSON.stringify(locData));
          
//           if (!toastShown && !locationSet) {
//             toast.success(`📍 ${displayStreet}`);
//             setToastShown(true);
//             setLocationSet(true);
//           }
//         }
//       } else {
//         throw new Error(response.data.message || 'No location data');
//       }
//     } catch (error) {
//       console.error('❌ Geocoding error:', error);
//       await detectLocationByIP();
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Detect by IP (Fallback)
//   const detectLocationByIP = async () => {
//     try {
//       console.log('📍 Detecting via IP...');
      
//       const response = await apiClient.get('/location/detect');
//       console.log('📍 IP Location:', response.data);

//       if (response.data.success && response.data.data) {
//         if (!locationSet) {
//           const locData = response.data.data;
//           const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
//           setLocation({
//             ...locData,
//             displayStreet: displayStreet,
//             method: 'ip'
//           });
//           setLocationMethod('ip');
          
//           localStorage.setItem('userLocation', JSON.stringify(locData));
          
//           if (!toastShown && !locationSet) {
//             toast.warning(`📍 ${displayStreet} (IP based)`);
//             setToastShown(true);
//             setLocationSet(true);
//           }
//         }
//       } else {
//         setError('Could not detect location');
//       }
//     } catch (error) {
//       console.error('❌ IP location error:', error);
//       setError('Location detection failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Manually refresh location (user triggered)
//   const refreshLocation = () => {
//     // Clear saved location to force new detection
//     localStorage.removeItem('userLocation');
//     setLocationSet(false);
//     detectionAttempted.current = false;
//     setToastShown(false);
//     detectLocation();
//   };

//   // ✅ Get display street name
//   const getStreetName = () => {
//     if (!location) return 'Select Location';
//     return location.displayStreet || location.street || location.city || location.formattedAddress || 'Unknown Location';
//   };

//   // ✅ Get display city/state
//   const getCityState = () => {
//     if (!location) return '';
//     const parts = [];
//     if (location.city) parts.push(location.city);
//     if (location.state) parts.push(location.state);
//     if (location.country) parts.push(location.country);
//     return parts.join(', ');
//   };

//   // ✅ Show method badge
//   const getMethodBadge = () => {
//     if (!location) return null;
//     const method = location.method || 'unknown';
//     const badges = {
//       'gps': { label: 'GPS', color: 'text-green-400 bg-green-500/20' },
//       'ip': { label: 'IP', color: 'text-yellow-400 bg-yellow-500/20' },
//       'saved': { label: 'Saved', color: 'text-purple-400 bg-purple-500/20' },
//     };
//     return badges[method] || badges['ip'];
//   };

//   // ✅ Loading state
//   if (loading) {
//     return (
//       <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg animate-pulse">
//         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
//         <span className="text-xs sm:text-sm text-purple-300">Detecting...</span>
//         <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
//       </div>
//     );
//   }

//   // ✅ Error state
//   if (error) {
//     return (
//       <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500/10 rounded-lg border border-red-500/20">
//         <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
//         <span className="text-xs sm:text-sm text-red-300 truncate max-w-[80px] sm:max-w-none">{error}</span>
//         <button
//           onClick={refreshLocation}
//           className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition flex-shrink-0"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // ✅ Main render - Location Only (No Dropdown)
//   return (
//     <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all group w-full sm:w-auto">
//       <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
      
//       <div className="text-left min-w-0 flex-1">
//         <div className="text-[10px] sm:text-xs text-purple-400/70 leading-none">
//           {t('delivering_to') || 'Delivering to'}
//         </div>
//         <div className="text-xs sm:text-sm font-semibold text-purple-200 truncate max-w-[80px] sm:max-w-[120px] md:max-w-[180px]">
//           {getStreetName()}
//         </div>
//         {location?.city && (
//           <div className="text-[8px] sm:text-[10px] text-purple-400/50 truncate">
//             {location.city}{location.state ? `, ${location.state}` : ''}
//           </div>
//         )}
//       </div>

//       {/* ✅ Method Badge */}
//       {(() => {
//         const badge = getMethodBadge();
//         return badge ? (
//           <span className={`text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded ${badge.color} flex-shrink-0 hidden xs:inline-block`}>
//             {badge.label}
//           </span>
//         ) : null;
//       })()}

//       {/* ✅ Refresh Button */}
//       <button
//         onClick={refreshLocation}
//         className="p-0.5 hover:bg-purple-500/10 rounded transition flex-shrink-0"
//         aria-label="Refresh location"
//         title="Refresh location"
//       >
//         <ArrowPathIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400/50 hover:text-purple-300 transition" />
//       </button>
//     </div>
//   );
// };

// export default LocationDisplay;
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPinIcon, 
  ArrowPathIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import apiClient from '../../lib/apiClient';
import { useApp } from '../../providers/AppProvider';

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationSet, setLocationSet] = useState(false);
  const [locationMethod, setLocationMethod] = useState('unknown');
  const [permissionState, setPermissionState] = useState('prompt');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [manualLocation, setManualLocation] = useState('');
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  
  const { t } = useApp();
  const detectionAttempted = useRef(false);
  const detectionStartTime = useRef(null);

  // ✅ Indian cities for quick selection
  const INDIAN_CITIES = [
    'New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 
    'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad',
    'Jaipur', 'Lucknow', 'Nagpur', 'Indore'
  ];

  // ✅ Check permission and detect location
  useEffect(() => {
    const initLocation = async () => {
      // Check for saved location first
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        try {
          const parsed = JSON.parse(savedLocation);
          // Use if less than 30 minutes old (longer cache for better UX)
          if (parsed.timestamp && Date.now() - parsed.timestamp < 30 * 60 * 1000) {
            setLocation(parsed);
            setLocationSet(true);
            setLoading(false);
            console.log('✅ Location loaded from cache');
            return;
          }
        } catch (e) {
          console.log('Cache parse error:', e);
        }
      }

      // Check permission
      if (navigator.permissions) {
        try {
          const result = await navigator.permissions.query({ name: 'geolocation' });
          setPermissionState(result.state);
        } catch (e) {
          console.log('Permission check not supported');
        }
      }

      // Start detection
      if (!detectionAttempted.current) {
        detectionAttempted.current = true;
        detectLocation();
      }
    };

    initLocation();
  }, []);

  // ✅ Amazon-style fast location detection
  const detectLocation = async () => {
    setLoading(true);
    setError(null);
    detectionStartTime.current = Date.now();

    try {
      // ✅ STEP 1: Try IP-based detection FIRST (fastest, no permission needed)
      console.log('📍 Step 1: IP-based detection (fast)');
      const ipLocation = await detectLocationByIP();
      
      if (ipLocation && ipLocation.country === 'India') {
        console.log('✅ Location found via IP in India');
        setLocationWithCache(ipLocation, 'ip');
        setLoading(false);
        showLocationToast(ipLocation);
        return;
      }

      // ✅ STEP 2: Try GPS with short timeout (if permission granted)
      if (navigator.geolocation && permissionState !== 'denied') {
        console.log('📍 Step 2: GPS detection');
        
        const gpsLocation = await new Promise((resolve) => {
          let resolved = false;
          
          // Fast timeout - 3 seconds max for GPS
          const timeoutId = setTimeout(() => {
            if (!resolved) {
              console.log('⏱️ GPS timeout, using IP fallback');
              resolved = true;
              resolve(null);
            }
          }, 3000);

          navigator.geolocation.getCurrentPosition(
            async (position) => {
              if (!resolved) {
                resolved = true;
                clearTimeout(timeoutId);
                const { latitude, longitude } = position.coords;
                console.log('📍 GPS position:', { latitude, longitude });
                
                // Reverse geocode to get address
                const address = await getLocationFromCoords(latitude, longitude);
                resolve(address);
              }
            },
            (error) => {
              if (!resolved) {
                resolved = true;
                clearTimeout(timeoutId);
                console.log('⚠️ GPS error:', error.message);
                resolve(null);
              }
            },
            { 
              enableHighAccuracy: false, // Fast mode
              timeout: 5000,
              maximumAge: 60000
            }
          );
        });

        if (gpsLocation && gpsLocation.country === 'India') {
          console.log('✅ Location found via GPS in India');
          setLocationWithCache(gpsLocation, 'gps');
          setLoading(false);
          showLocationToast(gpsLocation);
          return;
        }
      }

      // ✅ STEP 3: Try IP again with different service (fallback)
      console.log('📍 Step 3: IP fallback detection');
      const fallbackLocation = await detectLocationByIP(true);
      
      if (fallbackLocation) {
        console.log('✅ Location found via IP fallback');
        setLocationWithCache(fallbackLocation, 'ip');
        setLoading(false);
        showLocationToast(fallbackLocation);
        return;
      }

      // ✅ STEP 4: Default to India
      console.log('📍 Step 4: Using default India location');
      const defaultLocation = {
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        countryCode: 'IN',
        displayStreet: 'New Delhi, Delhi',
        latitude: 28.6139,
        longitude: 77.2090,
        method: 'default',
        timestamp: Date.now(),
      };
      setLocationWithCache(defaultLocation, 'default');
      setLoading(false);
      showLocationToast(defaultLocation);

    } catch (error) {
      console.error('❌ Location detection error:', error);
      setError('Could not detect location');
      setLoading(false);
      
      // Default to India
      const defaultLocation = {
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        countryCode: 'IN',
        displayStreet: 'New Delhi, Delhi',
        latitude: 28.6139,
        longitude: 77.2090,
        method: 'default',
        timestamp: Date.now(),
      };
      setLocationWithCache(defaultLocation, 'default');
    }
  };

  // ✅ Get location from coordinates
  const getLocationFromCoords = async (lat, lng) => {
    try {
      const response = await apiClient.get(`/location/reverse?lat=${lat}&lng=${lng}`);
      
      if (response.data.success && response.data.data) {
        const locData = response.data.data;
        return {
          ...locData,
          displayStreet: locData.street || locData.locationName || `${locData.city}, ${locData.state}`,
          latitude: lat,
          longitude: lng,
          timestamp: Date.now(),
        };
      }
      return null;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  };

  // ✅ Enhanced IP detection (with multiple services)
  const detectLocationByIP = async (forceRefresh = false) => {
    try {
      // Try multiple IP services for better accuracy
      const ipServices = [
        'https://ipapi.co/json/',
        'https://ip-api.com/json/',
        'https://freegeoip.app/json/',
        'https://ipinfo.io/json',
      ];

      for (const url of ipServices) {
        try {
          const response = await fetch(url, {
            signal: AbortSignal.timeout(2000),
          });
          
          if (!response.ok) continue;
          
          const data = await response.json();
          
          // Parse different API responses
          let location = null;
          
          if (url.includes('ipapi.co')) {
            location = {
              city: data.city || '',
              state: data.region || '',
              country: data.country_name || data.country || '',
              countryCode: data.country_code || '',
              latitude: data.latitude || 0,
              longitude: data.longitude || 0,
              postal: data.postal || '',
              timezone: data.timezone || '',
            };
          } else if (url.includes('ip-api.com')) {
            location = {
              city: data.city || '',
              state: data.regionName || '',
              country: data.country || '',
              countryCode: data.countryCode || '',
              latitude: data.lat || 0,
              longitude: data.lon || 0,
              postal: data.zip || '',
              timezone: data.timezone || '',
            };
          } else if (url.includes('freegeoip.app')) {
            location = {
              city: data.city || '',
              state: data.region_name || '',
              country: data.country_name || '',
              countryCode: data.country_code || '',
              latitude: data.latitude || 0,
              longitude: data.longitude || 0,
              postal: data.zip_code || '',
              timezone: data.time_zone || '',
            };
          } else if (url.includes('ipinfo.io')) {
            const [lat, lng] = (data.loc || '0,0').split(',').map(Number);
            location = {
              city: data.city || '',
              state: data.region || '',
              country: data.country || '',
              countryCode: data.country || '',
              latitude: lat || 0,
              longitude: lng || 0,
              postal: data.postal || '',
              timezone: data.timezone || '',
            };
          }

          if (location && location.city && location.country) {
            // Ensure it's India (or use as is)
            const displayStreet = `${location.city}${location.state ? `, ${location.state}` : ''}`;
            
            // If not in India, try to find nearest Indian city
            if (location.country !== 'India' && location.country !== 'IN') {
              console.log('📍 Not in India, defaulting to New Delhi');
              return {
                city: 'New Delhi',
                state: 'Delhi',
                country: 'India',
                countryCode: 'IN',
                displayStreet: 'New Delhi, Delhi',
                latitude: 28.6139,
                longitude: 77.2090,
                timestamp: Date.now(),
              };
            }

            return {
              ...location,
              displayStreet: displayStreet,
              timestamp: Date.now(),
            };
          }
        } catch (e) {
          console.log(`IP service failed: ${url}`);
          continue;
        }
      }

      return null;
    } catch (error) {
      console.error('IP detection error:', error);
      return null;
    }
  };

  // ✅ Set location with cache
  const setLocationWithCache = (locationData, method) => {
    const locWithMeta = {
      ...locationData,
      method: method,
      timestamp: Date.now(),
    };
    setLocation(locWithMeta);
    setLocationMethod(method);
    setLocationSet(true);
    localStorage.setItem('userLocation', JSON.stringify(locWithMeta));
  };

  // ✅ Show toast notification
  const showLocationToast = (location) => {
    const message = `📍 ${location.displayStreet || location.city}`;
    toast.success(message, {
      duration: 3000,
      icon: '📍',
    });
  };

  // ✅ Refresh location
  const refreshLocation = () => {
    localStorage.removeItem('userLocation');
    setLocationSet(false);
    detectionAttempted.current = false;
    setLoading(true);
    detectLocation();
  };

  // ✅ Manual location selection
  const handleManualLocationSelect = (city) => {
    const locationData = {
      city: city,
      state: getStateForCity(city),
      country: 'India',
      countryCode: 'IN',
      displayStreet: `${city}, ${getStateForCity(city)}`,
      latitude: getLatLngForCity(city).lat,
      longitude: getLatLngForCity(city).lng,
      method: 'manual',
      timestamp: Date.now(),
    };
    setLocationWithCache(locationData, 'manual');
    setShowLocationModal(false);
    toast.success(`📍 ${locationData.displayStreet}`);
  };

  // ✅ Helper functions for Indian cities
  const getStateForCity = (city) => {
    const states = {
      'New Delhi': 'Delhi',
      'Mumbai': 'Maharashtra',
      'Bangalore': 'Karnataka',
      'Chennai': 'Tamil Nadu',
      'Hyderabad': 'Telangana',
      'Kolkata': 'West Bengal',
      'Pune': 'Maharashtra',
      'Ahmedabad': 'Gujarat',
      'Jaipur': 'Rajasthan',
      'Lucknow': 'Uttar Pradesh',
      'Nagpur': 'Maharashtra',
      'Indore': 'Madhya Pradesh',
    };
    return states[city] || '';
  };

  const getLatLngForCity = (city) => {
    const coords = {
      'New Delhi': { lat: 28.6139, lng: 77.2090 },
      'Mumbai': { lat: 19.0760, lng: 72.8777 },
      'Bangalore': { lat: 12.9716, lng: 77.5946 },
      'Chennai': { lat: 13.0827, lng: 80.2707 },
      'Hyderabad': { lat: 17.3850, lng: 78.4867 },
      'Kolkata': { lat: 22.5726, lng: 88.3639 },
      'Pune': { lat: 18.5204, lng: 73.8567 },
      'Ahmedabad': { lat: 23.0225, lng: 72.5714 },
      'Jaipur': { lat: 26.9124, lng: 75.7873 },
      'Lucknow': { lat: 26.8467, lng: 80.9462 },
      'Nagpur': { lat: 21.1458, lng: 79.0882 },
      'Indore': { lat: 22.7196, lng: 75.8577 },
    };
    return coords[city] || { lat: 28.6139, lng: 77.2090 };
  };

  // ✅ Get display name
  const getDisplayName = () => {
    if (!location) return 'Select Location';
    return location.displayStreet || location.city || 'Unknown';
  };

  // ✅ Loading state
  if (loading) {
    const elapsed = detectionStartTime.current ? Date.now() - detectionStartTime.current : 0;
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 rounded-lg animate-pulse">
        <MapPinIcon className="w-5 h-5 text-purple-400" />
        <span className="text-sm text-purple-300">
          {elapsed > 2000 ? 'Locating...' : 'Detecting location...'}
        </span>
        <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 rounded-lg border border-red-500/20">
        <MapPinIcon className="w-5 h-5 text-red-400" />
        <span className="text-sm text-red-300 truncate">{error}</span>
        <button
          onClick={refreshLocation}
          className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded hover:bg-red-500/30"
        >
          Retry
        </button>
      </div>
    );
  }

  // ✅ Main render - Amazon style
  return (
    <>
      <div 
        className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group"
        onClick={() => setShowLocationModal(!showLocationModal)}
      >
        <MapPinIcon className="w-5 h-5 text-purple-400 flex-shrink-0" />
        
        <div className="text-left min-w-0">
          <div className="text-xs text-purple-400/70 leading-none">
            {t('delivering_to') || 'Delivering to'}
          </div>
          <div className="text-sm font-semibold text-purple-200 truncate max-w-[120px] md:max-w-[180px]">
            {getDisplayName()}
          </div>
        </div>

        <ChevronDownIcon className="w-4 h-4 text-purple-400/50 flex-shrink-0" />
        
        {locationMethod !== 'default' && (
          <span className="text-[8px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 flex-shrink-0 hidden xs:inline-block">
            {locationMethod.toUpperCase()}
          </span>
        )}
      </div>

      {/* ✅ Location Modal - Amazon Style */}
      {showLocationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">Choose your location</h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Search for a city..."
                value={manualLocation}
                onChange={(e) => setManualLocation(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {/* Suggested locations */}
              <div className="text-xs text-gray-400 mb-2">Popular Cities</div>
              <div className="grid grid-cols-2 gap-2">
                {INDIAN_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleManualLocationSelect(city)}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition text-left"
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Current location option */}
              <button
                onClick={() => {
                  setShowLocationModal(false);
                  refreshLocation();
                }}
                className="w-full px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-300 text-sm transition mt-2"
              >
                📍 Use current location
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="text-xs text-gray-500">
                Location: {location?.city}, {location?.country}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Method: {locationMethod.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationDisplay;