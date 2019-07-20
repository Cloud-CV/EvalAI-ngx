import { Component, OnInit, QueryList, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';
import { WindowService } from '../../../services/window.service';
import { GlobalService } from '../../../services/global.service';
import { ChallengeService } from '../../../services/challenge.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectphaseComponent } from '../../utility/selectphase/selectphase.component';

/**
 * Component Class
 */
@Component({
  selector: 'app-challengesubmissions',
  templateUrl: './challengesubmissions.component.html',
  styleUrls: ['./challengesubmissions.component.scss']
})
export class ChallengesubmissionsComponent implements OnInit, AfterViewInit {

  /**
   * Phase select card components
   */
  @ViewChildren('phaseselect')
  components: QueryList<SelectphaseComponent>;

  /**
   * Is user logged in
   */
  isLoggedIn = false;

  /**
   * Has view been initialized
   */
  viewInit = false;

  /**
   * Challenge object
   */
  challenge: any;

  /**
   * Router's public instance
   */
  routerPublic: any;

  /**
   * User participated
   */
  isParticipated: any;

  /**
   * Is user a challenge host
   */
  isChallengeHost = false;

  /**
   * Submissions list
   */
  submissions = [];

  /**
   * Total submissions
   */
  submissionCount = 0;

  /**
   * Challenge phase list
   */
  phases = [];

  /**
   * Challenge phases filtered
   */
  filteredPhases = [];

  /**
   * Currently selected phase's id
   */
  selectedPhaseId: any;

  /**
   * Currently selected phase
   */
  selectedPhase: any = null;

  /**
   * Is phase selected
   */
  isPhaseSelected = false;

  /**
   * Highlighted submission
   */
  submissionHighlighted: any = null;

  /**
   * Download file types
   */
  fileTypes = [{ 'name': 'csv' }];

  /**
   * Selected file type
   */
  fileSelected = '';

  /**
   * Phase selection type (radio button or select box)
   */
  phaseSelectionType = 'selectBox';

  /**
   * Select box list type
   */
  phaseSelectionListType = 'phase';

  /**
   * @param showPagination Is pagination
   * @param paginationMessage Pagination message
   * @param isPrev Previous page state
   * @param isNext Next page state
   * @param currentPage Current Page number
   */
  paginationDetails: any = {};

  /**
   * To call the API inside modal for editing the submission
   */
  apiCall: any;

  /**
   * Constructor.
   * @param route  ActivatedRoute Injection.
   * @param router  GlobalService Injection.
   * @param authService  AuthService Injection.
   * @param globalService  GlobalService Injection.
   * @param apiService  Router Injection.
   * @param endpointsService  EndpointsService Injection.
   * @param challengeService  ChallengeService Injection.
   */
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
              private challengeService: ChallengeService, private globalService: GlobalService, private apiService: ApiService,
              private windowService: WindowService, private endpointsService: EndpointsService) { }

  /**
   * Component after view initialized.
   */
  ngAfterViewInit() {
    this.viewInit = true;
  }

  /**
   * Component on initialized.
   */
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
        for (let i = 0; i < this.phases.length; i++) {
          if (this.phases[i].is_public === false) {
              this.phases[i].showPrivate = true;
          }
        }
        this.filteredPhases = this.phases;
    });

    this.challengeService.isChallengeHost.subscribe(status => {
      this.isChallengeHost = status;
    });
  }

  /**
   * Called when a phase is selected (from child component)
   */
  phaseSelected() {
    const SELF = this;
    return (phase) => {
      SELF.selectedPhase = phase;
      SELF.isPhaseSelected = true;
      SELF.submissionCount = 0;
      if (SELF.challenge['id'] && phase['id']) {
        SELF.fetchSubmissions(SELF.challenge['id'], phase['id']);
        SELF.fetchSubmissionCounts(this.challenge['id'], phase['id']);
      }
    };
  }

  /**
   * Fetch submissions from API.
   * @param challenge  challenge id
   * @param phase  phase id
   */
  fetchSubmissions(challenge, phase) {
    const API_PATH = this.endpointsService.challengeSubmissionURL(challenge, phase);
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        SELF.submissions = data['results'];
        SELF.paginationDetails.next = data.next;
        SELF.paginationDetails.previous = data.previous;
        SELF.paginationDetails.totalPage = Math.ceil(data.count / 100);

        if (data.count === 0) {
          SELF.paginationDetails.showPagination = false;
          SELF.paginationDetails.paginationMessage = 'No results found';
        } else {
          SELF.paginationDetails.showPagination = true;
          SELF.paginationDetails.paginationMessage = '';
        }

        // condition for pagination
        if (data.next === null) {
          SELF.paginationDetails.isNext = 'disabled';
          SELF.paginationDetails.currentPage = 1;
        } else {
          SELF.paginationDetails.isNext = '';
          SELF.paginationDetails.currentPage = Math.ceil(data.next.split('page=')[1] - 1);
        }
        if (data.previous === null) {
          SELF.paginationDetails.isPrev = 'disabled';
        } else {
          SELF.paginationDetails.isPrev = '';
        }
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Fetched submissions', challenge, phase);
      }
    );
  }

  /**
   * Download Submission csv.
   */
  downloadSubmission() {
    if (this.challenge['id'] && this.selectedPhase && this.fileSelected) {
      const API_PATH = this.endpointsService.challengeSubmissionDownloadURL(
        this.challenge['id'], this.selectedPhase['id'], this.fileSelected
      );
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
    } else {
      if (this.selectedPhase === null) {
        this.globalService.showToast('error', 'Please select a challenge phase!');
      } else if (this.fileSelected === '') {
        this.globalService.showToast('error', 'The file type requested is not valid!');
      }
    }
  }

  /**
   * load data with pagination
   */
  loadPaginationData = function(url) {
    if (url !== null) {
      const SELF = this;
      const API_PATH = url.split('localhost:8000/api/')[1];

      SELF.apiService.getUrl(API_PATH, true).subscribe(
        data => {
          SELF.submissions = data['results'];
          SELF.paginationDetails.next = data.next;
          SELF.paginationDetails.previous = data.previous;

          // condition for pagination
          if (data.next === null) {
            SELF.paginationDetails.isNext = 'disabled';
            SELF.paginationDetails.currentPage = Math.ceil(data.count / 100);
          } else {
            SELF.paginationDetails.isNext = '';
            SELF.paginationDetails.currentPage = Math.ceil(data.next.split('page=')[1] - 1);
          }

          if (data.previous === null) {
            SELF.paginationDetails.isPrev = 'disabled';
          } else {
            SELF.paginationDetails.isPrev = '';
          }
        },
        err => {
          SELF.globalService.handleApiError(err);
        },
        () => {
          console.log('Fetched pagination submissions');
        }
      );
    }
  };

  /**
   * Update submission's leaderboard visibility.
   * @param id  Submission id
   */
  updateSubmissionVisibility(id) {
    for (let i = 0; i < this.submissions.length; i++) {
      if (this.submissions[i]['id'] === id) {
        this.submissions[i]['is_public'] = !this.submissions[i]['is_public'];
        break;
      }
    }
  }

  /**
   * Change Submission's leaderboard visibility API.
   * @param id  Submission id
   * @param is_public  visibility boolean flag
   */
  changeSubmissionVisibility(id, is_public) {
    is_public = !is_public;
    this.updateSubmissionVisibility(id);
    if (this.challenge['id'] && this.selectedPhase && this.selectedPhase['id'] && id) {
      const API_PATH = this.endpointsService.challengeSubmissionUpdateURL(this.challenge['id'], this.selectedPhase['id'], id);
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

  /**
   * Update baseline status on my submissions tab
   * @param submissionId Submission Id
   */
  updateBaselineStatus(submissionId) {
    for (let i = 0; i < this.submissions.length; i++) {
      if (this.submissions[i]['id'] === submissionId) {
        this.submissions[i]['is_baseline'] = !this.submissions[i]['is_baseline'];
        break;
      }
    }
  }

  /**
   * Change baseline status API
   * @param submissionId Submission Id
   * @param isBaseline baseline boolean flag
   */
  changeBaselineStatus(submissionId, isBaseline) {
    isBaseline = !isBaseline;
    this.updateBaselineStatus(submissionId);
    if (this.challenge['id'] && this.selectedPhase && this.selectedPhase['id'] && submissionId) {
      const API_PATH = this.endpointsService.challengeSubmissionUpdateURL(
        this.challenge['id'], this.selectedPhase['id'], submissionId
      );
      const SELF = this;
      const BODY = JSON.stringify({
        'is_baseline': isBaseline
      });
      SELF.apiService.patchUrl(API_PATH, BODY).subscribe(
        () => {},
        err => {
          SELF.globalService.handleApiError(err);
        },
        () => {
          console.log('Updated submission visibility', submissionId);
        }
      );
    }
  }

  /**
   * Fetch number of submissions for a challenge phase.
   * @param challenge  challenge id
   * @param phase  phase id
   */
  fetchSubmissionCounts(challenge, phase) {
    const API_PATH = this.endpointsService.challengeSubmissionCountURL(challenge, phase);
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

  /**
   * Display Edit Submission Modal.
   * @param submission  Submission being edited
   */
  editSubmission(submission) {
    const SELF = this;
    SELF.apiCall = (params) => {
      const BODY = JSON.stringify(params);
      SELF.apiService.patchUrl(
        SELF.endpointsService.challengeSubmissionUpdateURL(SELF.challenge.id, submission.challenge_phase, submission.id),
        BODY
        ).subscribe(
        () => {
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
      isButtonDisabled: true,
      confirm: 'Submit',
      deny: 'Cancel',
      form: [
        {
          isRequired: false,
          label: 'method_name',
          placeholder: 'Method Name',
          type: 'text',
          value: submission['method_name'],
          icon: 'fa fa-pencil'
        },
        {
          isRequired: false,
          label: 'method_description',
          placeholder: 'Method Description',
          type: 'textarea',
          value: submission['method_description'],
          icon: 'fa fa-pencil'
        },
        {
          isRequired: false,
          label: 'project_url',
          placeholder: 'Project Url',
          type: 'text',
          value: submission['project_url'],
          icon: 'fa fa-pencil'
        },
        {
          isRequired: false,
          label: 'publication_url',
          placeholder: 'Publication Url',
          type: 'text',
          value: submission['publication_url'],
          icon: 'fa fa-pencil'
        }
      ],
      confirmCallback: SELF.apiCall
    };
    SELF.globalService.showModal(PARAMS);
  }
}
