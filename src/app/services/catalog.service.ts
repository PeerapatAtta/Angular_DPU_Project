import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { CategoryDTO } from '../dtos/category-dto';
import { CreateCategoryDTO } from '../dtos/create-category-dto';
import { UpdateCategoryDTO } from '../dtos/update-category-dto';

@Injectable({
  providedIn: 'root'
})

export class CatalogService {

  // Constructor with dependency injection
  constructor(private http: HttpClient) { } // Inject HttpClient service

  // Get all categories
  getCategories(): Observable<CategoryDTO[]> {
    let reqUrl = environment.apiBaseUrl + '/catalog'; // Define the request URL
    return this.http.get<CategoryDTO[]>(reqUrl);  // Send a GET request to the server
  }

  // Get a category by ID
  getCategory(id: string): Observable<CategoryDTO> {
    let reqUrl = environment.apiBaseUrl + '/catalog/' + id; // Define the request URL
    return this.http.get<CategoryDTO>(reqUrl);  // Send a GET request to the server
  }

  // Add a new category
  addCategory(category: CreateCategoryDTO): Observable<CategoryDTO> {
    let reqUrl = environment.apiBaseUrl + '/catalog'; // Define the request URL
    return this.http.post<CategoryDTO>(reqUrl, category); // Send a POST request to the server
  }

  // Update a category
  updateCategory(id: string, category: UpdateCategoryDTO): Observable<CategoryDTO> {
    let reqUrl = environment.apiBaseUrl + '/catalog/' + id; // Define the request URL
    return this.http.put<CategoryDTO>(reqUrl, category);  // Send a PUT request to the server
  }

  // Delete a category
  deleteCategory(id: string): Observable<void> {
    let reqUrl = environment.apiBaseUrl + '/catalog/' + id; // Define the request URL
    return this.http.delete<void>(reqUrl);  // Send a DELETE request to the server
  }
}
