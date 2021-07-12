import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Çerez Servisi
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  // Çerez Servisi
  providers: [ CookieService ],
})
export class CoreModule { }
