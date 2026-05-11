export interface ApiResponse<T> {
  code: number
  message: string
  data: T
  timestamp: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1'

export async function request<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<ApiResponse<T>>
}
