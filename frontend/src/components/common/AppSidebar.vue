<script setup lang="ts">
import {
  ClockCircleOutlined,
  CompassOutlined,
  FolderOpenOutlined,
  HeartOutlined,
} from '@ant-design/icons-vue'
import GlassCard from './GlassCard.vue'
import { primaryNav } from '../../router/navigation'

const highlights = [
  {
    title: '今日脉络',
    value: '6 个主模块',
    note: '统一入口覆盖收藏、阅读、库存与文件流转。',
    icon: CompassOutlined,
  },
  {
    title: '最近整理',
    value: '音声与小说',
    note: '优先级最高的内容消费模块被放在前两级导航。',
    icon: HeartOutlined,
  },
  {
    title: '同步策略',
    value: 'OneDrive / Alist',
    note: '云盘作为媒体文件与管理数据之间的桥梁。',
    icon: FolderOpenOutlined,
  },
  {
    title: '体验目标',
    value: 'PWA Ready',
    note: '响应式布局为移动端底部导航与阅读体验预留空间。',
    icon: ClockCircleOutlined,
  },
]
</script>

<template>
  <aside class="sidebar-shell">
    <GlassCard class="sidebar-panel" accent="var(--module-wiki)">
      <p class="eyebrow">系统导览</p>
      <h2>模块地图</h2>
      <div class="sidebar-links">
        <RouterLink v-for="item in primaryNav" :key="item.key" :to="item.path" class="sidebar-link">
          <strong>{{ item.label }}</strong>
          <small>{{ item.description }}</small>
        </RouterLink>
      </div>
    </GlassCard>

    <GlassCard v-for="item in highlights" :key="item.title" class="sidebar-mini" interactive>
      <div class="sidebar-mini__icon">
        <component :is="item.icon" />
      </div>
      <p class="sidebar-mini__label">{{ item.title }}</p>
      <strong>{{ item.value }}</strong>
      <small>{{ item.note }}</small>
    </GlassCard>
  </aside>
</template>
