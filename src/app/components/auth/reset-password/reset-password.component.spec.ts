import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import {ResetPasswordComponent} from './reset-password.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {GlobalService} from '../../../services/global.service';
import {EndpointsService} from '../../../services/endpoints.service';
import {ApiService} from '../../../services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      providers: [AuthService, GlobalService, EndpointsService, ApiService],
      imports: [HttpClientModule, RouterTestingModule, FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check variables', () => {
    expect(component.isemailFocused).toEqual(false);
    expect(component.loginRoute).toEqual('/auth/login');
    expect(component.signupRoute).toEqual('/auth/signup');
    expect(component.resetPasswordRoute).toEqual('/auth/reset-password');
  });
  it('should call ngOninit',  inject([AuthService], (service: AuthService)  => {
      spyOn(service, 'resetForm').and.callThrough();
      component.ngOnInit();
      expect(service.resetForm).toHaveBeenCalled();
  }));
  it('should reset password with valid parameters', inject([GlobalService, EndpointsService, ApiService, AuthService],
    (service: GlobalService, service2: EndpointsService, service3: ApiService, service4: AuthService) => {
      const RESET_BODY = JSON.stringify({
        email: 'xyz@gmail.com',
      });
      const API_PATH = service2.resetPasswordURL();
      spyOn(service, 'startLoader').and.callThrough();
      spyOn(service2, 'resetPasswordURL').and.callThrough();
      spyOn(service3, 'postUrl').and.callThrough();
      service3.postUrl(API_PATH, RESET_BODY);
        expect(service4.isMail).toEqual(true);
        expect(service4.isFormError).toEqual(false);
      spyOn(service, 'stopLoader').and.callThrough();
      component.resetPassword(true);
      expect(service.startLoader).toHaveBeenCalled();
      expect(service2.resetPasswordURL).toHaveBeenCalled();
      expect(service3.postUrl).toHaveBeenCalled();
      expect(service.stopLoader).not.toHaveBeenCalled();
  }));
  it('should call resetPassword function with invalid parameter',  inject([GlobalService], (service: GlobalService) => {
    spyOn(service, 'stopLoader').and.callThrough();
    component.resetPassword(false);
    expect(service.stopLoader).toHaveBeenCalled();
  }));
});
