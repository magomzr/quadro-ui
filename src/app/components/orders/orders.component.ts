import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders/orders.service';
import { Order, OrderFilters } from '../../interfaces/order.interface';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = false;
  error = '';

  // Pagination
  currentPage = 1;
  totalPages = 1;
  totalItems = 0;

  // Filters
  statusFilter = '';
  dateFromFilter = '';
  dateToFilter = '';

  constructor(private readonly ordersService: OrdersService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const tenantId = localStorage.getItem('tenantId')!;
    this.loading = true;

    const filters: OrderFilters = {
      page: this.currentPage,
      limit: 10,
    };

    if (this.statusFilter) filters.status = this.statusFilter as any;
    if (this.dateFromFilter) filters.fromDate = this.dateFromFilter;
    if (this.dateToFilter) filters.toDate = this.dateToFilter;

    this.ordersService.getOrders(tenantId, filters).subscribe({
      next: (response) => {
        this.orders = response.data;
        this.currentPage = response.meta.currentPage;
        this.totalPages = response.meta.totalPages;
        this.totalItems = response.meta.totalItems;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading orders';
        this.loading = false;
      },
    });
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadOrders();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadOrders();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'paid':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  updateStatus(order: Order, newStatus: 'pending' | 'paid' | 'cancelled') {
    const tenantId = localStorage.getItem('tenantId')!;

    this.ordersService
      .updateOrderStatus(tenantId, order.id, newStatus)
      .subscribe({
        next: () => {
          this.loadOrders();
        },
        error: (err) => {
          this.error = 'Error updating status';
        },
      });
  }
}
