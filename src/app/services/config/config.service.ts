import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import {
  AppConfig,
  ConfigOption,
  NavbarItem,
} from '../../interfaces/config.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly configSubject = new BehaviorSubject<AppConfig | null>(null);
  private configLoaded = false;

  constructor(private readonly http: HttpClient) {}

  loadConfig(): Observable<AppConfig> {
    if (this.configLoaded && this.configSubject.value) {
      return this.configSubject
        .asObservable()
        .pipe(filter((config): config is AppConfig => config !== null));
    }

    return this.http.get<AppConfig>('/json/config.json').pipe(
      tap((config) => {
        this.configSubject.next(config);
        this.configLoaded = true;
      })
    );
  }

  getConfig(): Observable<AppConfig | null> {
    return this.configSubject.asObservable();
  }

  // Métodos existentes
  getCurrencies(): ConfigOption[] {
    return this.configSubject.value?.currency || [];
  }

  getLocales(): ConfigOption[] {
    return this.configSubject.value?.locale || [];
  }

  getNavbarItems(): NavbarItem[] {
    return this.configSubject.value?.navbar.items || [];
  }

  getCurrencyByValue(value: string): ConfigOption | undefined {
    return this.configSubject.value?.currency.find((c) => c.value === value);
  }

  getLocaleByValue(value: string): ConfigOption | undefined {
    return this.configSubject.value?.locale.find((l) => l.value === value);
  }

  // Nuevos métodos para labels
  getLabel(section: string, key: string): string {
    const labels = this.configSubject.value?.labels;
    if (labels?.[section as keyof typeof labels]) {
      return labels[section as keyof typeof labels][key] || key;
    }
    return key; // Fallback al key si no encuentra el label
  }

  getCommonLabel(key: string): string {
    return this.getLabel('common', key);
  }

  getCatalogLabel(key: string): string {
    return this.getLabel('catalog', key);
  }

  getOrdersLabel(key: string): string {
    return this.getLabel('orders', key);
  }

  getCustomersLabel(key: string): string {
    return this.getLabel('customers', key);
  }

  getSettingsLabel(key: string): string {
    return this.getLabel('settings', key);
  }

  getLoginLabel(key: string): string {
    return this.getLabel('login', key);
  }

  getLogsLabel(key: string): string {
    return this.getLabel('logs', key);
  }

  // Método helper para obtener múltiples labels de una sección
  getSectionLabels(section: string): Record<string, string> {
    const labels = this.configSubject.value?.labels;
    return labels?.[section as keyof typeof labels] || {};
  }
}
