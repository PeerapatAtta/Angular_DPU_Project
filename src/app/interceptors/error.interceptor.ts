import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Error interceptor to handle the error response from the server
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // Inject the Router service
  const router = inject(Router);

  // Handle the error response
  return next(req).pipe(

    // Catch the error response
    catchError((err: HttpErrorResponse) => {

      // Define the error message
      let message = '';

      // Handle the error status code and the current route URL 
      if (err.status === 400) { // 400 Bad Request: คำขอไม่ถูกต้องหรือมีรูปแบบที่ผิดพลาด

        // Check the current route URL and set the error message
        if (router.url.startsWith('/account/register')) {
          message = getErrorMessage(err);
        }
        else if (router.url.startsWith('/account/resetpassword')) {
          message = getErrorMessage(err);
        }
        else {
          message = err.error ? err.error : err.message;
        }
      }
      else if (err.status === 401) { // 401 Unauthorized: ต้องการการยืนยันตัวตนก่อนที่จะเข้าถึงทรัพยากร
        if (router.url.startsWith('/account/login')) {
          message = getErrorMessage(err);
        }
        // If stay on home page, show the error message
        else if (router.url.startsWith('/home')) {
          message = getErrorMessage(err);
        }
        // If stay on other pages and unauthorized access (401) , redirect to the login page and show the error message
        else {
          message = err.error ? err.error : err.message;
          router.navigate(['/account/login'], { queryParams: { returnUrl: router.url } }); // Redirect to the login page due to unauthorized access
        }
      }

      return throwError(() => Error(message)); // Return the error message
    })
  );
};

// Method to get the error message
export const getErrorMessage = (err: HttpErrorResponse) => {
  let message = '';
  const errors = Object.values(err.error.errors);
  message += '<ul>';
  errors.map((e) => {
    message += '<li>' + e + '</li>';
  });
  message += '</ul>';
  return message;
}
