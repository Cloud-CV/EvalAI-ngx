import { Component, OnInit, Inject } from '@angular/core';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { WindowService } from '../services/window.service';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {
  API_PATH = 'auth/registration/';
  ALL_FORMS: any = {};
  signupForm = 'formsignup';
  @ViewChildren('formsignup')
  components: QueryList<InputComponent>;
  constructor(@Inject(DOCUMENT) private document: Document,
              private windowService: WindowService,
              private globalService: GlobalService,
              private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // print array of CustomComponent objects
    // this.componentlist = this.components.toArray();

    this.ALL_FORMS[this.signupForm] = this.components;
  }

  formValidate(formname) {
    this.globalService.formValidate(this.ALL_FORMS[this.signupForm], this.formSubmit, this);
  }
  formSubmit(self) {
    const SIGNUP_BODY = JSON.stringify({
      username: self.globalService.formValueForLabel(self.ALL_FORMS[self.signupForm], 'username'),
      email: self.globalService.formValueForLabel(self.ALL_FORMS[self.signupForm], 'email'),
      password1: self.globalService.formValueForLabel(self.ALL_FORMS[self.signupForm], 'password'),
      password2: self.globalService.formValueForLabel(self.ALL_FORMS[self.signupForm], 'confirm password')
    });
    self.apiService.postUrl(self.API_PATH, SIGNUP_BODY).subscribe(
      data => {
        // Success Message in data.message
        // TODO: Display success in a custom alert box
        self.router.navigate(['auth/login']);
      },
      err => {
      	console.error(err);
      	const ERR = err.error;
      	for(let key in ERR) {
      	  let formItem = self.globalService.formItemForLabel(self.ALL_FORMS[self.signupForm], key);
      	  if (formItem) {
            formItem.isValid = false;
      	    formItem.message = ERR[key][0];
      	  }
      	  if (key === 'non_field_errors') {
      	  	// TODO: Display ERROR MESSAGE in a toast
      	  }
      	}
      },
      () => console.log('SIGNUP-FORM-SUBMITTED')
    );
  }
}
