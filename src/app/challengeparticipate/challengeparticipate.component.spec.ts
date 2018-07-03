import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeparticipateComponent } from './challengeparticipate.component';

describe('ChallengeparticipateComponent', () => {
  let component: ChallengeparticipateComponent;
  let fixture: ComponentFixture<ChallengeparticipateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeparticipateComponent ]
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
