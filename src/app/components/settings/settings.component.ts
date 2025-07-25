import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../services/settings/settings.service';
import { Settings } from '../../interfaces/settings.interface';
import { SETTINGS } from '../../constants/settings';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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

  // Constantes para los dropdowns
  currencies = SETTINGS.currency;
  locales = SETTINGS.locale;

  constructor(
    private readonly fb: FormBuilder,
    private readonly settingsService: SettingsService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    const tenantId = localStorage.getItem('tenantId')!;
    this.loading = true;
    this.settingsService.getSettings(tenantId).subscribe({
      next: (settings) => {
        this.settings = settings;
        this.form = this.fb.group({
          companyName: [settings.companyName],
          companyLogoUrl: [settings.companyLogoUrl],
          currency: [settings.currency],
          locale: [settings.locale],
          timezone: [settings.timezone],
          invoicePrefix: [settings.invoicePrefix],
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Error loading settings';
        this.loading = false;
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const tenantId = localStorage.getItem('tenantId')!;
    this.settingsService.updateSettings(tenantId, this.form.value).subscribe({
      next: (updated) => {
        this.settings = updated;
        this.error = '';
        this.router.navigate([this.mainPage]);
      },
      error: (err) => {
        this.error = err.message || 'Error updating settings';
      },
    });
  }
}
