<script setup lang="ts">
import { computed, ref } from 'vue'
import GlassCard from '../../components/common/GlassCard.vue'
import MediaCard from '../../components/common/MediaCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'
import SearchInput from '../../components/common/SearchInput.vue'

const query = ref('')
const filters = ['全部', '已收藏', '已评分', 'BL', '治愈', '社团']

const audioItems = [
  { id: 1, title: '月夜航线', subtitle: '社团 A · 声优白河', meta: '4.8 分 · 最近播放 3 分钟前', badge: 'AUDIO-001' },
  { id: 2, title: '静海旅馆', subtitle: '社团 B · 声优凛音', meta: '5.0 分 · 收藏夹置顶', badge: 'AUDIO-014' },
  { id: 3, title: '晚风寄存处', subtitle: '社团 C · 双人主演', meta: '4.6 分 · 已同步字幕', badge: 'AUDIO-019' },
  { id: 4, title: '晨曦花房', subtitle: '社团 D · 轻疗愈系', meta: '4.3 分 · 标签 6 个', badge: 'AUDIO-024' },
  { id: 5, title: '雨幕书店', subtitle: '社团 E · 店员系列', meta: '4.9 分 · 正在循环播放', badge: 'AUDIO-028' },
  { id: 6, title: '玻璃回廊', subtitle: '社团 F · 悬疑系', meta: '4.5 分 · 最近新增', badge: 'AUDIO-032' },
]

const filteredItems = computed(() =>
  audioItems.filter((item) => `${item.title}${item.subtitle}`.toLowerCase().includes(query.value.toLowerCase())),
)
</script>

<template>
  <div class="page-stack">
    <PageTitle
      eyebrow="Audio"
      title="音声收藏"
      description="列表页采用 3 列到 1 列自适应卡片网格，并预留搜索、筛选、排序与详情跳转骨架。"
    >
      <template #actions>
        <a-space>
          <a-button>同步云盘</a-button>
          <a-button type="primary">添加音声</a-button>
        </a-space>
      </template>
    </PageTitle>

    <GlassCard accent="var(--module-audio)">
      <div class="toolbar-row">
        <SearchInput v-model="query" placeholder="搜索音声标题、声优或社团" />
        <div class="pill-row">
          <span v-for="item in filters" :key="item" class="module-pill">{{ item }}</span>
        </div>
      </div>
    </GlassCard>

    <section class="media-grid media-grid--three">
      <MediaCard
        v-for="item in filteredItems"
        :key="item.id"
        :title="item.title"
        :subtitle="item.subtitle"
        :meta="item.meta"
        :badge="item.badge"
        category="音声"
        accent="var(--module-audio)"
        :to="`/audio/${item.id}`"
      />
    </section>

    <GlassCard accent="var(--module-audio)">
      <div class="section-head">
        <div>
          <p class="eyebrow">Structure</p>
          <h2>该模块已具备的框架能力</h2>
        </div>
      </div>
      <ul class="feature-list">
        <li>搜索框、筛选胶囊、操作按钮与卡片网格统一纳入设计系统。</li>
        <li>详情页、播放器、标签与评分逻辑可以在当前骨架上直接扩展。</li>
        <li>视觉表现遵循烟玫瑰模块色，并在 hover 时上浮发光。</li>
      </ul>
    </GlassCard>
  </div>
</template>
