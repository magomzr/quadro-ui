import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CategoryResponse,
  Category,
} from '../../interfaces/category.interface';
import { ProductResponse, Product } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly baseUrl = `${environment.baseUrl}/tenants`;

  constructor(private readonly http: HttpClient) {}

  // CATEGORIES
  getCategories(
    tenantId: string,
    page: number = 1,
    limit: number = 10
  ): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(
      `${this.baseUrl}/${tenantId}/catalog/categories`,
      {
        params: { page: page.toString(), limit: limit.toString() },
      }
    );
  }

  getCategoryById(tenantId: string, categoryId: string): Observable<Category> {
    return this.http.get<Category>(
      `${this.baseUrl}/${tenantId}/catalog/categories/${categoryId}`
    );
  }

  createCategory(
    tenantId: string,
    category: Partial<Category>
  ): Observable<Category> {
    return this.http.post<Category>(
      `${this.baseUrl}/${tenantId}/catalog/categories`,
      category
    );
  }

  updateCategory(
    tenantId: string,
    categoryId: string,
    category: Partial<Category>
  ): Observable<Category> {
    return this.http.patch<Category>(
      `${this.baseUrl}/${tenantId}/catalog/categories/${categoryId}`,
      category
    );
  }

  // PRODUCTS
  getProducts(
    tenantId: string,
    options?: {
      page?: number;
      limit?: number;
      categoryId?: string;
      isPublished?: boolean;
      lowStock?: boolean;
    }
  ): Observable<ProductResponse> {
    let params = new HttpParams();

    if (options?.page) params = params.set('page', options.page.toString());
    if (options?.limit) params = params.set('limit', options.limit.toString());
    if (options?.categoryId)
      params = params.set('categoryId', options.categoryId);
    if (options?.isPublished !== undefined)
      params = params.set('isPublished', options.isPublished.toString());
    if (options?.lowStock) params = params.set('lowStock', 'true');

    return this.http.get<ProductResponse>(
      `${this.baseUrl}/${tenantId}/catalog/products`,
      { params }
    );
  }

  getProductById(tenantId: string, productId: string): Observable<Product> {
    return this.http.get<Product>(
      `${this.baseUrl}/${tenantId}/catalog/products/${productId}`
    );
  }

  createProduct(tenantId: string, product: any): Observable<Product> {
    return this.http.post<Product>(
      `${this.baseUrl}/${tenantId}/catalog/products`,
      product
    );
  }

  updateProduct(
    tenantId: string,
    productId: string,
    product: Partial<Product>
  ): Observable<Product> {
    return this.http.patch<Product>(
      `${this.baseUrl}/${tenantId}/catalog/products/${productId}`,
      product
    );
  }
}
