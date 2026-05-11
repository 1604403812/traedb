<script setup lang="ts">
import GlassCard from '../../components/common/GlassCard.vue'
import MediaCard from '../../components/common/MediaCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'

const novels = [
  { id: 1, title: '潮汐与灯塔', subtitle: '作者：海岚', meta: '阅读中 · 78%', badge: '连载中' },
  { id: 2, title: '玻璃动物园', subtitle: '作者：森音', meta: '未读 · 32 万字', badge: '新导入' },
  { id: 3, title: '云层下的告白', subtitle: '作者：浅羽', meta: '已读完 · 评分 4.7', badge: '完结' },
  { id: 4, title: '晚香玉车站', subtitle: '作者：雪岛', meta: '阅读中 · 24%', badge: 'TXT' },
]
</script>

<template>
  <div class="page-stack">
    <PageTitle
      eyebrow="Novel"
      title="小说书架"
      description="书架页预留状态筛选、平台标签、阅读进度与在线阅读器跳转。"
    >
      <template #actions>
        <a-space>
          <a-button>导入 TXT</a-button>
          <a-button type="primary">新增书目</a-button>
        </a-space>
      </template>
    </PageTitle>

    <GlassCard accent="var(--module-novel)">
      <div class="pill-row">
        <span class="module-pill">全部</span>
        <span class="module-pill">未读</span>
        <span class="module-pill">阅读中</span>
        <span class="module-pill">已读完</span>
        <span class="module-pill">作者</span>
        <span class="module-pill">平台</span>
      </div>
    </GlassCard>

    <section class="media-grid media-grid--four">
      <MediaCard
        v-for="item in novels"
        :key="item.id"
        :title="item.title"
        :subtitle="item.subtitle"
        :meta="item.meta"
        :badge="item.badge"
        category="小说"
        accent="var(--module-novel)"
        :to="`/novels/reader/${item.id}`"
      />
    </section>
  </div>
</template>
