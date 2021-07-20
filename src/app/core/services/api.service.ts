import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { shareReplay } from 'rxjs/operators';
import { HTTP_REQ } from '@models/common';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // api url
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  // get istekleri
  public async get(httpData: HTTP_REQ) {
    try {
      const httpOptions = this.generateHttpOptions(
        httpData.params,
        httpData.headers
      );
      const result: any = await this.http
        .get(`${this.apiUrl}/${httpData.url}`, httpOptions)
        .pipe(shareReplay())
        .toPromise();
      return { success: true, data: result, error: null };
    } catch (error) {
      return { success: false, data: null, error };
    }
  }
  // post istekleri
  public async post(httpData: HTTP_REQ) {
    try {
      const httpOptions = this.generateHttpOptions(
        httpData.params,
        httpData.headers
      );
      const result: any = await this.http
        .post(`${this.apiUrl}/${httpData.url}`, httpData.body, httpOptions)
        .pipe(shareReplay())
        .toPromise();
      return { success: true, data: result, error: null };
    } catch (error) {
      return { success: false, data: null, error };
    }
  }
  // üst bilgi oluşturma
  private generateHttpOptions(params: any, headers: any) {
    const httpOptions: any = {};
    if (params) {
      let httpParams = new HttpParams();
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const paramValue = params[key];
          httpParams = httpParams.append(key, paramValue);
        }
      }
      httpOptions.params = httpParams;
    }
    if (headers) {
      let httpHeaders = new HttpHeaders();
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          const headerValue = headers[key];
          httpHeaders = httpHeaders.append(key, headerValue);
        }
      }
      httpOptions.headers = httpHeaders;
    }
    return httpOptions;
  }
}
