import {TestBed, inject, fakeAsync, tick} from '@angular/core/testing';
import { ApiService } from './api.service';
import { ChallengeService } from './challenge.service';
import { EndpointsService } from './endpoints.service';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';
import {WindowService} from './window.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';



describe('ChallengeService', () => {
  let authService: AuthService;
  let apiService: ApiService;
  let challengeService: ChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeService, ApiService, GlobalService, AuthService, EndpointsService],
      imports: [ HttpClientModule ]
    });
  });

  beforeEach(() => {
    authService = TestBed.get(AuthService);
    apiService = TestBed.get(ApiService);
    challengeService = TestBed.get(ChallengeService);
  });

  it('should be created', inject([ChallengeService], (service: ChallengeService) => {
    expect(service).toBeTruthy();
  }));

  it('should call fetchChallenges', () => {
    spyOn(apiService, 'getUrl').and.returnValue(new Observable((observer) => {
      observer.next({'id': 1});
      observer.complete();
      return {unsubscribe() {}};
    }));

    authService.change = new Observable((observer) => {
      observer.next({'isLoggedIn': true});
      observer.complete();
      return {unsubscribe() {}};
    });
    challengeService.fetchChallenge(1);
  });

});
