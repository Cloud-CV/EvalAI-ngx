import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalService {
  scrolledState = false;
  @Output() change: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
  scrolledStateChange(s) {
    this.scrolledState = s;
    this.change.emit(this.scrolledState);
  }

  /**
   * Form Validation before submitting.
   * @param {components} Expects a QueryList of form components.
   * @param {callback} Form submission callback if fields pass validation.
   */
  formValidate(components, callback) {
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
       callback();
    }
  }
}
