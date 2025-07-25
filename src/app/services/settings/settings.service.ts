import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Settings } from '../../interfaces/settings.interface';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly baseUrl = `${environment.baseUrl}/tenants`;

  constructor(private readonly http: HttpClient) {}

  getSettings(tenantId: string): Observable<Settings> {
    return this.http.get<Settings>(`${this.baseUrl}/${tenantId}/settings`);
  }

  updateSettings(
    tenantId: string,
    data: Partial<Settings>
  ): Observable<Settings> {
    return this.http.patch<Settings>(
      `${this.baseUrl}/${tenantId}/settings`,
      data
    );
  }
}
