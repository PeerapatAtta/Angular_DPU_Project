import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserProfileDto } from '../../dtos/update-user-profile-dto';
import { ChangeUserRoleDto } from '../../dtos/change-user-role-dto';
import { ChangePasswordDto } from '../../dtos/change-password-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-edit-profile.component.html',
})
export class UserEditProfileComponent implements OnInit {

  profileForm!: FormGroup;
  roleForm!: FormGroup;
  passwordForm!: FormGroup;
  userId!: string;
  errorMessage = '';
  roles = ['Seller', 'Customer']; // Define available roles

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.initForms();
    this.loadUserProfile();
  }

  // Initialize all forms
  initForms(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.roleForm = this.fb.group({
      role: ['', [Validators.required]]
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  // Load user profile data
  loadUserProfile(): void {
    this.userService.getUserProfile(this.userId).subscribe({
      next: (res) => this.profileForm.patchValue(res),
      error: () => (this.errorMessage = 'Error loading profile for editing')
    });
  }

  // Submit updated profile data
  onSubmitProfile(): void {
    if (this.profileForm.valid) {
      const profileData: UpdateUserProfileDto = this.profileForm.value;
      this.userService.updateUserProfile(this.userId, profileData).subscribe({
        next: () => this.router.navigate(['/user/profile', this.userId]),
        error: () => (this.errorMessage = 'Error saving profile changes')
      });
    }
  }

  // Submit new role data
  onSubmitRole(): void {
    if (this.roleForm.valid) {
      const roleData: ChangeUserRoleDto = this.roleForm.value;
      this.userService.changeUserRole(this.userId, roleData).subscribe({
        next: () => alert('User role updated successfully!'),
        error: () => (this.errorMessage = 'Error updating user role')
      });
    }
  }

  // Submit new password data
  onSubmitPassword(): void {
    if (this.passwordForm.valid) {
      const passwordData: ChangePasswordDto = this.passwordForm.value;
      this.userService.changePassword(this.userId, passwordData).subscribe({
        next: () => alert('Password changed successfully!'),
        error: () => (this.errorMessage = 'Error changing password')
      });
    }
  }
}
