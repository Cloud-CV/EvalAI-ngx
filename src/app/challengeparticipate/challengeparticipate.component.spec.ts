import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeparticipateComponent } from './challengeparticipate.component';
import { ChallengeService } from '../services/challenge.service';
import { ForceloginComponent } from '../forcelogin/forcelogin.component';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChallengeparticipateComponent', () => {
  let component: ChallengeparticipateComponent;
  let fixture: ComponentFixture<ChallengeparticipateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeparticipateComponent, ForceloginComponent ],
      providers: [ ChallengeService, ApiService, GlobalService, AuthService ],
      imports: [ HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeparticipateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
