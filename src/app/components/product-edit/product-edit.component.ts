import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CatalogService } from '../../services/catalog.service'; // Import CatalogService
import { ProductEditDto } from '../../dtos/product-edit.dto';
import { CategoryDTO } from '../../dtos/category-dto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {
  productForm!: FormGroup;
  loading = false;
  errorMessage = '';
  productId!: string;
  catalogs: CategoryDTO[] = []; // List of categories

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private catalogService: CatalogService, // Inject CatalogService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.getProductDetail(this.productId);
    this.getCatalogs(); // Load categories

    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      catalogId: ['', Validators.required] // Add catalogId field
    });
  }

  // Load product details for editing
  getProductDetail(id: string): void {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (product: ProductEditDto) => {
        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          description: product.description,
          catalogId: product.catalogId // Set catalogId for form
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.errorMessage = 'Failed to load product.';
        this.loading = false;
      }
    });
  }

  // Load available catalogs
  getCatalogs(): void {
    this.catalogService.getCategories().subscribe({
      next: (categories) => this.catalogs = categories,
      error: (error) => {
        console.error('Error loading categories:', error);
        this.errorMessage = 'Failed to load categories.';
      }
    });
  }

  // Submit updated product data
  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/product/list']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.errorMessage = 'Failed to update product. Please try again.';
          this.loading = false;
        }
      });
    }
  }
}
