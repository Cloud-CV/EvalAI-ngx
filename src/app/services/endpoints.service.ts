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
  challenge = 'challenge/';
  auth = 'auth/';

  constructor() { }

  /**
   * Get User Details
   */
  userDetailsURL() {
    return `${this.auth}user/`;
  }

  /**
   * Change Password
   */
  changePasswordURL() {
    return `${this.auth}password/change/`;
  }

  /**
   * Verify Email
   */
  verifyEmailURL() {
    return `${this.auth}registration/verify-email/`;
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
    return `${this.challenges}${this.challenge}${time}`;
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

  /**
   * Fetch challenge details for a given id
   * @param id  challenge id
   */
  challengeDetailsURL(id) {
    return `${this.challenges}${this.challenge}${id}/`;
  }

  /**
   * Challenge stars for a given challenge id
   * @param id  challenge id
   */
  challengeStarsURL(id) {
    return `${this.challenges}${id}/`;
  }

  /**
   * Challenge participant teams for a given challenge id
   * @param id  challenge id
   */
  challengeParticipantTeamsURL(id) {
    return `${this.participants}participant_teams/${this.challenges}${id}/user`;
  }

  /**
   * Challenge participate url for a given challenge id
   * @param id  challenge id
   * @param team  team id
   */
  challengeParticipateURL(id, team) {
    return `${this.challenges}${this.challenge}${id}participant_team/${team}`;
  }

  /**
   * Challenge phase for a given challenge id
   * @param id  challenge id
   */
  challengePhaseURL(id) {
    return `${this.challenges}${this.challenge}${id}/challenge_phase`;
  }

  /**
   * Challenge phase split for a given challenge id
   * @param id  challenge id
   */
  challengePhaseSplitURL(id) {
    return `${this.challenges}${id}/challenge_phase_split`;
  }

  /**
   * Challenge Submission
   * @param id  challenge id
   * @param phase  challenge phase
   */
  challengeSubmissionURL(id, phase) {
    return `${this.jobs}${this.challenge}${id}/challenge_phase/${phase}/submission/`;
  }

  /**
   * Challenge Creation
   * @param hostTeam  host team id
   */
  challengeCreateURL(hostTeam) {
    return `${this.challenges}${this.challenge}challenge_host_team/${hostTeam}/zip_upload/`;
  }

}
