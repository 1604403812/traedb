<script setup lang="ts">
import GlassCard from '../../components/common/GlassCard.vue'
import PageTitle from '../../components/common/PageTitle.vue'

const folders = ['audio', 'novel', 'wiki', 'bead']
const rows = [
  ['Audio001', 'folder', '今天'],
  ['cover.jpg', 'image', '昨天'],
  ['audio.mp3', 'audio', '今天'],
  ['subtitle.lrc', 'subtitle', '今天'],
  ['README.txt', 'text', '上周'],
]
</script>

<template>
  <div class="page-stack">
    <PageTitle
      eyebrow="Drive"
      title="云盘管理"
      description="已建立面包屑、快捷入口、文件列表与同步按钮区域，可继续接入 Alist API 与预览能力。"
    >
      <template #actions>
        <a-space>
          <a-button>上传文件</a-button>
          <a-button type="primary">同步目录</a-button>
        </a-space>
      </template>
    </PageTitle>

    <GlassCard accent="var(--module-drive)">
      <div class="pill-row">
        <span class="module-pill">/</span>
        <span v-for="folder in folders" :key="folder" class="module-pill">{{ folder }}</span>
      </div>
    </GlassCard>

    <GlassCard accent="var(--module-drive)">
      <div class="file-table">
        <div class="file-row file-row--head">
          <span>名称</span>
          <span>类型</span>
          <span>更新时间</span>
        </div>
        <div v-for="row in rows" :key="row[0]" class="file-row">
          <strong>{{ row[0] }}</strong>
          <span>{{ row[1] }}</span>
          <span>{{ row[2] }}</span>
        </div>
      </div>
    </GlassCard>
  </div>
</template>
