import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CustomerResponse,
  Customer,
  CustomerFilters,
} from '../../interfaces/customer.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private readonly baseUrl = `${environment.baseUrl}/tenants`;

  constructor(private readonly http: HttpClient) {}

  getCustomers(
    tenantId: string,
    filters?: CustomerFilters
  ): Observable<CustomerResponse> {
    let params = new HttpParams();

    if (filters?.page) params = params.set('page', filters.page.toString());
    if (filters?.limit) params = params.set('limit', filters.limit.toString());
    if (filters?.search) params = params.set('search', filters.search);

    return this.http.get<CustomerResponse>(
      `${this.baseUrl}/${tenantId}/customers`,
      { params }
    );
  }

  getCustomerById(tenantId: string, customerId: string): Observable<Customer> {
    return this.http.get<Customer>(
      `${this.baseUrl}/${tenantId}/customers/${customerId}`
    );
  }
}
