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
import { Observable } from 'rxjs';

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


  it('should call userSignup successfully',  inject([ApiService], ( service: ApiService) => {
      spyOn(service, 'postUrl').and.returnValue(new Observable((observation) => {
        observation.next({'status': 201});
        observation.complete();
        return{unsubscribe() {}};
      }));
      fixture.detectChanges();
      component.userSignUp(false);
      component.userSignUp(true);
      expect(service.postUrl).toHaveBeenCalled();
  }));
  it('should call userSignup with error',  inject([ApiService], ( service: ApiService) => {
    let err = {};
    spyOn(service, 'postUrl').and.returnValue(new Observable((observation) => {
       observation.error(err);
        return{unsubscribe() {}};
      }));
      fixture.detectChanges();
      component.userSignUp(true);

      err = {'status': 400};
      fixture.detectChanges();
      component.userSignUp(true);

      err = {'status': 400, 'non_field_errors': ['Testing Error']};
      fixture.detectChanges();
      component.userSignUp(true);

      err = {'status': 400, 'username': ['Testing error']};
      fixture.detectChanges();
      component.userSignUp(true);

      err = {'status': 400, 'email': ['Testing error']};
      fixture.detectChanges();
      component.userSignUp(true);

      err = {'status': 400, 'password1': ['Testing error']};
      fixture.detectChanges();
      component.userSignUp(true);

      err = {'status': 400, 'password2': ['Testing error']};
      fixture.detectChanges();
      component.userSignUp(true);

      expect(service.postUrl).toHaveBeenCalled();
  }));
  it('should check password strength', inject([AuthService], (service: AuthService) => {
    spyOn(service, 'passwordStrength').and.callThrough();
    component.checkStrength('Passwordgoeshere!');
    expect(service.passwordStrength).toHaveBeenCalled();
    expect(component.message).toBeDefined();
  }));
});
