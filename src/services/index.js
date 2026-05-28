// src/services/index.js

// HTTP Client
export { default as apiClient } from '@/lib/apiClient';

// Auth Service
export { authService } from './authService';

// Product Service
export { 
  getProducts, 
  getProduct, 
  getProductById,
  searchProducts,
  getProductSuggestions,
  createProduct, 
  updateProduct, 
  deleteProduct 
} from './productService';

// Cart Service
export { cartService } from './cartService';

// Order Service
export { orderService } from './orderService';

// Tracking Service
export { trackingService } from './trackingService';

// Admin Service - FIXED: import default then re-export as named
import adminServiceDefault from './adminService';
export const adminService = adminServiceDefault;
export { adminServiceDefault as default };

// Driver Service
export { default as driverService } from './driverService';

// User Order Service
export { default as userOrderService } from './userOrderService';

// Payment Service
export { default as paymentService } from './paymentService';

// Dashboard Service
export { getDashboardStats, getRecentOrders, getActiveDrivers } from './api/dashboardService';