<template>
  <div class="loading-spinner" :class="`loading-spinner--${size}`">
    <svg class="loading-spinner__circle" viewBox="0 0 50 50">
      <circle
        class="loading-spinner__track"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="4"
      />
      <circle
        class="loading-spinner__progress"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>
    
    <div v-if="text" class="loading-spinner__text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  text: ''
});
</script>

<style lang="scss" scoped>
.loading-spinner {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  &--sm {
    .loading-spinner__circle {
      width: 20px;
      height: 20px;
    }
  }
  
  &--md {
    .loading-spinner__circle {
      width: 32px;
      height: 32px;
    }
  }
  
  &--lg {
    .loading-spinner__circle {
      width: 48px;
      height: 48px;
    }
  }
  
  &__circle {
    animation: spin 1s linear infinite;
  }
  
  &__track {
    stroke: var(--color-border);
  }
  
  &__progress {
    stroke: var(--color-primary);
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    animation: dash 1.5s ease-in-out infinite;
  }
  
  &__text {
    margin-top: 12px;
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
