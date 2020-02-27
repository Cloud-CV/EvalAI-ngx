import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { VerifyEmailComponent } from './verify-email.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailComponent ],
      imports: [ HttpClientModule, RouterTestingModule ],
      providers: [ GlobalService, AuthService, ApiService, EndpointsService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check variables of component', () => {
    expect(component.token).toEqual('');
    expect(component.email_verify_msg).toEqual('');
    expect(component.loginRoute).toEqual('/auth/login');
  });
  it('should initialize the component', inject([GlobalService, AuthService],
    (service: GlobalService, service3: AuthService)  => {
      spyOn(service, 'startLoader').and.callThrough();
      spyOn(service3, 'verifyEmail').and.callThrough();
      spyOn(component, 'email_verify_msg').and.callThrough();
      spyOn(service, 'stopLoader').and.callThrough();
      component.ngOnInit();
      expect(service.startLoader).toHaveBeenCalled();
      expect(service3.verifyEmail).not.toHaveBeenCalled();
      expect(component.email_verify_msg).not.toHaveBeenCalled();
      expect(service.stopLoader).not.toHaveBeenCalled();
  }));
});
