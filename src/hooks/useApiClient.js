// hooks/useApiClient.js
import { useRouter } from 'next/navigation';
import apiClient from '../lib/apiClient';

export const useApiClient = () => {
  const router = useRouter();
  
  // Create a wrapper that injects the router
  const api = {
    ...apiClient,
    // Override methods that need router
    get: async (url, config) => {
      try {
        return await apiClient.get(url, config);
      } catch (error) {
        if (error.response?.status === 401) {
          router.push('/login');
        }
        throw error;
      }
    },
    post: async (url, data, config) => {
      try {
        return await apiClient.post(url, data, config);
      } catch (error) {
        if (error.response?.status === 401) {
          router.push('/login');
        }
        throw error;
      }
    },
    put: async (url, data, config) => {
      try {
        return await apiClient.put(url, data, config);
      } catch (error) {
        if (error.response?.status === 401) {
          router.push('/login');
        }
        throw error;
      }
    },
    delete: async (url, config) => {
      try {
        return await apiClient.delete(url, config);
      } catch (error) {
        if (error.response?.status === 401) {
          router.push('/login');
        }
        throw error;
      }
    },
  };
  
  return api;
};