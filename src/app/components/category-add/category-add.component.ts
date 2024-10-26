import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateCategoryDTO } from '../../dtos/create-category-dto';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.loading = true;
      const newCategory: CreateCategoryDTO = this.categoryForm.value;

      this.catalogService.addCategory(newCategory).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/category/list']);  // Navigate back to category list
        },
        error: (error) => {
          console.error('Error adding category:', error);
          this.errorMessage = 'Failed to add category. Please try again.';
          this.loading = false;
        }
      });
    }
  }
}
