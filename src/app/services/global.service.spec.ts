import { TestBed, inject } from '@angular/core/testing';

import { GlobalService } from './global.service';
describe('GlobalService', () => {
  let globalService: GlobalService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalService]
    });
    globalService = TestBed.get(GlobalService);
  });

  it('should be created', inject([GlobalService], (service: GlobalService) => {
    expect(service).toBeTruthy();
  }));
  it('should update scroll Data', () => {
    expect(globalService.scrolledStateChange(true)).toBeUndefined();
  });
  it('should Store Data', () => {
    expect(globalService.storeData(6, 1)).toBe();
  });
  it('should Get Data', () => {
    expect(globalService.getData(6)).toBe(1);
  });
  it('should Delete Data', () => {
    expect(globalService.deleteData(6)).toBe();
  });
  it('should Reset Store', () => {
    expect(globalService.resetStorage()).toBe();
  });
  it('should Get Auth Token', () => {
    expect(globalService.getAuthToken()).toBeFalsy();
  });
  it('should Show Toast', () => {
    expect(globalService.showToast('error', 'Error message!')).toBe();
  });
  it('should Toggle Loading', () => {
    expect(globalService.toggleLoading(true)).toBe();
    expect(globalService.toggleLoading(false)).toBeFalsy();
  });
  it('should Show Confirm', () => {
    expect(globalService.showConfirm('params')).toBe();
  });
  it('should Hide Confirm', () => {
    expect(globalService.hideConfirm()).toBe();
  });
  it('should Show Modal', () => {
    expect(globalService.showModal('params')).toBe();
  });
  it('should Show Phase Modal', () => {
    expect(globalService.showEditPhaseModal('params')).toBe();
  });
  it('should Show Conditional Modal', () => {
    expect(globalService.showTermsAndConditionsModal('params'));
  });
  it('should hide Modal', () => {
    globalService.hideModal();
  });
  it('should hide phase Modal', () => {
    globalService.hideEditPhaseModal();
  });
  it('should hide Conditional Modal', () => {
    globalService.hideTermsAndConditionsModal();
  });
  it('should trigger Logout', () => {
    globalService.triggerLogout();
  });
  it('should Scroll To Top', () => {
    globalService.scrollToTop();
  });
  it('should validate form', () => {
    expect(globalService.formFields([{name: 'xyz', label: 'label', value: 'value'}]))
      .toEqual({ label: 'value' });
  });
  it('should validate form', () => {
    expect(globalService.formValueForLabel([{name: 'xyz', label: 'label', value: 'value'}], 'label'))
      .toEqual('value');
  });
  it('should validate form', () => {
    expect(globalService.formItemForLabel([{name: 'xyz', label: 'label', value: 'val'}], 'label'))
      .toEqual({name: 'xyz', label: 'label', value: 'val'});
  });
  it('should Show Token Validity', () => {
    expect(globalService.checkTokenValidity([{error: '404', name: 'error'}])).toBeFalsy();
  });
  it('should Handle API Error', () => {
    expect(globalService.handleApiError([{error: 404, name: 'error'}])).toBeFalsy();
  });
  it('should Format Date', () => {
    const dateobj = new Date();
    const AM_PM = dateobj.getHours() >= 12 ? 'PM' : 'AM';
    const hours =  dateobj.getHours() % 12 ?  dateobj.getHours() % 12 : 12;
    const minutes = dateobj.getMinutes() < 10 ? '0' + dateobj.getMinutes() : dateobj.getMinutes();
    const STR_TIME = dateobj.toDateString() + ' ' + hours + ':' + minutes + ' ' + AM_PM;
    expect(globalService.formatDate12Hour(dateobj)).toEqual(STR_TIME);
  });
  it('should Show Date Difference', () => {
    const d1 = new Date(2000);
    const d2 = new Date();
    const diff = (d2.getTime() - d1.getTime()) / (24 * 3600 * 1000);
    expect(globalService.getDateDifference(d1, d2)).toBe(diff);
    const dt1 = new Date();
    const dt2 = new Date(2000);
    const diff2 = (dt1.getTime() - dt2.getTime()) / (24 * 3600 * 1000);
    expect(globalService.getDateDifference(d1, d2)).toBe(diff2);
  });

  it('should Show Date Difference String', () => {
    const d1 = new Date(2000);
    const d2 = new Date();
    const DIFF_DAYS = globalService.getDateDifference(d1, d2);
    const DIFF_WEEKS = DIFF_DAYS / 7;
    expect(globalService.getDateDifferenceString(d1, d2)).toBe(Math.floor(DIFF_WEEKS / 52) + ' year(s)');
    const DIFF_DAYS2 = globalService.getDateDifference(new Date(), new Date());
    const DIFF_SECONDS = ((DIFF_DAYS2 * 24) * 60) * 60;
    expect(globalService.getDateDifferenceString(new Date(), new Date())).toBe(Math.floor(DIFF_SECONDS) + ' seconds');
  });
  it('should Show Email Validation', () => {
    const emailId = 'xyz@gmail.com';
    expect(globalService.validateEmail(emailId)).toBe(true);
  });
  it('should Show Text Vlidation', () => {
     expect(globalService.validateText('SometextHere')).toBe(true);
     expect(globalService.validateText('t')).toBe(false);

   });
   it('should Show Integer Validation', () => {
     expect(globalService.validateInteger(19)).toBe(true);

     expect(globalService.validateInteger(-19)).toBe(false);
   });
   it('should Show password Validation', () => {
    expect(globalService.validatePassword('Password String')).toBe(true);
    expect(globalService.validatePassword('Passwrd')).toBe(false);
  });
  it('should Show Loader', () => {
    globalService.startLoader('Loader Message');
  });
  it('should Stop Loader', () => {
    globalService.stopLoader();
  });
});
