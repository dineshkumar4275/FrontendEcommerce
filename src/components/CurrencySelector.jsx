// src/components/CurrencySelector.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useApp } from '../hooks/useApp';
import { currencies } from '../data/currencies';

export default function CurrencySelector() {
  const { currency, setCurrency, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  const selectedCurrency = currencies.find(c => c.code === currency);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (currencyCode) => {
    setCurrency(currencyCode);
    setIsOpen(false);
    setSearch('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400 transition-colors bg-white dark:bg-gray-800 w-full"
        aria-label="Select currency"
      >
        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">
          {selectedCurrency?.symbol}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {selectedCurrency?.code}
        </span>
        <svg className={`w-4 h-4 text-gray-500 transition-transform ml-auto ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 flex flex-col">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search') || 'Search...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {currencies.filter(c =>
              c.name.toLowerCase().includes(search.toLowerCase()) ||
              c.code.toLowerCase().includes(search.toLowerCase())
            ).map((c) => (
              <button
                key={c.code}
                onClick={() => handleSelect(c.code)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors ${
                  currency === c.code ? 'bg-purple-50 dark:bg-purple-900/30' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-300">
                  {c.symbol || c.code.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{c.code}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{c.name}</p>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{c.symbol}</span>
                {currency === c.code && (
                  <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}