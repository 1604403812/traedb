<script setup lang="ts">
import GlassCard from '../../components/common/GlassCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'

const tracks = [
  'SET ME FREE',
  'MOONLIGHT SUNRISE',
  'GOT THE THRILLS',
  'BLAME IT ON ME',
  'WALLFLOWER',
]
</script>

<template>
  <div class="page-stack">
    <PageTitle eyebrow="Album Detail" title="READY TO BE" description="专辑详情页延续玻璃卡片结构，适合继续接入歌曲列表与成员参与关系。" />

    <section class="detail-grid">
      <GlassCard class="cover-panel" accent="var(--module-wiki)">
        <div class="cover-art cover-art--portrait">
          <span>Album</span>
          <strong>READY TO BE</strong>
        </div>
      </GlassCard>

      <GlassCard accent="var(--module-wiki)">
        <div class="section-head">
          <div>
            <p class="eyebrow">Tracklist</p>
            <h2>歌曲列表</h2>
          </div>
          <span class="rating-chip">7 Tracks</span>
        </div>
        <div class="timeline-list">
          <article v-for="track in tracks" :key="track" class="timeline-item timeline-item--compact">
            <span class="timeline-item__tag">Track</span>
            <div>
              <h3>{{ track }}</h3>
              <p>标题、时长、歌词和成员信息可在此扩展。</p>
            </div>
          </article>
        </div>
      </GlassCard>
    </section>
  </div>
</template>
