import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, of } from 'rxjs';
import { UserResponseDto } from '../dtos/user-response-dto';
import { UpdateUserProfileDto } from '../dtos/update-user-profile-dto';
import { ChangeUserRoleDto } from '../dtos/change-user-role-dto';
import { ChangePasswordDto } from '../dtos/change-password-dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { authKey } from '../services/account.service'; // Key for token storage

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  // Method to get the user ID from the JWT token
  getUserIdFromToken(): string | null {
    const token = localStorage.getItem(authKey.accessToken);
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.sub || null;
    }
    return null;
  }

  // Get all users
  getAllUsers(): Observable<UserResponseDto[]> {
    return this.http.get<UserResponseDto[]>(`${this.baseUrl}`);
  }

  // Get user profile by ID
  getUserProfile(id: string): Observable<UserResponseDto> {
    let reqUrl = environment.apiBaseUrl + '/users/Profile/' + id;
    return this.http.get<UserResponseDto>(reqUrl);
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
