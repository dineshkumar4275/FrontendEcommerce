// import apiClient from '../../lib/apiClient';

// export const authService = {
//   sendOTP: async (email) => {
//     try {
//       const response = await apiClient.post('/auth/send-otp', { email });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   verifyOTP: async (email, otp) => {
//     try {
//       const response = await apiClient.post('/auth/verify-otp', { email, otp });
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || error.message;
//     }
//   },

//   getCurrentUser: () => {
//     const userInfo = localStorage.getItem('userInfo');
//     return userInfo ? JSON.parse(userInfo) : null;
//   },

//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userInfo');
//     localStorage.removeItem('cartItems');
//   }
// };
// import apiClient from './apiClient';

// export const authService = {
//   // Login user
//   login: async (email, password) => {
//     try {
//       const response = await apiClient.post('/auth/login', { email, password });
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Login failed',
//       };
//     }
//   },

//   // Register user
//   register: async (userData) => {
//     try {
//       const response = await apiClient.post('/auth/register', userData);
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Registration failed',
//       };
//     }
//   },

//   // Logout user
//   logout: async () => {
//     try {
//       await apiClient.post('/auth/logout');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   },

//   // Send OTP
//   sendOTP: async (email) => {
//     try {
//       const response = await apiClient.post('/auth/send-otp', { email });
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to send OTP',
//       };
//     }
//   },

//   // Verify OTP
//   verifyOTP: async (email, otp) => {
//     try {
//       const response = await apiClient.post('/auth/verify-otp', { email, otp });
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Invalid OTP',
//       };
//     }
//   },

//   // Forgot password
//   forgotPassword: async (email) => {
//     try {
//       const response = await apiClient.post('/auth/forgot-password', { email });
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to send reset link',
//       };
//     }
//   },

//   // Reset password
//   resetPassword: async (token, newPassword) => {
//     try {
//       const response = await apiClient.post('/auth/reset-password', { token, newPassword });
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to reset password',
//       };
//     }
//   },

//   // Update profile
//   updateProfile: async (profileData) => {
//     try {
//       const response = await apiClient.put('/auth/profile', profileData);
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to update profile',
//       };
//     }
//   },

//   // Change password
//   changePassword: async (oldPassword, newPassword) => {
//     try {
//       const response = await apiClient.post('/auth/change-password', {
//         oldPassword,
//         newPassword,
//       });
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to change password',
//       };
//     }
//   },

//   // Get current user
//   getCurrentUser: async () => {
//     try {
//       const response = await apiClient.get('/auth/me');
//       return {
//         success: true,
//         data: response.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         message: error.response?.data?.message || 'Failed to get user',
//       };
//     }
//   },
// };
// services/authService.js
import apiClient from '@/lib/apiClient';

export const authService = {
  // Login with email and password
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new user
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Send OTP
  async sendOTP(email) {
    try {
      const response = await apiClient.post('/auth/send-otp', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verify OTP
  async verifyOTP(email, otp) {
    try {
      const response = await apiClient.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Resend OTP
  async resendOTP(email) {
    try {
      const response = await apiClient.post('/auth/resend-otp', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user profile
  async getProfile() {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update profile
  async updateProfile(userData) {
    try {
      const response = await apiClient.put('/auth/profile', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout
  async logout() {
    try {
      const response = await apiClient.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};