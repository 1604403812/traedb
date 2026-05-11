<script setup lang="ts">
import GlassCard from '../../components/common/GlassCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'

const tags = ['BL', '雨夜', '治愈', '双声优']
const credits = [
  ['社团', 'Studio Aster'],
  ['声优', '白河 / 凛音'],
  ['发布日期', '2026-05-10'],
  ['文件夹', '/audio/AUDIO-019'],
]
</script>

<template>
  <div class="page-stack">
    <PageTitle
      eyebrow="Audio Detail"
      title="晚风寄存处"
      description="详情页采用左封面右信息布局，在桌面端保持沉浸层次，移动端自动堆叠。"
    >
      <template #actions>
        <a-space>
          <a-button>打开文件夹</a-button>
          <a-button type="primary">播放</a-button>
        </a-space>
      </template>
    </PageTitle>

    <section class="detail-grid">
      <GlassCard class="cover-panel" accent="var(--module-audio)">
        <div class="cover-art cover-art--portrait">
          <span>音声</span>
          <strong>晚风寄存处</strong>
        </div>
      </GlassCard>

      <GlassCard accent="var(--module-audio)">
        <div class="section-head">
          <div>
            <p class="eyebrow">Meta</p>
            <h2>作品信息</h2>
          </div>
          <span class="rating-chip">4.6 / 5</span>
        </div>
        <div class="info-grid">
          <div v-for="[label, value] in credits" :key="label" class="info-grid__item">
            <small>{{ label }}</small>
            <strong>{{ value }}</strong>
          </div>
        </div>
        <p class="detail-copy">
          该区域适合继续承载简介、标签、播放记录、操作按钮与文件关联信息，也可与后端详情接口直接对接。
        </p>
        <div class="pill-row">
          <span v-for="tag in tags" :key="tag" class="module-pill">{{ tag }}</span>
        </div>
      </GlassCard>
    </section>
  </div>
</template>
