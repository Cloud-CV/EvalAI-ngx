import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { EndpointsService } from './endpoints.service';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs';

describe('AuthService', () => {
  let authService: AuthService;
  let globalService: GlobalService;
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, GlobalService, ApiService, EndpointsService],
      imports: [ HttpClientModule ]
    });
  });

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    globalService = TestBed.get(GlobalService);
    apiService = TestBed.get(ApiService);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should login using isLoggedIn', () => {
    spyOn(globalService, 'getAuthToken').and.returnValue(true);
    authService.isLoggedIn();
    expect(globalService.getAuthToken).toHaveBeenCalled();
  });

  it('should call logOut', () => {
    authService.logOut();
    expect(authService.authState.isLoggedIn).toBe(false);
  });

  it('should return password strength', () => {
    const strength = authService.passwordStrength('../Cloudcv#2019')[0];
    const color = authService.passwordStrength('../Cloudcv#2019')[1];
    expect(strength).toBe('Very Strong');
    expect(color).toBe('darkgreen');
  });

  it('should login using isLoggedIn', () => {
    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({});
      observer.complete();
      return {unsubscribe() {}};
    }));
    authService.fetchUserDetails();
    expect(apiService.getUrl).toHaveBeenCalled();
  });

  it('should call verifyEmail', () => {
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.next({});
      observer.complete();
      return {unsubscribe() {}};
    }));
    authService.verifyEmail('cloudCv@testing.com');
    expect(apiService.postUrl).toHaveBeenCalled();
  });
});
