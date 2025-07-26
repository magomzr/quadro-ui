import { Category } from './category.interface';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  stock: number;
  minStock: number;
  sku: string;
  imageUrl: string;
  isPublished: boolean;
  categoryId: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

export interface ProductResponse {
  data: Product[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
