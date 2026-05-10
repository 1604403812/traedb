<template>
  <div class="album-detail">
    <PageTitle :title="album.title" :breadcrumbs="breadcrumbs" />

    <div class="album-detail__content">
      <div class="album-detail__cover">
        <img :src="album.cover_url" :alt="album.title" />
      </div>

      <div class="album-detail__info">
        <h1>{{ album.title }}</h1>
        <p class="album-detail__korean">{{ album.title_korean }}</p>

        <div class="album-detail__meta">
          <span>{{ album.release_date }}</span>
          <span>{{ album.track_count }} 首歌</span>
          <span>{{ album.album_type }}</span>
        </div>

        <p v-if="album.description" class="album-detail__description">
          {{ album.description }}
        </p>
      </div>
    </div>

    <section class="album-detail__songs">
      <h3>曲目列表</h3>
      <div class="album-detail__track-list">
        <div
          v-for="song in album.songs"
          :key="song.id"
          class="album-detail__track"
        >
          <span class="album-detail__track-order">{{ song.track_order }}</span>
          <div class="album-detail__track-info">
            <span class="album-detail__track-title">{{ song.title }}</span>
            <span class="album-detail__track-type">{{ getTrackTypeLabel(song.song_type) }}</span>
          </div>
          <span class="album-detail__track-duration">{{ formatDuration(song.duration) }}</span>
        </div>
      </div>
    </section>

    <section class="album-detail__members">
      <h3>参与成员</h3>
      <div class="album-detail__member-list">
        <router-link
          v-for="member in album.members"
          :key="member.id"
          :to="`/wiki/members/${member.id}`"
          class="album-detail__member"
        >
          <img :src="member.image_url" :alt="member.name" />
          <span>{{ member.name }}</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PageTitle from '@/components/layout/PageTitle.vue';

const route = useRoute();

interface Song {
  id: number;
  title: string;
  track_order: number;
  duration: number;
  song_type: 'title' | 'side_a' | 'side_b' | 'unit';
}

interface Member {
  id: number;
  name: string;
  image_url: string;
}

const album = ref({
  id: Number(route.params.id),
  title: 'READY TO BE',
  title_korean: '레디 투 비',
  release_date: '2023-03-10',
  track_count: 10,
  album_type: 'Mini Album',
  cover_url: 'https://picsum.photos/400?random=a2',
  description: 'TWICE第12张迷你专辑...',
  songs: [
    { id: 1, title: 'SET ME FREE', track_order: 1, duration: 198, song_type: 'title' },
    { id: 2, title: 'MOONLIGHT', track_order: 2, duration: 185, song_type: 'side_a' },
    { id: 3, title: 'KILLER', track_order: 3, duration: 192, song_type: 'side_a' },
    { id: 4, title: 'WALLFLOWER', track_order: 4, duration: 203, song_type: 'side_b' },
    { id: 5, title: 'BLOOM', track_order: 5, duration: 176, song_type: 'side_b' },
  ] as Song[],
  members: [
    { id: 1, name: '娜琏', image_url: 'https://picsum.photos/100?random=1' },
    { id: 2, name: '定延', image_url: 'https://picsum.photos/100?random=2' },
    { id: 3, name: 'Momo', image_url: 'https://picsum.photos/100?random=3' },
  ] as Member[],
});

const breadcrumbs = [
  { label: '首页', path: '/' },
  { label: 'TWICE Wiki', path: '/wiki' },
  { label: '专辑', path: '/wiki/albums' },
  { label: 'READY TO BE' },
];

const getTrackTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    title: '主打',
    side_a: 'A面',
    side_b: 'B面',
    unit: 'UNIT',
  };
  return labels[type] || type;
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
</script>

<style lang="scss" scoped>
.album-detail {
  max-width: 1200px;
  margin: 0 auto;
  
  &__content {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 48px;
    margin-bottom: 48px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  
  &__cover {
    aspect-ratio: 1;
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  &__info {
    h1 {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      margin: 0 0 4px;
    }
  }
  
  &__korean {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    margin: 0 0 16px;
  }
  
  &__meta {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    
    span {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
    }
  }
  
  &__description {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
  }
  
  &__songs {
    margin-bottom: 48px;
    
    h3 {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      margin: 0 0 20px;
    }
  }
  
  &__track-list {
    background: var(--glass-bg);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  
  &__track {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    border-bottom: 1px solid var(--color-border-secondary);
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background: var(--color-primary-bg);
    }
  }
  
  &__track-order {
    width: 24px;
    text-align: center;
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
  }
  
  &__track-info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  &__track-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }
  
  &__track-type {
    font-size: var(--font-size-xs);
    padding: 2px 8px;
    background: var(--color-wiki-bg);
    color: var(--color-wiki);
    border-radius: var(--radius-full);
  }
  
  &__track-duration {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
    font-family: var(--font-family-mono);
  }
  
  &__members {
    h3 {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      margin: 0 0 20px;
    }
  }
  
  &__member-list {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  
  &__member {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    padding: 12px;
    border-radius: var(--radius-md);
    transition: background var(--transition-fast);
    
    &:hover {
      background: var(--color-wiki-bg);
    }
    
    img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    span {
      font-size: var(--font-size-xs);
      color: var(--color-text-primary);
    }
  }
}
</style>
