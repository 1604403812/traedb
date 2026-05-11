<script setup lang="ts">
import GlassCard from '../../components/common/GlassCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'

const infoItems = [
  ['生日', '1995.09.22'],
  ['出生地', '首尔'],
  ['MBTI', 'ENFP'],
  ['定位', 'Lead Vocalist'],
]
</script>

<template>
  <div class="page-stack">
    <PageTitle eyebrow="Member Detail" title="娜琏 · Nayeon" description="成员详情页预留人物资料、社交链接与参与专辑列表结构。" />

    <section class="detail-grid">
      <GlassCard class="cover-panel" accent="var(--module-wiki)">
        <div class="cover-art cover-art--square">
          <span>成员</span>
          <strong>娜琏</strong>
        </div>
      </GlassCard>

      <GlassCard accent="var(--module-wiki)">
        <div class="info-grid">
          <div v-for="[label, value] in infoItems" :key="label" class="info-grid__item">
            <small>{{ label }}</small>
            <strong>{{ value }}</strong>
          </div>
        </div>
        <p class="detail-copy">
          这里适合接入简介、社交媒体、参与专辑、演出记录与媒体资源。现有样式已处理信息卡、分组列表与响应式栅格。
        </p>
        <div class="pill-row">
          <span class="module-pill">Instagram</span>
          <span class="module-pill">Album Credits</span>
          <span class="module-pill">Timeline</span>
        </div>
      </GlassCard>
    </section>
  </div>
</template>
