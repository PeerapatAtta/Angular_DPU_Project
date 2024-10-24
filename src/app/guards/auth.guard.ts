import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

// Auth guard to protect routes that require authentication
export const authGuard: CanActivateFn = async (route, state) => {

  // Inject services
  const accountService = inject(AccountService);
  const router = inject(Router);

  // Check if user is authenticated (login)
  const res = await accountService.isUserAuthenticated();

  // Redirect to login page if user is not authenticated (login) and redirect back to the requested page after login
  if (!res) {
    router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } }); // query params to redirect back to the requested page after login
  }

  return res;
};