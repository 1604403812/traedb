<template>
  <div class="page-view">
    <PageTitle title="小说书架" :icon="BookOpen">
      <template #actions>
        <a-button @click="handleImport">
          <template #icon><Upload :size="16" /></template>
          导入
        </a-button>
        <a-button type="primary" @click="showAddModal = true">
          <template #icon><Plus :size="16" /></template>
          添加
        </a-button>
      </template>
    </PageTitle>

    <div class="page-view__filters">
      <SearchInput
        v-model="searchQuery"
        placeholder="搜索小说..."
        class="page-view__search"
      />
      
      <div class="page-view__status-tabs">
        <a-tag
          v-for="status in statusFilters"
          :key="status.value"
          :class="{ 'is-active': activeStatus === status.value }"
          @click="activeStatus = status.value"
        >
          {{ status.label }} ({{ status.count }})
        </a-tag>
      </div>
    </div>

    <div class="page-view__grid">
      <MediaCard
        v-for="(item, index) in novelList"
        :key="item.id"
        type="novel"
        :title="item.title"
        :subtitle="item.author"
        :cover="item.cover_url"
        :progress="item.status === 'reading' ? item.progress : undefined"
        :rating="item.rating"
        :to="`/novel/${item.id}`"
        :style="{ animationDelay: `${index * 50}ms` }"
        class="page-view__card"
      />
    </div>

    <EmptyState
      v-if="novelList.length === 0"
      title="还没有小说"
      description="点击右上角添加你的第一本小说"
    >
      <template #action>
        <a-button type="primary" @click="showAddModal = true">
          <template #icon><Plus :size="16" /></template>
          添加小说
        </a-button>
      </template>
    </EmptyState>

    <div v-if="novelList.length > 0" class="page-view__pagination">
      <a-pagination
        v-model:current="currentPage"
        :total="total"
        :page-size="pageSize"
        show-quick-jumper
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PageTitle from '@/components/layout/PageTitle.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import MediaCard from '@/components/common/MediaCard.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { BookOpen, Plus, Upload } from '@phosphor-icons/vue';

const searchQuery = ref('');
const activeStatus = ref('all');
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const showAddModal = ref(false);

interface NovelItem {
  id: number;
  title: string;
  author: string;
  cover_url?: string;
  status: 'unread' | 'reading' | 'completed';
  progress: number;
  rating: number;
}

const novelList = ref<NovelItem[]>([
  { id: 1, title: '小说标题1', author: '作者1', status: 'reading', progress: 50, rating: 4 },
  { id: 2, title: '小说标题2', author: '作者2', status: 'completed', progress: 100, rating: 5 },
  { id: 3, title: '小说标题3', author: '作者3', status: 'unread', progress: 0, rating: 0 },
]);

const statusFilters = [
  { label: '全部', value: 'all', count: 50 },
  { label: '未读', value: 'unread', count: 12 },
  { label: '阅读中', value: 'reading', count: 5 },
  { label: '已读完', value: 'completed', count: 33 },
];

const handleImport = () => console.log('Import');
onMounted(() => {});
</script>

<style lang="scss" scoped>
.page-view {
  max-width: 1400px;
  margin: 0 auto;
  
  &__filters {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  &__search {
    max-width: 400px;
  }
  
  &__status-tabs {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    
    :deep(.ant-tag) {
      cursor: pointer;
      border-radius: var(--radius-full);
      transition: all var(--transition-fast);
      
      &:hover, &.is-active {
        background: var(--color-novel-bg);
        color: var(--color-novel);
        border-color: var(--color-novel);
      }
    }
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
  
  &__card {
    animation: fadeInUp 0.4s ease-out both;
  }
  
  &__pagination {
    display: flex;
    justify-content: center;
    padding: 24px 0;
  }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
