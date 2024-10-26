import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { CartItemDTO } from '../dtos/cart-item-dto';
import { CartTotalDTO } from '../dtos/cart-total-dto';
import { AddToCartDTO } from '../dtos/add-to-cart-dto';
import { UpdateCartItemDTO } from '../dtos/update-cart-item-dto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.apiBaseUrl}/cart`;

  constructor(private http: HttpClient) { }

  // Get all items in the user's cart
  getCartItems(): Observable<CartItemDTO[]> {
    return this.http.get<CartItemDTO[]>(this.baseUrl);
  }

  // Add a new item to the cart
  addToCart(item: AddToCartDTO): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.baseUrl, item);
  }

  // Update the quantity of an item in the cart
  updateCartItem(productId: string, item: UpdateCartItemDTO): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${productId}`, item);
  }

  // Remove an item from the cart
  removeCartItem(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }

  // Clear all items in the cart
  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/clear`);
  }

  // Get the total amount of items in the cart
  getCartTotal(): Observable<CartTotalDTO> {
    return this.http.get<CartTotalDTO>(`${this.baseUrl}/total`);
  }
}

