import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { InputComponent } from '../../../components/utility/input/input.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { WindowService } from '../../../services/window.service';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { EndpointsService } from '../../../services/endpoints.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let apiService: ApiService;
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
    apiService = TestBed.get(ApiService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call userSignUp Successfully', () => {
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.next({'status': 201});
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.userSignUp(false);
    component.userSignUp(true);
    expect(apiService.postUrl).toHaveBeenCalled();
  });

  it('should call userSignUp UnSuccessfully', () => {
    let err = {};
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.error(err);
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.userSignUp(true);

    err =  {'status': 400};
    fixture.detectChanges();
    component.userSignUp(true);

    err = {'status': 400, 'error': {'non_field_errors': ['Error Testing']}};
    fixture.detectChanges();
    component.userSignUp(true);

    err = {'status': 400, 'error': {'username': ['Error Testing']}};
    fixture.detectChanges();
    component.userSignUp(true);

    err = {'status': 400, 'error': {'email': ['Error Testing']}};
    fixture.detectChanges();
    component.userSignUp(true);

    err = {'status': 400, 'error': {'password1': ['Error Testing']}};
    fixture.detectChanges();
    component.userSignUp(true);

    err = {'status': 400, 'error': {'password2': ['Error Testing']}};
    fixture.detectChanges();
    component.userSignUp(true);
    expect(apiService.postUrl).toHaveBeenCalled();
  });

  it('should call checkStrength', () => {
    fixture.detectChanges();
    const password = 'testing@123';
    component.checkStrength(password);
    expect(component.message).toBeDefined();
  });
});
