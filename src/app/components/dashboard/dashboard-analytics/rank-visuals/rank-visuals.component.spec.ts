import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankVisualsComponent } from './rank-visuals.component';

describe('RankVisualsComponent', () => {
  let component: RankVisualsComponent;
  let fixture: ComponentFixture<RankVisualsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankVisualsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankVisualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
