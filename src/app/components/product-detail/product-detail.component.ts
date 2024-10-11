import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductDetailDTO } from '../../dtos/product-detail.dto';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit {

  //Properties
  product!: ProductDetailDTO;
  error!: string;
  loading!: boolean;
  errorMessage!: string;

  //DI
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getProductDetail();
  }

  // ฟังก์ชันดึงข้อมูลสินค้า
  getProductDetail(): void {
    const productId = this.route.snapshot.paramMap.get('id');  // ดึง ID จาก URL

    if (productId) {
      this.productService.getProduct(productId).subscribe({
        next: (res: ProductDetailDTO) => {
          this.product = res;
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error loading product detail:', err.message);
          this.errorMessage = 'Product not found.';
          this.loading = false;
        }
      });
    }
  }

  backClick() {
    this.router.navigate(['/product/list']);
  }

}
