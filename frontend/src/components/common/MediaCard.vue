<template>
  <component
    :is="component"
    class="media-card"
    :class="[
      `media-card--${type}`,
      `media-card--${size}`,
      { 'media-card--clickable': to || clickable }
    ]"
    :to="to"
    @click="handleClick"
  >
    <div class="media-card__cover">
      <img
        v-if="cover"
        :src="cover"
        :alt="title"
        class="media-card__img"
        loading="lazy"
      />
      <div v-else class="media-card__placeholder">
        <component :is="placeholderIcon" :size="32" weight="light" />
      </div>
      
      <div v-if="type === 'audio' && duration" class="media-card__duration">
        {{ formatDuration(duration) }}
      </div>
      
      <div v-if="type === 'novel' && progress !== undefined" class="media-card__progress">
        <a-progress
          :percent="progress"
          :show-info="false"
          :stroke-color="'var(--color-novel)'"
          size="small"
        />
      </div>
      
      <div class="media-card__overlay">
        <slot name="overlay" />
      </div>
    </div>
    
    <div class="media-card__info">
      <h4 class="media-card__title">{{ title }}</h4>
      <p v-if="subtitle" class="media-card__subtitle">{{ subtitle }}</p>
      
      <div class="media-card__meta">
        <slot name="meta" />
        
        <div v-if="rating !== undefined" class="media-card__rating">
          <a-rate
            :model-value="rating"
            :count="5"
            :allow-half="true"
            :disabled="true"
            size="small"
          />
        </div>
        
        <button
          v-if="favoriteable"
          class="media-card__favorite"
          :class="{ 'is-favorited': isFavorited }"
          @click.prevent="toggleFavorite"
        >
          <Heart :size="16" :weight="isFavorited ? 'fill' : 'regular'" />
        </button>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { ref, computed, type Component, type RouteLocationRaw } from 'vue';
import { Heart, MusicNotes, BookOpen, Image, Film } from '@phosphor-icons/vue';

interface Props {
  title: string;
  subtitle?: string;
  cover?: string;
  type?: 'audio' | 'novel' | 'image' | 'video';
  size?: 'sm' | 'md' | 'lg';
  to?: RouteLocationRaw;
  clickable?: boolean;
  duration?: number;
  progress?: number;
  rating?: number;
  favoritable?: boolean;
  favorited?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'audio',
  size: 'md',
  clickable: false,
  favoritable: false,
  favorited: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
  'update:favorited': [value: boolean];
}>();

const isFavorited = ref(props.favorited);
const favoriteable = computed(() => props.favoritable);

const component = computed(() => {
  if (props.to || props.clickable) return 'router-link';
  return 'div';
});

const placeholderIcon = computed(() => {
  switch (props.type) {
    case 'audio': return MusicNotes;
    case 'novel': return BookOpen;
    case 'image': return Image;
    case 'video': return Film;
    default: return Image;
  }
});

const handleClick = (e: MouseEvent) => {
  emit('click', e);
};

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
  emit('update:favorited', isFavorited.value);
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
</script>

<style lang="scss" scoped>
.media-card {
  display: block;
  text-decoration: none;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all var(--transition-bounce);
  
  &--clickable:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    
    .media-card__img {
      transform: scale(1.03);
    }
  }
  
  &__cover {
    position: relative;
    overflow: hidden;
    aspect-ratio: 3 / 4;
    
    .media-card--novel & {
      aspect-ratio: 2 / 3;
    }
  }
  
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-base);
  }
  
  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg-secondary);
    color: var(--color-text-muted);
  }
  
  &__duration {
    position: absolute;
    bottom: 8px;
    right: 8px;
    padding: 4px 8px;
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-medium);
    color: white;
    background: rgba(0, 0, 0, 0.6);
    border-radius: var(--radius-sm);
    backdrop-filter: blur(4px);
  }
  
  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 8px 8px;
    
    :deep(.ant-progress) {
      .ant-progress-inner {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
  
  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity var(--transition-fast);
  }
  
  &--clickable:hover &__overlay {
    opacity: 1;
  }
  
  &__info {
    padding: 12px;
  }
  
  &__title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 4px;
    line-height: var(--line-height-snug);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__subtitle {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    margin: 0 0 8px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  &__meta {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  &__rating {
    flex: 1;
    
    :deep(.ant-rate) {
      font-size: 12px;
      
      .ant-rate-star-full .anticon {
        color: var(--color-rating);
      }
    }
  }
  
  &__favorite {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: var(--radius-full);
    color: var(--color-text-muted);
    transition: all var(--transition-fast);
    flex-shrink: 0;
    
    &:hover {
      color: var(--color-favorite);
      background: var(--color-favorite-bg);
    }
    
    &.is-favorited {
      color: var(--color-favorite);
      
      svg {
        animation: heartbeat 0.4s ease;
      }
    }
  }
}
</style>
