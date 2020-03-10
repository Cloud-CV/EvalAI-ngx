import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { ChallengelistComponent } from './challengelist.component';
import { CardlistComponent } from '../../utility/cardlist/cardlist.component';
import { ChallengecardComponent } from './challengecard/challengecard.component';
import { GlobalService } from '../../../services/global.service';
import { ApiService } from '../../../services/api.service';
import { ChallengeService } from '../../../services/challenge.service';
import { AuthService } from '../../../services/auth.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { HttpClientModule } from '@angular/common/http';
import { ForceloginComponent } from '../../utility/forcelogin/forcelogin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {Router, Routes} from '@angular/router';

import {PubliclistsComponent} from '../publiclists.component';

import {By} from '@angular/platform-browser';
import { Observable } from 'rxjs';

const routes: Routes = [
  {
    path: 'challenge',
    redirectTo: 'challenges/all'
  },
  {path: 'challenges/all', component: ChallengelistComponent},
  {path: 'challenges/me', component: ChallengelistComponent},
  {
    path: '**',
    redirectTo: '/challenges/all',
    pathMatch: 'full'
  }
];


describe('ChallengelistComponent', () => {
  let component: ChallengelistComponent;
  let fixture: ComponentFixture<ChallengelistComponent>;
  let apiService: ApiService;
  let authService: AuthService;
  let globalService: GlobalService;
  let challengeService: ChallengeService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule.withRoutes(routes) ],
      declarations: [ ChallengelistComponent,
        CardlistComponent,
        ChallengecardComponent,
        ForceloginComponent,
        PubliclistsComponent],
      providers: [ GlobalService,
        ApiService,
        AuthService,
        ChallengeService,
        EndpointsService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(ChallengelistComponent);
    authService = TestBed.get(AuthService);
    apiService = TestBed.get(ApiService);
    globalService = TestBed.get(GlobalService);
    challengeService = TestBed.get(ChallengeService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

it('should call fetch challenges', () => {
  const res = {
    'results': [{'id': '1', 'creator': {'id': 1}}],
    'status': 403,
    'error': {'error': {'error': 'Testing Error'}}
  };
  spyOn(authService, 'isLoggedIn').and.returnValue(true);
  spyOn(apiService, 'getUrl').and.returnValue(new Observable((observation) => {
    observation.next(res);
    observation.error(res);
    observation.complete();
    return {unsubscribe() {}};
  }));
  router.navigate(['/challenges/all']).then(() => {
    component.isPastChecked = true;
    fixture.detectChanges();
  });
  component.fetchChallenges('isUpcomingChecked');
  expect(apiService.getUrl).toHaveBeenCalled();
});

it('should call fetch teams', () => {
  const res = {
    'results': [{'id': '1', 'creator': {'id': 1}}],
    'status': 403,
    'error': {'error': {'error': 'Error Testing'}}
  };
  spyOn(authService, 'isLoggedIn').and.returnValue(true);
  spyOn(apiService, 'getUrl').and.returnValue(new Observable((observation) => {
    observation.next(res);
    observation.error(res);
    observation.complete();
    return {unsubscribe() {}};
  }));
  router.navigate(['/challenges/me']).then(() => {
    component.isPastChecked = true;
    fixture.detectChanges();
  });
});

it('should call toggle filters', () => {
  const res = {
    'results': [{'id': '1', 'creator': {'id': 1}}],
    'status': 403,
    'error': {'error': {'error': 'Error Testing'}}
  };
  spyOn(authService, 'isLoggedIn').and.returnValue(true);
  spyOn(apiService, 'getUrl').and.returnValue(new Observable((observation) => {
    observation.next(res);
    observation.error(res);
    observation.complete();
    return {unsubscribe() {}};
  }));
  fixture.detectChanges();
  component.toggleFilter('isPastChecked');
  component.isPastChecked = true;
  component.toggleFilter('isPastChecked');
  component.toggleFilter('isUpcomingChecked');
  component.toggleFilter('isOngoingChecked');
  component.seeMoreClicked();
  expect(apiService.getUrl).toHaveBeenCalled();
});

it('should  check route to all', () => {
  router.navigate(['/challenges/all']).then(() => {
    fixture.detectChanges();
    expect(router.url).toBeDefined('/challenges/all');
  });
});
  it('should check route to me', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    router.navigate(['/challenges/me']).then(() => {
      fixture.detectChanges();
      expect(router.url).toBe('/challenges/me');
    });
  });
  it('should fetch teams', () => {
    spyOn(component, 'fetchTeams').and.returnValue('hosts/challenge_host_team');
    component.fetchMyTeams();
    expect(component.fetchTeams).toHaveBeenCalled();
  });
});
