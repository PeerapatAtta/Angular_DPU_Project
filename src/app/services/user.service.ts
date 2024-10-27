import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, of } from 'rxjs';
import { UserResponseDto } from '../dtos/user-response-dto';
import { UpdateUserProfileDto } from '../dtos/update-user-profile-dto';
import { ChangeUserRoleDto } from '../dtos/change-user-role-dto';
import { ChangePasswordDto } from '../dtos/change-password-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http: HttpClient) { }

  // Get all users
  getAllUsers(): Observable<UserResponseDto[]> {
    return this.http.get<UserResponseDto[]>(`${this.baseUrl}`);
  }

  // Get user profile by ID
  getUserProfile(userId: string): Observable<UserResponseDto> {
    return this.http.get<UserResponseDto>(`${this.baseUrl}/profile/${userId}`);
  }

  // Update user profile
  updateUserProfile(id: string, profileData: UpdateUserProfileDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/profile/${id}`, profileData);
  }

  getLoggedInUserId(): Observable<string | null> {
    // Replace with actual logic to retrieve user ID from the token or session storage.
    const userId = localStorage.getItem('userId'); // example
    return of(userId); // Wrap in Observable for compatibility
  }

  // Delete user profile
  deleteUserProfile(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/profile/${id}`);
  }

  // Change user role
  changeUserRole(id: string, roleData: ChangeUserRoleDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/changerole/${id}`, roleData);
  }

  // Change user password
  changePassword(id: string, passwordData: ChangePasswordDto): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/changepassword/${id}`, passwordData);
  }

  // Suspend a user account
  suspendAccount(id: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/suspend/${id}`, {});
  }

  // Unsuspend a user account
  unsuspendAccount(id: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/unsuspend/${id}`, {});
  }

  // Search users by a query
  searchUsers(query: string): Observable<UserResponseDto[]> {
    return this.http.get<UserResponseDto[]>(`${this.baseUrl}/search`, {
      params: { query }
    });
  }
}
