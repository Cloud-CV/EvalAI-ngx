import { TestBed, inject } from '@angular/core/testing';

import { WindowService } from './window.service';

fdescribe('WindowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowService],
    });
  });

  it('should be created', inject([WindowService], (service: WindowService) => {
    expect(service).toBeTruthy();
    let nw = service.nativeWindow();
  }));

  /**
   * Download File function test.
   */
  it('Download File Test', inject([WindowService], (service: WindowService) => {
    expect(service).toBeTruthy();
    const SELF = this;
    SELF.test = () => {};
    let spy = spyOn(SELF, 'test');
    service.downloadFile('', 'data_test.csv', { type: 'text/csv' }, spy);
    expect(spy).toHaveBeenCalled();
  }));

  /**
   * loadJS function test.
   */
  it('script file should be loaded', inject([WindowService], (service: WindowService) => {
    expect(service).toBeTruthy();
    const SELF = this;
    SELF.appendChild = () => {};
    let spy = spyOn(SELF, 'appendChild');
    service.loadJS('', (env) => {}, SELF, null);
    expect(spy).toHaveBeenCalled();
  }));
});
