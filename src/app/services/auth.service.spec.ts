import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { GlobalService } from './global.service';
import { EndpointsService } from './endpoints.service';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let authService: AuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, GlobalService, ApiService, EndpointsService],
      imports: [ RouterTestingModule, HttpClientModule ]
    });
    authService = TestBed.get(AuthService);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  it('should change auth state', () => {
    authService.authStateChange('true');
  });
  it('should log In auth state', () => {
    authService.loggedIn();
  });
  it('should log out', () => {
    authService.logOut();
  });
  it('should fetch user details', () => {
    authService.fetchUserDetails();
  });
  it('should give password strength', () => {
    expect(authService.passwordStrength('passwordgoeshere!')).toEqual(['Average', 'darkorange']);
    expect(authService.passwordStrength('!very34_#strong$password!')).toEqual(['Strong', 'darkgreen']);
  });
  it('should show whether user is logged In', () => {
    expect(authService.isLoggedIn()).toBe(undefined);
  });
  it('should verify email details', () => {
    authService.verifyEmail('token goes here!');
  });
  it('should toggle password', () => {
    authService.togglePasswordVisibility();
  });
  it('should toggle password visibility', () => {
    authService.toggleConfirmPasswordVisibility();
  });
  it('should reset form', () => {
    authService.resetForm();
  });
});
