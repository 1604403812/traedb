<template>
  <div class="reader-view" :class="`reader-view--${theme}`">
    <header class="reader-view__header">
      <button class="reader-view__back" @click="$router.back()">
        <ArrowLeft :size="20" />
        返回
      </button>
      
      <h1 class="reader-view__title">{{ novel.title }}</h1>
      
      <div class="reader-view__actions">
        <a-button type="text" @click="showSettings = true">
          <Gear :size="20" />
        </a-button>
      </div>
    </header>

    <main class="reader-view__content" ref="contentRef">
      <article class="reader-view__article" :style="articleStyle">
        <h2 class="reader-view__chapter-title">{{ chapterTitle }}</h2>
        <div class="reader-view__text" v-html="content"></div>
      </article>
    </main>

    <footer class="reader-view__footer">
      <div class="reader-view__progress-bar">
        <div class="reader-view__progress-fill" :style="{ width: `${progress}%` }"></div>
      </div>
      
      <div class="reader-view__controls">
        <a-button :disabled="chapter <= 1" @click="prevChapter">
          上一章
        </a-button>
        
        <span class="reader-view__progress-text">
          {{ progress }}% ({{ chapter }}/{{ totalChapters }})
        </span>
        
        <a-button :disabled="chapter >= totalChapters" @click="nextChapter">
          下一章
        </a-button>
      </div>
    </footer>

    <a-drawer
      v-model:open="showSettings"
      title="阅读设置"
      placement="bottom"
      height="auto"
      class="reader-view__settings"
    >
      <div class="reader-view__setting-group">
        <label>字体大小</label>
        <div class="reader-view__font-size">
          <a-button @click="decreaseFontSize">A-</a-button>
          <span>{{ fontSize }}px</span>
          <a-button @click="increaseFontSize">A+</a-button>
        </div>
      </div>
      
      <div class="reader-view__setting-group">
        <label>阅读主题</label>
        <div class="reader-view__themes">
          <button
            v-for="t in themes"
            :key="t.value"
            class="reader-view__theme-btn"
            :class="{ 'is-active': theme === t.value }"
            :style="{ background: t.bg, color: t.text }"
            @click="theme = t.value"
          >
            {{ t.label }}
          </button>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft, Gear } from '@phosphor-icons/vue';

const route = useRoute();

const novel = ref({
  id: Number(route.params.id),
  title: '小说标题',
});

const chapter = ref(1);
const totalChapters = ref(20);
const progress = ref(75);
const fontSize = ref(18);
const theme = ref('light');
const showSettings = ref(false);

const chapterTitle = computed(() => `第${chapter.value}章 标题`);

const content = computed(() => `
  <p>这是一个阳光明媚的早晨，主角走在熙熙攘攘的街道上。</p>
  <p>微风拂过，带着初春的清香，吹动着她柔软的发丝。</p>
  <p>街边的梧桐树已经冒出了新芽，嫩绿的叶片在阳光下闪闪发光。</p>
  <p>她深吸一口气，感受着这难得的宁静时刻。</p>
  <p>在这个繁忙的城市里，能有这样片刻的安静实在是一种奢侈。</p>
  <p>她想起昨晚做的那个梦，梦里有无尽的花海和清澈的溪流。</p>
  <p>那里没有喧嚣，没有烦恼，只有最纯粹的快乐。</p>
  <p>也许有一天，她也能找到那样一个地方吧。</p>
`.repeat(5));

const articleStyle = computed(() => ({
  fontSize: `${fontSize.value}px`,
  lineHeight: '1.8',
}));

const themes = [
  { value: 'light', label: '白天', bg: '#FFFFFF', text: '#1C1917' },
  { value: 'sepia', label: '护眼', bg: '#F5F0E6', text: '#5C4B37' },
  { value: 'dark', label: '夜间', bg: '#1A1918', text: '#E7E5E4' },
];

const decreaseFontSize = () => {
  if (fontSize.value > 12) fontSize.value -= 2;
};

const increaseFontSize = () => {
  if (fontSize.value < 32) fontSize.value += 2;
};

const prevChapter = () => {
  if (chapter.value > 1) chapter.value--;
};

const nextChapter = () => {
  if (chapter.value < totalChapters.value) chapter.value++;
};

const handleScroll = () => {
  const el = document.documentElement;
  const scrollTop = el.scrollTop || document.body.scrollTop;
  const scrollHeight = el.scrollHeight - el.clientHeight;
  progress.value = Math.round((scrollTop / scrollHeight) * 100) || 0;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style lang="scss" scoped>
.reader-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--reader-bg, #FFFFFF);
  color: var(--reader-text, #1C1917);
  transition: background var(--transition-base), color var(--transition-base);
  
  &--light {
    --reader-bg: #FFFFFF;
    --reader-text: #1C1917;
  }
  
  &--sepia {
    --reader-bg: #F5F0E6;
    --reader-text: #5C4B37;
  }
  
  &--dark {
    --reader-bg: #1A1918;
    --reader-text: #E7E5E4;
  }
  
  &__header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    background: var(--reader-bg);
    border-bottom: 1px solid var(--color-border);
    z-index: 10;
  }
  
  &__back {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    color: var(--reader-text);
    transition: background var(--transition-fast);
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
  
  &__title {
    flex: 1;
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    text-align: center;
    margin: 0;
  }
  
  &__actions {
    display: flex;
    gap: 8px;
  }
  
  &__content {
    flex: 1;
    overflow-y: auto;
  }
  
  &__article {
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 24px;
  }
  
  &__chapter-title {
    font-size: 1.5em;
    font-weight: var(--font-weight-bold);
    margin-bottom: 32px;
    text-align: center;
  }
  
  &__text {
    text-align: justify;
    
    :deep(p) {
      margin-bottom: 1.5em;
      text-indent: 2em;
    }
  }
  
  &__footer {
    position: sticky;
    bottom: 0;
    background: var(--reader-bg);
    border-top: 1px solid var(--color-border);
    padding: 16px 24px;
  }
  
  &__progress-bar {
    height: 4px;
    background: var(--color-border);
    border-radius: var(--radius-full);
    margin-bottom: 12px;
    overflow: hidden;
  }
  
  &__progress-fill {
    height: 100%;
    background: var(--color-novel);
    transition: width var(--transition-fast);
  }
  
  &__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  &__progress-text {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
  }
  
  &__settings {
    :deep(.ant-drawer-body) {
      padding: 24px;
    }
  }
  
  &__setting-group {
    margin-bottom: 24px;
    
    label {
      display: block;
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--color-text-secondary);
      margin-bottom: 12px;
    }
  }
  
  &__font-size {
    display: flex;
    align-items: center;
    gap: 16px;
    
    span {
      min-width: 50px;
      text-align: center;
    }
  }
  
  &__themes {
    display: flex;
    gap: 12px;
  }
  
  &__theme-btn {
    width: 60px;
    height: 40px;
    border-radius: var(--radius-md);
    border: 2px solid transparent;
    font-size: var(--font-size-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    
    &.is-active {
      border-color: var(--color-primary);
    }
  }
}
</style>
