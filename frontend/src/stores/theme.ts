import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'system';

export const useThemeStore = defineStore('theme', () => {
  const preference = ref<ThemeMode>('system');
  
  const systemPrefersDark = ref(false);
  
  const updateSystemPreference = () => {
    if (typeof window !== 'undefined') {
      systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  };
  
  const isDark = computed(() => {
    if (preference.value === 'system') {
      return systemPrefersDark.value;
    }
    return preference.value === 'dark';
  });
  
  const setTheme = (mode: ThemeMode) => {
    preference.value = mode;
  };
  
  const toggleTheme = () => {
    if (preference.value === 'dark' || (preference.value === 'system' && systemPrefersDark.value)) {
      preference.value = 'light';
    } else {
      preference.value = 'dark';
    }
  };
  
  const applyTheme = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
    }
  };
  
  const init = () => {
    updateSystemPreference();
    applyTheme();
    
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateSystemPreference);
    }
  };
  
  watch(isDark, applyTheme);
  
  return {
    preference,
    isDark,
    setTheme,
    toggleTheme,
    init,
  };
});
