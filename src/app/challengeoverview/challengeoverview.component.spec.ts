import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeoverviewComponent } from './challengeoverview.component';
import { ChallengeService } from '../services/challenge.service';
import { ApiService } from '../services/api.service';
import { GlobalService } from '../global.service';
import { HttpClientModule } from '@angular/common/http';


describe('ChallengeoverviewComponent', () => {
  let component: ChallengeoverviewComponent;
  let fixture: ComponentFixture<ChallengeoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeoverviewComponent ],
      providers: [ ChallengeService, ApiService, GlobalService ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
