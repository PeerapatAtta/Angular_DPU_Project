import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserProfileDto } from '../../dtos/update-user-profile-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './user-edit-profile.component.html',
  styleUrl: './user-edit-profile.component.css'
})

export class UserEditProfileComponent implements OnInit {

  profileForm!: FormGroup;
  userId!: string;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadUserProfile();
  }

  // Initialize form
  initForm(): void {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
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
  onSubmit(): void {
    if (this.profileForm.valid) {
      const profileData: UpdateUserProfileDto = this.profileForm.value;
      this.userService.updateUserProfile(this.userId, profileData).subscribe({
        next: () => this.router.navigate(['/user/profile', this.userId]),
        error: () => (this.errorMessage = 'Error saving profile changes')
      });
    }
  }
}
