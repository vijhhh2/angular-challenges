import mainShellRoutes from '@angular-challenges/module-to-standalone/shell';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(mainShellRoutes),
  ],
}).catch((err) => console.error(err));
