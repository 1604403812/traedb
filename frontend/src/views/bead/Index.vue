<template>
  <div class="page-view">
    <PageTitle title="拼豆库存" :icon="Palette">
      <template #actions>
        <a-button @click="showStats = true">
          <template #icon><ChartBar :size="16" /></template>
          统计
        </a-button>
        <a-button type="primary" @click="showAddModal = true">
          <template #icon><Plus :size="16" /></template>
          添加
        </a-button>
      </template>
    </PageTitle>

    <div class="page-view__filters">
      <SearchInput
        v-model="searchQuery"
        placeholder="搜索颜色..."
        class="page-view__search"
      />
      
      <a-select
        v-model:value="selectedBrand"
        placeholder="品牌"
        style="width: 150px"
        allow-clear
      >
        <a-select-option value="">全部</a-select-option>
        <a-select-option value="Perler">Perler</a-select-option>
        <a-select-option value="Hama">Hama</a-select-option>
        <a-select-option value="Mitsubishi">Mitsubishi</a-select-option>
      </a-select>
      
      <a-checkbox v-model:checked="lowStockOnly">仅低库存</a-checkbox>
    </div>

    <div v-if="lowStockBeads.length > 0" class="bead-page__alert">
      <a-alert
        type="warning"
        show-icon
        :message="`低库存提醒 (${lowStockBeads.length})`"
      >
        <template #description>
          以下颜色库存低于最低阈值，请及时补充
        </template>
      </a-alert>
      
      <div class="bead-page__alert-grid">
        <div
          v-for="bead in lowStockBeads"
          :key="bead.id"
          class="bead-page__bead-chip"
          :style="{ '--bead-color': bead.color_hex || '#ccc' }"
        >
          <span class="bead-page__bead-dot"></span>
          <span class="bead-page__bead-name">{{ bead.name }}</span>
          <span class="bead-page__bead-qty">{{ bead.quantity }}{{ bead.unit }}</span>
        </div>
      </div>
    </div>

    <div class="bead-page__groups">
      <div v-for="(beads, brand) in beadsByBrand" :key="brand" class="bead-page__group">
        <h3 class="bead-page__group-title">{{ brand }} ({{ beads.length }})</h3>
        
        <div class="bead-page__grid">
          <div
            v-for="bead in beads"
            :key="bead.id"
            class="bead-page__bead-card"
            :class="{ 'is-low-stock': bead.is_low_stock }"
            :style="{ '--bead-color': bead.color_hex || '#ccc' }"
            @click="handleEditBead(bead)"
          >
            <div class="bead-page__bead-color">
              <span v-if="bead.is_low_stock" class="bead-page__bead-warning">
                <Warning :size="14" />
              </span>
            </div>
            <div class="bead-page__bead-info">
              <span class="bead-page__bead-name">{{ bead.name }}</span>
              <span class="bead-page__bead-code">{{ bead.color_code }}</span>
            </div>
            <span class="bead-page__bead-quantity">{{ bead.quantity }}{{ bead.unit }}</span>
          </div>
        </div>
      </div>
    </div>

    <EmptyState
      v-if="beadsByBrand.length === 0"
      title="还没有拼豆"
      description="点击右上角添加你的第一个拼豆颜色"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, type Component } from 'vue';
import PageTitle from '@/components/layout/PageTitle.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { Palette, Plus, ChartBar, Warning } from '@phosphor-icons/vue';

const searchQuery = ref('');
const selectedBrand = ref('');
const lowStockOnly = ref(false);
const showAddModal = ref(false);
const showStats = ref(false);

interface Bead {
  id: number;
  name: string;
  brand: string;
  color_code?: string;
  color_hex?: string;
  quantity: number;
  unit: string;
  min_stock: number;
  is_low_stock: boolean;
}

const beads = ref<Bead[]>([
  { id: 1, name: '白色', brand: 'Perler', color_code: '000', color_hex: '#FFFFFF', quantity: 500, unit: '颗', min_stock: 50, is_low_stock: false },
  { id: 2, name: '黑色', brand: 'Perler', color_code: '001', color_hex: '#1A1917', quantity: 25, unit: '颗', min_stock: 50, is_low_stock: true },
  { id: 3, name: '红色', brand: 'Perler', color_code: '002', color_hex: '#E53935', quantity: 30, unit: '颗', min_stock: 50, is_low_stock: true },
  { id: 4, name: '蓝色', brand: 'Perler', color_code: '003', color_hex: '#1E88E5', quantity: 35, unit: '颗', min_stock: 50, is_low_stock: true },
  { id: 5, name: '黄色', brand: 'Perler', color_code: '004', color_hex: '#FDD835', quantity: 40, unit: '颗', min_stock: 50, is_low_stock: true },
  { id: 6, name: '绿色', brand: 'Perler', color_code: '005', color_hex: '#43A047', quantity: 300, unit: '颗', min_stock: 50, is_low_stock: false },
  { id: 7, name: '粉色', brand: 'Hama', color_code: 'H01', color_hex: '#F48FB1', quantity: 150, unit: '颗', min_stock: 50, is_low_stock: false },
  { id: 8, name: '橙色', brand: 'Hama', color_code: 'H02', color_hex: '#FF9800', quantity: 200, unit: '颗', min_stock: 50, is_low_stock: false },
]);

const lowStockBeads = computed(() => beads.value.filter(b => b.is_low_stock));

const beadsByBrand = computed(() => {
  const grouped: Record<string, Bead[]> = {};
  beads.value.forEach(bead => {
    if (!grouped[bead.brand]) grouped[bead.brand] = [];
    grouped[bead.brand].push(bead);
  });
  return grouped;
});

const handleEditBead = (bead: Bead) => {
  console.log('Edit bead:', bead);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.page-view {
  max-width: 1400px;
  margin: 0 auto;
  
  &__filters {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 24px;
  }
  
  &__search {
    max-width: 300px;
  }
}

.bead-page {
  &__alert {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: 20px;
    margin-bottom: 32px;
    
    &-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
  }
  
  &__bead-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--color-warning-bg);
    border-radius: var(--radius-full);
    font-size: var(--font-size-sm);
  }
  
  &__bead-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--bead-color);
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }
  
  &__bead-name {
    color: var(--color-text-primary);
    font-weight: var(--font-weight-medium);
  }
  
  &__bead-qty {
    color: var(--color-warning);
    font-size: var(--font-size-xs);
  }
  
  &__groups {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  &__group-title {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
    margin: 0 0 16px;
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
  }
  
  &__bead-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all var(--transition-bounce);
    position: relative;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    &.is-low-stock {
      border-color: var(--color-warning);
    }
  }
  
  &__bead-color {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bead-color);
    box-shadow: 
      inset 0 2px 4px rgba(255,255,255,0.3),
      inset 0 -2px 4px rgba(0,0,0,0.1),
      0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 12px;
    position: relative;
  }
  
  &__bead-warning {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-warning);
    color: white;
    border-radius: 50%;
    font-size: 10px;
  }
  
  &__bead-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 8px;
  }
  
  &__bead-code {
    font-size: var(--font-size-xs);
    color: var(--color-text-muted);
    font-family: var(--font-family-mono);
  }
  
  &__bead-quantity {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-primary);
  }
}
</style>
