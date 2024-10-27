import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserResponseDto } from '../../dtos/user-response-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: UserResponseDto[] = [];
  errorMessage = '';
  loading = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading users';
        this.loading = false;
      },
    });
  }

  searchUsers(query: string): void {
    this.loading = true;
    this.userService.searchUsers(query).subscribe({
      next: (res) => {
        this.users = res;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error searching users';
        this.loading = false;
      },
    });
  }

  viewUser(user: UserResponseDto): void {
    this.router.navigate([`/user/profile`, user.id]);
  }

  editUser(user: UserResponseDto): void {
    this.router.navigate([`/user/edit`, user.id]);
  }

  deleteUser(user: UserResponseDto): void {
    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      this.userService.deleteUserProfile(user.id).subscribe({
        next: () => this.getAllUsers(),
        error: () => (this.errorMessage = 'Error deleting user'),
      });
    }
  }

  addUser(): void {
    this.router.navigate(['/user/add']);
  }
}
