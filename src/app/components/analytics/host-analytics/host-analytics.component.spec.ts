import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HostAnalyticsComponent } from './host-analytics.component';
import {ApiService} from '../../../services/api.service';
import {AuthService} from '../../../services/auth.service';
import {EndpointsService} from '../../../services/endpoints.service';
import {GlobalService} from '../../../services/global.service';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {Routes} from '@angular/router';
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


let Observer: (observer) => void;
describe('HostAnalyticsComponent', () => {
  let component: HostAnalyticsComponent;
  let fixture: ComponentFixture<HostAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostAnalyticsComponent, NotFoundComponent ],
      providers: [ApiService, AuthService, EndpointsService, GlobalService, WindowService],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should show HostTeam', inject([ApiService, GlobalService], (service: ApiService, service2: GlobalService) => {
    spyOn(service, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'status' : 200});
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    spyOn(service2, 'showToast').and.callThrough();
    component.getHostTeam();
    expect(service.getUrl).toHaveBeenCalled();
    expect(service2.showToast).not.toHaveBeenCalled();
  }));
  it('should give error for HostTeam', inject([ApiService, GlobalService], (service: ApiService, service2: GlobalService) => {
    const err  = {
      'status': 403,
      'error': 'error'
     };
     spyOn(service, 'getUrl').and.returnValue(new Observable((observer) => {
       observer.error(err);
       return {unsubscribe() {}};
     }));
     fixture.detectChanges();
     spyOn(service2, 'showToast').and.callThrough();
     component.getHostTeam();
     err['status'] = 401;
     component.getHostTeam();
     expect(service.getUrl).toHaveBeenCalled();
     expect(service2.showToast).toHaveBeenCalled();
  }));
  it('should show challenge Host',  inject([ApiService, GlobalService], (service: ApiService, service2: GlobalService) => {
    spyOn(service, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'results': []});
      observer.complete();
      return { unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.getChallengeHost();
    expect(service.getUrl).toHaveBeenCalled();
  }));
  it('should show challenge Analysis',  inject([ApiService, GlobalService, EndpointsService],
    (service: ApiService, service2: GlobalService, service3: EndpointsService) => {
    const result = {
      'participant_team_count': 1,
      'results': [{'id': '1'}],
      'challenge_phase': '1',
      'last_submission_timestamp_in_challenge_phase': '2020-03-10',
      'status': 403,
      'error': 'err'
    };
    // expect(component.isTeamSelected).toEqual(false);
    // component.challengeId = 1;
    spyOn(service, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next(result);
      observer.error(result);
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    spyOn(service2, 'startLoader').and.callThrough();
    spyOn(service3, 'teamCountAnalyticsURL').and.callThrough();
    component.showChallengeAnalysis();
    component.challengeId = '1';
    component.challengeList = [{'id': 1}];
    component.showChallengeAnalysis();
    expect(service2.startLoader).toHaveBeenCalled();
    expect(service.getUrl).toHaveBeenCalled();
    expect(service3.teamCountAnalyticsURL).toHaveBeenCalled();
  }));
  it('should show download challenge participant team', inject([EndpointsService, ApiService],
    (service: EndpointsService, service2: ApiService) => {
   const result = {
     'results' : [{'id': '1'}],
     'error': {'error': 'Test Error'}
   };
   Observer = (observer) => {
    observer.next(result);
    observer.error(result);
    observer.next(result);
    observer.complete();
    return {unsubscribe() {}};
   };
    spyOn(service2, 'getUrl').and.returnValue(new Observable (Observer));
    fixture.detectChanges();
    spyOn(service, 'downloadParticipantsAnalyticsURL').and.callThrough();
    component.challengeId = '1';
    component.downloadChallengeParticipantTeams();
    expect(service.downloadParticipantsAnalyticsURL).toHaveBeenCalled();
    expect(service2.getUrl).toHaveBeenCalled();
  }));


});
