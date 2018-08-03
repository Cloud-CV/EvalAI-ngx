import { Injectable, Output, EventEmitter } from '@angular/core';
import { GlobalService } from './global.service';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  authState = {isLoggedIn: false};
  private authStateSource = new BehaviorSubject(this.authState);
  change = this.authStateSource.asObservable();

  constructor(private globalService: GlobalService, private apiService: ApiService) { }

    authStateChange(state) {
      this.authState = state;
      this.authStateSource.next(this.authState);
    }

    loggedIn(autoFetchUserDetails = false) {
      this.authState = {isLoggedIn: true};
      if (autoFetchUserDetails) {
        this.fetchUserDetails();
      }
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
          const TEMP = Object.assign({isLoggedIn: true}, SELF.authState, data);
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
            this.loggedIn(true);
          }
          return true;
      } else {
          if (this.authState['isLoggedIn']) {
            this.logOut();
          }
      }
    }

    verifyEmail(token, callback = () => {}) {
      const API_PATH = 'auth/registration/verify-email/';
      const SELF = this;
      const BODY = JSON.stringify({
        key: token
      });
      this.apiService.postUrl(API_PATH, BODY).subscribe(
        data => {
          callback();
        },
        err => {
          SELF.globalService.handleApiError(err);
        },
        () => console.log('Email Verified')
      );
    }
}
