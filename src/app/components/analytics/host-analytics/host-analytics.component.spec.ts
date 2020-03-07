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
  it('should check all variable', () => {
    expect(component.hostTeam).toEqual([]);
    expect(component.challengeListCount).toBe(0);
    expect(component.challengeList).toEqual([]);
    expect(component.isTeamSelected).toBe(false);
    expect(component.challengeId).toBeNull();
    expect(component.currentChallengeDetails).toEqual({});
    expect(component.currentPhase).toEqual([]);
    expect(component.totalSubmission).toEqual({});
    expect(component.totalParticipatedTeams).toEqual({});
    expect(component.lastSubmissionTime).toEqual({});
    expect(component.totalChallengeTeams).toEqual([]);
    expect(component.routePath).toEqual('/auth/login');
 });
  it('should show errCallBack', inject([GlobalService], (service: GlobalService) => {
    const err1 = {
       status: '403'
    };
    const err2 = {
      status: '401'
   };
    spyOn(service, 'stopLoader').and.callThrough();
    spyOn(service, 'handleApiError').and.callThrough();
    spyOn(service, 'showToast').and.callThrough();
    component.errCallBack(err1);
    component.errCallBack(err2);
    expect(service.showToast).toHaveBeenCalled();
    expect(service.stopLoader).toHaveBeenCalled();
    expect(service.handleApiError).toHaveBeenCalled();
  }));
  it('should show HostTeam', inject([ApiService, GlobalService], (service: ApiService, service2: GlobalService) => {
    spyOn(service, 'getUrl').and.callThrough();
    component.getHostTeam();
    expect(service.getUrl).toHaveBeenCalled();
  }));
  it('should show challenge Host',  inject([ApiService, GlobalService], (service: ApiService, service2: GlobalService) => {
    spyOn(service, 'getUrl').and.callThrough();
    component.getChallengeHost();
    expect(service.getUrl).toHaveBeenCalled();
  }));
  it('should show challenge Analysis',  inject([ApiService, GlobalService, EndpointsService],
    (service: ApiService, service2: GlobalService, service3: EndpointsService) => {
    component.showChallengeAnalysis();
    expect(component.isTeamSelected).toEqual(false);
    component.challengeId = 1;
    spyOn(service2, 'startLoader').and.callThrough();
    spyOn(service3, 'teamCountAnalyticsURL').and.callThrough();
    spyOn(service, 'getUrl').and.callThrough();
    component.showChallengeAnalysis();
    expect(service2.startLoader).toHaveBeenCalled();
    expect(service.getUrl).toHaveBeenCalled();
    expect(service3.teamCountAnalyticsURL).toHaveBeenCalled();
  }));
  it('should show download challenge participant team', inject([EndpointsService], (service: EndpointsService) => {
    spyOn(service, 'downloadParticipantsAnalyticsURL').and.callThrough();
    component.downloadChallengeParticipantTeams();
    expect(service.downloadParticipantsAnalyticsURL).toHaveBeenCalled();
  }));


});
