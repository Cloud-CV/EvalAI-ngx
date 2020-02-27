import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ResetPasswordConfirmComponent } from './reset-password-confirm.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {GlobalService} from '../../../services/global.service';
import {AuthService} from '../../../services/auth.service';
import {WindowService} from '../../../services/window.service';
import {ApiService} from '../../../services/api.service';
import {EndpointsService} from '../../../services/endpoints.service';

describe('ResetPasswordConfirmComponent', () => {
  let component: ResetPasswordConfirmComponent;
  let fixture: ComponentFixture<ResetPasswordConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordConfirmComponent ],
      providers: [
        GlobalService,
        AuthService,
        WindowService,
        ApiService,
        EndpointsService
      ],
      imports: [RouterTestingModule, HttpClientModule, FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check variables', () => {
    expect(component.uid).toEqual('');
    expect(component.token).toEqual('');
    expect(component.isNewPassword1Focused).toEqual(false);
    expect(component.isNewPassword2Focused).toEqual(false);
    expect(component.loginRoute).toEqual('/auth/login');
    expect(component.signupRoute).toEqual('/auth/signup');
  });
  it('should confirm reset password', inject([GlobalService, EndpointsService, AuthService],
    (service: GlobalService, service2: EndpointsService, service3: AuthService) => {
    spyOn(service, 'startLoader').and.callThrough();
    spyOn(service3, 'getUser').and.callThrough();
    spyOn(service2, 'resetPasswordConfirmURL').and.callThrough();
    spyOn(service, 'stopLoader').and.callThrough();
    component.resetPasswordConfirm(true);
    expect(service.startLoader).toHaveBeenCalled();
    expect(service3.getUser).not.toHaveBeenCalled();
    expect(service2.resetPasswordConfirmURL).toHaveBeenCalled();
    expect(service.stopLoader).not.toHaveBeenCalled();
    component.resetPasswordConfirm(false);
  }));
});
