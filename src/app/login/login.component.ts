import { Component, OnInit, Inject } from '@angular/core';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { WindowService } from '../services/window.service';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  API_PATH = 'auth/login/';
  ALL_FORMS: any = {};
  loginForm = 'formlogin';
  @ViewChildren('formlogin')
  components: QueryList<InputComponent>;
  constructor(@Inject(DOCUMENT) private document: Document,
              private windowService: WindowService,
              private globalService: GlobalService,
              private apiService: ApiService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // print array of CustomComponent objects
    // this.componentlist = this.components.toArray();

    this.ALL_FORMS[this.loginForm] = this.components;
  }

  formValidate(formname) {
    this.globalService.formValidate(this.ALL_FORMS[this.loginForm], this.formSubmit, this);
  }

  redirectCheck(self) {
    let redirectTo = '/';
    const REDIRECT_URL = self.globalService.getData(self.globalService.redirectStorageKey);
    if (REDIRECT_URL && REDIRECT_URL['path']) {
      redirectTo = REDIRECT_URL['path'];
      self.globalService.deleteData(self.globalService.redirectStorageKey);
    }
    self.router.navigate([redirectTo]);
  }

  formSubmit(self) {
    const LOGIN_BODY = JSON.stringify({
      username: self.globalService.formValueForLabel(self.ALL_FORMS[self.loginForm], 'username'),
      password: self.globalService.formValueForLabel(self.ALL_FORMS[self.loginForm], 'password')
    });
    self.apiService.postUrl(self.API_PATH, LOGIN_BODY).subscribe(
      data => {
        self.globalService.storeData(self.globalService.authStorageKey, data['token']);
        self.authService.loggedIn(true);
        self.redirectCheck(self);
      },
      err => {
        self.globalService.handleFormError(self.ALL_FORMS[self.loginForm], err);
      },
      () => console.log('LOGIN-FORM-SUBMITTED')
    );
  }
}
