import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeevaluationComponent } from './challengeevaluation.component';

describe('ChallengeevaluationComponent', () => {
  let component: ChallengeevaluationComponent;
  let fixture: ComponentFixture<ChallengeevaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeevaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
