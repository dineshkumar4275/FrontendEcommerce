// Format price in Indian Rupees
export const formatPrice = (price) => {
  if (!price && price !== 0) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

// Format date
export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return '';
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const seconds = d.getSeconds().toString().padStart(2, '0');

  const formats = {
    'DD/MM/YYYY': `${day}/${month}/${year}`,
    'MM/DD/YYYY': `${month}/${day}/${year}`,
    'YYYY-MM-DD': `${year}-${month}-${day}`,
    'DD MMM YYYY': `${day} ${getMonthName(month)} ${year}`,
    'DD MMM YYYY HH:mm': `${day} ${getMonthName(month)} ${year} ${hours}:${minutes}`,
    'full': d.toLocaleString('en-IN'),
    'time': `${hours}:${minutes}:${seconds}`,
  };

  return formats[format] || formats['DD/MM/YYYY'];
};

// Get month name
export const getMonthName = (month) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[parseInt(month) - 1];
};

// Format number with commas
export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

// Format percentage
export const formatPercentage = (value) => {
  return `${value.toFixed(1)}%`;
};

// Format phone number
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

// Format rating stars
export const formatRating = (rating) => {
  return {
    full: Math.floor(rating),
    half: rating % 1 >= 0.5,
    empty: 5 - Math.ceil(rating),
  };
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Format duration (seconds to HH:MM:SS)
export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  const parts = [];
  if (hours > 0) parts.push(hours.toString().padStart(2, '0'));
  parts.push(minutes.toString().padStart(2, '0'));
  parts.push(secs.toString().padStart(2, '0'));
  
  return parts.join(':');
};

// Format address
export const formatAddress = (address) => {
  const parts = [];
  if (address.address) parts.push(address.address);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.pincode) parts.push(address.pincode);
  return parts.join(', ');
};