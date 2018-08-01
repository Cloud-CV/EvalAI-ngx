import { Injectable } from '@angular/core';

@Injectable()
export class EndpointsService {

  participants = 'participants/'
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




}
