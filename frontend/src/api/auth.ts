import api, { type ApiResponse } from './request';

interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthResponse {
  user: User;
  token: string;
  expires_in?: number;
}

interface LoginParams {
  username: string;
  password: string;
}

interface RegisterParams {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export const authApi = {
  login: (data: LoginParams) => {
    return api.post<ApiResponse<AuthResponse>>('/v1/auth/login', data);
  },
  
  register: (data: RegisterParams) => {
    return api.post<ApiResponse<AuthResponse>>('/v1/auth/register', data);
  },
  
  logout: () => {
    return api.post<ApiResponse<void>>('/v1/auth/logout');
  },
  
  refresh: () => {
    return api.post<ApiResponse<{ token: string; expires_in: number }>>('/v1/auth/refresh');
  },
  
  getUserInfo: () => {
    return api.get<ApiResponse<User>>('/v1/auth/me');
  },
};

export type { User as UserInfo, AuthResponse, LoginParams, RegisterParams };
