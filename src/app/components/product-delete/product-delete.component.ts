import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDetailDTO } from '../../dtos/product-detail.dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.css'
})

export class ProductDeleteComponent implements OnInit {

  //Properties
  product: ProductDetailDTO | undefined;
  loading = false;
  errorMessage = '';
  productId!: string;
  
  //DI
  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService, 
    private router: Router) { }

    ngOnInit(): void {
      this.productId = this.route.snapshot.paramMap.get('id')!;
      this.getProductDetail(this.productId);
    }
  
    getProductDetail(id: string): void {
      this.loading = true;
      this.productService.getProduct(id).subscribe({
        next: (product: ProductDetailDTO) => {
          this.product = product;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading product:', error);
          this.errorMessage = 'Failed to load product.';
          this.loading = false;
        }
      });
    }
  
    onDelete(): void {
      this.loading = true;
      this.productService.deleteProduct(this.productId).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/product/list']);  // นำทางกลับไปยังหน้า Product List หลังจากลบเสร็จ
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.errorMessage = 'Failed to delete product.';
          this.loading = false;
        }
      });
    }
  }