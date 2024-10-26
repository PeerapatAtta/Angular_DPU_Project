import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { FavoriteProductDTO } from '../dtos/favorite-product-dto';
import { AddFavoriteDTO } from '../dtos/add-favorite-dto';
import { IsFavoriteDTO } from '../dtos/is-favorite-dto';
import { FavoriteCountDTO } from '../dtos/favorite-count-dto';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private baseUrl = `${environment.apiBaseUrl}/favorite`;

  constructor(private http: HttpClient) {}

  // Get all favorites for the current user
  getFavorites(): Observable<FavoriteProductDTO[]> {
    return this.http.get<FavoriteProductDTO[]>(this.baseUrl);
  }

  // Add a product to favorites
  addFavorite(favorite: AddFavoriteDTO): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.baseUrl, favorite);
  }

  // Remove a product from favorites
  removeFavorite(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${productId}`);
  }

  // Check if a product is in favorites
  isFavorite(productId: string): Observable<IsFavoriteDTO> {
    return this.http.get<IsFavoriteDTO>(`${this.baseUrl}/IsFavorite/${productId}`);
  }

  // Remove all favorites for the current user
  clearFavorites(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/Clear`);
  }

  // Get the count of favorites for the current user
  getFavoriteCount(): Observable<FavoriteCountDTO> {
    return this.http.get<FavoriteCountDTO>(`${this.baseUrl}/Count`);
  }
}

