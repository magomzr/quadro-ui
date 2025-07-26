import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings/settings.service';
import { Settings } from '../../interfaces/settings.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { forkJoin, take } from 'rxjs';
import { ConfigOption } from '../../interfaces/config.interface';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  private readonly mainPage = environment.mainPage;
  form!: FormGroup;
  loading = false;
  error = '';
  settings!: Settings;

  // Opciones de configuración
  currencies: ConfigOption[] = [];
  locales: ConfigOption[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly settingsService: SettingsService,
    private readonly configService: ConfigService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const tenantId = localStorage.getItem('tenantId')!;
    this.loading = true;

    console.log('Loading settings for tenant:', tenantId);

    forkJoin({
      config: this.configService.loadConfig().pipe(take(1)),
      settings: this.settingsService.getSettings(tenantId).pipe(take(1)),
    }).subscribe({
      next: ({ config, settings }) => {
        console.log('forkJoin next:', { config, settings });

        this.currencies = config.currency;
        this.locales = config.locale;

        // Asignar settings y crear formulario
        this.settings = settings;
        this.form = this.fb.group({
          companyName: [settings.companyName],
          companyLogoUrl: [settings.companyLogoUrl],
          currency: [settings.currency],
          locale: [settings.locale],
          timezone: [settings.timezone],
          invoicePrefix: [settings.invoicePrefix],
        });
        console.log('Form created:', this.form.value);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error in forkJoin:', err);
        this.error = 'Error loading data';
        this.loading = false;
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const tenantId = localStorage.getItem('tenantId')!;
    this.loading = true;

    this.settingsService.updateSettings(tenantId, this.form.value).subscribe({
      next: (updated) => {
        this.settings = updated;
        this.error = '';
        this.loading = false;
        this.router.navigate([this.mainPage]);
      },
      error: (err) => {
        this.error = 'Error updating settings';
        this.loading = false;
      },
    });
  }
}
