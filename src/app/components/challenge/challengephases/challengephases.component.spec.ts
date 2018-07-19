import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengephasesComponent } from './challengephases.component';
import { ChallengeService } from '../../../services/challenge.service';
import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { GlobalService } from '../../../services/global.service';
import { HttpClientModule } from '@angular/common/http';
import { PhasecardComponent } from './phasecard/phasecard.component';

describe('ChallengephasesComponent', () => {
  let component: ChallengephasesComponent;
  let fixture: ComponentFixture<ChallengephasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengephasesComponent, PhasecardComponent ],
      providers: [ ChallengeService, ApiService, GlobalService, AuthService ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengephasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
