const STORAGE_PREFIX = 'personal_app_';

export const getItem = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    if (item === null) return defaultValue ?? null;
    return JSON.parse(item);
  } catch {
    return defaultValue ?? null;
  }
};

export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
};

export const getToken = (): string | null => {
  return getItem<string>('token');
};

export const setToken = (token: string): void => {
  setItem('token', token);
};

export const removeToken = (): void => {
  removeItem('token');
};

export const getUserInfo = () => {
  return getItem('user_info');
};

export const setUserInfo = (user: unknown): void => {
  setItem('user_info', user);
};

export const removeUserInfo = (): void => {
  removeItem('user_info');
};
