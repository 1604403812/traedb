<template>
  <aside class="app-sidebar">
    <div class="app-sidebar__user">
      <a-avatar :size="48" class="app-sidebar__avatar">
        <template #icon><User :size="24" /></template>
      </a-avatar>
      <div class="app-sidebar__user-info">
        <span class="app-sidebar__username">{{ authStore.user?.username || '访客' }}</span>
        <span class="app-sidebar__greeting">{{ greeting }}</span>
      </div>
    </div>

    <nav class="app-sidebar__nav">
      <div class="app-sidebar__section">
        <span class="app-sidebar__section-title">导航</span>
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="app-sidebar__nav-item"
          :class="[getModuleClass(item.module), { 'is-active': isActiveNav(item.path) }]"
        >
          <span class="app-sidebar__nav-icon">
            <component :is="item.icon" :size="20" weight="regular" />
          </span>
          <span class="app-sidebar__nav-label">{{ item.label }}</span>
          <span v-if="item.badge" class="app-sidebar__nav-badge">{{ item.badge }}</span>
        </router-link>
      </div>

      <div class="app-sidebar__section">
        <span class="app-sidebar__section-title">快捷操作</span>
        <button class="app-sidebar__nav-item" @click="handleAdd">
          <span class="app-sidebar__nav-icon">
            <Plus :size="20" weight="regular" />
          </span>
          <span class="app-sidebar__nav-label">添加内容</span>
        </button>
        <button class="app-sidebar__nav-item" @click="$router.push('/drive')">
          <span class="app-sidebar__nav-icon">
            <ArrowsClockwise :size="20" weight="regular" />
          </span>
          <span class="app-sidebar__nav-label">同步云盘</span>
        </button>
      </div>
    </nav>

    <div class="app-sidebar__footer">
      <a-progress
        :percent="storagePercent"
        :show-info="false"
        :stroke-color="storageColor"
        size="small"
      />
      <span class="app-sidebar__storage-text">
        <Cloud :size="14" />
        {{ storageText }}
      </span>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useBeadStore } from '@/stores/bead';
import { Home, AudioLines, BookOpen, Microphone, Palette, Cloud, User, Plus, ArrowsClockwise } from '@phosphor-icons/vue';
import type { Component } from 'vue';
import type { MenuProps } from 'ant-design-vue';

interface NavItem {
  path: string;
  label: string;
  icon: Component;
  module: 'default' | 'audio' | 'novel' | 'wiki' | 'bead' | 'drive';
  badge?: number;
}

const route = useRoute();
const authStore = useAuthStore();
const beadStore = useBeadStore();

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 6) return '凌晨好';
  if (hour < 9) return '早上好';
  if (hour < 12) return '上午好';
  if (hour < 14) return '中午好';
  if (hour < 18) return '下午好';
  if (hour < 22) return '晚上好';
  return '夜深了';
});

const navItems: NavItem[] = [
  { path: '/', label: '仪表盘', icon: Home, module: 'default' },
  { path: '/audio', label: '音声收藏', icon: AudioLines, module: 'audio', badge: 0 },
  { path: '/novel', label: '小说书架', icon: BookOpen, module: 'novel' },
  { path: '/wiki', label: 'TWICE Wiki', icon: Microphone, module: 'wiki' },
  { path: '/bead', label: '拼豆库存', icon: Palette, module: 'bead', badge: computed(() => beadStore.lowStockCount).value },
  { path: '/drive', label: '云盘管理', icon: Cloud, module: 'drive' },
];

const isActiveNav = (path: string) => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};

const getModuleClass = (module: string) => `app-sidebar__nav-item--${module}`;

const storagePercent = computed(() => {
  const used = 5.2;
  const total = 15;
  return Math.round((used / total) * 100);
});

const storageText = computed(() => '5.2 GB / 15 GB');
const storageColor = computed(() => {
  const percent = storagePercent.value;
  if (percent < 50) return '#8B9A8B';
  if (percent < 80) return '#A89B8B';
  return '#9B8B8B';
});

const handleAdd = () => {
  // TODO: Show add modal
  console.log('Add content');
};
</script>

<style lang="scss" scoped>
.app-sidebar {
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 0;
  width: 240px;
  background: var(--color-bg-secondary);
  border-right: 1px solid var(--color-border-secondary);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  z-index: var(--z-sticky);
  
  [data-theme="dark"] & {
    background: var(--color-bg-secondary);
  }
  
  &__user {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px;
    border-bottom: 1px solid var(--color-border-secondary);
  }
  
  &__avatar {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
    flex-shrink: 0;
  }
  
  &__user-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  
  &__username {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &__greeting {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }
  
  &__nav {
    flex: 1;
    padding: 16px 12px;
    overflow-y: auto;
  }
  
  &__section {
    margin-bottom: 24px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__section-title {
    display: block;
    padding: 0 12px;
    margin-bottom: 8px;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  &__nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: all var(--transition-fast);
    cursor: pointer;
    
    &:hover {
      color: var(--color-text-primary);
      background: var(--color-primary-bg);
    }
    
    &.is-active {
      color: var(--color-primary);
      background: var(--color-primary-bg);
      
      .app-sidebar__nav-icon {
        color: var(--color-primary);
      }
    }
    
    &--audio.is-active {
      color: var(--color-audio);
      background: var(--color-audio-bg);
      .app-sidebar__nav-icon { color: var(--color-audio); }
    }
    
    &--novel.is-active {
      color: var(--color-novel);
      background: var(--color-novel-bg);
      .app-sidebar__nav-icon { color: var(--color-novel); }
    }
    
    &--wiki.is-active {
      color: var(--color-wiki);
      background: var(--color-wiki-bg);
      .app-sidebar__nav-icon { color: var(--color-wiki); }
    }
    
    &--bead.is-active {
      color: var(--color-bead);
      background: var(--color-bead-bg);
      .app-sidebar__nav-icon { color: var(--color-bead); }
    }
    
    &--drive.is-active {
      color: var(--color-drive);
      background: var(--color-drive-bg);
      .app-sidebar__nav-icon { color: var(--color-drive); }
    }
  }
  
  &__nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--color-text-muted);
    transition: color var(--transition-fast);
  }
  
  &__nav-label {
    flex: 1;
    text-align: left;
  }
  
  &__nav-badge {
    padding: 2px 8px;
    border-radius: var(--radius-full);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    background: var(--color-warning-bg);
    color: var(--color-warning);
  }
  
  &__footer {
    padding: 16px 24px;
    border-top: 1px solid var(--color-border-secondary);
    
    :deep(.ant-progress) {
      margin-bottom: 8px;
    }
  }
  
  &__storage-text {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
  }
}
</style>
