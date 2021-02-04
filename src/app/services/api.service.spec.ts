import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { GlobalService } from './global.service';

describe('ApiService', () => {
  let apiService: ApiService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      providers: [ ApiService, GlobalService ]
    });
    apiService = TestBed.get(ApiService);
  });

  it('should be created', inject([ ApiService ], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  /**
   * Prepare HTTP Options test
   */
  it('Prepare Headers', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
    expect(service.prepareHttpOptions(true)['Content-Type']).toBeUndefined();
    expect(service.prepareHttpOptions()['Content-Type']).toBeDefined();
  }));

  /**
   *
   * Loading Wrapper
   */
   it('Test Loading Wrapper', inject([ApiService], (service: ApiService) => {
     expect(service).toBeTruthy();
     const SPIES = {
       success: () => {},
       error: () => {},
       final: () => {}
     };
     const SPY1 = spyOn(SPIES, 'success');
     const SPY2 = spyOn(SPIES, 'error');
     const SPY3 = spyOn(SPIES, 'final');

     const HTTP_CALL_MOCK = {
       subscribe: (one, two, three) => {
         SPIES.success();
         SPIES.error();
         SPIES.final();
         one();
         two();
         three();
       }
     };
     const RET = service.loadingWrapper(HTTP_CALL_MOCK);
     const RET2 = service.getUrl('hosts/challenge_host_team');
     const RET3 = service.postUrl('hosts/challenge_host_team', {body: 'body'});
     const RET4 = service.patchUrl('hosts/challenge_host_team', {body: 'body'});
     const RET5 = service.putUrl('hosts/challenge_host_team', {body: 'body'});
     const RET6 = service.patchFileUrl('hosts/challenge_host_team', {formdata: 'data'});
     const RET7 = service.deleteUrl('hosts/challenge_host_team');
     RET.subscribe(null, null, null);
     RET2.subscribe(null, null, null);
     RET3.subscribe(null, null, null);
     RET4.subscribe(null, null, null);
     RET5.subscribe(null, null, null);
     RET6.subscribe(null, null, null);
     RET7.subscribe(null, null, null);
     expect(SPY1).toHaveBeenCalled();
     expect(SPY2).toHaveBeenCalled();
     expect(SPY3).toHaveBeenCalled();
   }));

   it(' should prepare headers', inject([GlobalService], (service: GlobalService) => {
    delete apiService.HEADERS['Authorization'];
    const TEMP = Object.assign({}, apiService.HEADERS);
    expect(apiService.prepareHttpOptions()).toEqual(TEMP);
  }));
});
