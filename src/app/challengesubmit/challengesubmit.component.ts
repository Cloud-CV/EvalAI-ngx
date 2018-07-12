import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';
import { ChallengeService } from '../services/challenge.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-challengesubmit',
  templateUrl: './challengesubmit.component.html',
  styleUrls: ['./challengesubmit.component.scss']
})
export class ChallengesubmitComponent implements OnInit {
  isLoggedIn = false;
  challenge: any;
  routerPublic: any;
  isParticipated: any;
  isActive: any;
  submissionGuidelines = '';
  submitForm = 'formsubmit';
  phases = [];
  selectedPhase = {};
  selectedPhaseSubmissions = {
    remaining_submissions_today_count: 0,
    remaining_submissions: 0
  };
  @ViewChildren('formsubmit')
  components: QueryList<ChallengesubmitComponent>;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
              private challengeService: ChallengeService, private globalService: GlobalService, private apiService: ApiService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      if (this.challenge && this.challenge['id']) {
        this.challengeService.fetchParticipantTeams(this.challenge['id']);
      }
    }
    this.routerPublic = this.router;
    this.challengeService.currentChallenge.subscribe(challenge => {
      this.challenge = challenge;
      this.isActive = this.challenge['is_active'];
      this.submissionGuidelines = this.challenge['submission_guidelines'];
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
    });
  }

  fetchRemainingSubmissions(challenge, phase) {
    const API_PATH = 'jobs/' + challenge + '/phases/' + phase + '/remaining_submissions';
    const SELF = this;
    this.apiService.getUrl(API_PATH).subscribe(
      data => {
        SELF.selectedPhaseSubmissions = data;
      },
      err => {
        SELF.globalService.handleApiError(err);
      },
      () => {
        console.log('Remaining submissions fetched for challenge-phase', challenge, phase);
      }
    );
  }

  phaseSelected() {
    const SELF = this;
    return (phase) => {
      SELF.selectedPhase = phase;
      if (SELF.challenge['id'] && phase['id']) {
        SELF.fetchRemainingSubmissions(SELF.challenge['id'], phase['id']);
      }
    };
  }

  formValidate(formname) {
    this.globalService.formValidate(this.components, this.formSubmit, this);
  }

  formSubmit(self) {
    const FORM_DATA: FormData = new FormData();
    FORM_DATA.append('status', 'submitting');
    FORM_DATA.append('input_file', self.globalService.formItemForLabel(self.components, 'input_file').fileSelected);
    FORM_DATA.append('method_name', self.globalService.formValueForLabel(self.components, 'method_name'));
    FORM_DATA.append('method_description', self.globalService.formValueForLabel(self.components, 'method_description'));
    FORM_DATA.append('project_url', self.globalService.formValueForLabel(self.components, 'project_url'));
    FORM_DATA.append('publication_url', self.globalService.formValueForLabel(self.components, 'publication_url'));
    self.challengeService.challengeSubmission(
      self.challenge['id'],
      self.selectedPhase['id'],
      FORM_DATA
    );
  }
}
