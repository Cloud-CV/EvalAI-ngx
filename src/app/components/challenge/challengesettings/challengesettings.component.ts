import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../../services/challenge.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-challengesettings',
  templateUrl: './challengesettings.component.html',
  styleUrls: ['./challengesettings.component.scss']
})
export class ChallengesettingsComponent implements OnInit {

  /**
   * Challenge object
   */
  challenge: any;

  /**
   * Participants banned emails ids
   */
  bannedEmailIds: string;

  /**
   * Input to edit the banned participants emails
   */
  isBannedEmailInputVisible: boolean;

  constructor(private challengeService: ChallengeService, private globalService: GlobalService,
              private apiService: ApiService, private endpointsService: EndpointsService) { }

  ngOnInit() {
    this.challengeService.currentChallenge.subscribe(
      challenge => {
        this.challenge = challenge;
        this.updateView();
    });
  }

  updateView() {
    this.bannedEmailIds = this.challenge.banned_email_ids;
  }

  getBannedEmailsListObject(bannedEmailInputValue) {
    const bannedEmailIds = [];
    // First remove all the whitespaces and then split
    const splittedEmails = bannedEmailInputValue.replace(/\s/g, '').split(',');
    for (let i = 0; i < splittedEmails.length; i++) {
      bannedEmailIds.push(splittedEmails[i]);
    }
    return bannedEmailIds;
  }

  validateInput(bannedEmailInputValue) {
    this.bannedEmailIds = bannedEmailInputValue;
  }

  updateBannedEmailList() {
    const SELF = this;
    const bannedEmailIds = this.getBannedEmailsListObject(this.bannedEmailIds);
    const BODY = JSON.stringify({
      banned_email_ids: bannedEmailIds
    });
    SELF.apiService.patchUrl(
      SELF.endpointsService.editChallengeDetailsURL(SELF.challenge.creator.id, SELF.challenge.id),
      BODY
    ).subscribe(
        data => {
          SELF.challenge.banned_email_ids = data.banned_email_ids;
          SELF.isBannedEmailInputVisible = false;
          SELF.globalService.showToast('success', 'Banned participant emails are successfully updated!', 5);
        },
        err => {
          SELF.globalService.handleApiError(err, true);
          SELF.globalService.showToast('error', err);
        },
        () => console.log('BANNED-EMAIL-IDS-UPDATE-FINISHED')
      );
  }

}
