import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { UserResponseDto } from '../../dtos/user-response-dto';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {

  user!: UserResponseDto;
  errorMessage = '';
  userId!: string; // เพิ่มตัวแปร userId

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    console.log('User ID:', this.userId); // ตรวจสอบว่าค่า userId ได้ถูกต้องหรือไม่
    this.getUserProfile();
  }

  // Method to fetch user profile data
  getUserProfile(): void {
    this.userService.getUserProfile(this.userId).subscribe({
      next: (res) => {
        this.user = res;
        console.log('User data:', this.user); // ตรวจสอบข้อมูลที่ได้รับ
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.errorMessage = `Error loading profile: ${err.message || err}`;
      }
    });
  }
}
