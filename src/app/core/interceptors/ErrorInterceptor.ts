import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// Spinner Servisi
import { SpinnerService } from '@core/services';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private spinnerService:SpinnerService){}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          //  frontend taraflı hata
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // backend taraflı hata
          errorMessage = error.error || error.message;
        }
        this.spinnerService.removeQuene();
        return throwError({ status: error.status, message: errorMessage });
      })
    );
  }
}
