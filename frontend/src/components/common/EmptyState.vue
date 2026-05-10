<template>
  <div class="empty-state">
    <div class="empty-state__illustration">
      <slot name="illustration">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" fill="var(--color-bg-secondary)"/>
          <path d="M40 70C40 70 45 60 60 60C75 60 80 70 80 70" stroke="var(--color-border)" stroke-width="3" stroke-linecap="round"/>
          <circle cx="45" cy="50" r="4" fill="var(--color-text-muted)"/>
          <circle cx="75" cy="50" r="4" fill="var(--color-text-muted)"/>
          <path d="M45 85H75" stroke="var(--color-border)" stroke-width="3" stroke-linecap="round"/>
          <path d="M55 85V92" stroke="var(--color-border)" stroke-width="3" stroke-linecap="round"/>
          <path d="M65 85V92" stroke="var(--color-border)" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </slot>
    </div>
    
    <h3 class="empty-state__title">{{ title }}</h3>
    <p v-if="description" class="empty-state__description">{{ description }}</p>
    
    <div v-if="$slots.action" class="empty-state__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  text-align: center;
  
  &__illustration {
    margin-bottom: 24px;
    
    svg {
      opacity: 0.8;
    }
  }
  
  &__title {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 8px;
  }
  
  &__description {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: 0 0 24px;
    max-width: 320px;
    line-height: var(--line-height-relaxed);
  }
  
  &__action {
    display: flex;
    gap: 12px;
  }
}
</style>
