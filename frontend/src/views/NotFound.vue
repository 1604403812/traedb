<template>
  <div class="not-found">
    <div class="not-found__content">
      <div class="not-found__illustration">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="var(--color-bg-secondary)"/>
          <text x="100" y="115" text-anchor="middle" font-size="48" font-weight="bold" fill="var(--color-text-muted)">404</text>
        </svg>
      </div>
      
      <h1 class="not-found__title">页面不存在</h1>
      <p class="not-found__description">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      
      <div class="not-found__actions">
        <a-button type="primary" size="large" @click="$router.push('/')">
          返回首页
        </a-button>
        <a-button size="large" @click="$router.back()">
          返回上一页
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
  
  &__content {
    text-align: center;
    max-width: 480px;
  }
  
  &__illustration {
    margin-bottom: 32px;
    
    svg {
      opacity: 0.8;
    }
  }
  
  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin: 0 0 12px;
  }
  
  &__description {
    font-size: var(--font-size-base);
    color: var(--color-text-secondary);
    margin: 0 0 32px;
    line-height: var(--line-height-relaxed);
  }
  
  &__actions {
    display: flex;
    gap: 12px;
    justify-content: center;
  }
}
</style>
