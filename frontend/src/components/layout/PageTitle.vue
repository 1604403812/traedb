<template>
  <div class="page-title" :class="{ 'has-breadcrumb': breadcrumbs.length > 1 }">
    <div class="page-title__main">
      <div class="page-title__icon" v-if="icon">
        <component :is="icon" :size="28" weight="regular" />
      </div>
      <h1 class="page-title__text">{{ title }}</h1>
      <div class="page-title__actions">
        <slot name="actions" />
      </div>
    </div>
    
    <a-breadcrumb v-if="breadcrumbs.length > 1" class="page-title__breadcrumb">
      <a-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link v-if="crumb.path && index < breadcrumbs.length - 1" :to="crumb.path">
          {{ crumb.label }}
        </router-link>
        <span v-else>{{ crumb.label }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

interface Breadcrumb {
  label: string;
  path?: string;
}

interface Props {
  title: string;
  icon?: Component;
  breadcrumbs?: Breadcrumb[];
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => []
});
</script>

<style lang="scss" scoped>
.page-title {
  margin-bottom: 32px;
  
  &__main {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: var(--radius-lg);
    background: var(--color-primary-bg);
    color: var(--color-primary);
    
    &:empty {
      display: none;
    }
  }
  
  &__text {
    flex: 1;
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0;
  }
  
  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  &__breadcrumb {
    margin-top: 12px;
    
    :deep(.ant-breadcrumb) {
      font-size: var(--font-size-sm);
      
      li {
        &:last-child span {
          color: var(--color-text-secondary);
        }
      }
      
      a {
        color: var(--color-text-muted);
        transition: color var(--transition-fast);
        
        &:hover {
          color: var(--color-primary);
        }
      }
    }
  }
}
</style>
