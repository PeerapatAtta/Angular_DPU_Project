import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductEditDto } from '../../dtos/product-edit.dto';
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
  styleUrl: './product-edit.component.css'
})

export class ProductEditComponent implements OnInit {

  //Propeties
  productForm!: FormGroup;
  loading = false;
  errorMessage = '';
  productId!: string;
  
  //DI
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.getProductDetail(this.productId);

    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['']
    });
  }

  getProductDetail(id: string): void {
    this.loading = true;
    this.productService.getProduct(id).subscribe({
      next: (product: ProductEditDto) => {
        this.productForm.patchValue({
          name: product.name,
          price: product.price,
          description: product.description
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

  onSubmit(): void {
    if (this.productForm.valid) {
      this.loading = true;
      this.productService.updateProduct(this.productId, this.productForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/product/list']);  // นำทางกลับไปยังหน้า Product List หลังจากบันทึกเสร็จ
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
