<script setup lang="ts">
import MediaCard from '../../components/common/MediaCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'

const members = [
  ['1', '娜琏', '나연 · Lead Vocalist'],
  ['2', '定延', '정연 · Vocal'],
  ['3', 'Momo', '모모 · Main Dancer'],
  ['4', 'Sana', '사나 · Performer'],
  ['5', '志效', '지효 · Leader'],
  ['6', 'Mina', '미나 · Dancer'],
  ['7', '多贤', '다현 · Rapper'],
  ['8', '彩瑛', '채영 · Rapper'],
  ['9', '子瑜', '쯔위 · Visual'],
]
</script>

<template>
  <div class="page-stack">
    <PageTitle eyebrow="Members" title="成员列表" description="成员卡片使用圆角方形视觉，可继续替换为真实头像或媒体封面。" />
    <section class="media-grid media-grid--three">
      <MediaCard
        v-for="[id, title, subtitle] in members"
        :key="id"
        :title="title"
        :subtitle="subtitle"
        meta="支持生日、MBTI、定位与社交链接"
        badge="TWICE"
        category="成员"
        accent="var(--module-wiki)"
        ratio="square"
        :to="`/wiki/members/${id}`"
      />
    </section>
  </div>
</template>
