import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeviewallsubmissionsComponent } from './challengeviewallsubmissions.component';

describe('ChallengeviewallsubmissionsComponent', () => {
  let component: ChallengeviewallsubmissionsComponent;
  let fixture: ComponentFixture<ChallengeviewallsubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeviewallsubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeviewallsubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
