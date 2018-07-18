import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { WindowService } from '../../../services/window.service';
import { GlobalService } from '../../../services/global.service';
import { ChallengeService } from '../../../services/challenge.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challengesubmissions',
  templateUrl: './challengesubmissions.component.html',
  styleUrls: ['./challengesubmissions.component.scss']
})
export class ChallengesubmissionsComponent implements OnInit {
  isLoggedIn = false;
  challenge: any;
  routerPublic: any;
  isParticipated: any;
  submissions = [];
  submissionCount = 0;
  phases = [];
  filteredPhases = [];
  selectedPhase: any = null;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
              private challengeService: ChallengeService, private globalService: GlobalService, private apiService: ApiService,
              private windowService: WindowService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.routerPublic = this.router;
    this.challengeService.currentChallenge.subscribe(challenge => {
      this.challenge = challenge;
    });
    this.challengeService.currentParticipationStatus.subscribe(status => {
      this.isParticipated = status;
      if (!status) {
        this.router.navigate(['../participate'], {relativeTo: this.route});
      }
    });
    this.challengeService.currentPhases.subscribe(
      phases => {
        this.phases = phases;
        this.filteredPhases = this.phases.filter(phase => phase['is_active'] === true);
    });
  }
  phaseSelected() {
    const SELF = this;
    return (phase) => {
      SELF.selectedPhase = phase;
      if (SELF.challenge['id'] && phase['id']) {
        SELF.fetchSubmissions(SELF.challenge['id'], phase['id']);
        SELF.fetchSubmissionCounts(this.challenge['id'], phase['id']);
      }
    };
  }

  fetchSubmissions(challenge, phase) {
    const API_PATH = 'jobs/challenge/' + challenge + '/challenge_phase/' + phase + '/submission/';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        SELF.submissions = data['results'];
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Fetched submissions', challenge, phase);
      }
    );
  }
  downloadSubmission() {
    if (this.challenge['id'] && this.selectedPhase && this.selectedPhase['id']) {
      const API_PATH = 'challenges/' + this.challenge['id'] + '/phase/' + this.selectedPhase['id'] + '/download_all_submissions/csv/';
      const SELF = this;
      this.apiService.getUrl(API_PATH, false).subscribe(
        data => {
          SELF.windowService.downloadFile(data, 'all_submissions.csv');
        },
        err => {
          SELF.globalService.handleApiError(err);
        },
        () => {
          console.log('Download complete.', this.challenge['id'], this.selectedPhase['id']);
        }
      );
    }
  }

  updateSubmissionVisibility(id) {
    for (let i = 0; i < this.submissions.length; i++) {
      if (this.submissions[i]['id'] === id) {
        this.submissions[i]['is_public'] = !this.submissions[i]['is_public'];
        break;
      }
    }
  }

  changeSubmissionVisibility(id, is_public) {
    is_public = !is_public;
    this.updateSubmissionVisibility(id);
    if (this.challenge['id'] && this.selectedPhase && this.selectedPhase['id'] && id) {
      const API_PATH = 'jobs/challenge/' + this.challenge['id'] + '/challenge_phase/' + this.selectedPhase['id'] + '/submission/' + id;
      const SELF = this;
      const BODY = JSON.stringify({is_public: is_public});
      this.apiService.patchUrl(API_PATH, BODY).subscribe(
        data => {},
        err => {
          SELF.globalService.handleApiError(err);
        },
        () => {
          console.log('Updated submission visibility', id);
        }
      );
    }
  }


  fetchSubmissionCounts(challenge, phase) {
    const API_PATH = 'analytics/challenge/' + challenge + '/challenge_phase/' + phase + '/count';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        SELF.submissionCount = data['submission_count'];
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Fetched submission counts', challenge, phase);
      }
    );
  }

}
