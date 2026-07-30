// src/utils/detectLanguage.js
import { languages } from '../data/languages';

export const detectLanguage = () => {
  try {
    // Get browser language
    const browserLang = navigator.language || navigator.languages?.[0] || 'en';
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    // Check if language is supported
    if (languages.find(l => l.code === langCode)) {
      return langCode;
    }
    
    // Check if any language matches the full locale
    const fullMatch = languages.find(l => 
      browserLang.toLowerCase().startsWith(l.code)
    );
    if (fullMatch) {
      return fullMatch.code;
    }
    
    // Default to English
    return 'en';
  } catch {
    return 'en';
  }
};

export const getLanguageByCode = (code) => {
  return languages.find(l => l.code === code) || null;
};

export default detectLanguage;