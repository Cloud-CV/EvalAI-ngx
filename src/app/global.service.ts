import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalService {
  scrolledState = false;
  toastErrorCodes = [400, 500];
  authStorageKey = 'authtoken';
  redirectStorageKey = 'redirect';
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() toast: EventEmitter<Object> = new EventEmitter();
  @Output() logout: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  scrolledStateChange(s) {
    this.scrolledState = s;
    this.change.emit(this.scrolledState);
  }
  storeData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getData(key) {
    if (localStorage.getItem(key) === null) {
      return false;
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  }
  deleteData(key) {
    localStorage.removeItem(key);
  }

  resetStorage() {
    localStorage.clear();
  }

  getAuthToken() {
    return this.getData(this.authStorageKey);
  }

  showToast(type, message, duration = 5) {
    const TEMP = {
      type: type,
      message: message,
      duration: duration
    };
    this.toast.emit(TEMP);
  }
  
  /**
   * This triggers the logout function in auth service (to avoid a cyclic dependency).
   */
  triggerLogout() {
    this.logout.emit();
  }

  /**
   * Form Validation before submitting.
   * @param {components} Expects a QueryList of form components.
   * @param {callback} Form submission callback if fields pass validation.
   */
  formValidate(components, callback, self) {
    let requiredFieldMissing = false;
    components.map((item) => {
      if (item.isRequired && !item.isDirty) {
        item.isDirty = true;
      }
      if (!item.isValid) {
        requiredFieldMissing = true;
      }
    });
    if (!requiredFieldMissing) {
       callback(self);
    }
  }


  formValueForLabel(components, label) {
    let value = '';
    let valueFound = false;
    components.map((item) => {
      if (item.label.toLowerCase() === label.toLowerCase()) {
        value = item.value;
        valueFound = true;
      }
    });
    if (!valueFound) {
      console.error('Form value not found for ' + label);
      return null;
    } else {
      return value;
    }
  }

  formItemForLabel(components, label) {
    let value: any;
    let valueFound = false;
    components.map((item) => {
      if (item.label.toLowerCase() === label.toLowerCase()) {
        value = item;
        valueFound = true;
      }
    });
    if (!valueFound) {
      console.error('Form value not found for ' + label);
      return null;
    } else {
      return value;
    }
  }

  checkTokenValidity(err, toast = true) {
    if (err.error !== null && typeof err.error === 'object' && err.error['detail']) {
      if (err.error['detail'] === 'Invalid token') {
        this.triggerLogout();
        this.showToast('error', 'Token Invalid! Please Login again.', 5);
      } else {
        this.showToast('error', err.error['detail'] + ' <401>', 5);
      }
    } else if (toast) {
      this.showToast('error', 'Something went wrong <' + err.status + '> ', 5);
    }
  }

  handleFormError(form, err, toast = true) {
    const ERR = err.error;
    if (this.toastErrorCodes.indexOf(err.status) > -1 && ERR !== null && typeof ERR === 'object') {
      console.error(err);
      for (const KEY in ERR) {
        if (KEY === 'non_field_errors') {
          this.showToast('error', ERR[KEY][0], 5);
        } else {
          const FORM_ITEM = this.formItemForLabel(form, KEY);
          if (FORM_ITEM) {
            FORM_ITEM.isValid = false;
            FORM_ITEM.message = ERR[KEY][0];
          }
        }
      }
    } else {
      this.handleApiError(err, toast);
    }
  }

  handleApiError(err, toast = true) {
    console.error(err);
    if (err.status === 401) {
        this.checkTokenValidity(err, toast);
    } else if (toast) {
        this.showToast('error', 'Something went wrong <' + err.status + '> ', 5);
    }
  }

  formatDate12Hour(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const AM_PM = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const STR_TIME = date.toDateString() + ' ' + hours + ':' + minutes + ' ' + AM_PM;
    return STR_TIME;
  }

  getDateDifference(d1, d2) {
    const T2 = d2.getTime();
    const T1 = d1.getTime();
    if (T2 >= T1) {
      return (T2 - T1) / (24 * 3600 * 1000);
    } else {
      return (T1 - T2) / (24 * 3600 * 1000);
    }
  }

  getDateDifferenceString(d1, d2) {
    const DIFF_DAYS = this.getDateDifference(d1, d2);
    if (DIFF_DAYS < 1) {
      const HOURS = Math.floor(DIFF_DAYS * 24);
      return HOURS + ' hours';
    } else {
      return Math.floor(DIFF_DAYS) + ' days';
    }
  }
}
