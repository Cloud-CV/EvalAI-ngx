import { Component, OnInit, Inject } from '@angular/core';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { InputComponent } from '../../../components/utility/input/input.component';
import { WindowService } from '../../../services/window.service';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { GlobalService } from '../../../services/global.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * Component Class
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  /**
   * Contains the fields for the login
   */
  loginForm = 'loginform';
  @ViewChildren('loginform')
  components: QueryList<InputComponent>;

  isnameFocused = false;
  ispasswordFocused = false;

  /**
   * Route path for dashboard
   */
  dashboardRoute = '/dashboard';

  /**
   * Route path for login
   */
  loginRoute = '/auth/login';

  /**
   * Route path for signup
   */
  signupRoute = '/auth/signup';

  /**
   * Constructor.
   * @param document  window document injection
   * @param windowService
   * @param apiService  ApiService Injection
   * @param authService  AuthService Injection
   * @param router  Router Injection.
   * @param route  ActivatedRoute Injection.
   * @param globalService  GlobalService Injection.
   * @param endpointsService
   */
  constructor(@Inject(DOCUMENT) private document: Document,
    private windowService: WindowService,
    private globalService: GlobalService,
    private apiService: ApiService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private endpointsService: EndpointsService) {
  }

  /**
   * Constructor on initialization
   */
  ngOnInit() {
    this.authService.resetForm();
  }

  /**
   * After view is initialized.
   */
  ngAfterViewInit() {
  }

  /**
   * Constructor.
   * @param self  Router Injection.
   */
  redirectCheck(self) {
    let redirectTo = this.dashboardRoute;
    const REDIRECT_URL = self.globalService.getData(self.globalService.redirectStorageKey);
    if (REDIRECT_URL && REDIRECT_URL['path']) {
      redirectTo = REDIRECT_URL['path'];
      self.globalService.deleteData(self.globalService.redirectStorageKey);
    }
    self.router.navigate([redirectTo]);
  }

  // Validate Login Form
  formValidate() {
    this.globalService.formValidate(this.components, this.userLogin, this);
  }

  // Function to login
  userLogin(self) {

    self.globalService.startLoader('Taking you to EvalAI!');
    const LOGIN_BODY = {
      username: self.globalService.formValueForLabel(self.components, 'name'),
      password: self.globalService.formValueForLabel(self.components, 'password')
    };

    self.apiService.postUrl(self.endpointsService.loginURL(), LOGIN_BODY).subscribe(
      data => {
        self.globalService.storeData(self.globalService.authStorageKey, data['token']);
        self.authService.loggedIn(true);
        self.globalService.stopLoader();
        self.redirectCheck(self);
      },

      err => {
        self.globalService.stopLoader();

        if (err.status === 400) {
          self.authService.isFormError = true;
          try {
            const non_field_errors = typeof (err.error.non_field_errors) !== 'undefined';
            if (non_field_errors) {
              self.authService.FormError = err.error.non_field_errors[0];
            }
          } catch (error) {
            setTimeout(() => {
              self.globalService.showToast('Error', 'Unable to Login.Please Try Again!', 5);
            }, 1000);
          }
        } else {
          self.globalService.handleApiError(err);
        }
      },
      () => { }
    );
  }

}
