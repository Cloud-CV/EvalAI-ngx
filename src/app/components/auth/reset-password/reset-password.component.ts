import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {ApiService} from '../../../services/api.service';
import {EndpointsService} from '../../../services/endpoints.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  isemailFocused = false;

  constructor(public authService: AuthService, private apiService: ApiService, private endpointService: EndpointsService) { }

  ngOnInit() {
    this.authService.resetForm();
  }

  // function to reset password
  resetPassword(resetPassFormValid) {
    if (resetPassFormValid) {
      this.authService.startLoader('Sending Mail');

      const RESET_BODY = JSON.stringify({
        email: this.authService.getUser['email']
      });

      this.apiService.postUrl(this.endpointService.signupURL(), RESET_BODY).subscribe(
        response => {
          this.authService.isMail = false;
          this.authService.getUser['error'] = false;
          this.authService.isFormError = false;
          this.authService.deliveredMsg = response.data.success;
          this.authService.getUser['email'] = '';
          this.authService.stopLoader();
        },

        err => {
          this.authService.isFormError = true;
          this.authService.FormError = 'Something went wrong. Please try again';
          this.authService.stopLoader();
        },

        () => console.log('RESET-PASSWORD-FORM-SUBMITTED')
      );
    } else {
      this.authService.stopLoader();
    }
  }
}
