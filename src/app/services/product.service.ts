import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProductDto } from '../dtos/product.dto';
import { ProductDetailDTO } from '../dtos/product-detail.dto';
import { ProductAddDto } from '../dtos/product-add.dto';
import { Observable } from 'rxjs';
import { ProductEditDto } from '../dtos/product-edit.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    let reqUrl = environment.apiBaseUrl + '/products';
    console.log('reqUrl: ', reqUrl);
    return this.http.get<ProductDto[]>(reqUrl);
  }

  getProduct(id: string) {
    let reqUrl = environment.apiBaseUrl + '/products/' + id;
    return this.http.get<ProductDetailDTO>(reqUrl);
  }

  addProduct(product: ProductAddDto): Observable<ProductAddDto> {
    let reqUrl = environment.apiBaseUrl + '/products';
    return this.http.post<ProductAddDto>(reqUrl, product);
  }

  updateProduct(id: string, product: ProductEditDto): Observable<ProductEditDto> {
    let reqUrl = environment.apiBaseUrl + '/products/' + id;
    return this.http.put<ProductEditDto>(reqUrl, product);
  }

  deleteProduct(id: string) {
    let reqUrl = environment.apiBaseUrl + '/products/' + id;
    return this.http.delete(reqUrl);
  }

}
