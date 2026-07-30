// src/hooks/useApp.js
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const useCurrency = () => {
  const { currency, setCurrency, formatPrice } = useApp();
  return { currency, setCurrency, formatPrice };
};

export const useCountry = () => {
  const { country, setCountry } = useApp();
  return { country, setCountry };
};

export const useLanguage = () => {
  const { language, setLanguage, t } = useApp();
  return { language, setLanguage, t };
};

export default useApp;