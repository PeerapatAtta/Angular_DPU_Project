import { Component } from '@angular/core';
import { ProductDTO } from '../../dtos/product.dto';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductEditDto } from '../../dtos/product-edit.dto';
import { CategoryDTO } from '../../dtos/category-dto';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})

export class CategoryListComponent {

   //Properies
   cols!: unknown[];
   categories!: CategoryDTO[];
   loading = false;
 
   //DI
   constructor(
     private catalogService: CatalogService,
     private router: Router
   ) { }
 
   //Methods
   ngOnInit(): void {
     this.cols = [
       { field: 'id', header: 'ID' },
       { field: 'name', header: 'Name' },
       { field: 'description', header: 'Description' }
     ];
     this.getCategory();
   }
 
   //Get products
   private getCategory() {
 
     this.loading = true;
 
     this.catalogService.getCategories().subscribe({
       next: (res: CategoryDTO[]) => {
         this.categories = res;
         this.loading = false;
       },
       error: (err: HttpErrorResponse) => {
         console.error(err.message);
         this.loading = false;
       }
     });
   }
 
   categoryDetail(item: CategoryDTO) {     
     this.router.navigate(['/category/' + item.id + '/detail']);
   }
 
   addCategory() {
     this.router.navigate(['/category/add']);
   }
 
   editCategory(item: CategoryDTO) {
     this.router.navigate(['/category/' + item.id + '/edit']);
   }
 
   deleteCategory(item: CategoryDTO) {
     this.router.navigate(['/category/' + item.id + '/delete']);
   }

}
