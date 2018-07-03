import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesubmitComponent } from './challengesubmit.component';

describe('ChallengesubmitComponent', () => {
  let component: ChallengesubmitComponent;
  let fixture: ComponentFixture<ChallengesubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
