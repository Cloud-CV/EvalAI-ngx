import { Injectable, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../global.service';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  authState = {isLoggedIn: false};
  @Output() change: EventEmitter<Object> = new EventEmitter();

  constructor(private globalService: GlobalService, private apiService: ApiService) { }

    authStateChange(state) {
      this.authState = state;
      this.change.emit(this.authState);
    }

    tryLogIn(params) {
      setTimeout(() => {
        const temp = {isLoggedIn: true, username: 'LoremIpsum'};
        this.authStateChange(temp);
      }, 1000);
    }

    loggedIn(params = null) {
      const temp = {isLoggedIn: true};
      this.authStateChange(temp);
      this.fetchUserDetails();
    }
    logOut() {
      const temp = {isLoggedIn: false};
      this.globalService.deleteData(this.globalService.authStorageKey);
      this.authStateChange(temp);
    }

    fetchUserDetails() {
      const API_PATH = 'auth/user/';
      const SELF = this;
      this.apiService.getUrl(API_PATH).subscribe(
      data => {
        const TEMP = Object.assign({}, SELF.authState, data);
        SELF.authStateChange(TEMP);
      },
      err => {
        SELF.globalService.handleApiError(err, false);
      },
      () => console.log('User details fetched')
    );
    }

    passwordStrength(password) {
      // Regular Expressions.
      const REGEX = new Array();
      REGEX.push('[A-Z]', '[a-z]', '[0-9]', '[$$!%*#?&]');

      let passed = 0;
      // Validate for each Regular Expression.
      for (let i = 0; i < REGEX.length; i++) {
        if (new RegExp(REGEX[i]).test(password)) {
          passed++;
        }
      }
      // Validate for length of Password.
      if (passed > 2 && password.length > 8) {
        passed++;
      }

      let color = '';
      let strength = '';
      if (passed === 1) {
        strength = 'Weak';
        color = 'red';
      } else if (passed === 2) {
        strength = 'Average';
        color = 'darkorange';
      } else if (passed === 3) {
        strength = 'Good';
        color = 'green';
      } else if (passed === 4) {
        strength = 'Strong';
        color = 'darkgreen';
      } else if (passed === 5) {
        strength = 'Very Strong';
        color = 'darkgreen';
      }
      return [strength, color];
    }

    // Get Login functionality
    isLoggedIn() {
      const token = this.globalService.getAuthToken();
      if (token) {
          if (!this.authState['isLoggedIn']) {
            this.loggedIn();
          }
          return true;
      } else {
          if (this.authState['isLoggedIn']) {
            this.logOut();
          }
      }
    }
}
