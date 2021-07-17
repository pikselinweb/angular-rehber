import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Çerez Servisi
import { CookieService } from 'ngx-cookie-service';
// HTTP CLIENT
import { HttpClientModule } from '@angular/common/http';
// interceptor provider
import { httpInterceptorProviders } from './interceptors';
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, MatSnackBarModule],
  // Çerez Servisi
  providers: [CookieService, httpInterceptorProviders],
})
export class CoreModule {}
