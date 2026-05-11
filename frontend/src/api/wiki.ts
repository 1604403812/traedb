import { request } from './request'
import type { AlbumItem, MemberItem } from '../types/wiki'

export function fetchMembers() {
  return request<MemberItem[]>('/wiki/members')
}

export function fetchAlbums() {
  return request<AlbumItem[]>('/wiki/albums')
}
