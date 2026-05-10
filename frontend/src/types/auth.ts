export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expires_in?: number;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}
