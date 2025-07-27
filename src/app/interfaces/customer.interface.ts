export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerResponse {
  data: Customer[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface CustomerFilters {
  page?: number;
  limit?: number;
  search?: string;
}
