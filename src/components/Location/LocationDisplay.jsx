// src/components/Location/LocationDisplay.jsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPinIcon, 
  ChevronDownIcon, 
  ArrowPathIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { MapPinIcon as MapPinSolid } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('location');
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  
  const [toastShown, setToastShown] = useState(false);
  const [locationSet, setLocationSet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    detectLocation();
    loadSavedPreferences();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showDropdown && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 300);
    }
  }, [showDropdown]);

  const loadSavedPreferences = () => {
    const savedCurrency = localStorage.getItem('selectedCurrency');
    const savedLanguage = localStorage.getItem('selectedLanguage');
    
    if (savedCurrency) {
      try {
        setSelectedCurrency(JSON.parse(savedCurrency));
      } catch (e) {}
    }
    
    if (savedLanguage) {
      try {
        setSelectedLanguage(JSON.parse(savedLanguage));
      } catch (e) {}
    }
  };

  // ✅ Detect location - Main function
  const detectLocation = async () => {
    if (locationSet && !toastShown) {
      return;
    }
    
    setLoading(true);
    setError(null);
    setToastShown(false);

    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log('📍 GPS Position:', { latitude, longitude });
            await getLocationFromCoords(latitude, longitude);
          },
          async (error) => {
            console.warn('⚠️ GPS failed:', error.message);
            await detectLocationByIP();
          },
          { 
            enableHighAccuracy: true, 
            timeout: 15000,
            maximumAge: 0
          }
        );
      } else {
        await detectLocationByIP();
      }
    } catch (error) {
      console.error('❌ Location detection error:', error);
      setError('Unable to detect location');
      setLoading(false);
    }
  };

  // ✅ Get location from coordinates
  const getLocationFromCoords = async (lat, lng) => {
    try {
      console.log(`📍 Getting address from: lat=${lat}, lng=${lng}`);
      
      const url = `${API_URL}/location/reverse?lat=${lat}&lng=${lng}`;
      console.log('📤 Request URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Error response:', errorData);
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Location data:', data);

      if (data.success && data.data) {
        const locData = data.data;
        
        if (!locationSet) {
          const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
          setLocation({
            latitude: lat,
            longitude: lng,
            ...locData,
            displayStreet: displayStreet,
            method: 'browser'
          });
          
          localStorage.setItem('userLocation', JSON.stringify(locData));
          updateCurrenciesAndLanguages(locData);
          
          if (!toastShown && !locationSet) {
            toast.success(`📍 ${displayStreet} found`);
            setToastShown(true);
            setLocationSet(true);
          }
        }
      } else {
        throw new Error(data.message || 'No location data');
      }
    } catch (error) {
      console.error('❌ Geocoding error:', error);
      await detectLocationByIP();
    } finally {
      setLoading(false);
    }
  };

  // ✅ Detect by IP
  const detectLocationByIP = async () => {
    try {
      console.log('📍 Detecting via IP...');
      const response = await fetch(`${API_URL}/location/detect`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📍 IP Location:', data);

      if (data.success && data.data) {
        if (!locationSet) {
          const locData = data.data;
          const displayStreet = locData.street || locData.locationName || locData.city || 'Location';
          
          setLocation({
            ...locData,
            displayStreet: displayStreet,
            method: 'ip'
          });
          
          updateCurrenciesAndLanguages(locData);
          localStorage.setItem('userLocation', JSON.stringify(locData));
          
          if (!toastShown && !locationSet) {
            toast.success(`📍 ${displayStreet} detected`);
            setToastShown(true);
            setLocationSet(true);
          }
        }
      } else {
        setError('Could not detect location');
      }
    } catch (error) {
      console.error('❌ IP location error:', error);
      setError('Location detection failed');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update currencies and languages
  const updateCurrenciesAndLanguages = (locationData) => {
    const currencyMap = {
      'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
      'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
      'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
      'AE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
      'SA': { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal' },
      'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
      'MY': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
      'AU': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
      'CA': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
      'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
      'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
      'JP': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
      'CN': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
      'BR': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
      'RU': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
      'ZA': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
      'NZ': { code: 'NZD', symbol: '$', name: 'New Zealand Dollar' },
    };

    const countryCode = locationData.countryCode || 'US';
    const defaultCurrency = currencyMap[countryCode] || currencyMap['US'];
    
    const allCurrencies = Object.values(currencyMap).reduce((acc, curr) => {
      if (!acc.find(c => c.code === curr.code)) {
        acc.push(curr);
      }
      return acc;
    }, []);

    setCurrencies(allCurrencies);
    
    if (!selectedCurrency) {
      setSelectedCurrency(defaultCurrency);
      localStorage.setItem('selectedCurrency', JSON.stringify(defaultCurrency));
    }

    const languageMap = {
      'IN': [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
        { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
        { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
        { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
      ],
      'US': [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
      ],
      'AE': [
        { code: 'ar', name: 'العربية', flag: '🇦🇪' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
      ],
      'DE': [
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
      ],
      'FR': [
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
      ],
      'JP': [
        { code: 'ja', name: '日本語', flag: '🇯🇵' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
      ],
    };

    const countryLanguages = languageMap[countryCode] || languageMap['US'];
    setLanguages(countryLanguages);
    
    if (!selectedLanguage) {
      setSelectedLanguage(countryLanguages[0]);
      localStorage.setItem('selectedLanguage', JSON.stringify(countryLanguages[0]));
    }
  };

  // ✅ Search location with debounce
  const searchLocation = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setSearching(true);
    try {
      const response = await fetch(
        `${API_URL}/location/search/${encodeURIComponent(query)}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('🔍 Search results:', data);
      
      if (data.success) {
        setSearchResults(data.data || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  // ✅ Handle search with debounce
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (query.length >= 2) {
      // Debounce search to avoid too many requests
      searchTimeoutRef.current = setTimeout(() => {
        searchLocation(query);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  // ✅ Select location from search
  const selectLocation = (result) => {
    setToastShown(false);
    setLocationSet(true);
    
    const displayStreet = result.street || result.name || result.displayName?.split(',')[0] || 'Location';
    
    setLocation({
      ...location,
      street: result.street || result.name || null,
      displayStreet: displayStreet,
      city: result.city || '',
      state: result.state || '',
      country: result.country || '',
      latitude: result.lat,
      longitude: result.lon,
      fullAddress: result.fullAddress || result.displayName,
      method: 'search'
    });
    setShowDropdown(false);
    setSearchQuery('');
    setSearchResults([]);
    
    toast.success(`📍 ${displayStreet} selected`);
  };

  // ✅ Handle currency change
  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', JSON.stringify(currency));
    
    window.dispatchEvent(new CustomEvent('currencyChange', {
      detail: { currency }
    }));
    
    toast.success(`Currency changed to ${currency.symbol} ${currency.code}`);
    setShowDropdown(false);
  };

  // ✅ Handle language change
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', JSON.stringify(language));
    
    window.dispatchEvent(new CustomEvent('languageChange', {
      detail: { language }
    }));
    
    toast.success(`Language changed to ${language.name}`);
    setShowDropdown(false);
  };

  // ✅ Get display street name
  const getStreetName = () => {
    if (!location) return 'Select Location';
    return location.displayStreet || location.street || location.city || location.formattedAddress || 'Unknown Location';
  };

  // ✅ Get display city/state
  const getCityState = () => {
    if (!location) return '';
    const parts = [];
    if (location.city) parts.push(location.city);
    if (location.state) parts.push(location.state);
    if (location.country) parts.push(location.country);
    return parts.join(', ');
  };

  // ✅ Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // ✅ Toggle dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      setTimeout(() => {
        if (dropdownRef.current) {
          dropdownRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg animate-pulse">
        <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
        <span className="text-xs sm:text-sm text-purple-300">Detecting...</span>
        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-red-500/10 rounded-lg border border-red-500/20">
        <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
        <span className="text-xs sm:text-sm text-red-300 truncate max-w-[80px] sm:max-w-none">{error}</span>
        <button
          onClick={detectLocation}
          className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition flex-shrink-0"
        >
          Retry
        </button>
      </div>
    );
  }

  // ✅ Main render
  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      {/* Main Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all hover:bg-purple-500/15 group w-full sm:w-auto"
        aria-label="Select location"
      >
        <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 group-hover:text-purple-300 flex-shrink-0" />
        <div className="text-left min-w-0 flex-1">
          <div className="text-[10px] sm:text-xs text-purple-400/70 leading-none">Delivering to</div>
          <div className="text-xs sm:text-sm font-semibold text-purple-200 truncate max-w-[80px] sm:max-w-[120px] md:max-w-[180px]">
            {getStreetName()}
          </div>
        </div>
        <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-purple-400 transition-transform flex-shrink-0 ${showDropdown ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Mobile Overlay */}
          {isMobile && (
            <div 
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setShowDropdown(false)}
            />
          )}
          
          <div className={`
            ${isMobile 
              ? 'fixed bottom-0 left-0 right-0 rounded-t-2xl max-h-[85vh] w-full z-50' 
              : 'absolute right-0 mt-2 w-[380px] sm:w-[440px] z-50'
            } 
            bg-slate-800 shadow-2xl border border-purple-500/30 overflow-hidden transition-all duration-300
          `}>
            {/* Mobile Drag Handle */}
            {isMobile && (
              <div className="flex justify-center py-2">
                <div className="w-12 h-1 bg-purple-500/30 rounded-full" />
              </div>
            )}

            {/* Header */}
            <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 border-b border-purple-500/30 flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <MapPinSolid className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <h3 className="text-sm sm:text-base font-bold text-purple-200">Your Location</h3>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={detectLocation}
                  className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition"
                >
                  <ArrowPathIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Update</span>
                </button>
                {isMobile && (
                  <button
                    onClick={() => setShowDropdown(false)}
                    className="p-1 hover:bg-purple-500/10 rounded-lg transition"
                  >
                    <XMarkIcon className="w-5 h-5 text-purple-400" />
                  </button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-purple-500/20 overflow-x-auto scrollbar-hide">
              {[
                { id: 'location', label: 'Location', icon: MapPinIcon },
                { id: 'currency', label: 'Currency', icon: CurrencyDollarIcon },
                { id: 'language', label: 'Language', icon: LanguageIcon },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 text-[10px] sm:text-xs font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-purple-200 border-b-2 border-purple-500 bg-purple-500/5'
                      : 'text-purple-400 hover:text-purple-300'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className={`${isMobile ? 'max-h-[60vh]' : 'max-h-[400px]'} overflow-y-auto`}>
              {/* Location Tab */}
              {activeTab === 'location' && (
                <div>
                  {/* Current Location */}
                  {location && (
                    <div className="px-3 sm:px-4 py-2.5 sm:py-3 bg-purple-500/5 border-b border-purple-500/20">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-purple-200 truncate">{getStreetName()}</p>
                          <p className="text-[10px] sm:text-xs text-purple-400 truncate">{getCityState()}</p>
                          {location.fullAddress && (
                            <p className="text-[10px] sm:text-xs text-purple-400/60 truncate mt-0.5 hidden sm:block">{location.fullAddress}</p>
                          )}
                          {location.latitude && location.longitude && (
                            <p className="text-[8px] sm:text-[10px] text-purple-400/40 mt-0.5">
                              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                            </p>
                          )}
                        </div>
                        <span className="text-[8px] sm:text-[10px] bg-green-500/20 text-green-400 px-1.5 sm:px-2 py-0.5 rounded flex-shrink-0">
                          {location.method === 'browser' ? 'GPS' : 'IP'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Search Input */}
                  <div className="p-3 border-b border-purple-500/20">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-2.5 sm:left-3 top-2.5 w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400/50" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search for a location..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full pl-8 sm:pl-9 pr-7 sm:pr-8 py-1.5 sm:py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-purple-200 text-xs sm:text-sm placeholder:text-purple-400/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="absolute right-2 sm:right-3 top-2 text-purple-400/50 hover:text-purple-300 transition"
                        >
                          <XMarkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      )}
                      {searching && (
                        <div className="absolute right-2 sm:right-3 top-2">
                          <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-purple-500 border-t-transparent" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="max-h-40 sm:max-h-48 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => selectLocation(result)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left hover:bg-purple-500/10 transition flex items-start gap-2 sm:gap-3"
                        >
                          <MapPinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs sm:text-sm text-purple-200 truncate">
                              {result.street || result.name || result.displayName?.split(',')[0] || 'Unknown'}
                            </p>
                            <p className="text-[10px] sm:text-xs text-purple-400 truncate">
                              {result.city || result.state || result.country || result.displayName}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* No Results */}
                  {searchQuery.length >= 2 && searchResults.length === 0 && !searching && (
                    <div className="px-4 py-6 text-center">
                      <MapPinIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400/30 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-purple-400">No locations found</p>
                      <p className="text-[10px] sm:text-xs text-purple-400/60 mt-1">
                        Try searching by area name (e.g., "Ramapuram", "Chennai")
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="px-2 sm:px-3 py-2 border-t border-purple-500/20 bg-slate-800/50 flex gap-1.5 sm:gap-2">
                    <button
                      onClick={detectLocation}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition py-1.5 sm:py-2 px-1.5 sm:px-2 bg-purple-500/10 rounded-lg"
                    >
                      <ArrowPathIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>Auto-detect</span>
                    </button>
                    <button
                      onClick={() => {
                        if (location?.latitude && location?.longitude) {
                          window.open(
                            `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}&zoom=15`,
                            '_blank'
                          );
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 text-center text-[10px] sm:text-xs text-purple-400 hover:text-purple-200 transition py-1.5 sm:py-2 px-1.5 sm:px-2 bg-purple-500/10 rounded-lg"
                    >
                      <MapPinIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      <span>View Map</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Currency Tab */}
              {activeTab === 'currency' && (
                <div className="p-3">
                  <p className="text-[10px] sm:text-xs text-purple-400/70 mb-3">Select your preferred currency</p>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => handleCurrencyChange(currency)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
                          selectedCurrency?.code === currency.code
                            ? 'bg-purple-600 text-white'
                            : 'text-purple-300/80 hover:bg-purple-500/10'
                        }`}
                      >
                        <span className="text-base sm:text-lg font-medium">{currency.symbol}</span>
                        <span className="text-[10px] sm:text-xs">{currency.code}</span>
                        {selectedCurrency?.code === currency.code && (
                          <span className="ml-auto text-[10px] sm:text-xs text-purple-300">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  {selectedCurrency && (
                    <div className="mt-3 p-2 bg-purple-500/10 rounded-lg">
                      <p className="text-[10px] sm:text-xs text-purple-400/70">
                        Current: <span className="text-purple-200 font-semibold">
                          {selectedCurrency.symbol} {selectedCurrency.code} - {selectedCurrency.name}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Language Tab */}
              {activeTab === 'language' && (
                <div className="p-3">
                  <p className="text-[10px] sm:text-xs text-purple-400/70 mb-3">Select your preferred language</p>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language)}
                        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-all ${
                          selectedLanguage?.code === language.code
                            ? 'bg-purple-600 text-white'
                            : 'text-purple-300/80 hover:bg-purple-500/10'
                        }`}
                      >
                        <span className="text-base sm:text-lg">{language.flag}</span>
                        <span className="text-[10px] sm:text-xs truncate">{language.name}</span>
                        {selectedLanguage?.code === language.code && (
                          <span className="ml-auto text-[10px] sm:text-xs text-purple-300">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                  {selectedLanguage && (
                    <div className="mt-3 p-2 bg-purple-500/10 rounded-lg">
                      <p className="text-[10px] sm:text-xs text-purple-400/70">
                        Current: <span className="text-purple-200 font-semibold">
                          {selectedLanguage.flag} {selectedLanguage.name}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Close Button - Mobile Only */}
            {isMobile && (
              <button
                onClick={() => setShowDropdown(false)}
                className="w-full py-3 text-xs text-purple-400 hover:bg-slate-700/50 transition border-t border-purple-500/20 font-medium"
              >
                Close
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LocationDisplay;