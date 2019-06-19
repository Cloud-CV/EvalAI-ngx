import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsComponent } from './analytics.component';
import {DashFooterComponent} from '../nav/dash-footer/dash-footer.component';
import {SideBarComponent} from '../utility/side-bar/side-bar.component';
import {FooterComponent} from '../nav/footer/footer.component';
import {SimpleHeaderComponent} from '../nav/simple-header/simple-header.component';
import {AuthService} from '../../services/auth.service';
import {GlobalService} from '../../services/global.service';
import {EndpointsService} from '../../services/endpoints.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {Routes} from '@angular/router';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {LoginComponent} from '../auth/login/login.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {ApiService} from '../../services/api.service';

const routes: Routes = [
  {
    path: '',
    component: AnalyticsComponent,
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


describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsComponent, DashFooterComponent, SideBarComponent, FooterComponent,
        SimpleHeaderComponent, NotFoundComponent ],
      providers: [AuthService, GlobalService, EndpointsService, ApiService],
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
