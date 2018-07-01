import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { GlobalService } from '../global.service';
import { ApiService } from './api.service';


describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, GlobalService, ApiService];
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
