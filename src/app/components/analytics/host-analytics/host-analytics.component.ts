import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {GlobalService} from '../../../services/global.service';
import {EndpointsService} from '../../../services/endpoints.service';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {WindowService} from '../../../services/window.service';

@Component({
  selector: 'app-host-analytics',
  templateUrl: './host-analytics.component.html',
  styleUrls: ['./host-analytics.component.scss']
})
export class HostAnalyticsComponent implements OnInit {

  hostTeam = [];
  teamId = null;
  currentTeamName = null;
  challengeListCount = 0;
  challengeList = [];
  challengeAnalysisDetail = {};
  isTeamSelected = false;
  challengeId = null;
  currentChallengeDetails = {};
  currentPhase = [];
  totalSubmission = {};
  totalParticipatedTeams = {};
  lastSubmissionTime = {};
  totalChallengeTeams = [];


  constructor(private apiService: ApiService, private globalService: GlobalService,
              private endpointService: EndpointsService, private authService: AuthService,
              private router: Router, private  windowService: WindowService) {
  }

  ngOnInit() {
    this.getHostTeam();
    this.getChallengeHost();
    this.showChallengeAnalysis();
  }

  errCallBack(err) {
    this.globalService.handleApiError(err);
    if (err.status === 403) {
      this.globalService.showToast('error', 'Permission Denied');
    } else if (err.status === 401) {
      this.globalService.showToast('error', 'Timeout, Please login again to continue!');
      this.globalService.resetStorage();
      this.router.navigate(['/auth/login']);
    }
  }

  getHostTeam() {
    this.apiService.getUrl('hosts/challenge_host_team').subscribe(
      (response) => {
        console.log(response);
        this.hostTeam = response.status === 200 ? [] : response.results;
      },
      (err) => {
        this.globalService.handleApiError(err);
        if (err.status === 403) {
          this.globalService.showToast('error', 'Permission Denied');
        } else if (err.status === 401) {
          this.globalService.showToast('error', 'Timeout, Please login again to continue!');
          this.globalService.resetStorage();
          this.router.navigate(['/auth/login']);
        }
      },
      () => {
        console.log('Fetched Host Team');
      }
    );
  }


  getChallengeHost() {
    this.apiService.getUrl('challenges/challenge?mode=host').subscribe(
      (response) => {
        console.log(response);
        this.challengeList = response.status === 200 ? response.results : [];
      },
      (err) => {
        this.errCallBack(err);
      },
      () => {
        console.log('Fetched Host Challenge Details');
      }
    );
  }


  showChallengeAnalysis() {

    if (this.challengeId != null) {
      this.isTeamSelected = true;
      this.apiService.getUrl('analytics/challenge/' + this.challengeId + '/team/count').subscribe(
        (response) => {
          console.log(response);
          this.totalChallengeTeams = response.participant_team_count;
        },
        (err) => {
          this.errCallBack(err);
        },
        () => {
          console.log('Fetched Team Count For Challenge');
        }
      );


      this.apiService.getUrl('challenges/challenge/' + this.challengeId + '/challenge_phase').subscribe(
        (response) => {
          console.log(response);
          this.currentPhase = response.results;
          const challengePhaseId = [];

          for (let phaseCount = 0; phaseCount < this.currentPhase.length; phaseCount++) {
            challengePhaseId.push(this.currentPhase[phaseCount].id);

            // tslint:disable-next-line:max-line-length
            this.apiService.getUrl('analytics/challenge/' + this.challengeId + '/challenge_phase/' + this.currentPhase[phaseCount].id + '/analytics')
              .subscribe(
                (res) => {
                  console.log(res);
                  for (let i = 0; i < challengePhaseId.length; i++) {
                    if (challengePhaseId[i] === res.challenge_phase) {
                      this.totalSubmission[challengePhaseId[i]] = res.total_submissions;
                      this.totalParticipatedTeams[challengePhaseId[i]] = res.participant_team_count;
                      break;
                    }
                  }
                },
                (err) => {
                  this.errCallBack(err);
                },
                () => {
                  console.log('Fetched Analytics For Challenge Phase');
                }
              );
          }

          for (let phaseCount = 0; phaseCount < this.currentPhase.length; phaseCount++) {
            challengePhaseId.push(this.currentPhase[phaseCount].id);
            // tslint:disable-next-line:max-line-length
            this.apiService.getUrl('analytics/challenge/' + this.challengeId + '/challenge_phase/' + this.currentPhase[phaseCount].id + '/last_submission_datetime_analysis/')
              .subscribe(
                (res) => {
                  console.log(res);
                  if (res.status === 200) {
                    for (let i = 0; i < challengePhaseId.length; i++) {
                      if (challengePhaseId[i] === res.challenge_phase) {
                        this.lastSubmissionTime[challengePhaseId[i]] = res.last_submission_timestamp_in_challenge_phase;
                        break;
                      }
                    }
                  }
                },
                (err) => {
                  this.errCallBack(err);
                },
                () => {
                  console.log('Fetched Last Submissions For Challenge Phase');
                }
              );
          }

        },
        (err) => {
          this.errCallBack(err);
        },
        () => {
          console.log('Fetched Challenge Phase for Challenge Id');
        }
      );

      for (let i = 0; i < this.challengeList.length; i++) {
        if (this.challengeList[i].id === this.challengeId) {
          this.currentChallengeDetails = this.challengeList[i];
        }
      }

    } else {
      this.isTeamSelected = false;
    }
  }


  downloadChallengeParticipantTeams() {
    console.log('clicked Download Challenge Participant');

    this.apiService.getUrl('analytics/challenges/' + this.challengeId + '/download_all_participants/')
      .subscribe(
        (response) => {
          console.log(response);
          this.windowService.downloadFile(response.data, 'participant_teams_' + this.challengeId + '.csv');
        },
        (err) => {
          console.log(err);
          this.globalService.showToast('error', err.error.error);
        },
        () => {
          console.log('Downloaded Challenge Participants');
        }
      );
  }

}
