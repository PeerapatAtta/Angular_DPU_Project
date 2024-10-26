import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CatalogService } from '../../services/catalog.service'; // Import CatalogService
import { ProductAddDto } from '../../dtos/product-add.dto';
import { CategoryDTO } from '../../dtos/category-dto'; // Import Category DTO
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm!: FormGroup;
  catalogs: CategoryDTO[] = []; // Store catalogs for selection
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private catalogService: CatalogService, // Inject CatalogService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize form with catalogId control
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      catalogId: ['', Validators.required] // catalogId is required
    });

    // Load catalogs from CatalogService
    this.loadCatalogs();
  }

  // Method to load catalogs
  private loadCatalogs(): void {
    this.catalogService.getCategories().subscribe({
      next: (res: CategoryDTO[]) => {
        this.catalogs = res;
      },
      error: (err) => {
        console.error('Error loading catalogs:', err);
        this.errorMessage = 'Failed to load categories.';
      }
    });
  }

  // Submit the form
  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      const productData: ProductAddDto = this.productForm.value;

      this.productService.addProduct(productData).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/product/list']); // Navigate back to product list
        },
        error: (error) => {
          console.error('Error adding product:', error);
          this.errorMessage = 'Failed to add product. Please try again.';
          this.loading = false;
        }
      });
    }
  }
}
