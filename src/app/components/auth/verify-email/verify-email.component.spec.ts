import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailComponent } from './verify-email.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { ApiService } from '../../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';


const fakeActivatedRoute = {
  'token': 'Testing Token'
};

describe('VerifyEmailComponent', () => {
  let authService: AuthService;
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyEmailComponent ],
      imports: [ HttpClientModule, RouterTestingModule ],
      providers: [
        GlobalService,
        AuthService,
        ApiService,
        EndpointsService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
            params: of(fakeActivatedRoute),
          },
        },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(authService, 'verifyEmail').and.returnValue(new Observable((observer) => {
      observer.next({});
      observer.complete();
      return {unsubscribe() {}};
    }));
    expect(component).toBeTruthy();
  });
});
