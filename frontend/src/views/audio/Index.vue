<template>
  <div class="page-view">
    <PageTitle title="音声管理" :icon="AudioLines">
      <template #actions>
        <a-button @click="handleSync">
          <template #icon><ArrowsClockwise :size="16" /></template>
          同步
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
        placeholder="搜索音声..."
        class="page-view__search"
        @search="handleSearch"
      />
      
      <div class="page-view__filter-tags">
        <a-tag
          v-for="tag in filterTags"
          :key="tag.value"
          :color="tag.color"
          :class="{ 'is-active': activeFilters.includes(tag.value) }"
          @click="toggleFilter(tag.value)"
        >
          {{ tag.label }}
        </a-tag>
      </div>
    </div>

    <div class="page-view__grid">
      <MediaCard
        v-for="(item, index) in audioList"
        :key="item.id"
        type="audio"
        :title="item.title"
        :subtitle="`${item.circle} · ${item.cv}`"
        :cover="item.cover_url"
        :rating="item.rating"
        :to="`/audio/${item.id}`"
        :style="{ animationDelay: `${index * 50}ms` }"
        class="page-view__card"
      />
    </div>

    <div v-if="loading" class="page-view__loading">
      <LoadingSpinner text="加载中..." />
    </div>

    <EmptyState
      v-else-if="!loading && audioList.length === 0"
      title="还没有音声"
      description="点击右上角添加你的第一个音声收藏"
    >
      <template #action>
        <a-button type="primary" @click="showAddModal = true">
          <template #icon><Plus :size="16" /></template>
          添加音声
        </a-button>
      </template>
    </EmptyState>

    <div v-if="audioList.length > 0" class="page-view__pagination">
      <a-pagination
        v-model:current="currentPage"
        :total="total"
        :page-size="pageSize"
        show-quick-jumper
        @change="handlePageChange"
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
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import { AudioLines, Plus, ArrowsClockwise } from '@phosphor-icons/vue';

const searchQuery = ref('');
const activeFilters = ref<string[]>([]);
const currentPage = ref(1);
const pageSize = ref(20);
const total = ref(0);
const loading = ref(false);
const showAddModal = ref(false);

interface AudioItem {
  id: number;
  title: string;
  circle: string;
  cv: string;
  cover_url?: string;
  rating: number;
  is_favorite: boolean;
}

const audioList = ref<AudioItem[]>([]);

const filterTags = [
  { label: '收藏', value: 'favorite', color: 'pink' },
  { label: '已评分', value: 'rated', color: 'gold' },
];

const handleSearch = (query: string) => {
  console.log('Search:', query);
};

const toggleFilter = (filter: string) => {
  const index = activeFilters.value.indexOf(filter);
  if (index === -1) {
    activeFilters.value.push(filter);
  } else {
    activeFilters.value.splice(index, 1);
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleSync = () => {
  console.log('Sync');
};

onMounted(() => {
  audioList.value = [];
});
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
  
  &__filter-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    
    :deep(.ant-tag) {
      cursor: pointer;
      border-radius: var(--radius-full);
      padding: 4px 12px;
      transition: all var(--transition-fast);
      
      &:hover, &.is-active {
        opacity: 1;
        transform: scale(1.02);
      }
    }
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
  }
  
  &__card {
    animation: fadeInUp 0.4s ease-out both;
  }
  
  &__loading {
    display: flex;
    justify-content: center;
    padding: 64px;
  }
  
  &__pagination {
    display: flex;
    justify-content: center;
    padding: 24px 0;
    
    :deep(.ant-pagination-item-active) {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
