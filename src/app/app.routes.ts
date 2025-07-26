import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'logs',
    loadComponent: () =>
      import('./components/logs/logs.component').then((m) => m.LogsComponent),
    title: 'Logs',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'Login',
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./components/settings/settings.component').then(
        (m) => m.SettingsComponent
      ),
    title: 'Settings',
  },
  {
    path: 'catalog',
    loadComponent: () =>
      import('./components/catalog/catalog.component').then(
        (m) => m.CatalogComponent
      ),
    title: 'Catalog',
  },
];
