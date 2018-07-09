import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectphaseComponent } from './selectphase.component';

describe('SelectphaseComponent', () => {
  let component: SelectphaseComponent;
  let fixture: ComponentFixture<SelectphaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectphaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectphaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
