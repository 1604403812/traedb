<template>
  <div class="detail-view">
    <PageTitle :title="audio.title" :breadcrumbs="breadcrumbs">
      <template #actions>
        <a-button @click="handleEdit">
          <template #icon><Pencil :size="16" /></template>
          编辑
        </a-button>
      </template>
    </PageTitle>

    <div class="detail-view__content">
      <div class="detail-view__cover">
        <img
          v-if="audio.cover_url"
          :src="audio.cover_url"
          :alt="audio.title"
        />
        <div v-else class="detail-view__cover-placeholder">
          <MusicNotes :size="48" weight="light" />
        </div>
      </div>

      <div class="detail-view__info">
        <h1 class="detail-view__title">{{ audio.title }}</h1>
        <p class="detail-view__subtitle">{{ audio.circle }} · {{ audio.cv }}</p>

        <div class="detail-view__rating">
          <a-rate :model-value="audio.rating" :count="5" allow-half :disabled="true" />
          <span class="detail-view__rating-count">{{ audio.play_count }}次播放</span>
        </div>

        <div class="detail-view__actions">
          <a-button type="primary" size="large" @click="handlePlay">
            <template #icon><Play :size="18" /></template>
            播放
          </a-button>
          <a-button size="large" @click="handleFavorite">
            <template #icon>
              <Heart :size="18" :weight="audio.is_favorite ? 'fill' : 'regular'" />
            </template>
            {{ audio.is_favorite ? '已收藏' : '收藏' }}
          </a-button>
        </div>

        <a-descriptions :column="1" class="detail-view__meta">
          <a-descriptions-item label="编号">{{ audio.code }}</a-descriptions-item>
          <a-descriptions-item label="发布">{{ audio.release_date }}</a-descriptions-item>
          <a-descriptions-item label="系列">{{ audio.series || '-' }}</a-descriptions-item>
        </a-descriptions>

        <div v-if="audio.tags?.length" class="detail-view__tags">
          <a-tag v-for="tag in audio.tags" :key="tag.id" :color="tag.color">
            {{ tag.name }}
          </a-tag>
        </div>

        <div v-if="audio.summary" class="detail-view__summary">
          <h3>简介</h3>
          <p>{{ audio.summary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PageTitle from '@/components/layout/PageTitle.vue';
import { MusicNotes, Play, Heart, Pencil } from '@phosphor-icons/vue';

const route = useRoute();

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface AudioDetail {
  id: number;
  title: string;
  code: string;
  circle: string;
  cv: string;
  series?: string;
  cover_url?: string;
  release_date?: string;
  summary?: string;
  rating: number;
  play_count: number;
  is_favorite: boolean;
  tags: Tag[];
}

const audio = ref<AudioDetail>({
  id: Number(route.params.id),
  title: '音声标题',
  code: 'AUDIO001',
  circle: '社团名',
  cv: '声优名',
  release_date: '2024-01-01',
  summary: '这是一段关于...',
  rating: 4.5,
  play_count: 128,
  is_favorite: true,
  tags: [],
});

const breadcrumbs = [
  { label: '首页', path: '/' },
  { label: '音声管理', path: '/audio' },
  { label: '音声详情' },
];

const handlePlay = () => {
  console.log('Play');
};

const handleFavorite = () => {
  audio.value.is_favorite = !audio.value.is_favorite;
};

const handleEdit = () => {
  console.log('Edit');
};
</script>

<style lang="scss" scoped>
.detail-view {
  max-width: 1200px;
  margin: 0 auto;
  
  &__content {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 48px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
  
  &__cover {
    aspect-ratio: 3 / 4;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    &-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-bg-secondary);
      color: var(--color-text-muted);
    }
  }
  
  &__info {
    display: flex;
    flex-direction: column;
  }
  
  &__title {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-primary);
    margin: 0 0 8px;
  }
  
  &__subtitle {
    font-size: var(--font-size-md);
    color: var(--color-text-secondary);
    margin: 0 0 16px;
  }
  
  &__rating {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
    
    :deep(.ant-rate-star-full .anticon) {
      color: var(--color-rating);
    }
  }
  
  &__rating-count {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }
  
  &__actions {
    display: flex;
    gap: 12px;
    margin-bottom: 32px;
  }
  
  &__meta {
    margin-bottom: 24px;
    
    :deep(.ant-descriptions-item-label) {
      color: var(--color-text-secondary);
    }
    
    :deep(.ant-descriptions-item-content) {
      color: var(--color-text-primary);
    }
  }
  
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
    
    :deep(.ant-tag) {
      border-radius: var(--radius-full);
    }
  }
  
  &__summary {
    h3 {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0 0 12px;
    }
    
    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      line-height: var(--line-height-relaxed);
    }
  }
}
</style>
