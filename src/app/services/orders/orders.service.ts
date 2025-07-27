import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  OrderResponse,
  Order,
  OrderFilters,
} from '../../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly baseUrl = `${environment.baseUrl}/tenants`;

  constructor(private readonly http: HttpClient) {}

  getOrders(
    tenantId: string,
    filters?: OrderFilters
  ): Observable<OrderResponse> {
    let params = new HttpParams();

    if (filters?.page) params = params.set('page', filters.page.toString());
    if (filters?.limit) params = params.set('limit', filters.limit.toString());
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.customerId)
      params = params.set('customerId', filters.customerId);
    if (filters?.fromDate) params = params.set('fromDate', filters.fromDate);
    if (filters?.toDate) params = params.set('toDate', filters.toDate);

    return this.http.get<OrderResponse>(`${this.baseUrl}/${tenantId}/orders`, {
      params,
    });
  }

  getOrderById(tenantId: string, orderId: string): Observable<Order> {
    return this.http.get<Order>(
      `${this.baseUrl}/${tenantId}/orders/${orderId}`
    );
  }

  updateOrder(
    tenantId: string,
    orderId: string,
    data: Partial<Order>
  ): Observable<Order> {
    return this.http.patch<Order>(
      `${this.baseUrl}/${tenantId}/orders/${orderId}`,
      data
    );
  }

  updateOrderStatus(
    tenantId: string,
    orderId: string,
    status: 'pending' | 'paid' | 'cancelled'
  ): Observable<Order> {
    return this.http.patch<Order>(
      `${this.baseUrl}/${tenantId}/orders/${orderId}/status`,
      { status }
    );
  }

  deleteOrder(tenantId: string, orderId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${tenantId}/orders/${orderId}`
    );
  }
}
