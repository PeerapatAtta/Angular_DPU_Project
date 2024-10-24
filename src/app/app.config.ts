import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { JwtModule } from '@auth0/angular-jwt';
import { authKey } from './services/account.service';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    
    provideRouter(routes), // To provide the routes for the application.

    provideHttpClient(), // For the HttpClient module to make HTTP requests. 

    provideAnimationsAsync(), // To enable animations in the application.

    // Import providers from other modules (e.g. JwtModule) to the root module 
    importProvidersFrom( 
      // Import providers from JwtModule
      JwtModule.forRoot({
        config: {
          // Provide a function that returns the access token
          tokenGetter: () => {
            return localStorage.getItem(authKey.accessToken);
          },
          allowedDomains: environment.allowedDomains, // Allow requests to these domains (e.g. 'localhost:5001')
          disallowedRoutes: [], // Do not send the access token to these routes
        },
      }),
    ),
    
  ]
};
