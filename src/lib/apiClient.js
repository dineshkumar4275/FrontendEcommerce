// lib/apiClient.js
import axios from 'axios';
import Router from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-ecommerce-brown.vercel.app/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// 请求拦截器 - 确保 token 被添加
apiClient.interceptors.request.use(
  (config) => {
    // 确保只在客户端执行
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
      console.log(`🔑 Token in localStorage: ${token ? 'YES (' + token.substring(0, 30) + '...)' : 'NO'}`);
      
      if (token) {
        // 确保 token 被正确设置
        config.headers.Authorization = `Bearer ${token}`;
        console.log(`✅ Authorization header set: Bearer ${token.substring(0, 30)}...`);
      } else {
        console.log(`⚠️ NO TOKEN found for ${config.url}`);
      }
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理 401 错误
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('❌ 401 Unauthorized - Token invalid or expired');
      
      if (typeof window !== 'undefined') {
        // 清除失效的 token
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // 保存当前路径用于重定向
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/register') {
          localStorage.setItem('redirectAfterLogin', currentPath);
        }
        
        // 重定向到登录页
        Router.push('/login');
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;