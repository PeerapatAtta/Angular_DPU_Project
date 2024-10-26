import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FavoriteService } from '../../services/favorite.service';
import { ProductDetailDTO } from '../../dtos/product-detail.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: ProductDetailDTO;
  isFavorite = false;
  loading = false;
  errorMessage = '';
  productId!: string;

  constructor(
    private productService: ProductService,
    private favoriteService: FavoriteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    this.getProductDetail();
    this.checkIfFavorite(); // เรียกเช็คว่าเป็นรายการโปรดหรือไม่
  }

  getProductDetail(): void {
    this.loading = true;
    this.productService.getProduct(this.productId).subscribe({
      next: (res: ProductDetailDTO) => {
        this.product = res;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.errorMessage = 'Product not found.';
        this.loading = false;
      }
    });
  }

  checkIfFavorite(): void {
    this.favoriteService.isFavorite(this.productId).subscribe({
      next: (res) => {
        this.isFavorite = res.isFavorite;
      },
      error: (error) => {
        console.error('Error checking favorite status:', error);
      }
    });
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.productId).subscribe({
        next: () => {
          this.isFavorite = false;
        },
        error: (error) => {
          console.error('Error removing favorite:', error);
        }
      });
    } else {
      this.favoriteService.addFavorite({ productId: this.productId }).subscribe({
        next: () => {
          this.isFavorite = true;
        },
        error: (error) => {
          console.error('Error adding favorite:', error);
        }
      });
    }
  }
}
