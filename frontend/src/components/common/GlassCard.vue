<script setup lang="ts">
withDefaults(
  defineProps<{
    accent?: string
    interactive?: boolean
    inset?: boolean
  }>(),
  {
    accent: 'var(--color-primary)',
    interactive: false,
    inset: false,
  },
)
</script>

<template>
  <section
    class="glass-card"
    :class="{ 'is-interactive': interactive, 'is-inset': inset }"
    :style="{ '--card-accent': accent }"
  >
    <slot />
  </section>
</template>
