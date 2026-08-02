// src/components/Location/CurrencyDisplay.jsx
'use client';

import React, { useState, useEffect } from 'react';

const CurrencyDisplay = () => {
  const [currency, setCurrency] = useState({ code: 'INR', symbol: '₹' });

  useEffect(() => {
    const saved = localStorage.getItem('selectedCurrency');
    if (saved) {
      try {
        setCurrency(JSON.parse(saved));
      } catch (e) {}
    }

    const handleCurrencyChange = (event) => {
      setCurrency(event.detail.currency);
    };

    window.addEventListener('currencyChange', handleCurrencyChange);
    return () => window.removeEventListener('currencyChange', handleCurrencyChange);
  }, []);

  return (
    <span className="font-medium">
      {currency.symbol} {currency.code}
    </span>
  );
};

export default CurrencyDisplay;