import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
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
  styleUrl: './product-add.component.css'
})

export class ProductAddComponent implements OnInit {

  //Properties
  productForm!: FormGroup;
  loading = false;
  errorMessage = '';

  //DI
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      this.productService.addProduct(this.productForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/product/list']);  // นำทางกลับไปยังหน้า Product List
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
