import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { CategoryDTO } from '../../dtos/category-dto';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})

export class CategoryDetailComponent implements OnInit {

  category!: CategoryDTO;
  errorMessage = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catalogService: CatalogService
  ) { }

  ngOnInit(): void {
    this.getCategoryDetail();
  }

  getCategoryDetail(): void {
    const categoryId = this.route.snapshot.paramMap.get('id'); // ดึง ID จาก URL

    if (categoryId) {
      this.catalogService.getCategory(categoryId).subscribe({
        next: (res: CategoryDTO) => {
          this.category = res;
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error loading category detail:', err.message);
          this.errorMessage = 'Category not found.';
          this.loading = false;
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/category/list']); // นำทางกลับไปยังหน้า Category List
  }
}
