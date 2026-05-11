import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

type ThemeMode = 'system' | 'light' | 'dark'
type ThemeValue = 'light' | 'dark'

const STORAGE_KEY = 'solo.personal.app.theme'

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>('system')
  const systemTheme = ref<ThemeValue>('light')
  const resolvedTheme = computed<ThemeValue>(() =>
    mode.value === 'system' ? systemTheme.value : mode.value,
  )

  function syncSystemTheme() {
    if (typeof window === 'undefined') {
      return
    }

    systemTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  function applyTheme(theme: ThemeValue) {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }

  function setMode(nextMode: ThemeMode) {
    mode.value = nextMode
    localStorage.setItem(STORAGE_KEY, nextMode)
  }

  function cycleTheme() {
    const order: ThemeMode[] = ['system', 'light', 'dark']
    const currentIndex = order.indexOf(mode.value)
    const nextIndex = (currentIndex + 1) % order.length
    setMode(order[nextIndex])
  }

  function initTheme() {
    if (typeof window === 'undefined') {
      return
    }

    const savedMode = localStorage.getItem(STORAGE_KEY)
    if (savedMode === 'system' || savedMode === 'light' || savedMode === 'dark') {
      mode.value = savedMode
    }

    syncSystemTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      syncSystemTheme()
    }

    mediaQuery.addEventListener('change', handleChange)

    watch(
      resolvedTheme,
      (value) => {
        applyTheme(value)
      },
      { immediate: true },
    )
  }

  return {
    mode,
    resolvedTheme,
    setMode,
    cycleTheme,
    initTheme,
  }
})
