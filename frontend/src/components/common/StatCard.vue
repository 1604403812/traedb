<script setup lang="ts">
import GlassCard from './GlassCard.vue'

withDefaults(
  defineProps<{
    label: string
    value: string
    hint: string
    accent?: string
  }>(),
  {
    accent: 'var(--color-primary)',
  },
)
</script>

<template>
  <GlassCard class="stat-card" :accent="accent" interactive>
    <p class="stat-card__label">{{ label }}</p>
    <strong class="stat-card__value">{{ value }}</strong>
    <p class="stat-card__hint">{{ hint }}</p>
  </GlassCard>
</template>
