import {async, ComponentFixture, fakeAsync, getTestBed, TestBed, tick} from '@angular/core/testing';

import { TeamlistComponent } from './teamlist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { ChallengeService } from '../../../services/challenge.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { HttpClientModule } from '@angular/common/http';
import {Router, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NotFoundComponent} from '../../not-found/not-found.component';
import { Observable } from 'rxjs';


const routes: Routes = [

  {path: 'teams/participants', component: TeamlistComponent},
  {path: 'teams/hosts', component: TeamlistComponent},
  {
    path: 'challenge-create',
    redirectTo: '/teams/hosts',
    pathMatch: 'full'
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

describe('TeamlistComponent', () => {
  let component: TeamlistComponent;
  let fixture: ComponentFixture<TeamlistComponent>;
  let router: Router;
  let authService: AuthService;
  let apiService: ApiService;
  let globalService: GlobalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamlistComponent, NotFoundComponent],
      providers: [ GlobalService, ApiService, AuthService, ChallengeService, EndpointsService ],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientModule, FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    apiService = TestBed.get(ApiService);
    globalService = TestBed.get(GlobalService);
    fixture = TestBed.createComponent(TeamlistComponent);
    component = fixture.componentInstance;
  });


  it('should create', fakeAsync(() => {

    router.navigate(['/teams/hosts']);
    tick();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should call fetch Teams method', () => {
    const res = {
      'results': [{'id': '1', 'creator': {'id': 1}}],
      'status': 403,
      'error': {'error': {'error': 'Error Testing'}}
    };
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next(res);
      observer.error(res);
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
  });

  it('should call pagination methods', () => {
    fixture.detectChanges();
    component.seeMoreClicked();
    expect(component.seeMore).toBe(2);
    component.seeLessClicked();
    expect(component.seeMore).toBe(1);
  });

  it('should select team', () => {
    component.allTeams = [{'id': '1'}];
    const team = {'id': '1'};
    component.selectTeamWrapper()(team);
    expect(component.selectedTeam.id).toBe('1');
  });

  it('should call deleteTeam wrappers', () => {
    const res = {
      'delete': 'Delete Team',
      'status': 403,
      'error': {'error': {'error': 'Error Testing'}}
    };
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(apiService, 'deleteUrl').and.returnValue(new Observable((observer) => {
      observer.next(res);
      observer.error(res);
      observer.complete();
      return {unsubscribe() {}};
    }));
    spyOn(globalService, 'showConfirm').and.callFake((params) => {
      params.confirmCallback();
    });
    fixture.detectChanges();
    component.deleteTeamWrapper()('1');

    expect(apiService.deleteUrl).toHaveBeenCalled();
    expect(globalService.showConfirm).toHaveBeenCalled();
  });

  it('should call editTeam wrappers', () => {
    const res = {
      'edit': 'Edit Team',
      'status': 403,
      'error': {'error': {'error': 'Error Testing'}}
    };
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(apiService, 'patchUrl').and.returnValue(new Observable((observer) => {
      observer.next(res);
      observer.error(res);
      observer.complete();
      return {unsubscribe() {}};
    }));
    spyOn(globalService, 'showModal').and.callFake((params) => {
      params.confirmCallback();
    });
    fixture.detectChanges();
    component.editTeamWrapper()('1');

    expect(apiService.patchUrl).toHaveBeenCalled();
    expect(globalService.showModal).toHaveBeenCalled();
  });

  it('should call deleteTeam wrappers', () => {
    const res = {
      'delete': 'Delete Team',
      'status': 403,
      'error': {'error': {'error': 'Error Testing'}}
    };
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(apiService, 'deleteUrl').and.returnValue(new Observable((observer) => {
      observer.next(res);
      observer.error(res);
      observer.complete();
      return {unsubscribe() {}};
    }));
    spyOn(globalService, 'showConfirm').and.callFake((params) => {
      params.confirmCallback();
    });
    fixture.detectChanges();
    component.deleteTeamWrapper()('1');

    expect(apiService.deleteUrl).toHaveBeenCalled();
    expect(globalService.showConfirm).toHaveBeenCalled();
  });

  it('should call addMembersToTeam wrappers', () => {
    const res = {
      'edit': 'Add Team Members Team',
      'status': 403,
      'error': {'error': {'error': 'Error Testing'}}
    };
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.next(res);
      observer.error(res);
      observer.complete();
      return {unsubscribe() {}};
    }));
    spyOn(globalService, 'showModal').and.callFake((params) => {
      params.confirmCallback();
    });
    fixture.detectChanges();
    component.isHost = true;
    component.addMembersToTeamWrapper()('1');

    expect(apiService.postUrl).toHaveBeenCalled();
    expect(globalService.showModal).toHaveBeenCalled();
  });

  it('should call participateInChallenge wrappers', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(globalService, 'showTermsAndConditionsModal').and.callFake((params) => {
      params.confirmCallback();
    });
    fixture.detectChanges();
    component.challenge = {'id': '1'};
    component.selectedTeam = {'id': '1'};
    component.participateInChallenge();

    expect(globalService.showTermsAndConditionsModal).toHaveBeenCalled();
  });

  it('should call createTeamSubmit', () => {
    const res = {
      'results': [],
      'status': 403,
      'error': {'error': {'error': 'Error Testing'}}
    };
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(apiService, 'postUrl').and.returnValue(new Observable((observer) => {
      observer.next(res);
      observer.error(res);
      observer.complete();
      return {
        unsubscribe() {
        }
      };
    }));
    fixture.detectChanges();
    component.create_team['team_url'] = 'Testing URL';
    component.createTeamSubmit(true);
    component.selectedTeam = {'id': '1'};
    component.createChallenge();
    expect(apiService.postUrl).toHaveBeenCalled();
  });

});
