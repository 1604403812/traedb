export interface MemberItem {
  id: number
  name: string
  korean_name?: string
  english_name?: string
  position?: string
  image_url?: string
}

export interface AlbumItem {
  id: number
  title: string
  release_date: string
  album_type: 'mini' | 'full' | 'single' | 'digital'
  cover_url?: string
}
