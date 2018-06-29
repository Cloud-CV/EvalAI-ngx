import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengecardComponent } from './challengecard.component';

describe('ChallengecardComponent', () => {
  let component: ChallengecardComponent;
  let fixture: ComponentFixture<ChallengecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
