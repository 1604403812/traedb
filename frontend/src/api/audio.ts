import { request } from './request'
import type { AudioItem } from '../types/audio'

export function fetchAudioList() {
  return request<{ results: AudioItem[] }>('/audio')
}
