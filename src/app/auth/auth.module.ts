import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PAYLAŞILAN MODUL
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
// LAYOUT BİLEŞENİ
import { AuthComponent } from './auth.component';
// KAYIT VE GİRİŞ BİLEŞENLERİ
import { RegisterComponent } from './contents/register/register.component';
import { LoginComponent } from './contents/login/login.component';

@NgModule({
  declarations: [AuthComponent, RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    //Paylaşılan Modül
    SharedModule,
  ],
})
export class AuthModule {}
