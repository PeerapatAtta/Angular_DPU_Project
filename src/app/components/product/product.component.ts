import { Component, OnInit, inject, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { ProductService } from '../../services/product.service'
import { environment } from '../../../environments/environment'
import 'jspdf-autotable'
import { DatePipe } from '@angular/common'
import * as bootstrap from 'bootstrap'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class StockComponent implements OnInit {

  // Dependency Injection
  private http = inject(ProductService)
  private datePipe = inject(DatePipe)

  // Image URL
  imageUrl = environment.dotnet_api_url_image

  // Total product number
  dataSource: any[] = [] // Hold the products data

  // Search and Pagination
  searchValue = ''
  searchTerm = new Subject<string>()
  page = 1
  limit = 5
  selectedCategory = ''
  searchQuery = ''
  totalItems = 0

  // Columns for Table
  displayedColumns = [
    'productID',
    'productPicture',
    'productName',
    'unitPrice',
    'unitInStock',
    'categoryName',
    'action',
  ]

  // Lifecycle hook
  ngOnInit(): void {
    this.getProducts()
  }

  // Method to get products with pagination
  getProducts() {
    this.http
      .getAllProducts(this.page, this.limit, this.selectedCategory, this.searchQuery)
      .subscribe({
        next: (result) => {
          console.log(result)
          this.dataSource = result.products
        },
        error: (error) => {
          console.error(error)
        },
      })
  }

  // Method to add a new product (Use Bootstrap modal instead of MatDialog)
  onClickAddProduct() {
    // Use Bootstrap modal for adding product
    const modal = new bootstrap.Modal(document.getElementById('createProductModal'));
    modal.show();
  }

  // Method for editing product (Use Bootstrap modal)
  onClickEdit(product: any) {
    // Use Bootstrap modal for editing product
    const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
    modal.show();
  }

  // Method to delete a product (Confirm using Bootstrap modal)
  onClickDelete(id: any) {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.http.deleteProduct(id).subscribe({
        next: (result) => {
          this.dataSource = this.dataSource.filter((product: any) => product.productid !== id)
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }

  // Method to filter products
  doFilter(event: any) {
    this.searchQuery = event.target.value.trim().toLowerCase();
    this.getProducts();
  }

  // Method to clear search
  clearSearch() {
    this.searchValue = ''
    this.searchQuery = ''
    this.getProducts();
  }

  // Pagination change
  onPageChange(page: number) {
    this.page = page;
    this.getProducts();
  }


  // Export to CSV
  onClickExportCSV() {
    const csvRow = [];
    const header = ["ID", "Product", "Category", "Price", "Unit", "Created"];
    csvRow.push(header.join(","));

    this.dataSource.map((product: any, index: number) => {
      const row = [
        index + 1,
        `"${product.productname.replace(/"/g, '""')}"`,
        `"${product.categoryname.replace(/"/g, '""')}"`,
        product.unitprice,
        product.unitinstock,
        this.datePipe.transform(product.createddate, 'dd/MM/yyyy')
      ];
      csvRow.push(row.join(","));
    });

    const csvString = csvRow.join("\n");
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvString], { type: "text/csv;charset=utf-8;" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.setAttribute("download", `products-${new Date().toISOString()}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
