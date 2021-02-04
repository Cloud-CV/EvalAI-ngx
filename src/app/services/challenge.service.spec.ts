import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from './api.service';
import { ChallengeService } from './challenge.service';
import { EndpointsService } from './endpoints.service';
import { HttpClientModule } from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';

describe('ChallengeService', () => {
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
  it('should update Challenge', () => {
    expect(challengeService.changeCurrentChallenge( { name: 'challenge_name'})).toBe();
  });
  it('should update users Challenge host status', () => {
    expect(challengeService.changeChallengeHostStatus( { name: 'challenge_name'})).toBe();
  });
  it('should update Challenge public state', () => {
    expect(challengeService.changeChallengePublish( { name: 'challenge_name'})).toBe();
  });
  it('should update Challenge star', () => {
    expect(challengeService.changeCurrentStars( { name: 'challenge_name'})).toBe();
  });
  it('should change participant teams', () => {
    expect(challengeService.changeCurrentParticipantTeams( { name: 'challenge_name'})).toBe();
  });
  it('should update current phase', () => {
    expect(challengeService.changeCurrentPhases([])).toBe();
  });
  it('should update users participation', () => {
    expect(challengeService.changeParticipationStatus( { name: 'challenge_name'})).toBe();
  });
  it('should update phase splits', () => {
    expect(challengeService.changeCurrentPhaseSplit([])).toBe();
  });
  it('should update current host team', () => {
    expect(challengeService.changeCurrentHostTeam( { name: 'challenge_name'})).toBe();
  });
  it('should fetch challenge details', () => {
    expect(challengeService.fetchChallenge(2)).toBe();
  });
  it('should fetch stars', () => {
    expect(challengeService.fetchStars(2)).toBe();
  });
  it('should update stars in a particular challenge', () => {
    expect(challengeService.starToggle(2)).toBe();
  });
  it('should participate in challenge with team', () => {
    expect(challengeService.participateInChallenge(2, {name: 'team_name'})).toBe();
  });
  it('should participate in challenge with team', () => {
    expect(challengeService.challengeSubmission({name: 'challenge_name'}, {phase: 'phase'}, {formdata: 'data'})).toBe();
  });
  it('should create a new challenge', () => {
    const hostTeam = {name: 'challenge_name'};
    challengeService.challengeCreate(hostTeam, {formdata: 'data'});
  });
});
