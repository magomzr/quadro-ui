export interface Category {
  id: string;
  name: string;
  description: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  data: Category[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
