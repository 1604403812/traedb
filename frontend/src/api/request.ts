import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '@/utils/storage';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const authStore = useAuthStore();
        await authStore.refreshToken();
        
        const token = getToken();
        if (token && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        
        return api(originalRequest);
      } catch (refreshError) {
        const router = useRouter();
        removeToken();
        router.push('/auth/login');
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  page_size: number;
  results: T[];
}

export const request = async <T = unknown>(
  config: InternalAxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api<ApiResponse<T>>(config);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export default api;
