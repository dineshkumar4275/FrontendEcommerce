// context/LocationContext.jsx

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹' });
  const [language, setLanguage] = useState({ code: 'en', name: 'English', flag: '🇬🇧' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved preferences
    const savedLocation = localStorage.getItem('userLocation');
    const savedCurrency = localStorage.getItem('selectedCurrency');
    const savedLanguage = localStorage.getItem('selectedLanguage');

    if (savedLocation) {
      try {
        setLocation(JSON.parse(savedLocation));
      } catch (e) {}
    }

    if (savedCurrency) {
      try {
        setCurrency(JSON.parse(savedCurrency));
      } catch (e) {}
    }

    if (savedLanguage) {
      try {
        setLanguage(JSON.parse(savedLanguage));
      } catch (e) {}
    }

    setLoading(false);

    // Listen for events
    const handleCurrencyChange = (event) => {
      setCurrency(event.detail.currency);
    };

    const handleLanguageChange = (event) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('currencyChange', handleCurrencyChange);
    window.addEventListener('languageChange', handleLanguageChange);

    return () => {
      window.removeEventListener('currencyChange', handleCurrencyChange);
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    localStorage.setItem('userLocation', JSON.stringify(newLocation));
  };

  return (
    <LocationContext.Provider value={{
      location,
      currency,
      language,
      loading,
      updateLocation,
      setCurrency,
      setLanguage
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within LocationProvider');
  }
  return context;
};