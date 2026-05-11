<script setup lang="ts">
import MediaCard from '../../components/common/MediaCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'

const albums = [
  ['1', 'READY TO BE', '2023 · EP'],
  ['2', 'Celebrate', '2022 · Japanese'],
  ['3', 'Formula of Love', '2021 · Full'],
  ['4', 'Taste of Love', '2021 · EP'],
]
</script>

<template>
  <div class="page-stack">
    <PageTitle eyebrow="Albums" title="专辑列表" description="专辑页已配置卡片网格，可直接扩展年份筛选、专辑类型和歌曲数量。" />
    <section class="media-grid media-grid--four">
      <MediaCard
        v-for="[id, title, subtitle] in albums"
        :key="id"
        :title="title"
        :subtitle="subtitle"
        meta="歌曲列表、参与成员、发行信息"
        badge="专辑"
        category="Album"
        accent="var(--module-wiki)"
        :to="`/wiki/albums/${id}`"
      />
    </section>
  </div>
</template>
