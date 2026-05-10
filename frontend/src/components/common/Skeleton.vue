<template>
  <div class="skeleton" :class="[`skeleton--${variant}`, { 'skeleton--animate': animate }]">
    <div v-if="variant === 'card'" class="skeleton__card">
      <div class="skeleton__cover"></div>
      <div class="skeleton__content">
        <div class="skeleton__line skeleton__line--title"></div>
        <div class="skeleton__line skeleton__line--text"></div>
        <div class="skeleton__line skeleton__line--text skeleton__line--short"></div>
      </div>
    </div>
    
    <div v-else-if="variant === 'avatar'" class="skeleton__avatar">
      <div class="skeleton__circle"></div>
      <div class="skeleton__content">
        <div class="skeleton__line skeleton__line--title"></div>
        <div class="skeleton__line skeleton__line--text"></div>
      </div>
    </div>
    
    <div v-else-if="variant === 'list'" class="skeleton__list">
      <div v-for="i in count" :key="i" class="skeleton__list-item">
        <div class="skeleton__circle skeleton__circle--sm"></div>
        <div class="skeleton__content">
          <div class="skeleton__line skeleton__line--title"></div>
          <div class="skeleton__line skeleton__line--text skeleton__line--short"></div>
        </div>
      </div>
    </div>
    
    <div v-else class="skeleton__text">
      <div v-for="i in lines" :key="i" 
           class="skeleton__line" 
           :class="{ 'skeleton__line--short': i === lines && lastShort }">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'text' | 'card' | 'avatar' | 'list';
  lines?: number;
  count?: number;
  animate?: boolean;
  lastShort?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'text',
  lines: 3,
  count: 3,
  animate: true,
  lastShort: false,
});
</script>

<style lang="scss" scoped>
.skeleton {
  &--animate {
    .skeleton__line,
    .skeleton__cover,
    .skeleton__circle {
      background: linear-gradient(
        90deg,
        var(--color-bg-tertiary) 25%,
        var(--color-bg-secondary) 50%,
        var(--color-bg-tertiary) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
  }
  
  &__cover {
    width: 100%;
    aspect-ratio: 3 / 4;
    border-radius: var(--radius-md);
    background: var(--color-bg-tertiary);
  }
  
  &__content {
    flex: 1;
  }
  
  &__line {
    height: 14px;
    border-radius: var(--radius-sm);
    background: var(--color-bg-tertiary);
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &--title {
      width: 70%;
      height: 16px;
    }
    
    &--text {
      width: 100%;
    }
    
    &--short {
      width: 50%;
    }
  }
  
  &__circle {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    background: var(--color-bg-tertiary);
    flex-shrink: 0;
    
    &--sm {
      width: 32px;
      height: 32px;
    }
  }
  
  &__card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    background: var(--glass-bg);
    border-radius: var(--radius-lg);
  }
  
  &__avatar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: var(--glass-bg);
    border-radius: var(--radius-lg);
  }
  
  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  &__list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background: var(--glass-bg);
    border-radius: var(--radius-md);
  }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
