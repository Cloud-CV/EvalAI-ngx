import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from './api.service';
import { ChallengeService } from './challenge.service';
import { EndpointsService } from './endpoints.service';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';

fdescribe('ChallengeService', () => {
  let challengeService: ChallengeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeService, ApiService, GlobalService, AuthService, EndpointsService],
      imports: [ RouterTestingModule, HttpClientModule ]
    });
    challengeService = TestBed.get(ChallengeService);
  });

  it('should be created', inject([ChallengeService], (service: ChallengeService) => {
    expect(service).toBeTruthy();
  }));
  it('should update current challenge' , () => {
    challengeService.changeCurrentChallenge({team_name: 'new_team_name'});
  });
  it('should update user host' , () => {
    challengeService.changeChallengeHostStatus(true);
  });
  it('should update challenge publish' , () => {
    challengeService.changeChallengePublish('new_publish_challenge');
  });
  it('should update current stars' , () => {
    challengeService.changeCurrentStars({stars: 5});
  });
  it('should change current participation team' , () => {
    challengeService.changeCurrentParticipantTeams('new_participation_team');
  });
  it('should change current phase' , () => {
    challengeService.changeCurrentPhases('ongoing');
  });
  it('should change current participation status' , () => {
    challengeService.changeParticipationStatus('ongoing');
  });
});
