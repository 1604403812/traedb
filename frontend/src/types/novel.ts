export interface NovelItem {
  id: number
  title: string
  author: string
  status: 'owned' | 'reading' | 'completed'
  reading_progress: number
  cover_url?: string
}
