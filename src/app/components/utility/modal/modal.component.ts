import { Component, OnInit, Input } from '@angular/core';
import { ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { InputComponent } from '../input/input.component';

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
   * Modal name
   */
  name = '';

  /**
   * If rich text editor required
   */
  isEditorRequired = false;

  /**
   * Modal edit content
   */
  editorContent = '';

  /**
   * If editor error message
   */
  isInputMessage = false;

  /**
   * Editor validation message
   */
  editorValidationMessage = '';

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
  constructor(private globalService: GlobalService) { }

  /**
   * Component on intialized.
   */
  ngOnInit() {
    if (this.params) {
      if (this.params['title']) {
        this.title = this.params['title'];
      }
      if (this.params['label']) {
        this.label = this.params['label'];
      }
      if (this.params['name']) {
        this.name = this.params['name'];
      }
      if (this.params['isEditorRequired']) {
        this.isEditorRequired = this.params['isEditorRequired'];
      }
      if (this.params['editorContent']) {
        this.editorContent = this.params['editorContent'];
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

    if (this.isEditorRequired || this.name === 'updateSubmissionDetails') {
      this.isDisabled = false;
    }

    this.challengeService.currentChallenge.subscribe(challenge => this.challenge = challenge);
  }

  /**
   * Form Validate function.
   */
  formValidate() {
    if (this.formComponents.length > 0) {
      this.globalService.formValidate(this.formComponents, this.confirmed, this);
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

}
