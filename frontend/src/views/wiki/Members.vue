<template>
  <div class="page-view">
    <PageTitle title="成员" :icon="Users" :breadcrumbs="breadcrumbs" />
    
    <div class="wiki-members">
      <div class="wiki-members__grid">
        <router-link
          v-for="member in members"
          :key="member.id"
          :to="`/wiki/members/${member.id}`"
          class="wiki-members__card"
        >
          <div class="wiki-members__avatar">
            <img :src="member.image_url" :alt="member.name" />
          </div>
          <div class="wiki-members__info">
            <h3>{{ member.name }}</h3>
            <p>{{ member.english_name }}</p>
            <span class="wiki-members__position">{{ member.position }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageTitle from '@/components/layout/PageTitle.vue';
import { Users } from '@phosphor-icons/vue';

const breadcrumbs = [
  { label: '首页', path: '/' },
  { label: 'TWICE Wiki', path: '/wiki' },
  { label: '成员' },
];

const members = [
  { id: 1, name: '娜琏', english_name: 'Nayeon', position: '主唱', image_url: 'https://picsum.photos/200?random=1' },
  { id: 2, name: '定延', english_name: 'Jeongyeon', position: '主唱', image_url: 'https://picsum.photos/200?random=2' },
  { id: 3, name: 'Momo', english_name: 'Momo', position: '主舞', image_url: 'https://picsum.photos/200?random=3' },
  { id: 4, name: 'Sana', english_name: 'Sana', position: '领唱', image_url: 'https://picsum.photos/200?random=4' },
  { id: 5, name: '子瑜', english_name: 'Tzuyu', position: '领唱/门面', image_url: 'https://picsum.photos/200?random=5' },
  { id: 6, name: '彩瑛', english_name: 'Chaeyoung', position: 'Rapper', image_url: 'https://picsum.photos/200?random=6' },
  { id: 7, name: '多贤', english_name: 'Dahyun', position: 'Rapper', image_url: 'https://picsum.photos/200?random=7' },
  { id: 8, name: 'Mina', english_name: 'Mina', position: '主舞', image_url: 'https://picsum.photos/200?random=8' },
  { id: 9, name: '志效', english_name: 'Jihyo', position: '队长/主唱', image_url: 'https://picsum.photos/200?random=9' },
];
</script>

<style lang="scss" scoped>
.wiki-members {
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  &__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: all var(--transition-bounce);
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      
      .wiki-members__avatar img {
        border-color: var(--color-wiki);
      }
    }
  }
  
  &__avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 16px;
    border: 3px solid white;
    box-shadow: var(--shadow-md);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: border-color var(--transition-fast);
    }
  }
  
  &__info {
    text-align: center;
    
    h3 {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0 0 4px;
    }
    
    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      margin: 0 0 8px;
    }
  }
  
  &__position {
    font-size: var(--font-size-xs);
    color: var(--color-wiki);
    padding: 4px 12px;
    background: var(--color-wiki-bg);
    border-radius: var(--radius-full);
  }
}
</style>
