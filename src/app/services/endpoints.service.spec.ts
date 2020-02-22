import { TestBed, inject } from '@angular/core/testing';

import { EndpointsService } from './endpoints.service';

describe('EndpointsService', () => {
  let endpointsService: EndpointsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndpointsService]
    });
    endpointsService = TestBed.get(EndpointsService);
  });

  it('should be created', inject([EndpointsService], (service: EndpointsService) => {
    expect(service).toBeTruthy();
  }));
  it('should return login url' , () => {
    expect(endpointsService.loginURL()).toBe('auth/login/');
  });
  it('should return signup url' , () => {
    expect(endpointsService.signupURL()).toBe('auth/registration/');
  });
  it('should return reset password url' , () => {
    expect(endpointsService.resetPasswordURL()).toBe('auth/password/reset/');
  });
  it('should return confirm reset password url' , () => {
    expect(endpointsService.resetPasswordConfirmURL()).toBe('auth/password/reset/confirm');
  });
  it('should return contact from url' , () => {
    expect(endpointsService.contactURL()).toBe('web/contact/');
  });
  it('should return user details url' , () => {
    expect(endpointsService.userDetailsURL()).toBe('auth/user/');
  });
  it('should return change password url' , () => {
    expect(endpointsService.changePasswordURL()).toBe('auth/password/change/');
  });
  it('should return verify Email url' , () => {
    expect(endpointsService.verifyEmailURL()).toBe('auth/registration/verify-email/');
  });
  it('should return featured challenges url' , () => {
    expect(endpointsService.featuredChallengesURL()).toBe('challenges/featured/');
  });
  it('should return subscribe url' , () => {
    expect(endpointsService.subscribeURL()).toBe('web/subscribe/');
  });
  it('should return participant team url' , () => {
    expect(endpointsService.participantTeamURL(2)).toBe('participants/participant_team/2');
  });
  it('should return team url' , () => {
    expect(endpointsService.ourTeamURL()).toBe('web/team/');
  });
  it('should return invite participant member url' , () => {
    expect(endpointsService.participantTeamInviteURL(2)).toBe('participants/participant_team/2/invite');
  });
  it('should return all challenges url' , () => {
    expect(endpointsService.allChallengesURL('past')).toBe('challenges/challenge/past');
    expect(endpointsService.allChallengesURL('future')).toBe('challenges/challenge/future');
    expect(endpointsService.allChallengesURL('present')).toBe('challenges/challenge/present');
  });
  it('should return all host teams url' , () => {
    expect(endpointsService.allHostTeamsURL()).toBe('hosts/challenge_host_team');
  });
  it('should return invite member to host team url' , () => {
    expect(endpointsService.hostTeamInviteURL(2)).toBe('hosts/challenge_host_teams/2/invite');
  });
  it('should return challenge detail url' , () => {
    expect(endpointsService.challengeDetailsURL(2)).toBe('challenges/challenge/2/');
  });
  it('should return challenge star url' , () => {
    expect(endpointsService.challengeStarsURL(2)).toBe('challenges/2/');
  });
  it('should return challenge participant teams url' , () => {
    expect(endpointsService.challengeParticipantTeamsURL(2)).toBe('participants/participant_teams/challenges/2/user');
  });
  it('should return participate url' , () => {
    expect(endpointsService.challengeParticipateURL(2, 3)).toBe('challenges/challenge/2/participant_team/3');
  });
  it('should return challenge phase url' , () => {
    expect(endpointsService.challengePhaseURL(2)).toBe('challenges/challenge/2/challenge_phase');
  });
  it('should return update challenge detail url' , () => {
    expect(endpointsService.updateChallengePhaseDetailsURL(2, 3)).toBe('challenges/challenge/2/challenge_phase/3');
  });
  it('should return challenge phase split url' , () => {
    expect(endpointsService.challengePhaseSplitURL(2)).toBe('challenges/2/challenge_phase_split');
  });
  it('should return challenge create url' , () => {
    expect(endpointsService.challengeCreateURL(2)).toBe('challenges/challenge/challenge_host_team/2/zip_upload/');
  });
  it('should return challenge leaderboard url' , () => {
    expect(endpointsService.challengeLeaderboardURL(3)).toBe('jobs/challenge_phase_split/3/leaderboard/?page_size=1000');
  });
  it('should return challenge phase split url' , () => {
    expect(endpointsService.particularChallengePhaseSplitUrl(3)).toBe('challenges/challenge/create/challenge_phase_split/3/');
  });
  it('should return challenge submission url' , () => {
    expect(endpointsService.challengeSubmissionURL(2, 3)).toBe('jobs/challenge/2/challenge_phase/3/submission/');
  });
  it('should return challenge submission with filter url' , () => {
    expect(endpointsService.challengeSubmissionWithFilterQueryURL(2, 3, 'team_name'))
  .toBe('jobs/challenge/2/challenge_phase/3/submission?participant_team__team_name=team_name');
  });
  it('should return all challenge submission url' , () => {
    expect(endpointsService.allChallengeSubmissionURL(2, 3)).toBe('challenges/2/challenge_phase/3/submissions');
  });
  it('should return challenge submission download url' , () => {
    expect(endpointsService.challengeSubmissionDownloadURL(2, 3, 'id'))
    .toBe('challenges/2/phase/3/download_all_submissions/id/');
  });
  it('should return challenge submission count url' , () => {
    expect(endpointsService.challengeSubmissionCountURL(2, 3))
    .toBe('analytics/challenge/2/challenge_phase/3/count');
  });
  it('should return challenge submission update url' , () => {
    expect(endpointsService.challengeSubmissionUpdateURL(2, 3, 4))
    .toBe('jobs/challenge/2/challenge_phase/3/submission/4');
  });
  it('should return challenge submission remaining url' , () => {
    expect(endpointsService.challengeSubmissionsRemainingURL(2))
    .toBe('jobs/2/remaining_submissions');
  });
  it('should return challenge edit details url' , () => {
    expect(endpointsService.editChallengeDetailsURL('host_team', 2))
    .toBe('challenges/challenge_host_team/host_team/challenge/2');
  });
  it('should return challenge delete url' , () => {
    expect(endpointsService.deleteChallengeURL(2))
    .toBe('challenges/challenge/2/disable');
  });

  it('should return challenge re-run submission url' , () => {
    expect(endpointsService.reRunSubmissionURL(2))
    .toBe('jobs/submissions/2/re-run/');
  });
  it('should return team count analytics url' , () => {
    expect(endpointsService.teamCountAnalyticsURL(2))
    .toBe('analytics/challenge/2/team/count');
  });
  it('should return challenge phase analytics url' , () => {
    expect(endpointsService.challengePhaseAnalyticsURL(2, 3))
    .toBe('analytics/challenge/2/challenge_phase/3/analytics');
  });
  it('should return last submission analytics url' , () => {
    expect(endpointsService.lastSubmissionAnalyticsURL(2, 3))
    .toBe('analytics/challenge/2/challenge_phase/3/last_submission_datetime_analysis/');
  });
  it('should return participants analytics url' , () => {
    expect(endpointsService.downloadParticipantsAnalyticsURL(2))
    .toBe('analytics/challenges/2/download_all_participants/');
  });


});
