import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { GlobalService } from './global.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ ApiService, GlobalService ]
    });
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

});
