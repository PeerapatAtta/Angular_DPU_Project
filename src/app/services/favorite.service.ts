import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { FavoriteProductDTO } from '../dtos/favorite-product-dto';
import { AddFavoriteDTO } from '../dtos/add-favorite-dto';
import { IsFavoriteDTO } from '../dtos/is-favorite-dto';
import { FavoriteCountDTO } from '../dtos/favorite-count-dto';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private baseUrl = `${environment.apiBaseUrl}/favorite`;

  private favoriteCountChanged = new BehaviorSubject<number>(0); // กำหนดค่าเริ่มต้นที่ 0
  favoriteCountChanges$ = this.favoriteCountChanged.asObservable();   // เปิดใช้งาน observable เพื่อส่งข้อมูล favoriteCount ไปยัง component ต่างๆ

  constructor(private http: HttpClient) { }

  // Get all favorites for the current user
  getFavorites(): Observable<FavoriteProductDTO[]> {
    return this.http.get<FavoriteProductDTO[]>(this.baseUrl);
  }

  // Add a product to favorites
  addFavorite(favorite: AddFavoriteDTO): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.baseUrl, favorite)
      .pipe(tap(() => this.updateFavoriteCount()) // อัปเดตจำนวนเมื่อเพิ่มสินค้า
      );
  }

  // Remove a product from favorites
  removeFavorite(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`).pipe(
      tap(() => this.updateFavoriteCount()) // อัปเดตจำนวนเมื่อมีการลบสินค้า
    );
  }

  // Check if a product is in favorites
  isFavorite(productId: string): Observable<IsFavoriteDTO> {
    return this.http.get<IsFavoriteDTO>(`${this.baseUrl}/IsFavorite/${productId}`);
  }

  // Remove all favorites for the current user
  clearFavorites(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/Clear`).pipe(
      tap(() => this.favoriteCountChanged.next(0)) // ตั้งค่า favorite count เป็น 0 เมื่อเคลียร์รายการ
    );
  }

  // Get the count of favorites for the current user
  getFavoriteCount(): Observable<FavoriteCountDTO> {
    return this.http.get<FavoriteCountDTO>(`${this.baseUrl}/Count`);
  }

  // เมธอดเพื่ออัปเดตจำนวน Favorite และส่งข้อมูลไปยัง component ต่างๆ
  updateFavoriteCount(): void {
    this.getFavoriteCount().subscribe({
      next: (res) => this.favoriteCountChanged.next(res.count),
      error: (err) => console.error('Error updating favorite count:', err)
    });
  }
}

