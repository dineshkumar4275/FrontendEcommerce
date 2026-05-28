// Email validation
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Phone number validation (Indian)
export const isValidPhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

// Pincode validation (Indian)
export const isValidPincode = (pincode) => {
  const regex = /^[0-9]{6}$/;
  return regex.test(pincode);
};

// Password strength validation
export const getPasswordStrength = (password) => {
  let strength = 0;
  
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  
  return {
    score: strength,
    label: ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength] || 'Weak',
  };
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Credit card validation (Luhn algorithm)
export const isValidCreditCard = (cardNumber) => {
  const sanitized = cardNumber.replace(/\D/g, '');
  if (sanitized.length < 13 || sanitized.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
};

// CVV validation
export const isValidCVV = (cvv) => {
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
};

// Expiry date validation
export const isValidExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expYear = parseInt(year);
  const expMonth = parseInt(month);
  
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  return true;
};

// GST validation
export const isValidGST = (gst) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(gst);
};

// PAN validation
export const isValidPAN = (pan) => {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan);
};

// IFSC code validation
export const isValidIFSC = (ifsc) => {
  const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return regex.test(ifsc);
};

// Name validation (no numbers or special characters)
export const isValidName = (name) => {
  const regex = /^[a-zA-Z\s]{2,50}$/;
  return regex.test(name);
};

// Age validation (must be 18+)
export const isAdult = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18;
};

// Validate form data
export const validateForm = (data, rules) => {
  const errors = {};
  
  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field];
    
    if (rule.required && !value) {
      errors[field] = `${field} is required`;
      continue;
    }
    
    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `${field} must be at least ${rule.minLength} characters`;
    }
    
    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${field} must be at most ${rule.maxLength} characters`;
    }
    
    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${field} is invalid`;
    }
    
    if (value && rule.custom && !rule.custom(value)) {
      errors[field] = rule.message || `${field} is invalid`;
    }
  }
  
  return errors;
};