import { Component, OnInit, QueryList, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { WindowService } from '../../../services/window.service';
import { GlobalService } from '../../../services/global.service';
import { ChallengeService } from '../../../services/challenge.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectphaseComponent } from '../../utility/selectphase/selectphase.component';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-challengesubmissions',
  templateUrl: './challengesubmissions.component.html',
  styleUrls: ['./challengesubmissions.component.scss']
})
export class ChallengesubmissionsComponent implements OnInit, AfterViewInit {
  @ViewChildren('phaseselect')
  components: QueryList<SelectphaseComponent>;

  isLoggedIn = false;
  viewInit = false;
  challenge: any;
  routerPublic: any;
  isParticipated: any;
  submissions = [];
  submissionCount = 0;
  phases = [];
  filteredPhases = [];
  selectedPhaseId: any;
  selectedPhase: any = null;
  submissionHighlighted: any = null;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
              private challengeService: ChallengeService, private globalService: GlobalService, private apiService: ApiService,
              private windowService: WindowService, private endpointsService: EndpointsService) { }

  ngAfterViewInit() {
    this.viewInit = true;
  }

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
        this.globalService.storeData(this.globalService.redirectStorageKey, {path: this.routerPublic.url});
        let redirectToPath = '';
        console.log(this.router.url.split('/'));
        if (this.router.url.split('/').length === 4) {
          redirectToPath = '../participate';
        } else if (this.router.url.split('/').length === 5) {
          redirectToPath = '../../participate';
        } else if (this.router.url.split('/').length === 6) {
          redirectToPath = '../../../participate';
        }
        this.router.navigate([redirectToPath], {relativeTo: this.route});
      }
    });
    this.challengeService.currentPhases.subscribe(
      phases => {
        this.phases = phases;
        this.filteredPhases = this.phases.filter(phase => phase['is_active'] === true);
        this.route.params.subscribe(params => {
          if (params['phase']) {
            this.selectedPhaseId = params['phase'];
            this.selectPhaseId(this.selectedPhaseId, this);
          } else {
            if (this.filteredPhases.length > 0) {
              this.router.navigate([this.filteredPhases[0]['id']], {relativeTo: this.route});
            }
          }
        });
    });
  }

  selectPhaseId(id, self) {
    for (let i = 0; i < self.filteredPhases.length; i++) {
      if (parseInt(id, 10) === self.filteredPhases[i]['id']) {
        self.selectedPhase = self.filteredPhases[i];
        const checkViewInit = () => {
          if (self.viewInit) {
            self.components.map((item) => {
              item.selectPhase(self.selectedPhase);
            });
          } else {
            setTimeout(() => {
              checkViewInit();
            }, 200);
          }
        };
        checkViewInit();
        break;
      }
    }
  }

  phaseSelected() {
    const SELF = this;
    return (phase) => {
      if (SELF.router.url.endsWith('submissions')) {
        SELF.router.navigate(['../' + phase['id']], {relativeTo: this.route});
      } else if (SELF.router.url.indexOf(phase['id']) < 0 && SELF.router.url.split('/').length === 5) {
        SELF.router.navigate(['../' + phase['id']], {relativeTo: this.route});
      } else if (SELF.router.url.indexOf(phase['id']) < 0 && SELF.router.url.split('/').length === 6) {
        SELF.router.navigate(['../../' + phase['id']], {relativeTo: this.route});
      } else {
        SELF.selectedPhase = phase;
        SELF.submissionCount = 0;
        if (SELF.challenge['id'] && phase['id']) {
          SELF.fetchSubmissions(SELF.challenge['id'], phase['id']);
          SELF.fetchSubmissionCounts(this.challenge['id'], phase['id']);
        }
      }
    };
  }

  fetchSubmissions(challenge, phase) {
    const API_PATH = 'jobs/challenge/' + challenge + '/challenge_phase/' + phase + '/submission/';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        SELF.submissions = data['results'];
        console.log(SELF.submissions);
        SELF.route.params.subscribe(params => {
          if (params['submission']) {
            SELF.submissionHighlighted = params['submission'];
            SELF.submissions.map((item) => {
              item['is_highlighted'] = false;
              if (SELF.submissionHighlighted && item['submitted_at'] === SELF.submissionHighlighted) {
                item['is_highlighted'] = true;
              }
            });
          } else {
            // Don't highlight anything by default
            SELF.submissionHighlighted = null;
          }
        });
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
        if (data['participant_team_submission_count']) {
          SELF.submissionCount = data['participant_team_submission_count'];
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Fetched submission counts', challenge, phase);
      }
    );
  }

  editSubmission(submission) {
    console.log(submission);
    const SELF = this;
    const apiCall = (params) => {
      const BODY = JSON.stringify(params);
      console.log(params);
      SELF.apiService.patchUrl(SELF.endpointsService.submissionUpdateURL(SELF.challenge.id, submission.challenge_phase, submission.id),
                               BODY).subscribe(
        data => {
          // Success Message in data.message
          SELF.globalService.showToast('success', 'Data updated successfully', 5);
          SELF.fetchSubmissions(SELF.challenge.id, SELF.selectedPhase.id);
        },
        err => {
          SELF.globalService.handleApiError(err, true);
        },
        () => console.log('SUBMISSION-UPDATE-FINISHED')
      );
    };
    const PARAMS = {
      title: 'Update Submission Details',
      content: '',
      confirm: 'Submit',
      deny: 'Cancel',
      form: [
        {
          isRequired: false,
          label: 'method_name',
          placeholder: 'Method Name',
          type: 'text',
          value: submission['method_name']
        },
        {
          isRequired: false,
          label: 'method_description',
          placeholder: 'Method Description',
          type: 'text',
          value: submission['method_description']
        },
        {
          isRequired: false,
          label: 'project_url',
          placeholder: 'Project Url',
          type: 'text',
          value: submission['project_url']
        },
        {
          isRequired: false,
          label: 'publication_url',
          placeholder: 'Publication Url',
          type: 'text',
          value: submission['publication_url']
        }
      ],
      confirmCallback: apiCall
    };
    SELF.globalService.showModal(PARAMS);
  }

}
