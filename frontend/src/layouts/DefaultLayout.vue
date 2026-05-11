<script setup lang="ts">
import AppHeader from '../components/common/AppHeader.vue'
import AppSidebar from '../components/common/AppSidebar.vue'
import AppTabBar from '../components/common/AppTabBar.vue'
</script>

<template>
  <div class="app-frame">
    <div class="ambient ambient--one" />
    <div class="ambient ambient--two" />
    <AppHeader />

    <div class="shell-grid">
      <AppSidebar />
      <main class="content-shell">
        <slot />
      </main>
    </div>

    <AppTabBar />
  </div>
</template>
