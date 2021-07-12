import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Çerez Servisi
import { CookieService } from 'ngx-cookie-service';
// HTTP CLIENT
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  // Çerez Servisi
  providers: [CookieService],
})
export class CoreModule {}
