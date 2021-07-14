import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Çerez Servisi
import { CookieService } from 'ngx-cookie-service';
// HTTP CLIENT
import { HttpClientModule } from '@angular/common/http';
// interceptor provider
import { httpInterceptorProviders } from './interceptors';
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  // Çerez Servisi
  providers: [CookieService, httpInterceptorProviders],
})
export class CoreModule {}
