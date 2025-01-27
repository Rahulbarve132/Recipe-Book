export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  description: string;
  lastUpdated: string;
}

export type SortDirection = 'asc' | 'desc';
export type SortField = 'name' | 'quantity' | 'category' | 'price';