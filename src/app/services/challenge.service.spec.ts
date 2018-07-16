import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from './api.service';
import { ChallengeService } from './challenge.service';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from './global.service';

describe('ChallengeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeService, ApiService, GlobalService],
      imports: [ HttpClientModule ]
    });
  });

  it('should be created', inject([ChallengeService], (service: ChallengeService) => {
    expect(service).toBeTruthy();
  }));
});
