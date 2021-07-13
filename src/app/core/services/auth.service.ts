import { Injectable } from '@angular/core';
// Yönlendirme yapabilmek için router
import { Router } from '@angular/router';
// http istekleri için
import { HttpClient } from '@angular/common/http';
// anahtarı çerezlere kaydetmek için
import { CookieService } from 'ngx-cookie-service';
// kayıt formunun interface'i
import { LOGIN_FORM, REGISTER_FORM } from 'src/app/models/auth/forms';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // sahte sunucu url
  private readonly authBaseUrl = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}
  // asenkron kayıt fonksiyonu
  async register(data: REGISTER_FORM) {
    delete data.passwordConfirm;
    const result: any = await this.http
      .post(`${this.authBaseUrl}/register`, data)
      .toPromise();
    if (result?.accessToken) {
      this.cookieService.set('authToken', result?.accessToken,{path:'/'});
      this.router.navigate(['']);
    }
    return result;
  }
  // asenkron giriş fonksiyonu
  async login(data: LOGIN_FORM) {
    const result: any = await this.http
      .post(`${this.authBaseUrl}/login`, data)
      .toPromise();
    if (result?.accessToken) {
      this.cookieService.set('authToken', result?.accessToken,{path:'/'});
      this.router.navigate(['']);
    }
    return result;
  }
}
