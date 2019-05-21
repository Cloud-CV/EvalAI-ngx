import { TestBed, inject } from '@angular/core/testing';
import { ApiService } from './api.service';
import { ChallengeService } from './challenge.service';
import { EndpointsService } from './endpoints.service';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChallengeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChallengeService, ApiService, GlobalService, AuthService, EndpointsService],
      imports: [ HttpClientModule, RouterTestingModule ]
    });
  });

  it('should be created', inject([ChallengeService], (service: ChallengeService) => {
    expect(service).toBeTruthy();
  }));
});
