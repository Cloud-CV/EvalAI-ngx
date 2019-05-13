import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { ErrorHandlerService } from './../services/error-handler.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private errorHandler: ErrorHandlerService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => { }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.errorHandler.handleError(err);
      }
    });
  }
}
