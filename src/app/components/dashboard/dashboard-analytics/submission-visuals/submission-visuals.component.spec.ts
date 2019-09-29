import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionVisualsComponent } from './submission-visuals.component';

describe('SubmissionVisualsComponent', () => {
  let component: SubmissionVisualsComponent;
  let fixture: ComponentFixture<SubmissionVisualsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionVisualsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
