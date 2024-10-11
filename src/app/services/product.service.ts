import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProductDto } from '../dtos/product.dto';

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

}
