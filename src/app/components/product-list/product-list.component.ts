import { Component } from '@angular/core';
import { ProductDto } from '../../dtos/product.dto';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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
  products!: ProductDto[];
  loading = false;

  //DI
  constructor(private productService: ProductService) { }

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
      next: (res: ProductDto[]) => {
        this.products = res;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
        this.loading = false;
      }
    });
  }

  viewItem(item: ProductDto) {
    console.log('Product Details:', item);
    // this.router.navigate(['/product/' + item.id + '/detail']);
  }

  addProduct() {
    throw new Error('Method not implemented.');
  }
  deleteProduct(arg0: string) {
    throw new Error('Method not implemented.');
  }

  editProduct(_t12: ProductDto) {
    throw new Error('Method not implemented.');
  }

}
