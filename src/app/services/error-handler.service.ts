import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlerService {

  constructor(private router: Router) { }

  public handleError(error: HttpErrorResponse) {
    if ( error.status === 500) {
      this.handle500Error(error);
    }
    // TODO: Handle other errors : 404 or unknown status
  }

  private handle500Error(error: HttpErrorResponse) {
    this.router.navigate(['/error/500']);
    // TODO: We can extract the error message or text and send to 500 page
    // using this line : `error.error ? error.error : error.statusText`
  }

}
