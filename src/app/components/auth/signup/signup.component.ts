import { Component, OnInit, Inject, ViewChildren, QueryList } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WindowService } from '../../../services/window.service';
import { ApiService } from '../../../services/api.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { GlobalService } from '../../../services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { InputComponent } from '../../utility/input/input.component';

/**
 * Component Class
 */
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {
    color = '';
    message = '';

    isnameFocused = false;
    ispasswordFocused = false;
    iscnfrmpasswordFocused = false;
    isemailFocused = false;

    arePasswordsMistmatch = true;

    /**
   * Build the sign up form
   */
    @ViewChildren('signupForm') signupForm: QueryList<InputComponent>;

    /**
   * Login route path
   */
    loginRoute = '/auth/login';

    /**
   * Signup route path
   */
    signupRoute = '/auth/signup';

    /**
   * Constructor.
   * @param document  window document Injection.
   * @param windowService  ActivatedRoute Injection.
   * @param globalService  GlobalService Injection.
   * @param apiService  ApiService Injection.
   * @param authService
   * @param router  Router Injection.
   * @param route  ActivatedRoute Injection.
   * @param endpointsService
   */
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private windowService: WindowService,
        private globalService: GlobalService,
        private apiService: ApiService,
        public authService: AuthService,
        private route: ActivatedRoute,
        private endpointsService: EndpointsService,
        private router: Router
    ) { }

    /**
   * Component init function.
   */
    ngOnInit() { }

    /**
   * Component after view initialized.
   */
    ngAfterViewInit() { }

    formValidate() {
        this.globalService.formValidate(this.signupForm, this.userSignUp, this);
    }

    // Function to signup
    userSignUp(self) {
        self.globalService.startLoader('Setting up your details!');
        const password1 = self.globalService.formValueForLabel(self.signupForm, 'password');
        const password2 = self.globalService.formValueForLabel(self.signupForm, 'confirm_password');

        const SIGNUP_BODY = JSON.stringify({
            username: self.globalService.formValueForLabel(self.signupForm, 'name'),
            email: self.globalService.formValueForLabel(self.signupForm, 'email'),
            password1,
            password2
        });
        self.apiService.postUrl(self.endpointsService.signupURL(), SIGNUP_BODY).subscribe(
            (data) => {
                if (data.status === 201) {
                    self.authService.isFormError = false;
                    self.authService.regMsg = 'Registered successfully, Login to continue!';
                }

                // Success Message in data.message
                setTimeout(() => {
                    self.globalService.showToast(
                        'success',
                        'Registered successfully. Please verify your email address!',
                        5
                    );
                }, 1000);

                self.router.navigate([self.loginRoute]);
                self.globalService.stopLoader();
            },
            (err) => {
                self.globalService.stopLoader();
                if (err.status === 400) {
                    self.authService.isFormError = true;
                    let non_field_errors, isUsername_valid, isEmail_valid, isPassword1_valid, isPassword2_valid;
                    try {
                        non_field_errors = typeof err.error.non_field_errors !== 'undefined';
                        isUsername_valid = typeof err.error.username !== 'undefined';
                        isEmail_valid = typeof err.error.email !== 'undefined';
                        isPassword1_valid = typeof err.error.password1 !== 'undefined';
                        isPassword2_valid = typeof err.error.password2 !== 'undefined';
                        if (non_field_errors) {
                            self.authService.FormError = err.error.non_field_errors[0];
                        } else if (isUsername_valid) {
                            self.authService.FormError = err.error.username[0];
                        } else if (isEmail_valid) {
                            self.authService.FormError = err.error.email[0];
                        } else if (isPassword1_valid) {
                            self.authService.FormError = err.error.password1[0];
                        } else if (isPassword2_valid) {
                            self.authService.FormError = err.error.password2[0];
                        }
                    } catch (error) {
                        setTimeout(() => {
                            self.globalService.showToast('Error', 'Registration UnSuccessful.Please Try Again!', 5);
                        }, 1000);
                    }
                } else {
                    self.globalService.handleApiError(err);
                }
            },
            () => { }
        );
    }

    // function to check password strength
    checkStrength(password) {
        const passwordStrength = this.authService.passwordStrength(password);
        this.message = passwordStrength[0];
        this.color = passwordStrength[1];
    }
}
