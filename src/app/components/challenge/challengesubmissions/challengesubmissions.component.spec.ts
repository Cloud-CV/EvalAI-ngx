import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ChallengeService } from '../../../services/challenge.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { GlobalService } from '../../../services/global.service';
import { ApiService } from '../../../services/api.service';
import { WindowService } from '../../../services/window.service';
import { AuthService } from '../../../services/auth.service';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {Router, Routes} from '@angular/router';

import { ChallengesubmissionsComponent } from './challengesubmissions.component';
import {ChallengeoverviewComponent} from '../challengeoverview/challengeoverview.component';
import {ChallengeevaluationComponent} from '../challengeevaluation/challengeevaluation.component';
import {ChallengephasesComponent} from '../challengephases/challengephases.component';
import {ChallengeparticipateComponent} from '../challengeparticipate/challengeparticipate.component';
import {ChallengesubmitComponent} from '../challengesubmit/challengesubmit.component';
import {NotFoundComponent} from '../../not-found/not-found.component';
import {Observable} from 'rxjs';
import {SelectphaseComponent} from '../../utility/selectphase/selectphase.component';



const routes: Routes = [
  {path: 'challenge/:id/overview', component: ChallengeoverviewComponent},
  {path: 'challenge/:id/evaluation', component: ChallengeevaluationComponent},
  {path: 'challenge/:id/phases', component: ChallengephasesComponent},
  {path: 'challenge/:id/participate', component: ChallengeparticipateComponent},
  {path: 'challenge/:id/submit', component: ChallengesubmitComponent},
  {path: 'challenge/:id/submissions', component: ChallengesubmissionsComponent},
  {path: 'challenge/:id/submissions/:phase', component: ChallengesubmissionsComponent},
  {path: 'challenge/:id/submissions/:phase/:submission', component: ChallengesubmissionsComponent},

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


describe('ChallengesubmissionsComponent', () => {
  let component: ChallengesubmissionsComponent;
  let fixture: ComponentFixture<ChallengesubmissionsComponent>;
  let authService: AuthService;
  let apiService: ApiService;
  let globalService: GlobalService;
  let challengeService: ChallengeService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // tslint:disable-next-line:max-line-length
      declarations: [NotFoundComponent, ChallengesubmissionsComponent, ChallengeevaluationComponent, ChallengeoverviewComponent, ChallengeparticipateComponent, ChallengesubmitComponent, ChallengephasesComponent, SelectphaseComponent ],
      providers: [ ChallengeService, GlobalService, AuthService, ApiService,
                   WindowService, EndpointsService ],
      imports: [ HttpClientModule, RouterTestingModule.withRoutes(routes) ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    apiService = TestBed.get(ApiService);
    authService = TestBed.get(AuthService);
    globalService = TestBed.get(GlobalService);
    challengeService = TestBed.get(ChallengeService);
    fixture = TestBed.createComponent(ChallengesubmissionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    router.navigate(['challenge/0/submissions']);
    tick();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));


  it('should call fetchSubmissions', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'results': [{'id': 0, 'is_public': 0, 'is_highlited': true}]});
      observer.complete();
      return {unsubscribe() {}};
    }));

    challengeService.currentParticipationStatus = new Observable((observer) => {
      observer.next(true);
      observer.complete();
      return {unsubscribe() {}};
    });

    challengeService.currentPhases = new Observable((observer) => {
      observer.next([{'id': 0, 'is_active': true, 'is_submission_public': true}]);
      observer.complete();
      return {unsubscribe() {}};
    });

      router.navigate(['challenge/0/submissions']).then(() => {
      fixture.detectChanges();
      component.fetchSubmissions(0, 0);
      expect(apiService.getUrl).toHaveBeenCalled();
    });
  });


  it('should call fetchSubmissionsCount', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'participant_team_submission_count': 2});
      observer.complete();
      return {unsubscribe() {}};
    }));

    challengeService.currentParticipationStatus = new Observable((observer) => {
      observer.next(true);
      observer.complete();
      return {unsubscribe() {}};
    });

    challengeService.currentPhases = new Observable((observer) => {
      observer.next([{'id': 0, 'is_active': true, 'is_submission_public': true}]);
      observer.complete();
      return {unsubscribe() {}};
    });

    router.navigate(['challenge/0/submissions/0']).then(() => {
      fixture.detectChanges();
      component.fetchSubmissionCounts(0, 0);
      expect(apiService.getUrl).toHaveBeenCalled();
    });
  });


  it('should changeSubmissionVisibility', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'results': [{'id': 1, 'is_public': true, 'is_highlited': true}]});
      observer.complete();
      return {unsubscribe() {}};
    }));

    spyOn(apiService, 'patchUrl').and.returnValue(new Observable((observer) => {
      observer.next({});
      observer.complete();
      return {unsubscribe() {}};
    }));

    challengeService.currentParticipationStatus = new Observable((observer) => {
      observer.next(true);
      observer.complete();
      return {unsubscribe() {}};
    });

    challengeService.currentPhases = new Observable((observer) => {
      observer.next([{'id': 1, 'is_active': true, 'is_submission_public': true}]);
      observer.complete();
      return {unsubscribe() {}};
    });


    router.navigate(['challenge/1/submissions/1']).then(() => {
      fixture.detectChanges();
      component.selectedPhaseId = 1;
      component.challenge = {'id': 1};
      component.selectedPhase = {'id': 1, 'is_active': true, 'is_submission_public': true};
      component.fetchSubmissions(1, 1);
      component.selectPhaseId(1, component);
      component.changeSubmissionVisibility(1 , true);
      expect(apiService.getUrl).toHaveBeenCalled();
      expect(apiService.patchUrl).toHaveBeenCalled();
    });
  });


  it('should call downloadSubmission', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'body': {'id': 1, 'is_public': true, 'is_highlited': true}});
      observer.complete();
      return {unsubscribe() {}};
    }));

    challengeService.currentParticipationStatus = new Observable((observer) => {
      observer.next(true);
      observer.complete();
      return {unsubscribe() {}};
    });

    challengeService.currentPhases = new Observable((observer) => {
      observer.next([{'id': 1, 'is_active': true, 'is_submission_public': true}]);
      observer.complete();
      return {unsubscribe() {}};
    });


    router.navigate(['challenge/1/submissions/1']).then(() => {
      fixture.detectChanges();
      component.selectedPhaseId = 1;
      component.challenge = {'id': 1};
      component.selectedPhase = {'id': 1, 'is_active': true, 'is_submission_public': true};
      component.downloadSubmission();
      expect(apiService.getUrl).toHaveBeenCalled();
    });
  });


  it('should call editSubmssion', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'results': [{'id': 1, 'is_public': true, 'is_highlited': true, 'challenge_phase': 1}]});
      observer.complete();
      return {unsubscribe() {}};
    }));

    spyOn(apiService, 'patchUrl').and.returnValue(new Observable((observer) => {
      observer.next({});
      observer.complete();
      return {unsubscribe() {}};
    }));

    challengeService.currentParticipationStatus = new Observable((observer) => {
      observer.next(true);
      observer.complete();
      return {unsubscribe() {}};
    });

    challengeService.currentPhases = new Observable((observer) => {
      observer.next([{'id': 1, 'is_active': true, 'is_submission_public': true, 'leaderboard_public': true}]);
      observer.complete();
      return {unsubscribe() {}};
    });


    router.navigate(['challenge/1/submissions/1']).then(() => {
      fixture.detectChanges();
      component.selectedPhaseId = 1;
      component.challenge = {'id': 1};
      component.selectedPhase = {'id': 1, 'is_active': true, 'is_submission_public': true};
      component.editSubmission({'id': 1, 'is_public': true, 'is_highlited': true, 'challenge_phase': 1});
      // expect(apiService.getUrl).toHaveBeenCalled();
      // expect(apiService.patchUrl).toHaveBeenCalled();
    });
  });

});
