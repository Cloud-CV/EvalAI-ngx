import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type: string;
  @Input() isRequired: boolean;
  @Input() theme: string;
  @Input() icon: string;
  isEmail = false;
  isDirty = false;
  isValid = false;
  isEmpty = true;
  isIconPresent = false;
  message = 'Required field';
  requiredMessage = 'Required field';
  constructor() {  }

  ngOnInit() {
    if (!this.type || this.type === 'email') {
      if (this.type === 'email') {
        this.isEmail = true;
      }
      this.type = 'text';
    }
    if (this.isRequired === undefined) {
      this.isRequired = false;
    }
    if (this.theme === undefined) {
      this.theme = 'light';
    }
    if (this.icon !== undefined) {
      this.isIconPresent = true;
    }
  }

  validateInput(e) {
    this.isDirty = true;
    e === '' ? this.isEmpty = true : this.isEmpty = false;
    if (this.isEmail) {
      if (e === '') {
        this.isValid = false;
        this.isRequired ? this.message = this.requiredMessage : this.message = '!';
      } else {
        this.isValid = this.validateEmail(e);
        this.isValid ? this.message = '!' : this.message = 'Enter a valid email';
      }
    } else if (this.type === 'text') {
      if (e === '') {
        this.isValid = false;
        this.isRequired ? this.message = this.requiredMessage : this.message = '!';
      } else {
        this.isValid = this.validateText(e);
        this.isValid ? this.message = '!' : this.message = 'Enter a valid text';
      }
    } else if (this.type === 'password') {
      if (e === '') {
        this.isValid = false;
        this.isRequired ? this.message = this.requiredMessage : this.message = '!';
      } else {
        this.isValid = this.validatePassword(e);
        this.isValid ? this.message = '!' : this.message = 'Password minimum 8 characters';
      }
    }
  }

  validateEmail(email) {
    const RE = new RegExp (['^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
                        '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
                        '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
                        '[a-zA-Z]{2,}))$'].join(''));
    return RE.test(email);
  }
  validateText(text) {
    if (text.length >= 3) {
      return true;
    }
    return false;
  }
  validatePassword(password) {
    if (password.length >= 8) {
      return true;
    }
    return false;
  }
}
