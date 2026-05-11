<script setup lang="ts">
import { primaryNav } from '../../router/navigation'
import GlassCard from '../../components/common/GlassCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'
import StatCard from '../../components/common/StatCard.vue'

const stats = [
  { label: '音声收藏', value: '45', hint: '最近同步 8 条元信息', accent: 'var(--module-audio)' },
  { label: '阅读进度', value: '12 / 50', hint: '3 本小说处于阅读中', accent: 'var(--module-novel)' },
  { label: '低库存提醒', value: '5', hint: '重点关注白色、黑色和蓝色', accent: 'var(--module-beads)' },
  { label: '云端容量', value: '5.2 GB', hint: 'OneDrive / Alist 已接入', accent: 'var(--module-drive)' },
]

const recentActivity = [
  { title: 'AUDIO-019 午夜列车', detail: '烟玫瑰色主题，播放进度 75%', tag: '音声' },
  { title: '《潮汐与灯塔》', detail: '阅读至第 15 章，夜间主题已保存', tag: '小说' },
  { title: 'TWICE - READY TO BE', detail: '专辑详情页可继续扩展歌曲列表', tag: 'Wiki' },
]
</script>

<template>
  <div class="page-stack">
    <PageTitle
      eyebrow="Dashboard"
      title="下午好，收藏家"
      description="新的前端框架以莫兰迪配色、玻璃容器与模块化路由为骨架，已经适合作为后续业务开发底座。"
    />

    <GlassCard class="hero-card" accent="var(--module-wiki)">
      <div class="hero-card__content">
        <div>
          <p class="eyebrow">系统概览</p>
          <h2>数字生活收藏馆</h2>
          <p class="page-subtitle">
            统一管理音声、小说、TWICE 资料、拼豆库存与云盘文件，所有模块共享同一套主题变量、布局与响应式导航。
          </p>
        </div>
        <div class="hero-pills">
          <RouterLink v-for="item in primaryNav" :key="item.key" :to="item.path" class="module-pill">
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </GlassCard>

    <section class="stats-grid">
      <StatCard
        v-for="item in stats"
        :key="item.label"
        :label="item.label"
        :value="item.value"
        :hint="item.hint"
        :accent="item.accent"
      />
    </section>

    <section class="dual-grid">
      <GlassCard accent="var(--module-audio)">
        <div class="section-head">
          <div>
            <p class="eyebrow">Recent</p>
            <h2>最近添加</h2>
          </div>
          <RouterLink to="/audio" class="text-link">查看音声</RouterLink>
        </div>
        <div class="timeline-list">
          <article v-for="item in recentActivity" :key="item.title" class="timeline-item">
            <span class="timeline-item__tag">{{ item.tag }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.detail }}</p>
            </div>
          </article>
        </div>
      </GlassCard>

      <GlassCard accent="var(--module-drive)">
        <div class="section-head">
          <div>
            <p class="eyebrow">Architecture</p>
            <h2>前端框架特性</h2>
          </div>
        </div>
        <ul class="feature-list">
          <li>基于 Vue 3、Vite、TypeScript、Pinia 与 Vue Router 重建。</li>
          <li>接入 Ant Design Vue 主题定制，与文档中的莫兰迪色板一致。</li>
          <li>支持默认布局、认证布局与阅读器空白布局。</li>
          <li>已预留模块页、API 封装、类型定义与主题状态管理目录。</li>
        </ul>
      </GlassCard>
    </section>
  </div>
</template>
