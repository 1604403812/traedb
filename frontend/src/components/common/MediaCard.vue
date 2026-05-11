<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    title: string
    subtitle: string
    meta?: string
    category?: string
    badge?: string
    accent?: string
    to?: string
    ratio?: 'portrait' | 'square' | 'wide'
  }>(),
  {
    meta: '',
    category: '',
    badge: '',
    accent: 'var(--color-primary)',
    to: '',
    ratio: 'portrait',
  },
)

const coverClass = computed(() => `media-card__cover--${props.ratio}`)
const styleObject = computed(() => ({ '--media-accent': props.accent }))
const monogram = computed(() => props.title.slice(0, 2))
</script>

<template>
  <component :is="to ? RouterLink : 'article'" v-bind="to ? { to } : {}" class="media-card" :style="styleObject">
    <div class="media-card__cover" :class="coverClass">
      <span v-if="category" class="media-card__category">{{ category }}</span>
      <strong class="media-card__monogram">{{ monogram }}</strong>
      <span v-if="badge" class="media-card__badge">{{ badge }}</span>
    </div>
    <div class="media-card__body">
      <h3>{{ title }}</h3>
      <p>{{ subtitle }}</p>
      <small v-if="meta">{{ meta }}</small>
    </div>
  </component>
</template>
