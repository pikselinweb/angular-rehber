import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authBaseUrl = "http://localhost:3000"
  constructor(private http:HttpClient) { }

  register(data:any){
   return this.http.post(`${this.authBaseUrl}/register`,data).pipe(catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
