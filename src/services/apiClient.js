// // lib/apiClient.js
// import axios from 'axios';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// const apiClient = axios.create({
//   baseURL: API_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add request interceptor for debugging
// apiClient.interceptors.request.use(
//   (config) => {
//     console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor for debugging
// apiClient.interceptors.response.use(
//   (response) => {
//     console.log(`✅ API Response: ${response.status} ${response.config.url}`);
//     return response;
//   },
//   (error) => {
//     console.error(`❌ API Error: ${error.response?.status}`, error.response?.data);
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;