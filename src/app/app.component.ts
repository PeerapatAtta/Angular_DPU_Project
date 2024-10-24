import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AccountService } from './services/account.service';

//PrimeNG Modules
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    MessageService,
    ConfirmationService,
  ]
})

export class AppComponent implements OnInit {

  // The title property is a string value that represents the title of the application.
  title = 'WebApp';

  // Constructor with dependency injection
  constructor(
    private primengConfig: PrimeNGConfig, // Inject the PrimeNGConfig service to enable the ripple effect globally
    private accountService: AccountService // Inject the AccountService to check if the user is authenticated
  ) { }

  async ngOnInit() {
    // Enable the ripple effect globally
    this.primengConfig.ripple = true; // ripple effect คือ การทำให้ปุ่มมีเอฟเฟคเมื่อคลิก 

    const res = await this.accountService.isUserAuthenticated(); // Check if the user is authenticated

    this.accountService.notifyAuthChange(res); // Notify the app component of the authentication status
  }
}
