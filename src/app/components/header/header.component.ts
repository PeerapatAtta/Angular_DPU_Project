import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { authKey } from '../../services/account.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  // Property to Check if user is logged in
  public get isUserLoggedIn(): boolean {
    return localStorage.getItem(authKey.accessToken) != null;
  }

  // Constructor to inject services
  constructor(
    private router: Router) { } // Inject Router service to navigate to different pages


  // Method to navigate to login page
  gotoLogin() {
    this.router.navigate(['account/login']);
  }

  // Method to navigate to home page   
  logout() {
    localStorage.removeItem(authKey.accessToken); // Remove access token
    localStorage.removeItem(authKey.refreshToken); // Remove refresh token

    this.router.navigate(['/']); // Navigate to home page
  }
}
