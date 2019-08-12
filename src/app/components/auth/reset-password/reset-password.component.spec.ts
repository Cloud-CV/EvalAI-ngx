import {async, ComponentFixture, TestBed} from '@angular/core/testing';

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
  let apiService: ApiService;

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
    apiService = TestBed.get(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call resetPassword Successfully', () => {
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.next({'detail': 'Testing Message'});
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.resetPassword(false);
    component.resetPassword(true);
    expect(apiService.postUrl).toHaveBeenCalled();
  });

  it('should call resetPassword UnSuccessfully', () => {
    const err = {};
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.error(err);
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.resetPassword(true);
    expect(apiService.postUrl).toHaveBeenCalled();
  });
});
