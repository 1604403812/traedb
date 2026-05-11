export interface DriveItem {
  id?: number
  name: string
  type: 'file' | 'folder'
  size?: number
  last_modified?: string
}
