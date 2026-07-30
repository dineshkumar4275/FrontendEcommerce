// src/providers/AppProvider.jsx
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { AppContext } from '../context/AppContext';
import { storage, STORAGE_KEYS } from '../lib/storage';
// import { convertCurrency, formatCurrency, getExchangeRate } from '../lib/currency';
import {convertCurrency ,formatCurrency,getExchangeRate} from '../lib/currency'
import { translate } from '../lib/translate';
import { detectCountry } from '../utils/detectCountry';
import { detectLanguage } from '../utils/detectLanguage';
import { countries } from '../data/countries';
import { currencies } from '../data/currencies';
import { languages } from '../data/languages';
import { format } from 'path';

export const AppProvider = ({ children }) => {
  // Initialize with stored values or detected values
  const [country, setCountry] = useState(() => {
    const stored = storage.get(STORAGE_KEYS.COUNTRY);
    if (stored && countries.find(c => c.code === stored)) {
      return stored;
    }
    return detectCountry();
  });

  const [currency, setCurrency] = useState(() => {
    const stored = storage.get(STORAGE_KEYS.CURRENCY);
    if (stored && currencies.find(c => c.code === stored)) {
      return stored;
    }
    // Get currency from country
    const countryData = countries.find(c => c.code === country);
    return countryData?.currency || 'INR';
  });

  const [language, setLanguage] = useState(() => {
    const stored = storage.get(STORAGE_KEYS.LANGUAGE);
    if (stored && languages.find(l => l.code === stored)) {
      return stored;
    }
    return detectLanguage();
  });

  const [theme, setTheme] = useState(() => {
    return storage.get(STORAGE_KEYS.THEME, 'light');
  });

  const [exchangeRates, setExchangeRates] = useState({});

  // Save to localStorage whenever values change
  useEffect(() => {
    storage.set(STORAGE_KEYS.COUNTRY, country);
  }, [country]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.CURRENCY, currency);
  }, [currency]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.LANGUAGE, language);
  }, [language]);

  useEffect(() => {
    storage.set(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Set document direction based on language
  useEffect(() => {
    const langData = languages.find(l => l.code === language);
    if (langData) {
      document.documentElement.dir = langData.direction || 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Mock rates for demo
        setExchangeRates({
          USD: 0.012,
          EUR: 0.011,
          GBP: 0.0095,
          JPY: 1.8,
          CNY: 0.087,
          AED: 0.044,
          SAR: 0.045,
          SGD: 0.016,
          MYR: 0.056,
          THB: 0.42,
          VND: 300,
          IDR: 190,
          PHP: 0.68,
          PKR: 3.3,
          BDT: 1.3,
          LKR: 3.7,
          NPR: 1.6,
          MAD: 0.12,
          ZAR: 0.22,
          NGN: 10,
          KES: 1.6,
          RSD: 1.3,
          TRY: 0.38,
          RUB: 1.1,
          UAH: 0.48,
          BRL: 0.065,
          ARS: 11,
          CLP: 11.5,
          COP: 48,
          PEN: 0.045,
          MXN: 0.21,
          CAD: 0.017,
          AUD: 0.019,
          NZD: 0.02,
          CHF: 0.011,
          SEK: 0.13,
          NOK: 0.13,
          DKK: 0.084,
          PLN: 0.048,
          CZK: 0.28,
          HUF: 4.6,
          RON: 0.055,
          BGN: 0.022,
          HRK: 0.085,
          ISK: 1.65,
          ILS: 0.044,
          KWD: 0.0037,
          BHD: 0.0045,
          OMR: 0.0046,
          QAR: 0.044,
          JOD: 0.0085,
          LBP: 18,
          SYP: 3000,
          IQD: 16,
          IRR: 500,
          AFN: 1.05,
          PKR: 3.3,
        });
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
      }
    };
    
    fetchRates();
  }, []);

  const formatPrice = useCallback((amount, currencyCode = null) => {
    const targetCurrency = currencyCode || currency;
    const converted = convertCurrency(amount, 'INR', targetCurrency);
    return formatCurrency(converted, targetCurrency, language);
  }, [currency, language]);

  const convertPrice = useCallback((amount, fromCurrency = 'INR', toCurrency = null) => {
    const targetCurrency = toCurrency || currency;
    return convertCurrency(amount, fromCurrency, targetCurrency);
  }, [currency]);

  const getRate = useCallback((fromCurrency, toCurrency = null) => {
    const targetCurrency = toCurrency || currency;
    return getExchangeRate(fromCurrency, targetCurrency);
  }, [currency]);

  const t = useCallback((key, params = {}) => {
    return translate(key, language, params);
  }, [language]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const value = useMemo(() => ({
    // State
    country,
    currency,
    language,
    theme,
    exchangeRates,
    
    // Setters
    setCountry,
    setCurrency,
    setLanguage,
    setTheme,
    toggleTheme,
    
    // Helper functions
    formatPrice,
    convertPrice,
    getRate,
    t,
  }), [
    country,
    currency,
    language,
    theme,
    exchangeRates,
    formatPrice,
    convertPrice,
    getRate,
    t,
    toggleTheme,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;