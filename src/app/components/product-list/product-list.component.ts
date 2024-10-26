import { Component } from '@angular/core';
import { ProductDTO } from '../../dtos/product.dto';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductEditDto } from '../../dtos/product-edit.dto';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {

  //Properies
  cols!: unknown[];
  products!: ProductDTO[];
  loading = false;

  //DI
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  //Methods
  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' }
    ];
    this.getProducts();
  }

  //Get products
  private getProducts() {

    this.loading = true;

    this.productService.getProducts().subscribe({
      next: (res: ProductDTO[]) => {
        this.products = res;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
        this.loading = false;
      }
    });
  }

  productDetail(item: ProductDTO) {
    console.log('Product Details:', item);
    this.router.navigate(['/product/' + item.id + '/detail']);
  }

  addProduct() {
    this.router.navigate(['/product/add']);
  }

  editProduct(item: ProductDTO) {
    console.log('Product Edit:', item);
    this.router.navigate(['/product/' + item.id + '/edit']);
  }

  deleteProduct(item: ProductDTO) {
    console.log('Product Delete:', item);
    this.router.navigate(['/product/' + item.id + '/delete']);
  }



}
