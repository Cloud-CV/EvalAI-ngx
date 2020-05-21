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
import { Observable } from 'rxjs';


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
  it('should confirm reset password', inject([ApiService], (service: ApiService) => {
    spyOn(service, 'postUrl').and.returnValue(new Observable((observation) => {
      observation.next({'data': {'detail': 'detail_goes_here'}});
      observation.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.resetPasswordConfirm(false);
    component.resetPasswordConfirm(true);
    expect(service.postUrl).toHaveBeenCalled();
  }));
  it('should call confirmresetPasswordwith error', inject([ApiService], (service: ApiService) => {
    let err = {};
    spyOn(service, 'postUrl').and.returnValue(new Observable((observation) => {
      observation.error(err);
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.resetPasswordConfirm(true);
    err = {'status': 400};
    fixture.detectChanges();
    component.resetPasswordConfirm(true);

    err = {'status': 400, 'error': {'non_field_errors': ['Testing']}};
    fixture.detectChanges();
    component.resetPasswordConfirm(true);

    err = {'status': 400, 'error': {'token': ['Testing']}};
    fixture.detectChanges();
    component.resetPasswordConfirm(true);

    err = {'status': 400, 'error': {'new_password1': ['Testing']}};
    fixture.detectChanges();
    component.resetPasswordConfirm(true);

    err = {'status': 400, 'error': {'new_password2': ['Testing']}};
    fixture.detectChanges();
    component.resetPasswordConfirm(true);
    expect(service.postUrl).toHaveBeenCalled();

  }));
});
