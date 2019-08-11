import { Component, OnInit, Input, Inject } from '@angular/core';
import { GlobalService } from '../../../../services/global.service';
import { ChallengeService } from '../../../../services/challenge.service';
import { ApiService } from '../../../../services/api.service';
import { EndpointsService } from '../../../../services/endpoints.service';

/**
 * Component Class
 */
@Component({
  selector: 'app-phasecard',
  templateUrl: './phasecard.component.html',
  styleUrls: ['./phasecard.component.scss']
})
export class PhasecardComponent implements OnInit {

  /**
   * Phase object input
   */
  @Input() phase: object;

  /**
   * Phase Leaderboard Status
   */
  isLeaderboardPublic: boolean;

  /**
   * start date of phase
   */
  startDate: string;

  /**
   * End date of phase
   */
  endDate: string;

  /**
   * Challenge object
   */
  challenge: any;

  /**
   * Is challenge host
   */
  isChallengeHost = false;

  /**
   * To call the API inside modal for editing the challenge phase details
   */
  apiCall: any;

  /**
   * Constructor.
   * @param globalService  GlobalService Injection.
   * @param challengeService
   * @param apiService ApiService Injection
   * @param endpointsService
   */
  constructor(private globalService: GlobalService, private challengeService: ChallengeService,
              private apiService: ApiService, private endpointsService: EndpointsService) { }

  /**
   * Component on initialized.
   */
  ngOnInit() {
    this.updateViewElements();

    this.challengeService.currentChallenge.subscribe(challenge => {
      this.challenge = challenge;
    });

    this.challengeService.isChallengeHost.subscribe(status => {
      this.isChallengeHost = status;
    });
  }

  /**
   * View elements update (Called after onInit)
   */
  updateViewElements() {
    const START_DATE = new Date(Date.parse(this.phase['start_date']));
    const END_DATE = new Date(Date.parse(this.phase['end_date']));
    this.startDate = this.globalService.formatDate12Hour(START_DATE);
    this.endDate = this.globalService.formatDate12Hour(END_DATE);
    this.isLeaderboardPublic = this.phase['leaderboard_public'];
  }

  editChallengePhase() {
    const SELF = this;
    SELF.apiCall = (params) => {
      const FORM_DATA: FormData = new FormData();
      for (const key in params) {
        if (params[key]) {
          FORM_DATA.append(key, params[key]);
        }
      }
      SELF.apiService.patchFileUrl(
        SELF.endpointsService.updateChallengePhaseDetailsURL(SELF.challenge['id'], SELF.phase['id']),
        FORM_DATA
      ).subscribe(
        data => {
          SELF.phase = data;
          SELF.updateViewElements();
          SELF.globalService.showToast('success', 'The challenge phase details are successfully updated!');
        },
        err => {
          SELF.globalService.showToast('error', err);
        },
        () => {}
      );
    };

    const PARAMS = {
      title: 'Edit Challenge Phase Details',
      name: SELF.phase['name'],
      label: 'description',
      description: SELF.phase['description'],
      startDate: SELF.phase['start_date'],
      endDate: SELF.phase['end_date'],
      maxSubmissionsPerDay: SELF.phase['max_submissions_per_day'],
      maxSubmissionsPerMonth: SELF.phase['max_submissions_per_month'],
      maxSubmissions: SELF.phase['max_submissions'],
      confirm: 'Submit',
      deny: 'Cancel',
      confirmCallback: SELF.apiCall
    };
    SELF.globalService.showEditPhaseModal(PARAMS);
  }

  toggleLeaderboard() {
    console.log(this.isLeaderboardPublic);

    this.phase['leaderboard_public'] = !this.phase['leaderboard_public'];
    const PHASE_BODY = JSON.stringify(this.phase);

    const path = this.endpointsService.challengePhaseUpdateURL(this.challenge['id'], this.phase['id']);
    console.log(path);

    this.apiService.putUrl(path, PHASE_BODY)
      .subscribe(
        (res) => {
          this.isLeaderboardPublic = this.phase['leaderboard_public'];
          console.log(res);
        },
        (err) => {
          this.phase['leaderboard_public'] = !this.phase['leaderboard_public'];
          this.isLeaderboardPublic = this.phase['leaderboard_public'];
          console.log(err);
          this.globalService.handleApiError(err);
        },
        () => {
        }
      );
  }
}
