import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService, authKey } from '../../services/account.service';
import { LoginUserDto } from '../../dtos/login-user.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// PrimeNG Modules
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-account-login-user',
  standalone: true,
  imports: [
    CardModule,
    ReactiveFormsModule,
    FloatLabelModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CommonModule
  ],
  templateUrl: './account-login-user.component.html',
  styleUrl: './account-login-user.component.css'
})

export class AccountLoginUserComponent implements OnInit {

  //  Properties
  returnUrl = ''; // The returnUrl property is a string that stores the URL to which the user will be redirected after logging in.
  loginForm!: FormGroup; // The loginForm property is a FormGroup instance that contains two FormControl instances: email and password.
  isProcessing = false; // The isProcessing property is a boolean value that indicates whether the form is being processed.

  // Constructor with dependency injection
  constructor(
    private router: Router, // The Router service is injected to navigate to other components.
    private route: ActivatedRoute, // to access the route query parameters.
    private messageService: MessageService, // The MessageService service is injected to display messages.
    private accountService: AccountService // The AccountService service is injected to log in the user.
  ) { }

  // Method to initialize the component
  ngOnInit(): void {

    // Get the return URL from the route query parameters or set it to the root URL
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // The loginForm property is initialized with two FormControl instances: email and password.
    this.loginForm = new FormGroup({
      email: new FormControl('seller@email.com', [Validators.required, Validators.email]), // The email FormControl instance is initialized with the required and email validators.
      password: new FormControl('Password@1234', [Validators.required]), // The password FormControl instance is initialized with the required validator.
    });

  }

  // The validateControl method checks if a control is invalid and has been touched.
  validateControl(controlName: string) {
    const control = this.loginForm.get(controlName); // The control variable is assigned the control with the specified name.
    return control?.invalid && control?.touched; // The method returns true if the control is invalid and has been touched; otherwise, it returns false.
  }

  // The hasError method checks if a control has a specific error.
  hasError(controlName: string, errorName: string) {
    const control = this.loginForm.get(controlName); // The control variable is assigned the control with the specified name.
    return control?.hasError(errorName); // The method returns true if the control has the specified error; otherwise, it returns false.
  }

  // method to handle the login form
  loginUser() {

    // Convert loginForm values to LoginUserDto to send to the server.
    const req: LoginUserDto = {
      email: this.loginForm.get('email')?.value, // get the email value from the form
      password: this.loginForm.get('password')?.value, // // get the password value from the form
    };

    this.loginForm.disable(); // Disable the login form to prevent multiple submissions.
    this.isProcessing = true; // Set the isProcessing property to true to indicate that the form is being processed.
    this.messageService.clear(); // Clear any messages displayed on the screen.

    // Call the login method of the accountService service to log in the user.
    this.accountService.login(req).subscribe({
      // The next callback is called when the server returns a successful response.
      next: (res) => {
        localStorage.setItem(authKey.accessToken, res.accessToken!); // Store the access token in the local storage.
        localStorage.setItem(authKey.refreshToken, res.refreshToken!); // Store the refresh token in the local storage.

        this.accountService.notifyAuthChange(true); // notify other components about the authentication change

        // Display a success message if the server returns a successful response.
        this.messageService.add({
          severity: 'success', // Massages with severity success will be displayed in green.
          summary: 'Login Succeeded', // The summary property is assigned the 'Login Succeeded' message.
          detail: 'Nice to see you.' // The detail property is assigned the 'Nice to see you.' message.
        });

        // navigate to the return URL after a delay
        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 1500);
      },
      // The error callback is called when the server returns an error response.
      error: (err: HttpErrorResponse) => {

        // Display an error message if the server returns an error response.
        this.messageService.add({
          severity: 'error', // Massages with severity error will be displayed in red.
          summary: 'Login Failed', // The summary property is assigned the 'Login Failed' message.
          detail: err.message, // show the error message from the server to the user 
          sticky: true // The sticky property is set to true to keep the message displayed until the user closes it.
        });

        this.isProcessing = false;
        this.loginForm.enable();
      }
    });
  }

}
