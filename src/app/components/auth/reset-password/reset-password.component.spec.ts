import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import {ResetPasswordComponent} from './reset-password.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {GlobalService} from '../../../services/global.service';
import {EndpointsService} from '../../../services/endpoints.service';
import {ApiService} from '../../../services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { Observable } from 'rxjs';

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
  it('should reset password with valid parameters', inject([ApiService], (service: ApiService) => {
      spyOn(service, 'postUrl').and.returnValue(new Observable((observation) => {
        observation.next({'detail': 'testing_detail_goes_here'});
        observation.complete();
        return{unsubscribe() {}};
      }));
      fixture.detectChanges();
      component.resetPassword(false);
      component.resetPassword(true);
      expect(service.postUrl).toHaveBeenCalled();
  }));
  it('should call resetPassword function with error',  inject([ApiService], (service: ApiService) => {
    const error = {};
    spyOn(service, 'postUrl').and.returnValue(new Observable((observation) => {
      observation.error(error);
      return{unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.resetPassword(true);
    expect(service.postUrl).toHaveBeenCalled();
  }));
});
