import { Injectable } from '@angular/core';

@Injectable()
export class EndpointsService {

  participants = 'participants/';
  jobs = 'jobs/';

  constructor() { }

  /**
   * Edit Team Name
   */
  participantTeamURL(teamId) {
    return `${this.participants}participant_team/${teamId}`;
  }

  /**
   * Invite members to team
   */
  participantTeamInviteURL(teamId) {
    return `${this.participants}participant_team/${teamId}/invite`;
  }

  /**
   * Submission Details
   */
  submissionUpdateURL(challenge, challenge_phase, submission) {
    return `${this.jobs}challenge/${challenge}/challenge_phase/${challenge_phase}/submission/${submission}`;
  }



}
