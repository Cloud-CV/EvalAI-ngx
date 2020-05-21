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
import { Routes } from '@angular/router';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { Observable } from 'rxjs';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngAfterViewInit', () => {
    expect(component.ngAfterViewInit()).toBe();
  });
  it('should call userLogin without error', inject([ApiService], (service2: ApiService) => {
    spyOn(service2, 'postUrl').and.returnValue(new Observable((observation) => {
      observation.next({'token': [{}]});
      observation.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.userLogin(false);
    component.userLogin(true);
    expect(service2.postUrl).toHaveBeenCalled();
  }));
  it(' should call userLogin with error' , inject([ApiService], (service: ApiService) => {
    let err = {};
    spyOn(service, 'postUrl').and.returnValue(new Observable((observation) => {
      observation.error(err);
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.userLogin(true);
    err = {'status': 400};
    fixture.detectChanges();
    component.userLogin(true);
    err = {'status': 400, 'error': {'non_field_errirs': ['Testing Error']}};
    fixture.detectChanges();
    component.userLogin(true);
    expect(service.postUrl).toHaveBeenCalled();
  }));
});
