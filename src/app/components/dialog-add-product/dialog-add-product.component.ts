import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';
import modal from 'bootstrap/js/dist/modal';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.css'
})

export class DialogAddProductComponent {
  productName: string = '';
  productPrice: number = 0;

  constructor() {}

  onSubmit() {
    const newProduct = {
      name: this.productName,
      price: this.productPrice,
    };
    // Call API or pass the data back to parent component
    console.log('Product Added:', newProduct);
    // Close the modal after submission
    const modalElement = document.getElementById('createProductModal')!;
    const modal = bootstrap.Modal.getInstance(modalElement)!;
    modal.hide();
  }
}
