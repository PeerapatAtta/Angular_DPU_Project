import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const sellerGuard: CanActivateFn = (route, state) => {
  // Injecting AccountService and Router
  const accountService = inject(AccountService);
  const router = inject(Router);

  // Check if user is in 'Seller' role
  const res = accountService.isUserInRole('Seller');

  // If user is not in 'Seller' role, navigate to forbidden page
  if (!res) {
    router.navigate(['/forbidden'], { queryParams: { returnUrl: state.url } });
  }

  // Return the result of the check if user is in 'Seller' role or not 
  return res;
};
