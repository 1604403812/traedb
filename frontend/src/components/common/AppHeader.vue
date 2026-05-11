<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  AppstoreOutlined,
  BgColorsOutlined,
  BulbOutlined,
  BookOutlined,
  CloudOutlined,
  CustomerServiceOutlined,
  DesktopOutlined,
  HighlightOutlined,
  MenuOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons-vue'
import { primaryNav } from '../../router/navigation'
import { useThemeStore } from '../../stores/theme'

const iconMap = {
  dashboard: AppstoreOutlined,
  audio: CustomerServiceOutlined,
  novel: BookOutlined,
  wiki: TeamOutlined,
  beads: BgColorsOutlined,
  drive: CloudOutlined,
}

const route = useRoute()
const themeStore = useThemeStore()
const drawerOpen = ref(false)

const themeLabel = computed(() => {
  if (themeStore.mode === 'system') {
    return '跟随系统'
  }

  return themeStore.resolvedTheme === 'dark' ? '深色模式' : '浅色模式'
})

const themeIcon = computed(() => {
  if (themeStore.mode === 'system') {
    return DesktopOutlined
  }

  return themeStore.resolvedTheme === 'dark' ? HighlightOutlined : BulbOutlined
})

function isActive(path: string) {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path.startsWith(path)
}
</script>

<template>
  <header class="topbar glass-card is-inset">
    <div class="topbar__brand">
      <RouterLink to="/" class="brand-mark">
        <span class="brand-mark__seal">藏</span>
        <span>
          <strong>个人综合应用系统</strong>
          <small>Digital Cabinet</small>
        </span>
      </RouterLink>
    </div>

    <nav class="topbar__nav">
      <RouterLink
        v-for="item in primaryNav"
        :key="item.key"
        :to="item.path"
        class="nav-chip"
        :class="{ 'is-active': isActive(item.path) }"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <div class="topbar__actions">
      <a-button class="ghost-button" @click="themeStore.cycleTheme()">
        <component :is="themeIcon" />
        {{ themeLabel }}
      </a-button>
      <a-avatar class="profile-badge" shape="square">
        <template #icon>
          <UserOutlined />
        </template>
      </a-avatar>
      <a-button class="menu-button" @click="drawerOpen = true">
        <MenuOutlined />
      </a-button>
    </div>
  </header>

  <a-drawer v-model:open="drawerOpen" placement="left" title="模块导航" width="300">
    <div class="drawer-list">
      <RouterLink
        v-for="item in primaryNav"
        :key="item.key"
        :to="item.path"
        class="drawer-link"
        @click="drawerOpen = false"
      >
        <component :is="iconMap[item.icon]" />
        <span>
          <strong>{{ item.label }}</strong>
          <small>{{ item.description }}</small>
        </span>
      </RouterLink>
    </div>
  </a-drawer>
</template>
