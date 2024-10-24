import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";

//PrimeNG Modules
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AccountService } from './services/account.service';


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
  
  // The constructor method injects the PrimeNGConfig service and the AccountService service.
  constructor(private primengConfig: PrimeNGConfig, private accountService: AccountService) { }

  async ngOnInit() {
    this.primengConfig.ripple = true; // The ripple property of the PrimeNGConfig service is set to true to enable the ripple effect.
  }
}
