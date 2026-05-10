<template>
  <nav class="app-tabbar">
    <router-link
      v-for="item in tabItems"
      :key="item.path"
      :to="item.path"
      class="app-tabbar__item"
      :class="[getModuleClass(item.module), { 'is-active': isActiveNav(item.path) }]"
    >
      <span class="app-tabbar__icon">
        <component :is="item.icon" :size="24" weight="regular" />
        <span v-if="item.badge && item.badge > 0" class="app-tabbar__badge">
          {{ item.badge > 99 ? '99+' : item.badge }}
        </span>
      </span>
      <span class="app-tabbar__label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBeadStore } from '@/stores/bead';
import { Home, AudioLines, BookOpen, Microphone, Palette, Cloud } from '@phosphor-icons/vue';
import type { Component } from 'vue';

interface TabItem {
  path: string;
  label: string;
  icon: Component;
  module: 'default' | 'audio' | 'novel' | 'wiki' | 'bead' | 'drive';
  badge?: number;
}

const route = useRoute();
const beadStore = useBeadStore();

const tabItems = computed<TabItem[]>(() => [
  { path: '/', label: '首页', icon: Home, module: 'default' },
  { path: '/audio', label: '音声', icon: AudioLines, module: 'audio' },
  { path: '/novel', label: '小说', icon: BookOpen, module: 'novel' },
  { path: '/wiki', label: 'Wiki', icon: Microphone, module: 'wiki' },
  { path: '/bead', label: '拼豆', icon: Palette, module: 'bead', badge: beadStore.lowStockCount },
  { path: '/drive', label: '云盘', icon: Cloud, module: 'drive' },
]);

const isActiveNav = (path: string) => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};

const getModuleClass = (module: string) => `app-tabbar__item--${module}`;
</script>

<style lang="scss" scoped>
.app-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: var(--color-surface);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid var(--color-border-secondary);
  z-index: var(--z-fixed);
  padding-bottom: env(safe-area-inset-bottom);
  
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    text-decoration: none;
    transition: all var(--transition-fast);
    position: relative;
    
    &--audio.is-active { color: var(--color-audio); }
    &--novel.is-active { color: var(--color-novel); }
    &--wiki.is-active { color: var(--color-wiki); }
    &--bead.is-active { color: var(--color-bead); }
    &--drive.is-active { color: var(--color-drive); }
    
    &:not(.is-active) {
      color: var(--color-text-muted);
    }
  }
  
  &__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }
  
  &__badge {
    position: absolute;
    top: -4px;
    right: -8px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: var(--font-weight-semibold);
    color: white;
    background: var(--color-warning);
    border-radius: var(--radius-full);
  }
  
  &__label {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
  }
}
</style>
