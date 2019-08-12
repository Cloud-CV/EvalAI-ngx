import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { Observable } from 'rxjs';
import { Routes } from '@angular/router';
import { NotFoundComponent } from '../../not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, InputComponent, NotFoundComponent ],
      providers: [
        GlobalService,
        AuthService,
        WindowService,
        ApiService,
        EndpointsService
      ],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientModule, FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    apiService = TestBed.get(ApiService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call userLogin Successfully', () => {
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.next({'token': [{}]});
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.userLogin(false);
    component.userLogin(true);
    expect(apiService.postUrl).toHaveBeenCalled();
  });

  it('should call userLogin UnSuccessfully', () => {
    let err = {};
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.error(err);
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.userLogin(true);

    err =  {'status': 400};
    fixture.detectChanges();
    component.userLogin(true);

    err = {'status': 400, 'error': {'non_field_errors': ['Error Testing']}};
    fixture.detectChanges();
    component.userLogin(true);
    expect(apiService.postUrl).toHaveBeenCalled();
  });

});
