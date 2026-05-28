// export const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-IN', {
//         style: 'currency',
//         currency: 'INR',
//         minimumFractionDigits: 0,
//     }).format(price);
// };

// export const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-IN', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric',
//     });
// };

// export const truncateText = (text, length = 100) => {
//     if (text.length <= length) return text;
//     return text.substring(0, length) + '...';
// };

// export const getInitials = (name) => {
//     return name
//         .split(' ')
//         .map(word => word[0])
//         .join('')
//         .toUpperCase()
//         .slice(0, 2);
// };

// export const validateEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// };

// export const validatePhone = (phone) => {
//     return /^[0-9]{10}$/.test(phone);
// };

import { v4 as uuidv4 } from 'uuid';

// Generate unique ID
export const generateId = () => {
  return uuidv4();
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Check if object is empty
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// Capitalize first letter
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Truncate text
export const truncate = (str, length = 50, suffix = '...') => {
  if (str.length <= length) return str;
  return str.substring(0, length) + suffix;
};

// Debounce function
export const debounce = (func, delay = 500) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function
export const throttle = (func, limit = 500) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

// Session storage helpers
export const session = {
  get: (key) => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key) => {
    sessionStorage.removeItem(key);
  },
  clear: () => {
    sessionStorage.clear();
  },
};

// Cookie helpers
export const cookies = {
  set: (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  },
  get: (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  },
  remove: (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};

// URL helpers
export const url = {
  getParams: () => {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (const [key, value] of params) {
      obj[key] = value;
    }
    return obj;
  },
  setParams: (params) => {
    const url = new URL(window.location.href);
    Object.keys(params).forEach(key => {
      if (params[key]) {
        url.searchParams.set(key, params[key]);
      } else {
        url.searchParams.delete(key);
      }
    });
    window.history.pushState({}, '', url);
  },
  removeParams: (keys) => {
    const url = new URL(window.location.href);
    keys.forEach(key => url.searchParams.delete(key));
    window.history.pushState({}, '', url);
  },
};

// Device detection
export const device = {
  isMobile: () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  isTablet: () => /iPad|Android/i.test(navigator.userAgent) && !device.isMobile(),
  isDesktop: () => !device.isMobile() && !device.isTablet(),
  isIOS: () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  isAndroid: () => /Android/i.test(navigator.userAgent),
};

// Browser detection
export const browser = {
  isChrome: () => /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent),
  isFirefox: () => /Firefox/.test(navigator.userAgent),
  isSafari: () => /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
  isEdge: () => /Edge/.test(navigator.userAgent),
};

// Copy to clipboard
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

// Download file
export const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Share data
export const shareData = async (data) => {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return true;
    } catch (error) {
      console.error('Share failed:', error);
      return false;
    }
  }
  return false;
};