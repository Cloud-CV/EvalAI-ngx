import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ChallengeService } from '../../../services/challenge.service';

/**
 * Component Class
 */
@Component({
  selector: 'app-challengeoverview',
  templateUrl: './challengeoverview.component.html',
  styleUrls: ['./challengeoverview.component.scss']
})
export class ChallengeoverviewComponent implements OnInit {

  /**
   * Challenge object
   */
  challenge: any = null;

  /**
   * Constructor.
   * @param document  Window document Injection.
   * @param challengeService  ChallengeService Injection.
   */
  constructor(private challengeService: ChallengeService, @Inject(DOCUMENT) private document: Document) { }

  /**
   * Component on initialized.
   */
  ngOnInit() {
    this.challengeService.currentChallenge.subscribe(
    challenge => {
      this.challenge = challenge;
    });

    this.challengeService.isChallengeHost.subscribe(status => {
      this.isChallengeHost = status;
    });
  }

  editChallengeOverview() {
    const SELF = this;

    const apiCall = (params) => {
      const BODY = JSON.stringify(params);
      SELF.apiService.patchUrl(
        SELF.endpointsService.editChallengeDetailsURL(SELF.challenge.creator.id, SELF.challenge.id),
        BODY
      ).subscribe(
          data => {
            SELF.challenge.description = data.description;
            SELF.globalService.showToast('success', 'The description is successfully updated!', 5);

          },
          err => {
            SELF.globalService.handleApiError(err, true);
            SELF.globalService.showToast('error', err);
          },
          () => console.log('EDIT-CHALLENGE-DESCRIPTION-FINISHED')
        );
    };

    const PARAMS = {
      title: 'Edit Challenge Description',
      content: '',
      isEditorRequired: true,
      editorContent: this.challenge.description,
      confirm: 'Submit',
      deny: 'Cancel',
      confirmCallback: apiCall
    };
    SELF.globalService.showModal(PARAMS);
  }
}
