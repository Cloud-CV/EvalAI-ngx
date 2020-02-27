import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { InputComponent } from '../../utility/input/input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { WindowService } from '../../../services/window.service';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, InputComponent ],
      providers: [
        GlobalService,
        AuthService,
        WindowService,
        ApiService,
        EndpointsService
      ],
      imports: [ RouterTestingModule, HttpClientModule, FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngAfterViewInit', () => {
    expect(component.ngAfterViewInit()).toBe();
  });
  it('should redirect check', inject([GlobalService], (service: GlobalService) => {
    spyOn(service, 'getData').and.callThrough();
    spyOn(service, 'deleteData').and.callThrough();
    component.redirectCheck(component);
    expect(service.getData).toHaveBeenCalled();
    expect(service.deleteData).not.toHaveBeenCalled();
  }));
  it('should call userLogin with Valid Form', inject([GlobalService, ApiService, EndpointsService, AuthService],
    (service: GlobalService, service2: ApiService, service3: EndpointsService, service4: AuthService) => {
    spyOn(service, 'startLoader').and.callThrough();
    spyOn(service3, 'loginURL').and.callThrough();
    spyOn(service2, 'postUrl').and.callThrough();
    spyOn(service, 'storeData').and.callThrough();
    spyOn(service4, 'loggedIn').and.callThrough();
    spyOn(service, 'stopLoader').and.callThrough();
    component.userLogin(true);
    expect(service.startLoader).toHaveBeenCalled();
    expect(service2.postUrl).toHaveBeenCalled();
    expect(service3.loginURL).toHaveBeenCalled();
    expect(service.storeData).not.toHaveBeenCalled();
    expect(service4.loggedIn).not.toHaveBeenCalled();
    expect(service.stopLoader).not.toHaveBeenCalled();
  }));
  it(' should call userLogin with invalid Form' , inject([GlobalService], (service: GlobalService) => {
    spyOn(service, 'stopLoader').and.callThrough();
    component.userLogin(false);
    expect(service.stopLoader).toHaveBeenCalled();
  }));
});
