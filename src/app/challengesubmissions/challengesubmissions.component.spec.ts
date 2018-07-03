import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesubmissionsComponent } from './challengesubmissions.component';

describe('ChallengesubmissionsComponent', () => {
  let component: ChallengesubmissionsComponent;
  let fixture: ComponentFixture<ChallengesubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
