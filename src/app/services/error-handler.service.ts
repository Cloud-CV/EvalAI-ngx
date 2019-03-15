import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlerService {
  public errorMessage: string = '';

  constructor(private router: Router) { }

  public handleError(error: HttpErrorResponse){
    if(error.status === 500) {
      this.handle500Error(error);
    }
    // TODO: Handle other errors : 404 or unknown status
  }

  private handle500Error(error: HttpErrorResponse){
    this.createErrorMessage(error);
    this.router.navigate(['/500']);
  }

  private createErrorMessage(error: HttpErrorResponse){
    this.errorMessage = error.error ? error.error : error.statusText;
    console.log('errorMessage => ' + this.errorMessage);
  }

}
