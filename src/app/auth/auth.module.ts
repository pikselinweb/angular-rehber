import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// FORM MODÜLLERİ
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
// LAYOUT BİLEŞENİ
import { AuthComponent } from './auth.component';
// KAYIT VE GİRİŞ BİLEŞENLERİ
import { RegisterComponent } from './contents/register/register.component';
import { LoginComponent } from './contents/login/login.component';

@NgModule({
  declarations: [AuthComponent, RegisterComponent, LoginComponent],
  // FORM MODÜLLERİNİ DAHİL ETMEK
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule],
})
export class AuthModule {}
