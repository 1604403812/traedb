<template>
  <div class="search-input" :class="{ 'is-focused': isFocused, 'has-value': modelValue }">
    <label class="search-input__label" :for="inputId">
      <slot name="icon">
        <MagnifyingGlass :size="18" weight="regular" />
      </slot>
    </label>
    
    <input
      :id="inputId"
      ref="inputRef"
      class="search-input__field"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @keydown.escape="handleClear"
    />
    
    <button
      v-if="modelValue"
      class="search-input__clear"
      type="button"
      @click="handleClear"
      aria-label="清除搜索"
    >
      <X :size="16" weight="bold" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MagnifyingGlass, X } from '@phosphor-icons/vue';
import { nanoid } from 'nanoid';

interface Props {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '搜索...',
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  search: [value: string];
}>();

const inputId = `search-${nanoid(6)}`;
const inputRef = ref<HTMLInputElement>();
const isFocused = ref(false);

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit('update:modelValue', value);
  emit('search', value);
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('search', '');
  inputRef.value?.focus();
};

const focus = () => {
  inputRef.value?.focus();
};

defineExpose({ focus });
</script>

<style lang="scss" scoped>
.search-input {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--color-surface-solid);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  
  &:hover {
    border-color: var(--color-primary-light);
  }
  
  &.is-focused {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px var(--color-primary-bg);
  }
  
  &__label {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 14px;
    color: var(--color-text-muted);
    pointer-events: none;
  }
  
  &__field {
    flex: 1;
    width: 100%;
    padding: 12px 14px;
    font-size: var(--font-size-sm);
    color: var(--color-text-primary);
    background: transparent;
    border: none;
    outline: none;
    
    &::placeholder {
      color: var(--color-text-muted);
    }
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
  
  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 6px;
    border-radius: var(--radius-full);
    color: var(--color-text-muted);
    transition: all var(--transition-fast);
    
    &:hover {
      color: var(--color-text-primary);
      background: var(--color-bg-tertiary);
    }
  }
}
</style>
