<template>
  <div class="dashboard">
    <PageTitle title="仪表盘" :icon="House">
      <template #actions>
        <a-button type="primary" @click="showAddModal = true">
          <template #icon><Plus :size="16" /></template>
          添加内容
        </a-button>
      </template>
    </PageTitle>

    <div class="dashboard__greeting">
      <h2>{{ greeting }}, {{ authStore.user?.username || '收藏家' }}</h2>
      <p>{{ currentDate }}</p>
    </div>

    <section class="dashboard__stats">
      <StatCard
        :value="45"
        label="音声收藏"
        :icon="MusicNotes"
        module="audio"
        clickable
        @click="$router.push('/audio')"
      />
      <StatCard
        :value="readingProgress"
        label="阅读进度"
        format="percent"
        :icon="BookOpen"
        module="novel"
        clickable
        @click="$router.push('/novel')"
      />
      <StatCard
        :value="5"
        label="低库存提醒"
        :icon="Warning"
        module="bead"
        clickable
        @click="$router.push('/bead')"
      />
    </section>

    <div class="dashboard__content">
      <section class="dashboard__section">
        <div class="dashboard__section-header">
          <h3>最近添加</h3>
          <router-link to="/audio">查看全部</router-link>
        </div>
        
        <div class="dashboard__modules">
          <router-link
            v-for="module in modules"
            :key="module.path"
            :to="module.path"
            class="dashboard__module-card"
            :class="`dashboard__module-card--${module.module}`"
          >
            <div class="dashboard__module-icon">
              <component :is="module.icon" :size="28" weight="regular" />
            </div>
            <span class="dashboard__module-label">{{ module.label }}</span>
          </router-link>
        </div>
      </section>

      <section class="dashboard__section">
        <div class="dashboard__section-header">
          <h3>最近播放</h3>
        </div>
        
        <div class="dashboard__recent-list">
          <div v-for="item in recentPlays" :key="item.id" class="dashboard__recent-item">
            <div class="dashboard__recent-cover">
              <img v-if="item.cover" :src="item.cover" :alt="item.title" />
              <MusicNotes v-else :size="20" />
            </div>
            <div class="dashboard__recent-info">
              <span class="dashboard__recent-title">{{ item.title }}</span>
              <span class="dashboard__recent-subtitle">{{ item.subtitle }}</span>
            </div>
            <span class="dashboard__recent-time">{{ item.time }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue';
import PageTitle from '@/components/layout/PageTitle.vue';
import StatCard from '@/components/common/StatCard.vue';
import { useAuthStore } from '@/stores/auth';
import { House, MusicNotes, BookOpen, Microphone, Palette, Cloud, Warning, Plus } from '@phosphor-icons/vue';
import dayjs from 'dayjs';

const authStore = useAuthStore();
const showAddModal = ref(false);

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 6) return '凌晨好';
  if (hour < 9) return '早上好';
  if (hour < 12) return '上午好';
  if (hour < 14) return '中午好';
  if (hour < 18) return '下午好';
  if (hour < 22) return '晚上好';
  return '夜深了';
});

const currentDate = computed(() => {
  return dayjs().format('YYYY年M月D日 dddd');
});

const readingProgress = computed(() => 24);

interface Module {
  path: string;
  label: string;
  icon: Component;
  module: 'audio' | 'novel' | 'wiki' | 'bead' | 'drive';
}

const modules: Module[] = [
  { path: '/audio', label: '音声', icon: MusicNotes, module: 'audio' },
  { path: '/novel', label: '小说', icon: BookOpen, module: 'novel' },
  { path: '/wiki', label: 'TWICE', icon: Microphone, module: 'wiki' },
  { path: '/bead', label: '拼豆', icon: Palette, module: 'bead' },
  { path: '/drive', label: '云盘', icon: Cloud, module: 'drive' },
];

interface RecentPlay {
  id: number;
  title: string;
  subtitle: string;
  cover?: string;
  time: string;
  progress?: number;
}

const recentPlays: RecentPlay[] = [
  {
    id: 1,
    title: '音声标题',
    subtitle: '社团名 · 声优',
    cover: '',
    time: '3分钟前',
  },
  {
    id: 2,
    title: '小说标题',
    subtitle: '作者名',
    time: '昨天',
    progress: 75,
  },
];
</script>

<style lang="scss" scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  
  &__greeting {
    margin-bottom: 32px;
    
    h2 {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0 0 4px;
    }
    
    p {
      font-size: var(--font-size-sm);
      color: var(--color-text-muted);
      margin: 0;
    }
  }
  
  &__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  
  &__content {
    display: grid;
    gap: 32px;
  }
  
  &__section {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
    -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-sm);
  }
  
  &__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    
    h3 {
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      margin: 0;
    }
    
    a {
      font-size: var(--font-size-sm);
      color: var(--color-primary);
      
      &:hover {
        color: var(--color-primary-hover);
      }
    }
  }
  
  &__modules {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
    
    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  &__module-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 20px 12px;
    border-radius: var(--radius-md);
    text-decoration: none;
    transition: all var(--transition-bounce);
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &--audio {
      background: var(--color-audio-bg);
      color: var(--color-audio);
      
      &:hover { background: rgba(155, 142, 138, 0.15); }
    }
    
    &--novel {
      background: var(--color-novel-bg);
      color: var(--color-novel);
      
      &:hover { background: rgba(138, 154, 139, 0.15); }
    }
    
    &--wiki {
      background: var(--color-wiki-bg);
      color: var(--color-wiki);
      
      &:hover { background: rgba(142, 154, 168, 0.15); }
    }
    
    &--bead {
      background: var(--color-bead-bg);
      color: var(--color-bead);
      
      &:hover { background: rgba(170, 155, 142, 0.15); }
    }
    
    &--drive {
      background: var(--color-drive-bg);
      color: var(--color-drive);
      
      &:hover { background: rgba(139, 154, 168, 0.15); }
    }
  }
  
  &__module-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__module-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
  }
  
  &__recent-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  &__recent-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: var(--radius-md);
    transition: background var(--transition-fast);
    
    &:hover {
      background: var(--color-primary-bg);
    }
  }
  
  &__recent-cover {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-sm);
    background: var(--color-bg-secondary);
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  &__recent-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  &__recent-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &__recent-subtitle {
    font-size: var(--font-size-xs);
    color: var(--color-text-secondary);
  }
  
  &__recent-time {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    flex-shrink: 0;
  }
}
</style>
