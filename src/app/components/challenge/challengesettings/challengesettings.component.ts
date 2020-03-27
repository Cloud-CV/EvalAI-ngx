import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChallengeService } from '../../../services/challenge.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

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
  bannedEmailIds: string[];

  /**
   * Participants invited emails ids
   */
  invitedEmailIds: string[];

  /**
 * Former participants invited emails ids
 */
  formerInvitedEmailIds: string[];

  /**
   * Former participants banned emails ids
   */
  formerBannedEmailIds: string[];

  /**
   * Email validation for the banned email ids
   */
  isValidationError = false;

  /**
   * Email error message
   */
  message: string;

  /**
   * Separator key codes
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /**
   * Banned email ids chips property
   */
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  /**
   * Input to edit the banned participants emails
   */
  isBannedEmailInputVisible: boolean;

  /**
  * Input to edit the invited participants emails
  */
  isInvitedEmailInputVisible: boolean;

  constructor(private challengeService: ChallengeService, private globalService: GlobalService,
    private apiService: ApiService, private endpointsService: EndpointsService) { }

  ngOnInit() {
    this.challengeService.currentChallenge.subscribe(
      challenge => {
        this.challenge = challenge;
        this.updateView();
        this.updateInviteList();
      });
      console.log(this.formerBannedEmailIds, this.formerInvitedEmailIds);
  }

  updateView() {
    this.bannedEmailIds = this.challenge.banned_email_ids || [];
    this.formerBannedEmailIds = this.bannedEmailIds.concat(); // Creating deep copy
  }

  updateInviteList() {
    this.invitedEmailIds = this.challenge.emails || [];
    this.formerInvitedEmailIds = this.invitedEmailIds.concat(); // Creating deep copy
  }
  /**
   * Add banned email chip
   * @param event current event
   */
  add(event: MatChipInputEvent): void {
    const SELF = this;
    const input = event.input;
    const value = event.value;
    SELF.isValidationError = false;
    SELF.message = '';

    // Add our fruit
    if ((value || '').trim()) {
      if (!SELF.validateEmail(value.trim())) {
        SELF.isValidationError = true;
        SELF.message = 'Please enter a valid email!';
      } else {
        SELF.bannedEmailIds.push(value.trim());
      }
    }

    // Reset the input value
    if (input && !SELF.isValidationError) {
      input.value = '';
    }
  }

  /**
   * Remove banned email chip
   * @param email Banned email id
   */
  remove(email): void {
    const SELF = this;
    const index = this.bannedEmailIds.indexOf(email);

    if (index >= 0) {
      this.bannedEmailIds.splice(index, 1);
    }
  }

  validateEmail(email) {
    if (email === '') {
      return true;
    }
    const regex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(email).search(regex) !== -1;
  }

  reflectChange() {
    if (this.bannedEmailIds.toString() === this.formerBannedEmailIds.toString()) {
      this.globalService.showToast('error', 'No change to reflect!');
    } else if (this.isValidationError) {
      this.globalService.showToast('error', 'Please enter a valid email!');
    } else {
      this.updateBannedEmailList();
    }
  }

  updateBannedEmailList() {
    const SELF = this;
    const BODY = JSON.stringify({
      banned_email_ids: SELF.bannedEmailIds
    });
    SELF.apiService.patchUrl(
      SELF.endpointsService.editChallengeDetailsURL(SELF.challenge.creator.id, SELF.challenge.id),
      BODY
    ).subscribe(
      data => {
        SELF.challenge.banned_email_ids = data.banned_email_ids;
        SELF.isBannedEmailInputVisible = false;
        SELF.globalService.showToast('success', 'Banned participant emails are successfully updated!', 5);
        this.formerBannedEmailIds = this.bannedEmailIds.concat(); // Creating deep copy
      },
      err => {
        SELF.globalService.handleApiError(err, true);
        SELF.globalService.showToast('error', err);
      },
      () => { }
    );
  }

  /**
   * Add invite email chip
   * @param event current event
   */
  invite(event: MatChipInputEvent): void {
    const SELF = this;
    const input = event.input;
    const value = event.value;
    SELF.isValidationError = false;
    SELF.message = '';

    if ((value || '').trim()) {
      if (!SELF.validateEmail(value.trim())) {
        SELF.isValidationError = true;
        SELF.message = 'Please enter a valid email!';
      } else {
        SELF.invitedEmailIds.push(value.trim());
      }
    }

    // Reset the input value
    if (input && !SELF.isValidationError) {
      input.value = '';
    }
  }

  removefromInvite(email): void {
    const SELF = this;
    const index = this.invitedEmailIds.indexOf(email);

    if (index >= 0) {
      this.invitedEmailIds.splice(index, 1);
    }
  }

  reflectInviteParticipantChange() {
    if (this.invitedEmailIds.toString() === this.formerInvitedEmailIds.toString()) {
      this.globalService.showToast('error', 'No change to reflect!');
    } else if (this.isValidationError) {
      this.globalService.showToast('error', 'Please enter a valid email!');
    } else {
      this.globalService.startLoader('Inviting to the Challenge!');
      this.updateInvitedEmailList();
    }
  }

  updateInvitedEmailList() {
    const SELF = this;
    const BODY = JSON.stringify({
      emails : SELF.invitedEmailIds
    });
    SELF.apiService.postUrl(
      SELF.endpointsService.inviteParticipanttoChallenegURL(SELF.challenge.id),
      BODY
    ).subscribe(
      data => {
        console.log(data);
        SELF.challenge.emails = data.valid_emails;
        SELF.isInvitedEmailInputVisible = false;
        SELF.globalService.showToast('success', 'Invited participant emails are successfully updated!', 5);
        this.formerInvitedEmailIds = this.invitedEmailIds.concat(); // Creating deep copy
      },
      err => {
        SELF.globalService.stopLoader();
        SELF.globalService.handleApiError(err, true);
        SELF.globalService.showToast('error', err);
      },
      () => { }
    );
  }
}
