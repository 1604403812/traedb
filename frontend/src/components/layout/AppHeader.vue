<template>
  <header class="app-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="app-header__container">
      <div class="app-header__left">
        <router-link to="/" class="app-header__logo">
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="12" fill="var(--color-primary)"/>
            <path d="M14 34V14h8l6 10 6-10h8v20h-6V22l-4 6h-8l-4-6v12h-6z" fill="white"/>
          </svg>
          <span class="app-header__logo-text">数字收藏馆</span>
        </router-link>
      </div>

      <nav class="app-header__nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="app-header__nav-item"
          :class="{ 'is-active': isActiveNav(item.path) }"
        >
          <component :is="item.icon" :size="18" weight="regular" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="app-header__right">
        <a-tooltip title="深色模式">
          <button class="app-header__icon-btn" @click="toggleTheme">
            <Sun v-if="isDark" :size="20" weight="regular" />
            <Moon v-else :size="20" weight="regular" />
          </button>
        </a-tooltip>

        <a-dropdown :trigger="['click']" placement="bottomRight">
          <button class="app-header__user-btn">
            <a-avatar :size="32" class="app-header__avatar">
              <template #icon><User :size="18" /></template>
            </a-avatar>
          </button>
          <template #overlay>
            <a-menu>
              <a-menu-item key="profile">
                <User :size="16" style="margin-right: 8px" />
                个人资料
              </a-menu-item>
              <a-menu-item key="settings" @click="$router.push('/settings')">
                <Gear :size="16" style="margin-right: 8px" />
                设置
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item key="logout" danger @click="handleLogout">
                <SignOut :size="16" style="margin-right: 8px" />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useThemeStore } from '@/stores/theme';
import { Home, AudioLines, BookOpen, Microphone, Palette, Cloud, Sun, Moon, User, Gear, SignOut } from '@phosphor-icons/vue';
import type { Component } from 'vue';

interface NavItem {
  path: string;
  label: string;
  icon: Component;
}

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const isScrolled = ref(false);
const isDark = computed(() => themeStore.isDark);

const navItems: NavItem[] = [
  { path: '/', label: '首页', icon: Home },
  { path: '/audio', label: '音声', icon: AudioLines },
  { path: '/novel', label: '小说', icon: BookOpen },
  { path: '/wiki', label: 'Wiki', icon: Microphone },
  { path: '/bead', label: '拼豆', icon: Palette },
  { path: '/drive', label: '云盘', icon: Cloud },
];

const isActiveNav = (path: string) => {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
};

const toggleTheme = () => {
  themeStore.toggleTheme();
};

const handleLogout = async () => {
  await authStore.logout();
  router.push('/auth/login');
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(250, 250, 249, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid transparent;
  z-index: var(--z-fixed);
  transition: all var(--transition-base);
  
  &.is-scrolled {
    border-bottom-color: var(--color-border-secondary);
    box-shadow: var(--shadow-sm);
  }
  
  [data-theme="dark"] & {
    background: rgba(26, 25, 24, 0.85);
  }
  
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 32px;
  }
  
  &__left {
    display: flex;
    align-items: center;
  }
  
  &__logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    
    svg {
      filter: drop-shadow(0 2px 8px rgba(139, 134, 133, 0.25));
    }
  }
  
  &__logo-text {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    letter-spacing: 2px;
  }
  
  &__nav {
    display: flex;
    align-items: center;
    gap: 4px;
    
    @media (max-width: 1024px) {
      display: none;
    }
  }
  
  &__nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: all var(--transition-fast);
    
    &:hover {
      color: var(--color-text-primary);
      background: var(--color-primary-bg);
    }
    
    &.is-active {
      color: var(--color-primary);
      background: var(--color-primary-bg);
    }
  }
  
  &__right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  &__icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    transition: all var(--transition-fast);
    
    &:hover {
      color: var(--color-text-primary);
      background: var(--color-primary-bg);
    }
  }
  
  &__user-btn {
    display: flex;
    align-items: center;
    padding: 4px;
    border-radius: var(--radius-full);
    transition: all var(--transition-fast);
    
    &:hover {
      background: var(--color-primary-bg);
    }
  }
  
  &__avatar {
    background: var(--color-primary);
    cursor: pointer;
  }
}
</style>
