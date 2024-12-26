import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BASE_URL, TOKEN_KEY } from './app.tokens';
import { AuthInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    //{ provide: BASE_URL, useValue: 'http://localhost:3000' }, 
    //{ provide: BASE_URL, useValue: 'http://codewebapi.azurewebsites.net' }, 
    { provide: BASE_URL, useValue: 'https://codewebapi.azurewebsites.net' }, 
    //{ provide: BASE_URL, useValue: 'http://localhost:8000' }, 
    //{ provide: BASE_URL, useValue: 'https://localhost' }, 
    { provide: TOKEN_KEY, useValue: 'authToken' },
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
};
