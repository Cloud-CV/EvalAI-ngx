import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAnalyticsComponent } from './host-analytics.component';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../../../services/auth.service';
import {EndpointsService} from '../../../services/endpoints.service';
import {GlobalService} from '../../../services/global.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {Routes} from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {LoginComponent} from '../../auth/login/login.component';
import {NotFoundComponent} from '../../not-found/not-found.component';
import {WindowService} from '../../../services/window.service';
import {FormsModule} from '@angular/forms';
import { Observable } from 'rxjs';


const routes: Routes = [
  {
    path: '',
    component: HostAnalyticsComponent,
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


let observation: (observer) => void;
describe('HostAnalyticsComponent', () => {
  let component: HostAnalyticsComponent;
  let fixture: ComponentFixture<HostAnalyticsComponent>;
  let apiService: ApiService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostAnalyticsComponent, NotFoundComponent ],
      providers: [ApiService, AuthService, EndpointsService, GlobalService, WindowService],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    apiService = TestBed.get(ApiService);
    fixture = TestBed.createComponent(HostAnalyticsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    const err = { 'status': 403, 'error': '' };
    component.errCallBack(err);
    err['status'] = 401;
    component.errCallBack(err);
    expect(component).toBeTruthy();
  });

  it('should call getHostTeam', () => {
    fixture.detectChanges();
    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'status': 200});
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.getHostTeam();
    expect(apiService.getUrl).toHaveBeenCalled();
  });

  it('should give error for getHostTeam', () => {
    fixture.detectChanges();
    const err = { 'status': 403, 'error': '' };
    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.error(err);
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.getHostTeam();

    err['status'] = 401;
    component.getHostTeam();
    expect(apiService.getUrl).toHaveBeenCalled();
  });

  it('should call getChallengeHost', () => {
    fixture.detectChanges();
    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'results': []});
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.getChallengeHost();
    expect(apiService.getUrl).toHaveBeenCalled();
  });

  it('should call showAnalysis', () => {
    fixture.detectChanges();
    const res = {
      'participant_team_count': 1,
      'results': [{'id': '1'}],
      'challenge_phase': '1',
      'last_submission_timestamp_in_challenge_phase': '2019-09-08',
      'status': 403,
      'error': ''
    };
    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next(res);
      observer.error(res);
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.showChallengeAnalysis();
    component.challengeId = '1';
    component.challengeList = [{'id': 1}];
    component.showChallengeAnalysis();
    expect(apiService.getUrl).toHaveBeenCalled();
  });

  it('should call downloadChallengeParticipantTeams', () => {
    fixture.detectChanges();
    let res = {};
    res = {
      'results': [{'id': '1'}],
      'error': {'error': 'Testing Error'}
    };
    observation = (observer) => {
      observer.next(res);
      observer.error(res);
      observer.next(res);
      observer.complete();
      return {unsubscribe() {}};
    };
    spyOn(apiService, 'getUrl').and.returnValue(new Observable(observation));
    fixture.detectChanges();
    component.challengeId = '1';
    component.downloadChallengeParticipantTeams();
    expect(apiService.getUrl).toHaveBeenCalled();
  });

});
