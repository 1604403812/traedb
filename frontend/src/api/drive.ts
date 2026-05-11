import { request } from './request'
import type { DriveItem } from '../types/drive'

export function browseDrive(path = '/') {
  return request<{ current_path: string; items: DriveItem[] }>(`/drive/browse?path=${encodeURIComponent(path)}`)
}
