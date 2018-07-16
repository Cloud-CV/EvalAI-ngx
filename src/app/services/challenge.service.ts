import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GlobalService } from './global.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './auth.service';

@Injectable()
export class ChallengeService {
  private defaultChallenge: any = { 'creator': {}};
  private defaultStars: any = { 'count': 0, 'is_starred': false};
  private isLoggedIn = false;
  private challengeSource = new BehaviorSubject(this.defaultChallenge);
  currentChallenge = this.challengeSource.asObservable();
  private starSource = new BehaviorSubject(this.defaultStars);
  currentStars = this.starSource.asObservable();
  private teamsSource = new BehaviorSubject([]);
  currentParticipantTeams = this.teamsSource.asObservable();
  private phasesSource = new BehaviorSubject([]);
  currentPhases = this.phasesSource.asObservable();
  private phaseSplitSource = new BehaviorSubject([]);
  currentPhaseSplit = this.phaseSplitSource.asObservable();
  private challengeParticipationSource = new BehaviorSubject(false);
  currentParticipationStatus = this.challengeParticipationSource.asObservable();
  private hostTeamSource = new BehaviorSubject(null);
  currentHostTeam = this.hostTeamSource.asObservable();

  constructor(private apiService: ApiService, private globalService: GlobalService, private authService: AuthService) { }

  changeCurrentChallenge(challenge: object) {
    this.challengeSource.next(challenge);
  }
  changeCurrentStars(stars: object) {
    this.starSource.next(stars);
  }
  changeCurrentParticipantTeams(teams: any) {
    this.teamsSource.next(teams);
  }
  changeCurrentPhases(phases: any) {
    this.phasesSource.next(phases);
  }
  changeParticipationStatus(participationStatus: any) {
    this.challengeParticipationSource.next(participationStatus);
  }
  changeCurrentPhaseSplit(phaseSplits: any) {
    this.phaseSplitSource.next(phaseSplits);
  }
  changeCurrentHostTeam(hostTeam: any) {
    this.hostTeamSource.next(hostTeam);
  }

  fetchChallenge(id) {
    const API_PATH = 'challenges/challenge/' + id + '/';
    const SELF = this;
    if (SELF.authService.isLoggedIn()) {
      SELF.isLoggedIn = true;
      SELF.fetchStars(id);
      SELF.fetchParticipantTeams(id);
    }
    this.authService.change.subscribe((authState) => {
      if (authState['isLoggedIn']) {
        SELF.isLoggedIn = true;
        SELF.fetchStars(id);
        SELF.fetchParticipantTeams(id);
      } else if (!authState['isLoggedIn']) {
        SELF.isLoggedIn = false;
      }
    });
    SELF.fetchPhases(id);
    SELF.fetchPhaseSplits(id);
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        if (data['id'] === parseInt(id, 10)) {
          SELF.changeCurrentChallenge(data);
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Challenge', id, 'fetched!');
    });
  }

  fetchStars(id, callback = null) {
    const API_PATH = 'challenges/' + id + '/';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        if (callback) {
          callback(data);
        } else {
          SELF.changeCurrentStars(data);
        }
      },
      err => {
        SELF.globalService.handleApiError(err, false);
      },
      () => {
        console.log('Stars', id, 'fetched!');
      }
    );
  }

  fetchParticipantTeams(id) {
    const API_PATH = 'participants/participant_teams/challenges/' + id + '/user';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        let teams = [];
        if (data['challenge_participant_team_list']) {
          teams = data['challenge_participant_team_list'];
          this.changeCurrentParticipantTeams(teams);
          for (let i = 0; i < teams['length']; i++) {
            if (teams[i]['challenge'] !== null && teams[i]['challenge']['id'] === parseInt(id, 10)) {
              SELF.changeParticipationStatus(true);
              break;
            }
          }
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Participant Teams fetched');
    });
  }

  fetchPhases(id) {
    const API_PATH = 'challenges/challenge/' + id + '/challenge_phase';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        let phases = [];
        if (data['results']) {
          phases = data['results'];
          this.changeCurrentPhases(phases);
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Phases fetched');
    });
  }

  fetchPhaseSplits(id) {
    const API_PATH = 'challenges/' + id + '/challenge_phase_split';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        let phaseSplits = [];
        if (data && data.length > 0) {
          phaseSplits = data;
          this.changeCurrentPhaseSplit(phaseSplits);
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Phase Splits fetched');
    });
  }

  participateInChallenge(id, team) {
    const API_PATH = 'challenges/challenge/' + id + '/participant_team/' + team;
    const SELF = this;
    const BODY = JSON.stringify({});
    this.apiService.postUrl(API_PATH, BODY).subscribe(
      data => {
        SELF.fetchParticipantTeams(id);
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Challenge participated');
    });
  }

  challengeSubmission(challenge, phase, formData) {
    const API_PATH = 'jobs/challenge/' + challenge + '/challenge_phase/' + phase + '/submission/';
    const SELF = this;
    this.apiService.postFileUrl(API_PATH, formData).subscribe(
      data => {
        console.log(data);
        SELF.globalService.showToast('success', 'Submission successful!');
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Submission Uploaded');
    });
  }

  challengeCreate(hostTeam, formData) {
    const API_PATH = 'challenges/challenge/challenge_host_team/' + hostTeam + '/zip_upload/';
    const SELF = this;
    this.apiService.postFileUrl(API_PATH, formData).subscribe(
      data => {
        console.log(data);
        SELF.globalService.showToast('success', 'Successfuly sent to EvalAI admin for approval.');
      },
      err => {
        SELF.globalService.showToast('error', err.error);
      },
      () => {
        console.log('Challenge Creation Zip Uploaded');
    });
  }


}
