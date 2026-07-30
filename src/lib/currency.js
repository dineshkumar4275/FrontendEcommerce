// src/lib/currency.js
import { currencies } from '../data/currencies';

// Base currency is INR
const BASE_CURRENCY = 'INR';

// Exchange rates (mock - in production, fetch from API)
const exchangeRates = {
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
};

/**
 * Get exchange rate between two currencies
 * @param {string} fromCurrency - Source currency code (e.g., 'USD')
 * @param {string} toCurrency - Target currency code (e.g., 'INR')
 * @returns {number} Exchange rate
 */
export const getExchangeRate = (fromCurrency, toCurrency = 'INR') => {
  if (fromCurrency === toCurrency) return 1;
  
  // If from is INR, get direct rate
  if (fromCurrency === 'INR') {
    return exchangeRates[toCurrency] || 1;
  }
  
  // If to is INR, get inverse rate
  if (toCurrency === 'INR') {
    const rate = exchangeRates[fromCurrency];
    return rate ? 1 / rate : 1;
  }
  
  // Convert via INR
  const fromRate = exchangeRates[fromCurrency];
  const toRate = exchangeRates[toCurrency];
  
  if (!fromRate || !toRate) return 1;
  
  return toRate / fromRate;
};

/**
 * Convert amount from one currency to another
 * @param {number} amount - Amount to convert
 * @param {string} fromCurrency - Source currency code
 * @param {string} toCurrency - Target currency code (default: 'INR')
 * @returns {number} Converted amount
 */
export const convertCurrency = (amount, fromCurrency, toCurrency = 'INR') => {
  if (fromCurrency === toCurrency) return amount;
  
  const rate = getExchangeRate(fromCurrency, toCurrency);
  return amount * rate;
};

/**
 * Format currency with proper symbol and locale
 * @param {number} amount - Amount to format
 * @param {string} currencyCode - Currency code (e.g., 'INR')
 * @param {string} locale - Locale string (e.g., 'en-IN')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currencyCode = 'INR', locale = 'en-IN') => {
  const currency = currencies.find(c => c.code === currencyCode);
  const symbol = currency?.symbol || currencyCode;
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${symbol} ${amount.toFixed(2)}`;
  }
};

/**
 * Format price (alias for formatCurrency)
 * @param {number} amount - Amount to format
 * @param {string} currencyCode - Currency code (default: 'INR')
 * @param {string} locale - Locale string (default: 'en-IN')
 * @returns {string} Formatted price string
 */
export const formatPrice = (amount, currencyCode = 'INR', locale = 'en-IN') => {
  return formatCurrency(amount, currencyCode, locale);
};

/**
 * Get all available currencies
 * @returns {Array} Array of currency objects
 */
export const getAllCurrencies = () => currencies;

/**
 * Get currency by code
 * @param {string} code - Currency code
 * @returns {Object|null} Currency object or null if not found
 */
export const getCurrency = (code) => {
  return currencies.find(c => c.code === code) || null;
};

/**
 * Get exchange rates for a specific currency
 * @param {string} baseCurrency - Base currency code (default: 'INR')
 * @returns {Object} Exchange rates object
 */
export const getExchangeRates = (baseCurrency = 'INR') => {
  if (baseCurrency === 'INR') {
    return { ...exchangeRates };
  }
  
  // Convert all rates to base currency
  const rates = {};
  const baseRate = getExchangeRate('INR', baseCurrency);
  
  for (const [currency, rate] of Object.entries(exchangeRates)) {
    rates[currency] = rate / baseRate;
  }
  
  return rates;
};

/**
 * Format price with currency symbol using Intl.NumberFormat
 * @param {number} amount - Amount to format
 * @param {string} currencyCode - Currency code
 * @param {string} locale - Locale string
 * @returns {string} Formatted price
 */
export const formatPriceWithSymbol = (amount, currencyCode = 'INR', locale = 'en-IN') => {
  const currency = currencies.find(c => c.code === currencyCode);
  const symbol = currency?.symbol || currencyCode;
  
  try {
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
    
    return formatted;
  } catch {
    return `${symbol} ${amount.toFixed(2)}`;
  }
};

/**
 * Get currency symbol by code
 * @param {string} code - Currency code
 * @returns {string} Currency symbol
 */
export const getCurrencySymbol = (code) => {
  const currency = currencies.find(c => c.code === code);
  return currency?.symbol || code;
};

/**
 * Check if a currency code is valid
 * @param {string} code - Currency code to validate
 * @returns {boolean} True if valid currency code
 */
export const isValidCurrency = (code) => {
  return currencies.some(c => c.code === code);
};

export default {
  getExchangeRate,
  convertCurrency,
  formatCurrency,
  formatPrice,
  getAllCurrencies,
  getCurrency,
  getExchangeRates,
  formatPriceWithSymbol,
  getCurrencySymbol,
  isValidCurrency,
};