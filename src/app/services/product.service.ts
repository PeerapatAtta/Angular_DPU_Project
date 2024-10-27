import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProductDTO } from '../dtos/product.dto';
import { ProductDetailDTO } from '../dtos/product-detail.dto';
import { ProductAddDto } from '../dtos/product-add.dto';
import { Observable } from 'rxjs';
import { ProductEditDto } from '../dtos/product-edit.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiBaseUrl + '/products';

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.baseUrl}`);
  }

  // Get a product by ID
  getProduct(id: string): Observable<ProductDetailDTO> {
    return this.http.get<ProductDetailDTO>(`${this.baseUrl}/${id}`); 
  }

  // Add a new product
  addProduct(product: ProductAddDto): Observable<ProductDetailDTO> {
    return this.http.post<ProductDetailDTO>(`${this.baseUrl}`, product);
  }

  // Update a product by ID
  updateProduct(id: string, product: ProductEditDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, product);
  }

  // Delete a product by ID
  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Search products by keyword
  searchProducts(query: string): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.baseUrl}/search`, {
      params: { query }
    });
  }
}
