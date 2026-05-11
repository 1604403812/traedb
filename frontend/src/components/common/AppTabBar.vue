<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
  AppstoreOutlined,
  BgColorsOutlined,
  BookOutlined,
  CloudOutlined,
  CustomerServiceOutlined,
  TeamOutlined,
} from '@ant-design/icons-vue'
import { primaryNav } from '../../router/navigation'

const route = useRoute()

const iconMap = {
  dashboard: AppstoreOutlined,
  audio: CustomerServiceOutlined,
  novel: BookOutlined,
  wiki: TeamOutlined,
  beads: BgColorsOutlined,
  drive: CloudOutlined,
}

function isActive(path: string) {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}
</script>

<template>
  <nav class="tabbar glass-card is-inset">
    <RouterLink
      v-for="item in primaryNav"
      :key="item.key"
      :to="item.path"
      class="tabbar-link"
      :class="{ 'is-active': isActive(item.path) }"
    >
      <component :is="iconMap[item.icon]" />
      <span>{{ item.shortLabel }}</span>
    </RouterLink>
  </nav>
</template>
