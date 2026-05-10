<template>
  <ConfigProvider :theme="morandiTheme">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import { RouterView } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { useAuthStore } from '@/stores/auth';
import { morandiTheme } from '@/theme';

const themeStore = useThemeStore();
const authStore = useAuthStore();

onMounted(() => {
  themeStore.init();
  
  if (authStore.isAuthenticated && !authStore.user) {
    authStore.fetchUserInfo();
  }
});
</script>

<style lang="scss">
#app {
  min-height: 100vh;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
