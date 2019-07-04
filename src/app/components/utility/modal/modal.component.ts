import { Component, OnInit, Input } from '@angular/core';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { InputComponent } from '../input/input.component';
import { ChallengeService } from '../../../services/challenge.service';
import { AuthService } from '../../../services/auth.service';

/**
 * Component Class
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  /**
   * Input parameters object
   */
  @Input() params: any;

  /**
   * Modal title
   */
  title = 'Are you sure ?';

  /**
   * Modal body
   */
  content = '';

  /**
   * Modal accept button
   */
  confirm = 'Yes';

  /**
   * Modal deny button
   */
  deny = 'Cancel';

  /**
   * Modal form items list
   */
  form = [];

  /**
   * challenge object
   */
  challenge: any;

  /**
   * User object
   */
  user: any;

  /**
   * Old password
   */
  oldPassword = '';

  /**
   * New password 1
   */
  newPassword1 = '';

  /**
   * New password 2
   */
  newPassword2 = '';

  /**
   * delete challenge button disable
   */
  isDisabled = true;

  /**
   * Input field message
   */
  inputErrorMessage = '';

  /**
   * Modal form items
   */
  @ViewChildren('formmodal')
  formComponents: QueryList<InputComponent>;

  /**
   * Modal confirmed callback
   */
  confirmCallback = (params) => {};

  /**
   * Modal denied callback
   */
  denyCallback = () => {};

  /**
   * Constructor.
   * @param globalService  GlobalService Injection.
   */
  constructor(private globalService: GlobalService, private challengeService: ChallengeService,
              private authService: AuthService) { }

  /**
   * Component on intialized.
   */
  ngOnInit() {
    if (this.params) {
      if (this.params['title']) {
        this.title = this.params['title'];
      }
      if (this.params['content']) {
        this.content = this.params['content'];
      }
      if (this.params['confirm']) {
        this.confirm = this.params['confirm'];
      }
      if (this.params['deny']) {
        this.deny = this.params['deny'];
      }
      if (this.params['confirmCallback']) {
        this.confirmCallback = this.params['confirmCallback'];
      }
      if (this.params['denyCallback']) {
        this.denyCallback = this.params['denyCallback'];
      }
      if (this.params['form'] && this.params['form'].length > 0) {
        this.form = this.params['form'];
      }
    }

    this.authService.change.subscribe((details) => {
      this.user = details;
    });

    if (this.isEditorRequired || this.name === 'updateSubmissionDetails' || this.title === 'Change Password') {
      this.isDisabled = false;
    }

    this.challengeService.currentChallenge.subscribe(challenge => this.challenge = challenge);
  }

  /**
   * Form Validate function.
   */
  formValidate() {
    if (this.formComponents.length > 0) {
      console.log(this.formComponents);
      if (this.title === 'Update Profile') {
        this.confirmed(this);
      } else {
        this.globalService.formValidate(this.formComponents, this.confirmed, this);
      }
    } else {
      this.confirmed(this);
    }
  }

  /**
   * Modal Confirmed.
   */
  confirmed(self) {
    self.globalService.hideModal();
    const PARAMS = self.globalService.formFields(self.formComponents);
    self.confirmCallback(PARAMS);
  }

  /**
   * Modal Denied.
   */
  denied() {
    this.globalService.hideModal();
    this.denyCallback();
  }

  validateModalInput(e) {
    this.inputErrorMessage = '';
    if (e.target.name === 'challegenDeleteInput') {
      if (e.target.value === this.challenge.title) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    } else if (e.target.name === 'editChallengeTitle') {
      if (e.target.value !== this.challenge.title && e.target.value.length > 1) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    } else if (e.target.name === 'update_first_name') {
      if (e.target.value !== this.user.first_name && e.target.value.length > 1) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    } else if (e.target.name === 'update_last_name') {
      if (e.target.value !== this.user.last_name  && e.target.value.length > 1) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    } else if (e.target.name === 'update_affiliation') {
      if (e.target.value !== this.user.affiliation && e.target.value.length > 1) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    } else if (e.target.name === 'old_password') {
      this.oldPassword = e.target.value;
    } else if (e.target.name === 'new_password1') {
      this.newPassword1 = e.target.value;
      if (e.target.value === this.oldPassword) {
        this.inputErrorMessage = 'Old password cannot be same as New Password';
      }
    } else if (e.target.name === 'new_password2') {
      this.newPassword2 = e.target.value;
      if (e.target.value !== this.newPassword1) {
        this.inputErrorMessage = 'Password do not match';
      }
    }
  }

}
