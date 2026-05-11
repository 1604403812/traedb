<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue'

withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
  }>(),
  {
    placeholder: '搜索内容',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="search-field">
    <SearchOutlined class="search-field__icon" />
    <input :value="modelValue" :placeholder="placeholder" @input="handleInput" />
  </label>
</template>
