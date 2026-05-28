// utils/debounce.js
'use client';

import { useState, useEffect } from 'react';  // Add this import

/**
 * Debounce function - delays executing a function until after a specified wait time
 * @param {Function} func - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, delay) {
  let timeoutId;
  
  return function (...args) {
    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Debounce with immediate execution on first call
 * @param {Function} func - The function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function with immediate option
 */
export function debounceImmediate(func, delay) {
  let timeoutId;
  let called = false;
  
  return function (...args) {
    if (!called) {
      func.apply(this, args);
      called = true;
    }
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      called = false;
    }, delay);
  };
}

/**
 * React hook for debouncing values
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - Debounced value
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);  // Removed React.

  useEffect(() => {  // Removed React.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Throttle function - limits execution to once per specified interval
 * @param {Function} func - The function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

export default debounce;