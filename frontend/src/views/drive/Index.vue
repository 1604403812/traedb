<template>
  <div class="page-view">
    <PageTitle title="云盘管理" :icon="Cloud">
      <template #actions>
        <a-button @click="handleSync">
          <template #icon><ArrowsClockwise :size="16" /></template>
          同步
        </a-button>
        <a-button type="primary" @click="handleUpload">
          <template #icon><Upload :size="16" /></template>
          上传
        </a-button>
      </template>
    </PageTitle>

    <div class="drive-page__breadcrumbs">
      <a-breadcrumb>
        <a-breadcrumb-item v-for="(crumb, index) in breadcrumbs" :key="index">
          <span v-if="index === breadcrumbs.length - 1">{{ crumb }}</span>
          <a v-else @click="navigateTo(index)">{{ crumb }}</a>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <div class="drive-page__stats">
      <a-progress
        :percent="storagePercent"
        :stroke-color="storagePercent > 80 ? 'var(--color-warning)' : 'var(--color-drive)'"
      />
      <span class="drive-page__storage-text">{{ storageText }}</span>
    </div>

    <div class="drive-page__list">
      <a-table
        :columns="columns"
        :data-source="files"
        :pagination="false"
        :row-key="record => record.id"
        :row-selection="rowSelection"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <div class="drive-page__file-name">
              <component
                :is="getFileIcon(record.type)"
                :size="20"
                weight="regular"
                :class="`drive-page__file-icon--${record.type}`"
              />
              <span>{{ record.name }}</span>
            </div>
          </template>
          
          <template v-else-if="column.key === 'size'">
            {{ record.type === 'folder' ? '-' : formatBytes(record.size) }}
          </template>
          
          <template v-else-if="column.key === 'modified'">
            {{ formatRelativeTime(record.modified) }}
          </template>
          
          <template v-else-if="column.key === 'action'">
            <a-space>
              <a-button type="text" size="small" @click="handleDownload(record)">
                <Download :size="16" />
              </a-button>
              <a-button type="text" size="small" danger @click="handleDelete(record)">
                <Trash :size="16" />
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PageTitle from '@/components/layout/PageTitle.vue';
import { Cloud, Upload, ArrowsClockwise, Folder, File, FileText, Image, Film, Download, Trash } from '@phosphor-icons/vue';
import type { TableProps } from 'ant-design-vue';

const breadcrumbs = ref(['云盘', 'audio', 'Audio001']);
const selectedRowKeys = ref<number[]>([]);

interface FileItem {
  id: number;
  name: string;
  type: 'folder' | 'file';
  size?: number;
  mime_type?: string;
  modified: string;
}

const files = ref<FileItem[]>([
  { id: 1, name: 'Images', type: 'folder', modified: '2024-01-01' },
  { id: 2, name: 'audio.mp3', type: 'file', size: 47268240, mime_type: 'audio/mpeg', modified: '2024-01-02' },
  { id: 3, name: 'subtitle.lrc', type: 'file', size: 12288, mime_type: 'text/plain', modified: '2024-01-02' },
  { id: 4, name: 'video.mp4', type: 'file', size: 545259520, mime_type: 'video/mp4', modified: '2024-01-03' },
  { id: 5, name: 'cover.jpg', type: 'file', size: 2621440, mime_type: 'image/jpeg', modified: '2024-01-03' },
]);

const columns = [
  { title: '名称', key: 'name', dataIndex: 'name' },
  { title: '大小', key: 'size', width: 120 },
  { title: '修改时间', key: 'modified', width: 150 },
  { title: '操作', key: 'action', width: 120 },
];

const storageText = '5.2 GB / 15 GB';
const storagePercent = computed(() => 35);

const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: number[]) => {
    selectedRowKeys.value = keys;
  },
}));

const getFileIcon = (type: 'folder' | 'file', mimeType?: string) => {
  if (type === 'folder') return Folder;
  if (mimeType?.startsWith('image/')) return Image;
  if (mimeType?.startsWith('video/')) return Film;
  if (mimeType?.startsWith('audio/')) return File;
  return FileText;
};

const formatBytes = (bytes: number) => {
  if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(1) + ' GB';
  if (bytes >= 1048576) return (bytes / 1048576).toFixed(1) + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return bytes + ' B';
};

const formatRelativeTime = (date: string) => {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return '今天';
  if (days === 1) return '昨天';
  if (days < 7) return `${days}天前`;
  return date;
};

const navigateTo = (index: number) => {
  breadcrumbs.value = breadcrumbs.value.slice(0, index + 1);
};

const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
  console.log('Table change:', pagination, filters, sorter);
};

const handleSync = () => console.log('Sync');
const handleUpload = () => console.log('Upload');
const handleDownload = (file: FileItem) => console.log('Download', file);
const handleDelete = (file: FileItem) => console.log('Delete', file);
</script>

<style lang="scss" scoped>
.drive-page {
  &__breadcrumbs {
    margin-bottom: 16px;
  }
  
  &__stats {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: var(--glass-bg);
    border-radius: var(--radius-lg);
    margin-bottom: 24px;
    
    :deep(.ant-progress) {
      flex: 1;
    }
  }
  
  &__storage-text {
    font-size: var(--font-size-sm);
    color: var(--color-text-secondary);
    white-space: nowrap;
  }
  
  &__list {
    background: var(--glass-bg);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  
  &__file-name {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  &__file-icon--folder { color: var(--color-drive); }
  &__file-icon--image { color: var(--color-novel); }
  &__file-icon--video { color: var(--color-audio); }
  &__file-icon--file { color: var(--color-text-muted); }
}
</style>
