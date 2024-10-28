import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItemDTO } from '../../dtos/cart-item-dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cart-list.component.html',
})

export class CartListComponent implements OnInit {
  
  cartItems: CartItemDTO[] = [];
  errorMessage = '';
  totalAmount: number = 0; // Property to store total amount

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  // Fetch all items in the cart
  getCartItems(): void {
    this.cartService.getCartItems().subscribe({
      next: (items) => {
        this.cartItems = items;
        this.calculateTotal(); // Calculate total after fetching items
      },
      error: () => (this.errorMessage = 'เกิดข้อผิดพลาดในการโหลดรายการสินค้า'),
    });
  }

  // Remove an item from the cart
  removeItem(productId: string): void {
    this.cartService.removeCartItem(productId).subscribe({
      next: () => this.getCartItems(),
      error: () => (this.errorMessage = 'ไม่สามารถลบสินค้าได้'),
    });
  }

  // Clear the cart
  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => this.getCartItems(),
      error: () => (this.errorMessage = 'ไม่สามารถลบสินค้าได้ทั้งหมด'),
    });
  }

  // Update item quantity
  updateQuantity(item: CartItemDTO, newQuantity: number): void {
    this.cartService.updateCartItem(item.productId, { quantity: newQuantity }).subscribe({
      next: () => {
        item.quantity = newQuantity;
        this.calculateTotal(); // Recalculate total after updating quantity
      },
      error: () => (this.errorMessage = 'ไม่สามารถอัปเดตจำนวนสินค้าได้'),
    });
  }

  // Calculate the total amount for the cart items
  calculateTotal(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
