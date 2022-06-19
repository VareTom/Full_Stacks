import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { NotificationService } from 'src/shared/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notification: NotificationService, private translate: TranslateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.log(error);
        let handled: boolean = false;
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            let message = this.translate.instant('errors.event');
            console.log(message);
            this.notification.showError(message);
          } else {
            let message = `Error status : ${error.status} ${error.statusText}`;
            console.log(message);
            switch (error.status) {
              case 300:
                message = this.translate.instant('errors.not-activated');
                console.log(message);
                this.notification.showError(message);
                handled = true;
                break;
              case 403:
                message = this.translate.instant('errors.unauthorized');
                console.log(message);
                this.notification.showError(message);
                handled = true;
                break;
              case 404:
                message = this.translate.instant('errors.not-found');
                console.log(message);
                this.notification.showError(message);
                handled = true;
                break;
              case 405:
                message = this.translate.instant('errors.not-allowed');
                console.log(message);
                this.notification.showError(message);
                handled = true;
                break;
              case 500:
                message = this.translate.instant('errors.server-down');
                console.log(message);
                this.notification.showError(message);
                handled = true;
                break;
            }
          }
        } else {
          console.error("Other Errors");
        }

        if (handled) {
          return next.handle(request);
        } else {
          console.log('Throw error back to to the subscriber');
          return next.handle(request);
        }
      })
    )
  }
}
