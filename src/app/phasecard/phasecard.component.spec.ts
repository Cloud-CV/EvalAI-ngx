import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasecardComponent } from './phasecard.component';

describe('PhasecardComponent', () => {
  let component: PhasecardComponent;
  let fixture: ComponentFixture<PhasecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhasecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhasecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
