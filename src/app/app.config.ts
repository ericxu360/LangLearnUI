import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {authHttpInterceptorFn, provideAuth0} from "@auth0/auth0-angular";
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({
      eventCoalescing: true
    }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideAuth0({
      domain: 'dev-mdc3ipc5g18v3fth.us.auth0.com',
      clientId: '7Q3Cd3HOJl5lnhchTyFXTPzHgYR71vG0',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-mdc3ipc5g18v3fth.us.auth0.com/api/v2/',
      },
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://{yourDomain}/api/v2/' (note the asterisk)
            uri: 'https://dev-mdc3ipc5g18v3fth.us.auth0.com/api/v2/*',
            tokenOptions: {
              authorizationParams: {
                // The attached token should target this audience
                audience: 'https://dev-mdc3ipc5g18v3fth.us.auth0.com/api/v2/',
              }
            }
          }
        ]
      }
    }),
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
  ]
};
