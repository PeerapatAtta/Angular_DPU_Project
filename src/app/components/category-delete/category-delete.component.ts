import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { CategoryDTO } from '../../dtos/category-dto';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-delete',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  category: CategoryDTO | undefined;
  loading = false;
  errorMessage = '';
  categoryId!: string;

  constructor(
    private route: ActivatedRoute, 
    private catalogService: CatalogService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.getCategoryDetail(this.categoryId);
  }

  getCategoryDetail(id: string): void {
    this.loading = true;
    this.catalogService.getCategory(id).subscribe({
      next: (category: CategoryDTO) => {
        this.category = category;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading category:', error);
        this.errorMessage = 'Failed to load category.';
        this.loading = false;
      }
    });
  }

  onDelete(): void {
    this.loading = true;
    this.catalogService.deleteCategory(this.categoryId).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/category/list']);  // Redirect to category list after deletion
      },
      error: (error) => {
        console.error('Error deleting category:', error);
        this.errorMessage = 'Failed to delete category.';
        this.loading = false;
      }
    });
  }
}

