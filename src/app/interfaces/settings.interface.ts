export interface Settings {
  id: string;
  tenantId: string;
  companyName: string;
  companyLogoUrl: string | null;
  currency: string;
  locale: string;
  timezone: string;
  invoicePrefix: string;
  createdAt: string;
  updatedAt: string;
}
