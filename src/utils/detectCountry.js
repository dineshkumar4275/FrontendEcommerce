// src/utils/detectCountry.js
import { countries } from '../data/countries';

export const detectCountry = () => {
  try {
    // Try to detect from browser locale
    const locale = navigator.language || navigator.languages?.[0] || 'en-US';
    const parts = locale.split('-');
    
    // Map browser locale to country code
    const countryCode = parts.length > 1 ? parts[1].toUpperCase() : null;
    
    // Check if country exists in our list
    if (countryCode && countries.find(c => c.code === countryCode)) {
      return countryCode;
    }
    
    // Try to detect from timezone
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Simple mapping (in production, use a proper timezone-to-country mapping)
      const tzMap = {
        'Asia/Kolkata': 'IN',
        'America/New_York': 'US',
        'America/Los_Angeles': 'US',
        'Europe/London': 'GB',
        'Europe/Paris': 'FR',
        'Europe/Berlin': 'DE',
        'Asia/Dubai': 'AE',
        'Asia/Singapore': 'SG',
        'Asia/Tokyo': 'JP',
        'Australia/Sydney': 'AU',
      };
      
      const tzCountry = tzMap[timezone];
      if (tzCountry && countries.find(c => c.code === tzCountry)) {
        return tzCountry;
      }
    } catch {
      // Ignore timezone detection errors
    }
    
    // Default to India
    return 'IN';
  } catch {
    return 'IN';
  }
};

export const getCountryByCode = (code) => {
  return countries.find(c => c.code === code) || null;
};

export const getCountryByCurrency = (currencyCode) => {
  return countries.find(c => c.currency === currencyCode) || null;
};

export default detectCountry;