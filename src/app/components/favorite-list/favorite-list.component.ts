import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { FavoriteProductDTO } from '../../dtos/favorite-product-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-list.component.html'
})

export class FavoriteListComponent implements OnInit {

  favorites: FavoriteProductDTO[] = [];
  errorMessage: string = '';
  loading = false;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  getFavorites(): void {
    this.favoriteService.getFavorites().subscribe({
      next: (data) => this.favorites = data,
      error: (err) => this.errorMessage = 'Failed to load favorites.'
    });
  }

  removeFavorite(productId: string): void {
    this.loading = true;
    this.favoriteService.removeFavorite(productId).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(fav => fav.productId !== productId);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error removing favorite:', error);
        this.errorMessage = 'Failed to remove favorite. Please try again.';
        this.loading = false;
      }
    });
  }

   // ลบรายการโปรดทั้งหมด
   clearFavorites(): void {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการโปรดทั้งหมด?')) {
      this.loading = true;
      this.favoriteService.clearFavorites().subscribe({
        next: () => {
          this.favorites = [];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error clearing favorites:', error);
          this.errorMessage = 'Failed to clear favorites.';
          this.loading = false;
        }
      });
    }
  }


}
