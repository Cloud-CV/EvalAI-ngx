import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { InputComponent } from '../../../components/utility/input/input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA} from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { WindowService } from '../../../services/window.service';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { EndpointsService } from '../../../services/endpoints.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent, InputComponent ],
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
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngAfterViewInit', () => {
    expect(component.ngAfterViewInit()).toBe();
  });
  it('form invalid when empty', () => {
    expect(fixture.debugElement.query(By.css('form')).nativeElement.valid ).toBeFalsy();
  });
  it('should call userSignup',  inject([GlobalService, EndpointsService, ApiService, AuthService],
    (service: GlobalService, service2: EndpointsService, service3: ApiService) => {
    spyOn(service, 'startLoader').and.callThrough();
    spyOn(service2, 'signupURL').and.callThrough();
    spyOn(service3, 'postUrl').and.callThrough();
    component.userSignUp(true);
    fixture.detectChanges();
    expect(service.startLoader).toHaveBeenCalled();
    expect(service2.signupURL).toHaveBeenCalled();
    expect(service.startLoader).toHaveBeenCalled();
  }));
  it('should check password strength', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'passwordStrength').and.callThrough();
    component.checkStrength('Passwordgoeshere!');
    expect(service.passwordStrength).toHaveBeenCalled();
  }));
});
