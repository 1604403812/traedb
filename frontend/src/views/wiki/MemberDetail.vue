<template>
  <div class="member-detail">
    <PageTitle :title="member.name" :breadcrumbs="breadcrumbs" />

    <div class="member-detail__content">
      <div class="member-detail__avatar">
        <img :src="member.image_url" :alt="member.name" />
      </div>

      <div class="member-detail__info">
        <h1>{{ member.name }}</h1>
        <p class="member-detail__names">{{ member.korean_name }} · {{ member.english_name }}</p>
        <p class="member-detail__position">{{ member.position }}</p>

        <div class="member-detail__stats">
          <div class="member-detail__stat">
            <span class="member-detail__stat-value">{{ member.birth_date }}</span>
            <span class="member-detail__stat-label">生日</span>
          </div>
          <div class="member-detail__stat">
            <span class="member-detail__stat-value">{{ member.birthplace }}</span>
            <span class="member-detail__stat-label">出生地</span>
          </div>
          <div class="member-detail__stat">
            <span class="member-detail__stat-value">{{ member.mbti }}</span>
            <span class="member-detail__stat-label">MBTI</span>
          </div>
        </div>

        <div v-if="member.social_links" class="member-detail__social">
          <a v-if="member.social_links.instagram" :href="member.social_links.instagram" target="_blank">
            Instagram
          </a>
          <a v-if="member.social_links.twitter" :href="member.social_links.twitter" target="_blank">
            Twitter/X
          </a>
        </div>

        <p v-if="member.description" class="member-detail__bio">{{ member.description }}</p>
      </div>
    </div>

    <section class="member-detail__albums">
      <h3>参与专辑</h3>
      <div class="member-detail__album-grid">
        <div v-for="album in memberAlbums" :key="album.id" class="member-detail__album-card">
          <img :src="album.cover_url" :alt="album.title" />
          <span>{{ album.title }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PageTitle from '@/components/layout/PageTitle.vue';

const route = useRoute();

interface Member {
  id: number;
  name: string;
  korean_name: string;
  english_name: string;
  position: string;
  birth_date: string;
  birthplace: string;
  mbti: string;
  image_url: string;
  description: string;
  social_links?: {
    instagram?: string;
    twitter?: string;
  };
}

const member = ref<Member>({
  id: Number(route.params.id),
  name: '娜琏',
  korean_name: '나연',
  english_name: 'Nayeon',
  position: '主唱 / Lead Vocalist',
  birth_date: '1995.09.22',
  birthplace: '首尔',
  mbti: 'ENFP',
  image_url: 'https://picsum.photos/400?random=1',
  description: '林娜琏，韩国女子偶像组合TWICE成员...',
  social_links: {
    instagram: '#',
    twitter: '#',
  },
});

const breadcrumbs = [
  { label: '首页', path: '/' },
  { label: 'TWICE Wiki', path: '/wiki' },
  { label: '成员', path: '/wiki/members' },
  { label: '娜琏' },
];

const memberAlbums = ref([
  { id: 1, title: 'WITH OR ISYOU', cover_url: 'https://picsum.photos/200?random=a1' },
  { id: 2, title: 'READY TO BE', cover_url: 'https://picsum.photos/200?random=a2' },
  { id: 3, title: 'CELEBRATE', cover_url: 'https://picsum.photos/200?random=a3' },
]);
</script>

<style lang="scss" scoped>
.member-detail {
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
  
  &__avatar {
    aspect-ratio: 1;
    border-radius: var(--radius-xl);
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
      font-size: var(--font-size-3xl);
      font-weight: var(--font-weight-bold);
      margin: 0 0 8px;
    }
  }
  
  &__names {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    margin: 0 0 4px;
  }
  
  &__position {
    font-size: var(--font-size-md);
    color: var(--color-wiki);
    margin: 0 0 24px;
  }
  
  &__stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }
  
  &__stat {
    padding: 16px;
    background: var(--glass-bg);
    border-radius: var(--radius-md);
    text-align: center;
    
    &-value {
      display: block;
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin-bottom: 4px;
    }
    
    &-label {
      font-size: var(--font-size-xs);
      color: var(--color-text-muted);
    }
  }
  
  &__social {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    
    a {
      padding: 8px 16px;
      background: var(--color-wiki-bg);
      color: var(--color-wiki);
      border-radius: var(--radius-full);
      font-size: var(--font-size-sm);
      transition: all var(--transition-fast);
      
      &:hover {
        background: var(--color-wiki);
        color: white;
      }
    }
  }
  
  &__bio {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    line-height: var(--line-height-relaxed);
  }
  
  &__albums {
    h3 {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      margin: 0 0 20px;
    }
  }
  
  &__album-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
  }
  
  &__album-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-decoration: none;
    
    img {
      aspect-ratio: 3 / 4;
      border-radius: var(--radius-md);
      object-fit: cover;
    }
    
    span {
      font-size: var(--font-size-sm);
      color: var(--color-text-primary);
      text-align: center;
    }
  }
}
</style>
