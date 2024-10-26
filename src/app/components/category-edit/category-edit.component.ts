import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogService } from '../../services/catalog.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateCategoryDTO } from '../../dtos/update-category-dto';
import { CategoryDTO } from '../../dtos/category-dto';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  categoryForm!: FormGroup;
  loading = false;
  errorMessage = '';
  categoryId!: string;
  
  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.getCategoryDetail(this.categoryId);

    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  getCategoryDetail(id: string): void {
    this.loading = true;
    this.catalogService.getCategory(id).subscribe({
      next: (category: CategoryDTO) => {
        this.categoryForm.patchValue({
          name: category.name,
          description: category.description
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading category:', error);
        this.errorMessage = 'Failed to load category.';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      this.loading = true;
      const updatedCategory: UpdateCategoryDTO = this.categoryForm.value;

      this.catalogService.updateCategory(this.categoryId, updatedCategory).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/category/list']);  // Navigate back to category list after update
        },
        error: (error) => {
          console.error('Error updating category:', error);
          this.errorMessage = 'Failed to update category. Please try again.';
          this.loading = false;
        }
      });
    }
  }
}

