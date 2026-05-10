<template>
  <div
    class="glass-card"
    :class="[
      `glass-card--${size}`,
      { 'glass-card--hoverable': hoverable },
      { 'glass-card--clickable': clickable }
    ]"
    @click="handleClick"
  >
    <div v-if="$slots.media" class="glass-card__media">
      <slot name="media" />
    </div>
    
    <div class="glass-card__body" :class="{ 'glass-card__body--no-padding': noPadding }">
      <div v-if="$slots.header || title" class="glass-card__header">
        <slot name="header">
          <h3 class="glass-card__title">{{ title }}</h3>
          <p v-if="subtitle" class="glass-card__subtitle">{{ subtitle }}</p>
        </slot>
      </div>
      
      <div class="glass-card__content">
        <slot />
      </div>
      
      <div v-if="$slots.footer" class="glass-card__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  noPadding?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  hoverable: false,
  clickable: false,
  noPadding: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (e: MouseEvent) => {
  if (props.clickable) {
    emit('click', e);
  }
};
</script>

<style lang="scss" scoped>
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: all var(--transition-bounce);
  
  &--sm {
    border-radius: var(--radius-md);
  }
  
  &--lg {
    border-radius: var(--radius-xl);
  }
  
  &--hoverable:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
  
  &--clickable {
    cursor: pointer;
  }
  
  &__media {
    position: relative;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-base);
    }
  }
  
  &__body {
    padding: 20px;
    
    &--no-padding {
      padding: 0;
    }
  }
  
  &__header {
    margin-bottom: 16px;
  }
  
  &__title {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 4px;
    line-height: var(--line-height-snug);
  }
  
  &__subtitle {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    margin: 0;
  }
  
  &__content {
    color: var(--color-text-secondary);
    font-size: var(--font-size-sm);
  }
  
  &__footer {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border-secondary);
  }
}
</style>
