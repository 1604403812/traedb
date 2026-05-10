<template>
  <div class="page-view">
    <PageTitle title="TWICE Wiki" :icon="Microphone" />

    <div class="wiki-home">
      <div class="wiki-home__hero">
        <img
          src="https://picsum.photos/1200/400?random=twice"
          alt="TWICE"
          class="wiki-home__hero-img"
        />
        <div class="wiki-home__hero-overlay">
          <h1 class="wiki-home__title">TWICE</h1>
          <p class="wiki-home__subtitle">트와이스 · 九人女子偶像组合</p>
          <p class="wiki-home__info">JYP Entertainment · 出道日期: 2015年10月20日</p>
        </div>
      </div>

      <div class="wiki-home__tabs">
        <a-radio-group v-model:value="activeTab" button-style="solid">
          <a-radio-button value="members">成员</a-radio-button>
          <a-radio-button value="albums">专辑</a-radio-button>
          <a-radio-button value="songs">歌曲</a-radio-button>
        </a-radio-group>
      </div>

      <div v-if="activeTab === 'members'" class="wiki-home__members">
        <div class="wiki-home__member-grid">
          <router-link
            v-for="member in members"
            :key="member.id"
            :to="`/wiki/members/${member.id}`"
            class="wiki-home__member-card"
          >
            <div class="wiki-home__member-avatar">
              <img :src="member.image_url" :alt="member.name" />
            </div>
            <div class="wiki-home__member-info">
              <span class="wiki-home__member-name">{{ member.name }}</span>
              <span class="wiki-home__member-en">{{ member.english_name }}</span>
              <span class="wiki-home__member-position">{{ member.position }}</span>
            </div>
          </router-link>
        </div>
      </div>

      <div v-if="activeTab === 'albums'" class="wiki-home__albums">
        <div class="wiki-home__album-grid">
          <router-link
            v-for="album in albums"
            :key="album.id"
            :to="`/wiki/albums/${album.id}`"
            class="wiki-home__album-card"
          >
            <div class="wiki-home__album-cover">
              <img :src="album.cover_url" :alt="album.title" />
            </div>
            <div class="wiki-home__album-info">
              <span class="wiki-home__album-title">{{ album.title }}</span>
              <span class="wiki-home__album-year">{{ album.release_date }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageTitle from '@/components/layout/PageTitle.vue';
import { Microphone } from '@phosphor-icons/vue';

const activeTab = ref('members');

interface Member {
  id: number;
  name: string;
  english_name: string;
  position: string;
  image_url: string;
}

interface Album {
  id: number;
  title: string;
  release_date: string;
  cover_url: string;
}

const members: Member[] = [
  { id: 1, name: '娜琏', english_name: 'Nayeon', position: '主唱', image_url: 'https://picsum.photos/200?random=1' },
  { id: 2, name: '定延', english_name: 'Jeongyeon', position: '主唱', image_url: 'https://picsum.photos/200?random=2' },
  { id: 3, name: 'Momo', english_name: 'Momo', position: '主舞', image_url: 'https://picsum.photos/200?random=3' },
  { id: 4, name: 'Sana', english_name: 'Sana', position: '领唱', image_url: 'https://picsum.photos/200?random=4' },
  { id: 5, name: '子瑜', english_name: 'Tzuyu', position: '领唱/门面', image_url: 'https://picsum.photos/200?random=5' },
  { id: 6, name: '彩瑛', english_name: 'Chaeyoung', position: 'rapper', image_url: 'https://picsum.photos/200?random=6' },
  { id: 7, name: '多贤', english_name: 'Dahyun', position: 'rapper', image_url: 'https://picsum.photos/200?random=7' },
  { id: 8, name: 'Mina', english_name: 'Mina', position: '主舞', image_url: 'https://picsum.photos/200?random=8' },
  { id: 9, name: '志效', english_name: 'Jihyo', position: '队长/主唱', image_url: 'https://picsum.photos/200?random=9' },
];

const albums: Album[] = [
  { id: 1, title: 'WITH OR ISYOU', release_date: '2023', cover_url: 'https://picsum.photos/300/400?random=a1' },
  { id: 2, title: 'READY TO BE', release_date: '2023', cover_url: 'https://picsum.photos/300/400?random=a2' },
  { id: 3, title: 'CELEBRATE', release_date: '2022', cover_url: 'https://picsum.photos/300/400?random=a3' },
  { id: 4, title: 'Formula of Love', release_date: '2021', cover_url: 'https://picsum.photos/300/400?random=a4' },
  { id: 5, title: 'Taste of Love', release_date: '2021', cover_url: 'https://picsum.photos/300/400?random=a5' },
  { id: 6, title: 'Eyes Wide Open', release_date: '2020', cover_url: 'https://picsum.photos/300/400?random=a6' },
];
</script>

<style lang="scss" scoped>
.wiki-home {
  &__hero {
    position: relative;
    height: 300px;
    border-radius: var(--radius-xl);
    overflow: hidden;
    margin-bottom: 32px;
    
    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    &-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
      color: white;
      text-align: center;
    }
  }
  
  &__title {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    margin: 0 0 8px;
    letter-spacing: 4px;
  }
  
  &__subtitle {
    font-size: var(--font-size-lg);
    margin: 0 0 4px;
    opacity: 0.9;
  }
  
  &__info {
    font-size: var(--font-size-sm);
    margin: 0;
    opacity: 0.7;
  }
  
  &__tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
    
    :deep(.ant-radio-button-wrapper-checked) {
      background: var(--color-wiki);
      border-color: var(--color-wiki);
    }
  }
  
  &__member-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;
  }
  
  &__member-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: var(--glass-bg);
    border-radius: var(--radius-lg);
    text-decoration: none;
    transition: all var(--transition-bounce);
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      
      .wiki-home__member-avatar img {
        border-color: var(--color-wiki);
      }
    }
  }
  
  &__member-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 12px;
    border: 3px solid white;
    box-shadow: var(--shadow-md);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: border-color var(--transition-fast);
    }
  }
  
  &__member-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  &__member-name {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
  }
  
  &__member-en {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
    margin-bottom: 4px;
  }
  
  &__member-position {
    font-size: var(--font-size-xs);
    color: var(--color-wiki);
  }
  
  &__album-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }
  
  &__album-card {
    text-decoration: none;
    transition: all var(--transition-bounce);
    
    &:hover {
      transform: translateY(-4px);
      
      .wiki-home__album-cover img {
        transform: scale(1.05);
      }
    }
  }
  
  &__album-cover {
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
  
  &__album-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  &__album-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
  }
  
  &__album-year {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }
}
</style>
