export interface NavItem {
  key: string
  label: string
  shortLabel: string
  path: string
  description: string
  icon: 'dashboard' | 'audio' | 'novel' | 'wiki' | 'beads' | 'drive'
}

export const primaryNav: NavItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    shortLabel: '首页',
    path: '/',
    description: '收藏概览与最近动态',
    icon: 'dashboard',
  },
  {
    key: 'audio',
    label: '音声',
    shortLabel: '音声',
    path: '/audio',
    description: '音声收藏、评分与播放入口',
    icon: 'audio',
  },
  {
    key: 'novel',
    label: '小说',
    shortLabel: '小说',
    path: '/novels',
    description: '书架、阅读进度与在线阅读',
    icon: 'novel',
  },
  {
    key: 'wiki',
    label: 'TWICE Wiki',
    shortLabel: 'Wiki',
    path: '/wiki',
    description: '成员、专辑与时间线内容整理',
    icon: 'wiki',
  },
  {
    key: 'beads',
    label: '拼豆库存',
    shortLabel: '拼豆',
    path: '/beads',
    description: '色卡、库存阈值与统计提醒',
    icon: 'beads',
  },
  {
    key: 'drive',
    label: '云盘',
    shortLabel: '云盘',
    path: '/drive',
    description: 'OneDrive / Alist 文件浏览与同步',
    icon: 'drive',
  },
]
