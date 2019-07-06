import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengesettingsComponent } from './challengesettings.component';

describe('ChallengesettingsComponent', () => {
  let component: ChallengesettingsComponent;
  let fixture: ComponentFixture<ChallengesettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengesettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengesettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
