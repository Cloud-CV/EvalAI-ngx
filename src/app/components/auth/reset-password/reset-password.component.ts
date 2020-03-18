import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { GlobalService } from '../../../services/global.service';
import { InputComponent } from '../../utility/input/input.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  isemailFocused = false;

  /**
   * Login route path
   */
  loginRoute = '/auth/login';

  /**
   * Signup route path
   */
  signupRoute = '/auth/signup';

  /**
   * Reset-password route path
   */
  resetPasswordRoute = '/auth/reset-password';

  /**
   * Form for the reset of the password
   */
  @ViewChildren('resetForm')
  resetForm: QueryList<InputComponent>;

  /**
   *
   * @param authService
   * @param globalService
   * @param apiService
   * @param endpointService
   */
  constructor(public authService: AuthService, private globalService: GlobalService, private apiService: ApiService,
    private endpointService: EndpointsService) {
  }

  ngOnInit() {
    this.authService.resetForm();
  }

  formValidate() {
    this.globalService.formValidate(this.resetForm, this.resetPassword, this);
  }
  // function to reset password
  resetPassword(self) {
    self.globalService.startLoader('Sending Mail');

    const RESET_BODY = JSON.stringify({
      email: self.globalService.formValueForLabel(self.resetForm, 'email')
    });

    const API_PATH = self.endpointService.resetPasswordURL();

    self.apiService.postUrl(API_PATH, RESET_BODY).subscribe(
      response => {
        self.authService.isMail = false;
        self.authService.getUser['error'] = false;
        self.authService.isFormError = false;
        self.authService.deliveredMsg = response.detail;
        self.authService.getUser['email'] = '';
        self.globalService.stopLoader();
      },

      err => {
        self.authService.isFormError = true;
        self.authService.FormError = 'Something went wrong. Please try again';
        self.globalService.stopLoader();
      },

      () => { }
    );
  }
}
