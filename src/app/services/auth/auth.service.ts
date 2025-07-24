import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.baseUrl}/auth`;
  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/login`, {
        email,
        password,
        tenantId: localStorage.getItem('tenantId'),
      })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => new Error('Login failed, please try again.'));
        })
      );
  }
}
