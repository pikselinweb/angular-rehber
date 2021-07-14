import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
export class ErrorInterceptor implements HttpInterceptor {
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
          console.log('frontend taraflı hata', errorMessage);
        } else {
          // backend taraflı hata
          errorMessage = `Error Code: ${error.status},  Message: ${error.message}`;
          console.log('backend taraflı hata', errorMessage);
        }

        return throwError(errorMessage);
      })
    );
  }
}
