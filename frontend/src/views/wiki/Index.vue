<script setup lang="ts">
import GlassCard from '../../components/common/GlassCard.vue'
import MediaCard from '../../components/common/MediaCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'

const members = [
  { id: 1, title: '娜琏', subtitle: 'Nayeon · 主唱', meta: '个人资料、社交链接与参与作品', badge: '成员' },
  { id: 2, title: 'Sana', subtitle: '사나 · 表演担当', meta: '成员详情模板已准备', badge: '成员' },
  { id: 3, title: '子瑜', subtitle: 'Tzuyu · 视觉中心', meta: '支持中英韩多语言字段', badge: '成员' },
]

const albums = [
  { id: 1, title: 'READY TO BE', subtitle: '2023 · EP', meta: '可扩展歌曲列表与成员参与关系', badge: '专辑' },
  { id: 2, title: 'Celebrate', subtitle: '2022 · Japanese', meta: '支持年份、类型筛选', badge: '专辑' },
  { id: 3, title: 'Formula of Love', subtitle: '2021 · Full Album', meta: '详情页预留 tracklist', badge: '专辑' },
]
</script>

<template>
  <div class="page-stack">
    <PageTitle
      eyebrow="TWICE Wiki"
      title="组合资料馆"
      description="Wiki 模块以雾蓝灰为主色，适合继续扩展成员档案、专辑与歌曲数据关系。"
    />

    <GlassCard class="hero-card" accent="var(--module-wiki)">
      <div class="hero-card__content">
        <div>
          <p class="eyebrow">Hero</p>
          <h2>TWICE</h2>
          <p class="page-subtitle">九人女子组合档案、专辑作品与内容关系页均已进入同一套视觉系统。</p>
        </div>
        <div class="pill-row">
          <RouterLink to="/wiki/members" class="module-pill">成员</RouterLink>
          <RouterLink to="/wiki/albums" class="module-pill">专辑</RouterLink>
        </div>
      </div>
    </GlassCard>

    <section class="dual-grid">
      <GlassCard accent="var(--module-wiki)">
        <div class="section-head">
          <div>
            <p class="eyebrow">Members</p>
            <h2>成员入口</h2>
          </div>
          <RouterLink to="/wiki/members" class="text-link">查看全部</RouterLink>
        </div>
        <section class="media-grid media-grid--three">
          <MediaCard
            v-for="item in members"
            :key="item.id"
            :title="item.title"
            :subtitle="item.subtitle"
            :meta="item.meta"
            :badge="item.badge"
            category="成员"
            accent="var(--module-wiki)"
            ratio="square"
            :to="`/wiki/members/${item.id}`"
          />
        </section>
      </GlassCard>

      <GlassCard accent="var(--module-wiki)">
        <div class="section-head">
          <div>
            <p class="eyebrow">Albums</p>
            <h2>专辑入口</h2>
          </div>
          <RouterLink to="/wiki/albums" class="text-link">查看全部</RouterLink>
        </div>
        <section class="media-grid media-grid--one">
          <MediaCard
            v-for="item in albums"
            :key="item.id"
            :title="item.title"
            :subtitle="item.subtitle"
            :meta="item.meta"
            :badge="item.badge"
            category="专辑"
            accent="var(--module-wiki)"
            :to="`/wiki/albums/${item.id}`"
          />
        </section>
      </GlassCard>
    </section>
  </div>
</template>
