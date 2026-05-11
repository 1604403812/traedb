<script setup lang="ts">
const paragraphs = [
  '第一章的风从海面吹来，带着一点盐味，也带着黎明尚未完全苏醒时的湿润。',
  '她在站台尽头停下，看见远处灯塔的顶端微微闪烁，像一个迟到的答复。',
  '列车的广播被海潮吞没，只剩脚边细碎的砂石声，提醒她这并不是梦。',
  '如果阅读器接入真实内容接口，这里可以继续扩展章节切换、进度保存与主题设置面板。',
]
</script>

<template>
  <div class="reader-page">
    <header class="reader-topbar glass-card is-inset">
      <RouterLink to="/novels" class="text-link">返回书架</RouterLink>
      <strong>《潮汐与灯塔》</strong>
      <a-space>
        <a-button>设置</a-button>
        <a-button type="primary">下载</a-button>
      </a-space>
    </header>

    <main class="reader-panel glass-card" style="--card-accent: var(--module-novel)">
      <p class="eyebrow">第一章 · 序</p>
      <h1>潮汐与灯塔</h1>
      <div class="reader-copy">
        <p v-for="paragraph in paragraphs" :key="paragraph">{{ paragraph }}</p>
      </div>
      <div class="reader-footer">
        <span>阅读进度 78%</span>
        <span>夜间 / 护眼 / 白天主题均可在此扩展</span>
      </div>
    </main>
  </div>
</template>
