import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordConfirmComponent } from './reset-password-confirm.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {GlobalService} from '../../../services/global.service';
import {AuthService} from '../../../services/auth.service';
import {WindowService} from '../../../services/window.service';
import {ApiService} from '../../../services/api.service';
import {EndpointsService} from '../../../services/endpoints.service';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordConfirmComponent,
  },
  {
    path: 'reset-password/confirm/:user_id/:reset_token',
    component: ResetPasswordConfirmComponent
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

describe('ResetPasswordConfirmComponent', () => {
  let component: ResetPasswordConfirmComponent;
  let fixture: ComponentFixture<ResetPasswordConfirmComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordConfirmComponent, NotFoundComponent ],
      providers: [
        GlobalService,
        AuthService,
        WindowService,
        ApiService,
        EndpointsService
      ],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule, FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    apiService = TestBed.get(ApiService);
    fixture = TestBed.createComponent(ResetPasswordConfirmComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    router.navigate(['/reset-password/confirm', '1', '100']).then(() => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });
  });

  it('should call resetPasswordConfirm Successfully', () => {
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.next({'data': {'detail': ''}});
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.resetPasswordConfirm(false);
    component.resetPasswordConfirm(true);
    expect(apiService.postUrl).toHaveBeenCalled();
  });

  it('should call userSignUp UnSuccessfully', () => {
    let err = {};
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.error(err);
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.resetPasswordConfirm(true);

    err =  {'status': 400};
    fixture.detectChanges();
    component.resetPasswordConfirm(true);

    err = {'status': 400, 'error': {'non_field_errors': ['Error Testing']}};
    fixture.detectChanges();
    component.resetPasswordConfirm(true);

    err = {'status': 400, 'error': {'token': ['Error Testing']}};
    fixture.detectChanges();
    component.resetPasswordConfirm(true);

    err = {'status': 400, 'error': {'new_password1': ['Error Testing']}};
    fixture.detectChanges();
    component.resetPasswordConfirm(true);

    err = {'status': 400, 'error': {'new_password2': ['Error Testing']}};
    fixture.detectChanges();
    component.resetPasswordConfirm(true);
    expect(apiService.postUrl).toHaveBeenCalled();
  });

});
