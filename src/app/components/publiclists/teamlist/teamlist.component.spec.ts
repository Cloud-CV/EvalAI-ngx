import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamlistComponent } from './teamlist.component';

describe('TeamlistComponent', () => {
  let component: TeamlistComponent;
  let fixture: ComponentFixture<TeamlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
