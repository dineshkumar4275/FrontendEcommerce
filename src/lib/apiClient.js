// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
//   headers: { 'Content-Type': 'application/json' },
// });

// // Request interceptor
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
// src/lib/apiClient.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-ecommerce-brown.vercel.app/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;