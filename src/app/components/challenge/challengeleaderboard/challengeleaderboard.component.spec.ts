import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ChallengeleaderboardComponent } from './challengeleaderboard.component';
import { ChallengeService } from '../../../services/challenge.service';
import { SelectphaseComponent } from '../../utility/selectphase/selectphase.component';
import { GlobalService } from '../../../services/global.service';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

import { RouterTestingModule } from '@angular/router/testing';
import { EndpointsService } from '../../../services/endpoints.service';
import {Router, Routes, ActivatedRoute} from '@angular/router';

import {NotFoundComponent} from '../../not-found/not-found.component';
import {Observable} from 'rxjs';



const routes: Routes = [

  {path: 'challenge/:id/leaderboard', component: ChallengeleaderboardComponent},
  {path: 'challenge/:id/leaderboard/:split', component: ChallengeleaderboardComponent},
  {path: 'challenge/:id/leaderboard/:split/:entry', component: ChallengeleaderboardComponent},
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





describe('ChallengeleaderboardComponent', () => {
  let component: ChallengeleaderboardComponent;
  let fixture: ComponentFixture<ChallengeleaderboardComponent>;
  let authService: AuthService;
  let apiService: ApiService;
  let globalService: GlobalService;
  let challengeService: ChallengeService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // tslint:disable-next-line:max-line-length
      declarations: [NotFoundComponent, ChallengeleaderboardComponent, SelectphaseComponent ],
      providers: [ ChallengeService, AuthService, GlobalService, ApiService, EndpointsService ],
      imports: [ HttpClientModule, RouterTestingModule.withRoutes(routes) ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    authService = TestBed.get(AuthService);
    apiService = TestBed.get(ApiService);
    globalService = TestBed.get(GlobalService);
    challengeService = TestBed.get(ChallengeService);
    fixture = TestBed.createComponent(ChallengeleaderboardComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    router.navigate(['/challenge/0/leaderboard']).then(() => {
      fixture.detectChanges();
      console.log(router.url);
      expect(component).toBeTruthy();
    });
  });

  it('should call filterPhases successfully', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    router.navigate(['/challenge/0/leaderboard']).then(() => {
      fixture.detectChanges();
      component.phases = [{'id': 0, 'leaderboard_public': true}];
      component.phaseSplits = [{'id': 0, 'challenge_phase': 0, 'visibility': 3}];
      fixture.detectChanges();
      component.filterPhases();
      component.selectPhaseSplitId(0, component);
    });
  });

  it('should call fetchLeaderboard successfully', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'results': [{}]});
      observer.complete();
      return {unsubscribe() {}};
    }));

    router.navigate(['/challenge/0/leaderboard/0/0']).then(() => {

      fixture.detectChanges();

      // component.phases = [{'id': 0, 'leaderboard_public': true}];
      // component.phaseSplits = [{'id': 0, 'challenge_phase': 0, 'visibility': 3}];
      //
      // fixture.detectChanges();

      component.fetchLeaderboard(0);
      expect(apiService.getUrl).toHaveBeenCalled();
    });

  });

});
