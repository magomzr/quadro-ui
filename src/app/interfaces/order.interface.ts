export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'paid' | 'cancelled';
  subtotal: string;
  total: string;
  discountId: string | null;
  discountAmount: string | null;
  shippingAddress: string;
  notes: string | null;
  tenantId: string;
  customerId: string | null;
  createdAt: string;
  updatedAt: string;
  customer: any | null;
  discount: {
    id: string;
    code: string;
    description: string;
    type: string;
    value: string;
  } | null;
  _count: {
    orderItems: number;
  };
}

export interface OrderResponse {
  data: Order[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: 'pending' | 'paid' | 'cancelled';
  customerId?: string;
  fromDate?: string;
  toDate?: string;
}
