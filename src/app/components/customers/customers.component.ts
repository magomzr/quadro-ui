import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersService } from '../../services/customers/customers.service';
import { Customer, CustomerFilters } from '../../interfaces/customer.interface';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  error = '';

  // Pagination
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;

  // Search
  searchTerm = '';
  searchTimeout: any;

  constructor(private readonly customersService: CustomersService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    const tenantId = localStorage.getItem('tenantId')!;
    this.loading = true;

    const filters: CustomerFilters = {
      page: this.currentPage,
      limit: 10,
    };

    if (this.searchTerm.trim()) {
      filters.search = this.searchTerm.trim();
    }

    this.customersService.getCustomers(tenantId, filters).subscribe({
      next: (response) => {
        this.customers = response.data;
        this.currentPage = response.meta.currentPage;
        this.totalPages = response.meta.totalPages;
        this.totalItems = response.meta.totalItems;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading customers';
        this.loading = false;
      },
    });
  }

  onSearchChange() {
    // Debounce search to avoid too many API calls
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.currentPage = 1;
      this.loadCustomers();
    }, 500);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadCustomers();
  }

  clearSearch() {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadCustomers();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
