<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { buildAntdTheme } from './theme/antd'
import { useThemeStore } from './stores/theme'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import BlankLayout from './layouts/BlankLayout.vue'

type LayoutKey = 'default' | 'auth' | 'blank'

const layouts: Record<LayoutKey, typeof DefaultLayout> = {
  default: DefaultLayout,
  auth: AuthLayout,
  blank: BlankLayout,
}

const route = useRoute()
const themeStore = useThemeStore()

const currentLayout = computed(() => {
  const layout = (route.meta.layout as LayoutKey | undefined) ?? 'default'
  return layouts[layout] ?? DefaultLayout
})

const antdTheme = computed(() => buildAntdTheme(themeStore.resolvedTheme === 'dark'))
</script>

<template>
  <a-config-provider :theme="antdTheme">
    <component :is="currentLayout">
      <RouterView />
    </component>
  </a-config-provider>
</template>
