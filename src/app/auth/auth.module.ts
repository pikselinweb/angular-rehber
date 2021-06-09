import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// FORM MODÜLLERİ
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ANGULAR MATERIAL MODULLERİ
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
    // FORM MODÜLLERİ
    FormsModule,
    ReactiveFormsModule,
    // MATERIAL MODULLER
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class AuthModule {}
