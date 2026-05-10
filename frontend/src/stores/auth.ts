import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getToken, setToken, removeToken, getUserInfo, setUserInfo, removeUserInfo } from '@/utils/storage';
import { authApi } from '@/api/auth';
import type { User } from '@/api/auth';

export { type User } from '@/api/auth';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(getToken());
  const user = ref<User | null>(getUserInfo());
  const loading = ref(false);

  const isAuthenticated = computed(() => !!token.value);

  const login = async (username: string, password: string) => {
    loading.value = true;
    try {
      const response = await authApi.login({ username, password });
      const { token: accessToken, user: userData } = response.data;
      
      token.value = accessToken;
      user.value = userData;
      
      setToken(accessToken);
      setUserInfo(userData);
      
      return response;
    } finally {
      loading.value = false;
    }
  };

  const register = async (data: { username: string; email: string; password: string; password_confirm: string }) => {
    loading.value = true;
    try {
      const response = await authApi.register(data);
      return response;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      token.value = null;
      user.value = null;
      removeToken();
      removeUserInfo();
    }
  };

  const refreshToken = async () => {
    try {
      const response = await authApi.refresh();
      const { token: newToken } = response.data;
      
      token.value = newToken;
      setToken(newToken);
      
      return newToken;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const fetchUserInfo = async () => {
    if (!token.value) return;
    
    try {
      const response = await authApi.getUserInfo();
      user.value = response.data;
      setUserInfo(response.data);
    } catch (error) {
      logout();
      throw error;
    }
  };

  return {
    token,
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    refreshToken,
    fetchUserInfo,
  };
});
