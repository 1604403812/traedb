<template>
  <div class="page-view">
    <PageTitle title="专辑" :icon="Disc" :breadcrumbs="breadcrumbs" />

    <div class="wiki-albums__filters">
      <a-select v-model:value="filterType" placeholder="专辑类型" style="width: 150px" allow-clear>
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="mini">Mini Album</a-select-option>
        <a-select-option value="full">Full Album</a-select-option>
        <a-select-option value="single">Single</a-select-option>
        <a-select-option value="digital">Digital</a-select-option>
      </a-select>
    </div>

    <div class="wiki-albums__grid">
      <router-link
        v-for="album in albums"
        :key="album.id"
        :to="`/wiki/albums/${album.id}`"
        class="wiki-albums__card"
      >
        <div class="wiki-albums__cover">
          <img :src="album.cover_url" :alt="album.title" />
          <div class="wiki-albums__overlay">
            <Play :size="32" weight="fill" />
          </div>
        </div>
        <div class="wiki-albums__info">
          <h3>{{ album.title }}</h3>
          <p>{{ album.title_korean }}</p>
          <span class="wiki-albums__meta">{{ album.release_date }} · {{ album.track_count }}首歌</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageTitle from '@/components/layout/PageTitle.vue';
import { Disc, Play } from '@phosphor-icons/vue';

const filterType = ref('');

const breadcrumbs = [
  { label: '首页', path: '/' },
  { label: 'TWICE Wiki', path: '/wiki' },
  { label: '专辑' },
];

const albums = [
  { id: 1, title: 'WITH OR ISYOU', title_korean: '위드오tois유', release_date: '2023', track_count: 12, cover_url: 'https://picsum.photos/300/400?random=a1' },
  { id: 2, title: 'READY TO BE', title_korean: '레디 투 비', release_date: '2023', track_count: 10, cover_url: 'https://picsum.photos/300/400?random=a2' },
  { id: 3, title: 'CELEBRATE', title_korean: '셀러브레이트', release_date: '2022', track_count: 11, cover_url: 'https://picsum.photos/300/400?random=a3' },
  { id: 4, title: 'Formula of Love', title_korean: '포뮬러 오브 러브', release_date: '2021', track_count: 17, cover_url: 'https://picsum.photos/300/400?random=a4' },
  { id: 5, title: 'Taste of Love', title_korean: '테이스트 오브 러브', release_date: '2021', track_count: 10, cover_url: 'https://picsum.photos/300/400?random=a5' },
  { id: 6, title: 'Eyes Wide Open', title_korean: '아이즈 와이드 오픈', release_date: '2020', track_count: 13, cover_url: 'https://picsum.photos/300/400?random=a6' },
];
</script>

<style lang="scss" scoped>
.wiki-albums {
  &__filters {
    margin-bottom: 24px;
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
  }
  
  &__card {
    text-decoration: none;
    transition: all var(--transition-bounce);
    
    &:hover {
      transform: translateY(-4px);
      
      .wiki-albums__cover img {
        transform: scale(1.05);
      }
      
      .wiki-albums__overlay {
        opacity: 1;
      }
    }
  }
  
  &__cover {
    position: relative;
    aspect-ratio: 3 / 4;
    border-radius: var(--radius-lg);
    overflow: hidden;
    margin-bottom: 12px;
    box-shadow: var(--shadow-md);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-base);
    }
  }
  
  &__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    color: white;
    opacity: 0;
    transition: opacity var(--transition-fast);
  }
  
  &__info {
    h3 {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0 0 4px;
    }
    
    p {
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
      margin: 0 0 4px;
    }
  }
  
  &__meta {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
  }
}
</style>
