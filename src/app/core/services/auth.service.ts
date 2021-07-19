import { Injectable } from '@angular/core';
// Yönlendirme yapabilmek için router
import { Router } from '@angular/router';
// anahtarı çerezlere kaydetmek için
import { CookieService } from 'ngx-cookie-service';
// snackbar servisi
import { SnackbarService } from './snackbar.service';
// Api Servisi
import { ApiService } from './api.service';
// Auth Interfaces
import { LOGIN_FORM, REGISTER_FORM, USER } from '@models/auth';
// http req interface
import { HTTP_REQ } from '@models/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private apiService: ApiService,
    private snackService: SnackbarService
  ) {}
  // asenkron kayıt fonksiyonu
  async register(formData: REGISTER_FORM) {
    delete formData.passwordConfirm;
    const httpData: HTTP_REQ = { url: 'register', body: formData };
    const { success, data, error } = await this.apiService.post(httpData);
    if (success && data?.accessToken) {
      this.setCookiesAndNavigate(data?.accessToken, formData?.email);
    } else {
      this.snackService.snackMessage({
        message: error?.message || 'Kayıt olurken bir sorun oluştu.',
      });
    }
  }
  // asenkron giriş fonksiyonu
  async login(formData: LOGIN_FORM) {
    const httpData: HTTP_REQ = { url: 'login', body: formData };
    const { success, data, error } = await this.apiService.post(httpData);
    if (success && data?.accessToken) {
      this.setCookiesAndNavigate(data?.accessToken, formData?.email);
    } else {
      this.snackService.snackMessage({
        message: error?.message || 'Giriş yaparken bir sorun oluştu.',
      });
    }
  }
  // email parametresi ile kullanıcı bilgilerini almak
  async userProfile(): Promise<USER | null> {
    const userMail = this.cookieService.get('userMail');
    const httpData: HTTP_REQ = { url: 'users', params: { email: userMail } };
    const { success, error, data } = await this.apiService.get(httpData);
    if (success && data?.length > 0) {
      const userInfo: USER = data[0];
      delete userInfo.password;
      return userInfo;
    } else {
      this.snackService.snackMessage({
        message: error?.message || 'Kullanıcı bilgileri alınamadı.',
      });
      return null;
    }
  }
  // Sistemden çıkış
  logOut(){
    this.cookieService.deleteAll();
    this.router.navigate(['/auth'])
  }
  private setCookiesAndNavigate(oAuthToken: string, email: string) {
    // Token süresi 1 saat olduğundan dolayı
    const expires = this.expireTime1Hour;
    this.cookieService.set('authToken', oAuthToken, {
      path: '/',
      expires,
    });
    this.cookieService.set('userMail', email, { path: '/', expires });
    this.router.navigate(['']);
  }

  private get expireTime1Hour() {
    const dNow = new Date();
    let dTime = dNow.getTime();
    dTime += 3600 * 1000;
    dNow.setTime(dTime);
    return dNow;
  }
}
