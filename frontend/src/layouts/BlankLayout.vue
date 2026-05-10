<template>
  <div class="blank-layout">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.blank-layout {
  min-height: 100vh;
  background: var(--color-bg-primary);
}
</style>
