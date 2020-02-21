import { TestBed, inject } from '@angular/core/testing';

import { GlobalService } from './global.service';
import { FormControl, FormGroup, FormBuilder, EmailValidator } from '@angular/forms';

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
  it('should Store Data', () => {
    globalService.storeData(6, 1);
  });
  it('should Get Data', () => {
    globalService.getData(6);
  });
  it('should Delete Data', () => {
    globalService.deleteData(6);
  });
  it('should Reset Store', () => {
    globalService.resetStorage();
  });
  it('should Get Auth Token', () => {
    globalService.getAuthToken();
  });
  it('should Show Toast', () => {
    globalService.showToast('error', 'Error message!');
  });
  it('should Toggle Loading', () => {
    globalService.toggleLoading(true);
  });
  it('should Show Confirm', () => {
    globalService.showConfirm('params');
  });
  it('should Hide Confirm', () => {
    globalService.hideConfirm();
  });
  it('should Show Modal', () => {
    globalService.showModal('params');
  });
  it('should Show Phase Modal', () => {
    globalService.showEditPhaseModal('params');
  });
  it('should Show Conditional Modal', () => {
    globalService.showTermsAndConditionsModal('params');
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
  it('should Show Token Validity', () => {
    globalService.checkTokenValidity(Error);
  });
  it('should Handle API Error', () => {
    globalService.handleApiError(Error);
  });
  it('should Format Date', () => {
    const dateobj = new Date();
    globalService.formatDate12Hour(dateobj);
  });
  it('should Show Date Difference', () => {
    const d1 = new Date(2000);
    const d2 = new Date();
    globalService.getDateDifference(d1, d2);
  });
  it('should Show Email Validation', () => {
    const emailId = 'xyz@gmail.com';
    globalService.validateEmail(emailId);
  });
  it('should Show Text Vlidation', () => {
     globalService.validateEmail('Some text Here');
   });
   it('should Show Integer Validation', () => {
     globalService.validateInteger(19);
   });
   it('should Show password Validation', () => {
    globalService.validatePassword('Password String');
  });
  it('should Show Loader', () => {
    globalService.startLoader('Loader Message');
  });
  it('should Stop Loader', () => {
    globalService.stopLoader();
  });
});
