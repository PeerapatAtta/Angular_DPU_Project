import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../../dtos/product.dto';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FavoriteService } from '../../services/favorite.service';
import { CartService } from '../../services/cart.service';
import { FavoriteProductDTO } from '../../dtos/favorite-product-dto';
import { CartItemDTO } from '../../dtos/cart-item-dto';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {

  products: ProductDTO[] = [];
  favoriteProducts: FavoriteProductDTO[] = []; // เก็บรายการ Favorite ปัจจุบันของผู้ใช้
  cartItems: CartItemDTO[] = []; // รายการสินค้าในตะกร้าปัจจุบันของผู้ใช้
  loading = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private router: Router,
    private favoriteService: FavoriteService,  // Inject FavoriteService
    private cartService: CartService  // Inject CartService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getFavoriteProducts(); // ดึงรายการ Favorite
    this.getCartItems(); // ดึงข้อมูลสินค้าในตะกร้า
  }

  getProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (res: ProductDTO[]) => {
        this.products = res;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching products:', err.message);
        this.errorMessage = 'Failed to load products.';
        this.loading = false;
      }
    });
  }

  productDetail(product: ProductDTO): void {
    this.router.navigate(['/product', product.id, 'detail']);
  }

  addProduct(): void {
    this.router.navigate(['/product/add']);
  }

  editProduct(product: ProductDTO): void {
    this.router.navigate(['/product', product.id, 'edit']);
  }

  deleteProduct(product: ProductDTO): void {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.getProducts(); // Refresh the product list after deletion
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error deleting product:', err.message);
          this.errorMessage = 'Failed to delete product.';
        }
      });
    }
  }

  searchProducts(query: string): void {
    this.loading = true;
    this.productService.searchProducts(query).subscribe({
      next: (res: ProductDTO[]) => {
        this.products = res;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error searching products:', err.message);
        this.errorMessage = 'Failed to search products.';
        this.loading = false;
      }
    });
  }

  getFavoriteProducts(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (favorites: FavoriteProductDTO[]) => {
        this.favoriteProducts = favorites; // เก็บรายการ Favorite ที่ผู้ใช้มีอยู่แล้ว
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error loading favorites:', err.message);
        this.errorMessage = 'Failed to load favorites.';
      }
    });
  }

  addToFavorites(product: ProductDTO): void {
    // ตรวจสอบว่าสินค้าถูกเพิ่มไปใน Favorite แล้วหรือยัง
    const isAlreadyFavorite = this.favoriteProducts.some(fav => fav.productId === product.id);

    if (isAlreadyFavorite) {
      alert(`${product.name} is already in your favorites.`);
    } else {
      // ถ้ายังไม่ถูกเพิ่มอยู่แล้ว ให้เพิ่มสินค้าลงในรายการ Favorite
      this.favoriteService.addFavorite({ productId: product.id }).subscribe({
        next: () => {
          console.log(`${product.name} added to favorites!`);
          alert(`${product.name} has been added to your favorites.`);
          this.getFavoriteProducts(); // อัปเดตรายการ Favorite หลังจากเพิ่มสำเร็จ
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error adding to favorites:', error);
          alert('Failed to add to favorites. Please try again.');
        }
      });
    }
  }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items; // เก็บรายการสินค้าในตะกร้าปัจจุบัน
      },
      error: () => (this.errorMessage = 'Error loading cart items'),
    });
  }

  addToCart(product: ProductDTO): void {
    // ตรวจสอบว่าสินค้าตัวนี้มีอยู่ในตะกร้าแล้วหรือไม่
    const cartItem = this.cartItems.find(item => item.productId === product.id);
    
    if (cartItem) {
      // ถ้ามีสินค้าอยู่แล้ว ให้เพิ่มจำนวนสินค้า
      const newQuantity = cartItem.quantity + 1;
      this.cartService.updateCartItem(cartItem.productId, { quantity: newQuantity }).subscribe({
        next: () => {
          cartItem.quantity = newQuantity; // อัปเดตจำนวนสินค้าในตะกร้าปัจจุบัน
          console.log(`${product.name} quantity updated in the cart!`);
          alert(`${product.name} quantity has been increased in your cart.`);
        },
        error: (err) => {
          console.error('Error updating cart item quantity:', err);
          alert('Failed to update cart. Please try again.');
        }
      });
    } else {
      // ถ้าไม่มีสินค้าในตะกร้า ให้เพิ่มสินค้าชิ้นใหม่ลงในตะกร้า
      this.cartService.addToCart({ productId: product.id, quantity: 1 }).subscribe({
        next: () => {
          console.log(`${product.name} added to cart!`);
          alert(`${product.name} has been added to your cart.`);
          this.getCartItems(); // อัปเดตรายการสินค้าในตะกร้าหลังเพิ่มสินค้าใหม่
        },
        error: (err) => {
          console.error('Error adding to cart:', err);
          alert('Failed to add to cart. Please try again.');
        }
      });
    }
  }

}
