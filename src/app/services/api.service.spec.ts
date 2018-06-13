import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ ApiService ]
    });
  });

  it('should be created', inject([ ApiService ], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
