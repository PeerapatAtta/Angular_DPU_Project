import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { AccountService, authKey } from '../../services/account.service';
import { ConfirmationService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

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

  // Properties 
  isUserAuthenticated = false; // to check if the user is authenticated


  // Constructor with dependency injection
  constructor(
    private router: Router, // to navigate to different pages
    private route: ActivatedRoute, // to get the current route
    private accountService: AccountService, // to access account service
    private confirmService: ConfirmationService // to show confirmation dialog
  ) {
    accountService.authChanged.subscribe(res => { // to get the authentication change notification
      this.isUserAuthenticated = res;
    });
  }


  // Method to navigate to login page
  gotoLogin() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.router.url; // Get the return url
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: returnUrl } }); // Navigate to login page with return url
  }

  // Method to logout the user
  logout() {
    this.confirmService.confirm({ // show confirmation dialog
      header: 'Log Out',
      message: 'Are you sure you want to log out?',
      accept: () => {
        // Call the logout method of account service
        this.accountService.logout().subscribe({
          next: (_) => {
            this.logoutUser();
          },
          error: (err: HttpErrorResponse) => {
            if (!environment.production) {
              console.log(err);
            }
            this.logoutUser();
          }
        });
      }
    });
  }

  // Method to logout the user
  private logoutUser() {
    localStorage.removeItem(authKey.accessToken); // remove access token from local storage
    localStorage.removeItem(authKey.refreshToken); // remove refresh token from local storage

    this.accountService.notifyAuthChange(false); // notify the authentication change

    this.router.navigate(['/']);
  }

}
