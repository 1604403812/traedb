import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { beadApi } from '@/api/bead';
import type { Bead, BeadStats } from '@/types/bead';

export const useBeadStore = defineStore('bead', () => {
  const beads = ref<Bead[]>([]);
  const stats = ref<BeadStats | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const lowStockBeads = computed(() => {
    return beads.value.filter(bead => bead.is_low_stock);
  });

  const lowStockCount = computed(() => lowStockBeads.value.length);

  const beadsByBrand = computed(() => {
    const grouped: Record<string, Bead[]> = {};
    beads.value.forEach(bead => {
      if (!grouped[bead.brand]) {
        grouped[bead.brand] = [];
      }
      grouped[bead.brand].push(bead);
    });
    return grouped;
  });

  const fetchBeads = async (params?: { search?: string; brand?: string; low_stock?: boolean }) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await beadApi.getList(params);
      beads.value = response.data.results || response.data;
    } catch (e) {
      error.value = '获取拼豆列表失败';
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const fetchStats = async () => {
    try {
      const response = await beadApi.getStats();
      stats.value = response.data;
    } catch (e) {
      console.error('Failed to fetch bead stats:', e);
    }
  };

  const addBead = async (data: Partial<Bead>) => {
    const response = await beadApi.create(data);
    beads.value.unshift(response.data);
    return response.data;
  };

  const updateBead = async (id: number, data: Partial<Bead>) => {
    const response = await beadApi.update(id, data);
    const index = beads.value.findIndex(b => b.id === id);
    if (index !== -1) {
      beads.value[index] = response.data;
    }
    return response.data;
  };

  const updateStock = async (id: number, quantity: number, notes?: string) => {
    const response = await beadApi.updateStock(id, { quantity, notes });
    const index = beads.value.findIndex(b => b.id === id);
    if (index !== -1) {
      beads.value[index] = { ...beads.value[index], ...response.data };
    }
    return response.data;
  };

  const deleteBead = async (id: number) => {
    await beadApi.delete(id);
    beads.value = beads.value.filter(b => b.id !== id);
  };

  return {
    beads,
    stats,
    loading,
    error,
    lowStockBeads,
    lowStockCount,
    beadsByBrand,
    fetchBeads,
    fetchStats,
    addBead,
    updateBead,
    updateStock,
    deleteBead,
  };
});
