// AccountService.ts //
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { environment } from '../../environments/environment.development';
import { LoginUserDto } from '../dtos/login-user.dto';
import { TokenResultDto } from '../dtos/token-result.dto';
import { firstValueFrom, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { ForgotPasswordDTO } from '../dtos/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

// Key for storing access token and refresh token in local storage
export const authKey = {
  accessToken: 'auth.jwt:' + location.origin, // key for storing access token in local storage
  refreshToken: 'auth.rt:' + location.origin // key for storing refresh token in local storage
}

@Injectable({
  providedIn: 'root'
})

export class AccountService {

  // Subject to notify other components about authentication change
  private authChangeSub = new Subject<boolean>(); // to notify other components about authentication change
  authChanged = this.authChangeSub.asObservable(); // as observable คือ การทำให้ subject นี้เป็น observable ที่สามารถ subscribe ได้ 

  // Constructor with dependency injection
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService // JwtHelperService คือ service ที่ใช้สำหรับ decode หรือ encode jwt token
  ) { }

  // Register a new user 
  register(request: RegisterUserDto) {
    let reqUrl = environment.apiBaseUrl + '/accounts/register'; // api url
    return this.http.post<unknown>(reqUrl, request); // post request to register a new user
  }

  // Define the login method to send a POST request to the server to login the user and return the token result object 
  login(request: LoginUserDto) {
    let reqUrl = environment.apiBaseUrl + '/accounts/login'; // Define the request URL
    return this.http.post<TokenResultDto>(reqUrl, request); // Send a POST request to the server
  }

  logout() {
    let reqUrl = environment.apiBaseUrl + '/accounts/token/revoke';
    return this.http.post<unknown>(reqUrl, {});
  }

  // Refresh token method to get new access token and refresh token
  refresh() {
    let reqUrl = environment.apiBaseUrl + '/accounts/token/refresh';
    const req: RefreshTokenDto = {
      accessToken: localStorage.getItem(authKey.accessToken)!,
      refreshToken: localStorage.getItem(authKey.refreshToken)!
    };

    return this.http.post<TokenResultDto>(reqUrl, req);
  }

  // Method to notify other components about authentication change
  notifyAuthChange(isAuthenticated: boolean) {
    this.authChangeSub.next(isAuthenticated); // next คือ การส่งข้อมูลไปยัง subscriber ทั้งหมด
  }

  // Method to check if user is authenticated (logged in) or not and get new access token and refresh token if access token is expired
  async isUserAuthenticated() {

    const accessToken = localStorage.getItem(authKey.accessToken); // get access token from local storage

    // if access token is not present in local storage, return false   
    if (!accessToken) {
      return false;
    }

    // if access token is not expired, return true
    if (!this.jwtHelperService.isTokenExpired(accessToken)) {
      return true;
    }

    // to get new access token and refresh token
    // tyr-catching คือ การจัดการ error ที่เกิดขึ้นหรือทำการทำงานต่อไปโดยไม่หยุดทำงานหรือทำให้โปรแกรมหยุดทำงาน
    try {

      const res = await firstValueFrom<TokenResultDto>(this.refresh()); // get new access token and refresh token

      localStorage.setItem(authKey.accessToken, res.accessToken!); // store new access token in local storage
      localStorage.setItem(authKey.refreshToken, res.refreshToken!); // store new refresh token in local storage

      return true;
    }
    catch (err) {
      if (!environment.production) {
        console.log(err);
      }
    }

    // remove access token and refresh token from local storage because they are invalid
    localStorage.removeItem(authKey.accessToken); // remove access token from local storage
    localStorage.removeItem(authKey.refreshToken); // remove refresh token from local storage 
    return false;
  }

  // Method to check if user is in role or not 
  isUserInRole(role: string) {

    // get access token from local storage
    const token = localStorage.getItem(authKey.accessToken);

    // if access token is present in local storage
    if (token) {

      const decodeToken = this.jwtHelperService.decodeToken(token); // decode access token
      const currentRole = decodeToken['role']; // get role from access token

      // currentRole = 'Customer'
      // currentRole = ['Customer', 'Seller']
      // if role have many roles 
      if (currentRole && currentRole instanceof Array) {
        return currentRole.findIndex(r => r === role) >= 0; // if role have many roles
      }
      return currentRole === role; // if role have only one role
    }
    return false;
  }

  // Method to send forgot password email
  forgotPassword(request: ForgotPasswordDTO) {
    let reqUrl = environment.apiBaseUrl + '/accounts/forgotpassword';
    return this.http.post<unknown>(reqUrl, request);
  }

  // Method to reset password
  resetPassword(request: ResetPasswordDto) {
    let reqUrl = environment.apiBaseUrl + '/accounts/resetpassword';
    return this.http.post<unknown>(reqUrl, request);
  }

}
