// export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
// export const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY;

// export const ORDER_STATUS = {
//     PENDING: 'pending',
//     CONFIRMED: 'confirmed',
//     SHIPPED: 'shipped',
//     DELIVERED: 'delivered',
//     CANCELLED: 'cancelled',
// };

// export const PAYMENT_STATUS = {
//     PENDING: 'pending',
//     SUCCESS: 'success',
//     FAILED: 'failed',
// };

// export const PRODUCT_CATEGORIES = [
//     'Electronics',
//     'Clothing',
//     'Books',
//     'Home & Garden',
//     'Sports',
//     'Toys',
//     'Beauty',
//     'Automotive',
// ];
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    SEND_OTP: '/auth/send-otp',
    VERIFY_OTP: '/auth/verify-otp',
    REFRESH_TOKEN: '/auth/refresh',
    ME: '/auth/me',
  },
  PRODUCTS: {
    GET_ALL: '/products',
    GET_BY_ID: '/products/:id',
    SEARCH: '/products/search',
    SUGGESTIONS: '/products/suggest',
    CATEGORIES: '/products/categories',
    TRENDING: '/products/trending',
    RELATED: '/products/:id/related',
  },
  ORDERS: {
    CREATE: '/orders',
    GET_ALL: '/orders',
    GET_BY_ID: '/orders/:id',
    CANCEL: '/orders/:id/cancel',
    TRACK: '/orders/:id/track',
    RETURN: '/orders/:id/return',
    INVOICE: '/orders/:id/invoice',
  },
  CART: {
    GET: '/cart',
    ADD: '/cart',
    UPDATE: '/cart/:id',
    REMOVE: '/cart/:id',
    CLEAR: '/cart',
    APPLY_COUPON: '/cart/apply-coupon',
    REMOVE_COUPON: '/cart/coupon',
    SYNC: '/cart/sync',
  },
  PAYMENTS: {
    INITIATE: '/payments/initiate',
    VERIFY: '/payments/verify',
    STATUS: '/payments/:id/status',
    REFUND: '/payments/:id/refund',
    METHODS: '/payments/methods',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STATS: '/admin/dashboard/stats',
    REVENUE: '/admin/analytics/revenue',
    USERS: '/admin/users',
    USERS_ROLE: '/admin/users/:id/role',
    USERS_BLOCK: '/admin/users/:id/toggle-block',
    DRIVERS: '/admin/drivers',
    DRIVERS_LOCATION: '/admin/drivers/:id/location',
    ORDERS: '/admin/orders',
    ORDERS_STATUS: '/admin/orders/:id/status',
    ORDERS_DRIVER: '/admin/orders/:id/assign-driver',
  },
  TRACKING: {
    HISTORY: '/tracking/:id/history',
    ETA: '/tracking/:id/eta',
  },
};

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  DRIVER: 'driver',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
};

export const ORDER_STATUS_CONFIG = {
  [ORDER_STATUS.PENDING]: { color: 'warning', label: 'Pending', icon: 'ClockIcon' },
  [ORDER_STATUS.CONFIRMED]: { color: 'info', label: 'Confirmed', icon: 'CheckIcon' },
  [ORDER_STATUS.PROCESSING]: { color: 'info', label: 'Processing', icon: 'PackageIcon' },
  [ORDER_STATUS.SHIPPED]: { color: 'primary', label: 'Shipped', icon: 'TruckIcon' },
  [ORDER_STATUS.OUT_FOR_DELIVERY]: { color: 'primary', label: 'Out for Delivery', icon: 'TruckIcon' },
  [ORDER_STATUS.DELIVERED]: { color: 'success', label: 'Delivered', icon: 'CheckCircleIcon' },
  [ORDER_STATUS.CANCELLED]: { color: 'danger', label: 'Cancelled', icon: 'XCircleIcon' },
  [ORDER_STATUS.RETURNED]: { color: 'warning', label: 'Returned', icon: 'ArrowPathIcon' },
};

export const PAYMENT_METHODS = {
  COD: 'cod',
  CARD: 'card',
  UPI: 'upi',
  NET_BANKING: 'net_banking',
  WALLET: 'wallet',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const PRODUCT_CATEGORIES = {
  ELECTRONICS: 'electronics',
  CLOTHING: 'clothing',
  BOOKS: 'books',
  HOME: 'home',
  SPORTS: 'sports',
  TOYS: 'toys',
  BEAUTY: 'beauty',
  GROCERIES: 'groceries',
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_low', label: 'Price: Low to High' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
];

export const PRICE_RANGES = [
  { label: 'Under ₹1,000', min: 0, max: 1000 },
  { label: '₹1,000 - ₹2,500', min: 1000, max: 2500 },
  { label: '₹2,500 - ₹5,000', min: 2500, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: 'Above ₹10,000', min: 10000, max: Infinity },
];

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  CART: 'cart',
  THEME: 'theme',
  RECENT_SEARCHES: 'recentSearches',
  ADDRESSES: 'addresses',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};