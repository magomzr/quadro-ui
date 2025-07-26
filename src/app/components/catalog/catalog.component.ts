import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CatalogService } from '../../services/catalog/catalog.service';
import { Category } from '../../interfaces/category.interface';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  selectedCategory: Category | null = null;
  loading = false;
  error = '';

  // Filters
  showPublishedOnly = false;
  showLowStockOnly = false;

  // Modals
  showCategoryModal = false;
  showProductModal = false;
  editingCategory: Category | null = null;
  editingProduct: Product | null = null;

  // Forms
  categoryForm!: FormGroup;
  productForm!: FormGroup;

  constructor(
    private readonly catalogService: CatalogService,
    private readonly fb: FormBuilder
  ) {
    this.initForms();
  }

  ngOnInit() {
    this.loadCategories();
  }

  initForms() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });

    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      minStock: [0, [Validators.required, Validators.min(0)]],
      sku: ['', Validators.required],
      imageUrl: [''],
      isPublished: [true],
      categoryId: ['', Validators.required],
    });
  }

  loadCategories() {
    const tenantId = localStorage.getItem('tenantId')!;
    this.loading = true;

    this.catalogService.getCategories(tenantId).subscribe({
      next: (response) => {
        this.categories = response.data;
        if (this.categories.length > 0 && !this.selectedCategory) {
          this.selectCategory(this.categories[0]);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading categories';
        this.loading = false;
      },
    });
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.loadProducts();
  }

  loadProducts() {
    if (!this.selectedCategory) return;

    const tenantId = localStorage.getItem('tenantId')!;
    this.loading = true;

    const options: any = {
      categoryId: this.selectedCategory.id,
    };

    if (this.showPublishedOnly) options.isPublished = true;
    if (this.showLowStockOnly) options.lowStock = true;

    this.catalogService.getProducts(tenantId, options).subscribe({
      next: (response) => {
        this.products = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading products';
        this.loading = false;
      },
    });
  }

  onFilterChange() {
    this.loadProducts();
  }

  // Category CRUD
  openCategoryModal(category?: Category) {
    this.editingCategory = category || null;
    this.categoryForm.reset();

    if (category) {
      this.categoryForm.patchValue({
        name: category.name,
        description: category.description,
      });
    }

    this.showCategoryModal = true;
  }

  saveCategoryForm() {
    if (this.categoryForm.invalid) return;

    const tenantId = localStorage.getItem('tenantId')!;
    const formValue = this.categoryForm.value;

    const request = this.editingCategory
      ? this.catalogService.updateCategory(
          tenantId,
          this.editingCategory.id,
          formValue
        )
      : this.catalogService.createCategory(tenantId, formValue);

    request.subscribe({
      next: () => {
        this.loadCategories();
        this.closeCategoryModal();
      },
      error: (err) => {
        this.error = 'Error saving category';
      },
    });
  }

  closeCategoryModal() {
    this.showCategoryModal = false;
    this.editingCategory = null;
    this.categoryForm.reset();
  }

  // Product CRUD
  openProductModal(product?: Product) {
    this.editingProduct = product || null;
    this.productForm.reset();

    if (product) {
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        stock: product.stock,
        minStock: product.minStock,
        sku: product.sku,
        imageUrl: product.imageUrl,
        isPublished: product.isPublished,
        categoryId: product.categoryId,
      });
    } else if (this.selectedCategory) {
      this.productForm.patchValue({
        categoryId: this.selectedCategory.id,
      });
    }

    this.showProductModal = true;
  }

  saveProductForm() {
    if (this.productForm.invalid) return;

    const tenantId = localStorage.getItem('tenantId')!;
    const formValue = this.productForm.value;

    // Transform for API format
    const productData = this.editingProduct
      ? formValue
      : {
          ...formValue,
          category: {
            connect: {
              id: formValue.categoryId,
            },
          },
        };

    delete productData.categoryId;

    const request = this.editingProduct
      ? this.catalogService.updateProduct(
          tenantId,
          this.editingProduct.id,
          formValue
        )
      : this.catalogService.createProduct(tenantId, productData);

    request.subscribe({
      next: () => {
        this.loadProducts();
        this.closeProductModal();
      },
      error: (err) => {
        if (err.status === 409) {
          this.error = 'SKU already exists for this tenant';
        } else {
          this.error = 'Error saving product';
        }
      },
    });
  }

  closeProductModal() {
    this.showProductModal = false;
    this.editingProduct = null;
    this.productForm.reset();
  }
}
