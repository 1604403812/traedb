import { request } from './request'
import type { NovelItem } from '../types/novel'

export function fetchNovelList() {
  return request<{ results: NovelItem[] }>('/novel')
}
