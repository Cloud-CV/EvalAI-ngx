import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamcardComponent } from './teamcard.component';

describe('TeamcardComponent', () => {
  let component: TeamcardComponent;
  let fixture: ComponentFixture<TeamcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
