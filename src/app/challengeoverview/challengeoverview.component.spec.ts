import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeoverviewComponent } from './challengeoverview.component';

describe('ChallengeoverviewComponent', () => {
  let component: ChallengeoverviewComponent;
  let fixture: ComponentFixture<ChallengeoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeoverviewComponent ]
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
