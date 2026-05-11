import { request } from './request'

export interface LoginPayload {
  username: string
  password: string
}

export function login(payload: LoginPayload) {
  return request<{ token: string; expires_in: number; user: { username: string } }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
