import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardContentComponent } from './dashboard-content.component';
import {ApiService} from '../../../services/api.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {GlobalService} from '../../../services/global.service';
import {AuthService} from '../../../services/auth.service';
import {EndpointsService} from '../../../services/endpoints.service';
import {Routes} from '@angular/router';
import {NotFoundComponent} from '../../not-found/not-found.component';
import { Observable } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    component: DashboardContentComponent,
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

describe('DashboardContentComponent', () => {
  let component: DashboardContentComponent;
  let fixture: ComponentFixture<DashboardContentComponent>;
  let authService: AuthService;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardContentComponent, NotFoundComponent ],
      providers: [ApiService, GlobalService, AuthService, EndpointsService],
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardContentComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    apiService = TestBed.get(ApiService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call fetch apis', () => {
    const res = {
      'results': [],
      'status': 400,
      'error': {'error': 'Error Testing'}
    };
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next(res);
      observer.error(res);
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    expect(apiService.getUrl).toHaveBeenCalled();
  });
});
