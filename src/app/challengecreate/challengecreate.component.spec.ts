import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengecreateComponent } from './challengecreate.component';

describe('ChallengecreateComponent', () => {
  let component: ChallengecreateComponent;
  let fixture: ComponentFixture<ChallengecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
