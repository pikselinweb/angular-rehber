import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Overlay Modülü
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Spinner Modülü
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Çerez Servisi
import { CookieService } from 'ngx-cookie-service';
// HTTP CLIENT
import { HttpClientModule } from '@angular/common/http';
// interceptor provider
import { httpInterceptorProviders } from './interceptors';
import { SpinnerComponent } from './components';
@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    OverlayModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  // Çerez Servisi
  providers: [CookieService, httpInterceptorProviders],
})
export class CoreModule {}
