import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { CustomValidatorService } from '../../services/custom-validator.service';
import { AccountService } from '../../services/account.service';
import { MessageService } from 'primeng/api';
import { RegisterUserDto } from '../../dtos/register-user.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-account-register-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    FloatLabelModule,
    InputTextModule,
    RadioButtonModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './account-register-user.component.html',
  styleUrl: './account-register-user.component.css'
})

export class AccountRegisterUserComponent implements OnInit {

  // Properties
  returnUrl = '';
  roles = ['Customer', 'Seller'];
  registerForm!: FormGroup;
  isProcessing = false;

  // Constructor with DI
  constructor(private router: Router,
    private route: ActivatedRoute,
    private customeValidatorService: CustomValidatorService,
    private accountService: AccountService,
    private messageService: MessageService // To show dialog messages by PrimeNG
  ) { }

  // Method to initialize the component
  ngOnInit(): void {

    // Get the return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Initialize the form with form controls and validators  
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

    // Add custom validator to check if the password and confirm password match
    this.registerForm.get('confirmPassword')?.addValidators(this.customeValidatorService.mismatched(this.registerForm.get('password')!));
  }

  validateControl(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control?.invalid && control?.touched;
  }

  hasError(controlName: string, errorName: string) {
    const control = this.registerForm.get(controlName);
    return control?.hasError(errorName);
  }

  // Method to register a new user
  registerUser() {

    // Create the request object from the form values
    const req: RegisterUserDto = {
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      role: this.registerForm.get('role')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      confirmPassword: this.registerForm.get('confirmPassword')?.value,
    };

    this.registerForm.disable(); // Disable the form to prevent multiple requests
    this.messageService.clear(); // Clear any previous dialog messages after pressing the submit button
    this.isProcessing = true; // Set the processing flag to true

    // Call the account service to register the user with the request object and subscribe to the response or error callback methods  
    this.accountService.register(req).subscribe({
      next: (res) => {
        console.log(res); // ดูข้อมูลที่ได้จากการสมัคร

        // Show a success message and redirect to login page
        this.messageService.add({
          severity: 'success',
          summary: 'Register Succeeded',
          detail: 'Your account is created.'
        });
        setTimeout(() => {
          this.router.navigate(['/account/login'], { queryParams: { returnUrl: this.returnUrl } });
        }, 1500);
      },
      error: (err: HttpErrorResponse) => {
        this.registerForm.enable();
        this.messageService.add({
          severity: 'error',
          summary: 'Register Failed',
          detail: err.message, // Show the error message from the server response in the dialog message (errorInterceptor)
          // sticky: true
        });
        this.isProcessing = false; // Set the processing flag to false
      }
    });
  }

}
