import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeComponent } from './challenge.component';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';
import { ChallengeService } from '../services/challenge.service';
import { HttpClientModule } from '@angular/common/http';

describe('ChallengeComponent', () => {
  let component: ChallengeComponent;
  let fixture: ComponentFixture<ChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeComponent ],
      providers: [ ApiService, GlobalService, ChallengeService ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
