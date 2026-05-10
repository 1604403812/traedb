<template>
  <div class="stat-card" :class="[`stat-card--${module}`, { 'stat-card--clickable': clickable }]">
    <div class="stat-card__icon">
      <slot name="icon">
        <component :is="icon" :size="24" weight="regular" />
      </slot>
    </div>
    
    <div class="stat-card__content">
      <div class="stat-card__value">{{ displayValue }}</div>
      <div class="stat-card__label">{{ label }}</div>
    </div>
    
    <div v-if="$slots.extra" class="stat-card__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue';
import { formatNumber, formatBytes } from '@/utils/format';

interface Props {
  value: number | string;
  label: string;
  icon?: Component;
  module?: 'default' | 'audio' | 'novel' | 'wiki' | 'bead' | 'drive';
  format?: 'number' | 'bytes' | 'percent' | 'none';
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  module: 'default',
  format: 'number',
  clickable: false,
});

const displayValue = computed(() => {
  if (props.format === 'none' || typeof props.value === 'string') {
    return props.value;
  }
  
  switch (props.format) {
    case 'bytes':
      return formatBytes(Number(props.value));
    case 'percent':
      return `${props.value}%`;
    case 'number':
    default:
      return formatNumber(Number(props.value));
  }
});
</script>

<style lang="scss" scoped>
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-bounce);
  
  &--clickable {
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    background: var(--color-primary-bg);
    color: var(--color-primary);
    flex-shrink: 0;
  }
  
  &--audio .stat-card__icon {
    background: var(--color-audio-bg);
    color: var(--color-audio);
  }
  
  &--novel .stat-card__icon {
    background: var(--color-novel-bg);
    color: var(--color-novel);
  }
  
  &--wiki .stat-card__icon {
    background: var(--color-wiki-bg);
    color: var(--color-wiki);
  }
  
  &--bead .stat-card__icon {
    background: var(--color-bead-bg);
    color: var(--color-bead);
  }
  
  &--drive .stat-card__icon {
    background: var(--color-drive-bg);
    color: var(--color-drive);
  }
  
  &__content {
    flex: 1;
    min-width: 0;
  }
  
  &__value {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    line-height: 1;
    margin-bottom: 4px;
  }
  
  &__label {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
  
  &__extra {
    flex-shrink: 0;
  }
}
</style>
