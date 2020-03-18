import { TemplateRef, ViewContainerRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

// import Directive
import { AuthcheckDirective } from './authcheck.directive';

// import services
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { ApiService } from '../services/api.service';
import { EndpointsService } from '../services/endpoints.service';

describe('AuthcheckDirective', () => {
  const templateRef: jasmine.SpyObj<TemplateRef<any>>;
  const viewcontainerRef: jasmine.SpyObj<ViewContainerRef>;
  let authServive: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthcheckDirective
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        AuthService,
        GlobalService,
        ApiService,
        EndpointsService
      ]
    }).compileComponents();
    authServive = TestBed.get(AuthService);

  }));
  it('should create', () => {
    const authDirective = new AuthcheckDirective(authServive, templateRef, viewcontainerRef);
    expect(authDirective).toBeTruthy();
  });
});
