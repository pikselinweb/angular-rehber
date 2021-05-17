import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
// Login ve Register bileşenlerini import ettik
import { LoginComponent } from './contents/login/login.component';
import { RegisterComponent } from './contents/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    // AUTH COMPONENT'in içine tanımladık
    children: [
      // AUTH COMPONENT LOGİN YÖNLENDİRMESİ
      {path:'',redirectTo:'login', pathMatch:'full'},

      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },

      // FARKLI URL LOGIN YÖNLENDİRMESİ
      { path: '**', redirectTo: 'login' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
