<script setup lang="ts">
import GlassCard from '../../components/common/GlassCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'

const alerts = [
  { name: '白色', count: 45, color: '#F2F0EA' },
  { name: '黑色', count: 28, color: '#3B3A39' },
  { name: '蓝色', count: 34, color: '#7E8FA1' },
  { name: '黄色', count: 40, color: '#D6C28C' },
]

const inventory = [
  { name: '白色', brand: 'Perler', count: 520, color: '#F2F0EA' },
  { name: '雾蓝', brand: 'Hama', count: 300, color: '#9BAAB6' },
  { name: '焦糖', brand: 'Mitsubishi', count: 240, color: '#A99280' },
  { name: '鼠尾草', brand: 'Perler', count: 410, color: '#9BA592' },
  { name: '藕粉', brand: 'Hama', count: 180, color: '#C7A8A5' },
  { name: '银灰', brand: 'Perler', count: 360, color: '#C9CDD1' },
]
</script>

<template>
  <div class="page-stack">
    <PageTitle
      eyebrow="Beads"
      title="拼豆库存"
      description="色卡组件、低库存提醒和品牌分组已在页面结构中体现，后续只需对接真实数据与编辑弹窗。"
    >
      <template #actions>
        <a-space>
          <a-button>导出库存</a-button>
          <a-button type="primary">添加颜色</a-button>
        </a-space>
      </template>
    </PageTitle>

    <GlassCard accent="var(--module-beads)">
      <div class="section-head">
        <div>
          <p class="eyebrow">Alerts</p>
          <h2>低库存提醒</h2>
        </div>
        <span class="rating-chip">{{ alerts.length }} 项</span>
      </div>
      <div class="swatch-grid">
        <article v-for="item in alerts" :key="item.name" class="swatch-card">
          <span class="swatch-dot" :style="{ background: item.color }" />
          <strong>{{ item.name }}</strong>
          <small>{{ item.count }} 颗</small>
        </article>
      </div>
    </GlassCard>

    <GlassCard accent="var(--module-beads)">
      <div class="section-head">
        <div>
          <p class="eyebrow">Inventory</p>
          <h2>库存总览</h2>
        </div>
      </div>
      <div class="swatch-grid swatch-grid--dense">
        <article v-for="item in inventory" :key="item.name" class="swatch-card swatch-card--dense">
          <span class="swatch-dot" :style="{ background: item.color }" />
          <strong>{{ item.name }}</strong>
          <small>{{ item.brand }}</small>
          <span class="swatch-count">{{ item.count }}</span>
        </article>
      </div>
    </GlassCard>
  </div>
</template>
