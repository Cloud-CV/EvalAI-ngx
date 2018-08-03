import { Injectable } from '@angular/core';

@Injectable()
export class EndpointsService {

  /**
   * Categories of API paths
   */
  participants = 'participants/';
  hosts = 'hosts/';
  jobs = 'jobs/';
  challenges = 'challenges/';
  auth = 'auth/';

  constructor() { }

  /**
   * Get User Details
   */
  userDetailsURL() {
    return `${this.auth}user/`;
  }

  /**
   * All Participant teams
   */
  allParticipantTeamsURL() {
    return `${this.participants}participant_team`;
  }

  /**
   * Edit Team Name
   */
  participantTeamURL(teamId) {
    return `${this.participants}participant_team/${teamId}`;
  }

  /**
   * Invite members to participant team
   */
  participantTeamInviteURL(teamId) {
    return `${this.participants}participant_team/${teamId}/invite`;
  }

  /**
   * Fetch all challenges for a time frame
   * @param time  past, present or future
   */
  allChallengesURL(time) {
    return `challenges/challenge/${time}`;
  }


  /**
   * All host teams
   */
  allHostTeamsURL() {
    return `${this.hosts}challenge_host_team`;
  }

  /**
   * Invite members to host team
   */
  hostTeamInviteURL(teamId) {
    return `${this.hosts}challenge_host_teams/${teamId}/invite`;
  }

  /**
   * Submission Details
   */
  submissionUpdateURL(challenge, challenge_phase, submission) {
    return `${this.jobs}challenge/${challenge}/challenge_phase/${challenge_phase}/submission/${submission}`;
  }



}
