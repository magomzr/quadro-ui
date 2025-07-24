import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private readonly http: HttpClient) {}

  getLogsByTenant(tenantId: string): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http
      .get<any[]>(`${this.baseUrl}/tenants/${tenantId}/logs`, {
        headers,
      })
      .pipe(
        tap((response) => console.log('Logs fetched successfully:', response)),
        catchError((error) => {
          console.error('Error en la petición', error);
          return throwError(() => error);
        })
      );
  }
}
