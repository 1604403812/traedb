<template>
  <div class="app-layout" :class="{ 'is-mobile': isMobile }">
    <AppHeader v-if="!isMobile" class="app-layout-header" />
    
    <div class="app-layout-body">
      <AppSidebar v-if="!isMobile" class="app-layout-sidebar" />
      
      <main class="app-layout-main">
        <slot />
      </main>
    </div>

    <AppTabBar v-if="isMobile" class="app-layout-tabbar" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';
import AppTabBar from './AppTabBar.vue';

const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
  background: var(--color-bg-primary);
  
  &-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  
  &-body {
    display: flex;
    padding-top: 64px;
    min-height: 100vh;
  }
  
  &-sidebar {
    position: fixed;
    left: 0;
    top: 64px;
    bottom: 0;
    width: 240px;
    z-index: 50;
  }
  
  &-main {
    flex: 1;
    margin-left: 240px;
    padding: 32px;
    max-width: 1400px;
  }
  
  &.is-mobile {
    padding-bottom: 72px;
    
    .app-layout-body {
      padding-top: 0;
    }
    
    .app-layout-main {
      margin-left: 0;
      padding: 16px;
    }
  }
}
</style>
