import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {GlobalService} from '../services/global.service';

@Directive({
  selector: '[appValidateEmail]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true }]
})
export class EmailValidatorDirective implements Validator {

  constructor(private globalService: GlobalService) {
  }

  validate(control: AbstractControl): ValidationErrors {
    const RE = new RegExp (['^(([^<>()[\\]\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\.,;:\\s@\"]+)*)',
      '|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.',
      '[0-9]{1,3}\])|(([a-zA-Z\\-0-9]+\\.)+',
      '[a-zA-Z]{2,}))$'].join(''));
    const email = control.get('email');
    console.log(email);
    if (email) {
      return this.globalService.validateEmail(email.value) ? null : { 'InvalidEmail': true };
    }
    return null;
  }
}
