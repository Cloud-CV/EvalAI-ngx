import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from './api.service';
import { ChallengeService } from './challenge.service';

describe('ChallengeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeService, ApiService]
    });
  });

  it('should be created', inject([ChallengeService], (service: ChallengeService) => {
    expect(service).toBeTruthy();
  }));
});
