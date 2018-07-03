import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengephasesComponent } from './challengephases.component';

describe('ChallengephasesComponent', () => {
  let component: ChallengephasesComponent;
  let fixture: ComponentFixture<ChallengephasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengephasesComponent ]
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
