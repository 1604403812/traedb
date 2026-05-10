import api, { request, type PaginatedResponse } from './request';

export interface Bead {
  id: number;
  name: string;
  brand: string;
  color_code?: string;
  color_hex?: string;
  quantity: number;
  unit: string;
  min_stock: number;
  is_low_stock: boolean;
  purchase_price?: number;
  purchase_date?: string;
  supplier?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface BeadStats {
  total_types: number;
  total_quantity: number;
  low_stock_count: number;
  by_brand: Record<string, number>;
}

interface BeadListParams {
  page?: number;
  page_size?: number;
  search?: string;
  brand?: string;
  low_stock?: boolean;
}

export const beadApi = {
  getList: (params?: BeadListParams) => {
    return request<PaginatedResponse<Bead>>({
      url: '/v1/bead',
      method: 'GET',
      params,
    }).then(data => ({
      data: {
        ...data,
        results: data.results || [],
      },
    }));
  },
  
  getById: (id: number) => {
    return request<Bead>({
      url: `/v1/bead/${id}`,
      method: 'GET',
    }).then(data => ({ data }));
  },
  
  create: (data: Partial<Bead>) => {
    return request<Bead>({
      url: '/v1/bead',
      method: 'POST',
      data,
    }).then(data => ({ data }));
  },
  
  update: (id: number, data: Partial<Bead>) => {
    return request<Bead>({
      url: `/v1/bead/${id}`,
      method: 'PUT',
      data,
    }).then(data => ({ data }));
  },
  
  updateStock: (id: number, data: { quantity: number; notes?: string }) => {
    return request<Bead>({
      url: `/v1/bead/${id}/stock`,
      method: 'PUT',
      data,
    }).then(data => ({ data }));
  },
  
  delete: (id: number) => {
    return request<void>({
      url: `/v1/bead/${id}`,
      method: 'DELETE',
    }).then(() => ({ data: undefined }));
  },
  
  getStats: () => {
    return request<BeadStats>({
      url: '/v1/bead/stats',
      method: 'GET',
    }).then(data => ({ data }));
  },
};
