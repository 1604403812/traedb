import { request } from './request'
import type { BeadItem } from '../types/bead'

export function fetchBeadList() {
  return request<{ results: BeadItem[] }>('/bead')
}
