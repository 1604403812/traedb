<template>
  <div class="detail-view">
    <PageTitle :title="novel.title" :breadcrumbs="breadcrumbs">
      <template #actions>
        <a-button @click="handleRead">
          <template #icon><BookOpen :size="16" /></template>
          开始阅读
        </a-button>
        <a-button @click="handleEdit">
          <template #icon><Pencil :size="16" /></template>
          编辑
        </a-button>
      </template>
    </PageTitle>

    <div class="detail-view__content">
      <div class="detail-view__cover">
        <img
          v-if="novel.cover_url"
          :src="novel.cover_url"
          :alt="novel.title"
        />
        <div v-else class="detail-view__cover-placeholder">
          <BookOpen :size="48" weight="light" />
        </div>
      </div>

      <div class="detail-view__info">
        <h1 class="detail-view__title">{{ novel.title }}</h1>
        <p class="detail-view__author">作者: {{ novel.author }}</p>

        <div class="detail-view__progress">
          <a-progress
            :percent="novel.reading_progress"
            :stroke-color="'var(--color-novel)'"
          />
          <span>{{ novel.reading_progress }}% 已读</span>
        </div>

        <div class="detail-view__rating">
          <a-rate :model-value="novel.rating" :count="5" allow-half :disabled="true" />
        </div>

        <a-descriptions :column="2" class="detail-view__meta">
          <a-descriptions-item label="平台">{{ novel.platform }}</a-descriptions-item>
          <a-descriptions-item label="字数">{{ formatWordCount(novel.word_count) }}</a-descriptions-item>
        </a-descriptions>

        <div v-if="novel.tags?.length" class="detail-view__tags">
          <a-tag v-for="tag in novel.tags" :key="tag.id">{{ tag.name }}</a-tag>
        </div>

        <div v-if="novel.short_summary" class="detail-view__summary">
          <h3>简介</h3>
          <p>{{ novel.short_summary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTitle from '@/components/layout/PageTitle.vue';
import { BookOpen, Pencil } from '@phosphor-icons/vue';

const route = useRoute();
const router = useRouter();

interface NovelDetail {
  id: number;
  title: string;
  author: string;
  platform: string;
  cover_url?: string;
  short_summary?: string;
  summary?: string;
  word_count: number;
  reading_progress: number;
  rating: number;
  is_favorite: boolean;
  tags: { id: number; name: string }[];
}

const novel = ref<NovelDetail>({
  id: Number(route.params.id),
  title: '小说标题',
  author: '作者名',
  platform: '起点中文网',
  word_count: 500000,
  reading_progress: 75,
  rating: 4,
  is_favorite: true,
  tags: [],
});

const breadcrumbs = [
  { label: '首页', path: '/' },
  { label: '小说管理', path: '/novel' },
  { label: '小说详情' },
];

const formatWordCount = (count: number) => {
  if (count >= 10000) return (count / 10000).toFixed(1) + '万字';
  return count + '字';
};

const handleRead = () => {
  router.push(`/novel/${novel.value.id}/read`);
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
    grid-template-columns: 200px 1fr;
    gap: 48px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
  
  &__cover {
    aspect-ratio: 2 / 3;
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
  
  &__author {
    font-size: var(--font-size-md);
    color: var(--color-text-secondary);
    margin: 0 0 16px;
  }
  
  &__progress {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    
    span {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }
  }
  
  &__rating {
    margin-bottom: 24px;
    
    :deep(.ant-rate-star-full .anticon) {
      color: var(--color-rating);
    }
  }
  
  &__meta {
    margin-bottom: 24px;
  }
  
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
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
