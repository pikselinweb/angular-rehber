import { Injectable } from '@angular/core';
// Yönlendirme yapabilmek için router
import { Router } from '@angular/router';
// http istekleri için
import { HttpClient, HttpParams } from '@angular/common/http';
// anahtarı çerezlere kaydetmek için
import { CookieService } from 'ngx-cookie-service';
// Auth Interfaces
import { LOGIN_FORM, REGISTER_FORM, USER } from '@models/auth';
// Ortam değişkenleri
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // sahte sunucu url
  private readonly authBaseUrl = environment.apiUrl;
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
      this.setCookiesAndNavigate(result?.accessToken, data?.email)
    }
    return result;
  }
  // asenkron giriş fonksiyonu
  async login(data: LOGIN_FORM) {
    const result: any = await this.http
      .post(`${this.authBaseUrl}/login`, data)
      .toPromise();
    if (result?.accessToken) {
      this.setCookiesAndNavigate(result?.accessToken, data?.email)
    }
    return result;
  }
  // email parametresi ile kullanıcı bilgilerini almak
  async userProfile(): Promise<USER> {
    const userMail = this.cookieService.get('userMail');
    const httpParams = new HttpParams().append('email', userMail);
    const result: USER[] = await this.http
      .get<USER[]>(`${this.authBaseUrl}/users`, { params: httpParams })
      .toPromise();
    const userInfo = result[0];
    delete userInfo.password;
    return userInfo;
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
