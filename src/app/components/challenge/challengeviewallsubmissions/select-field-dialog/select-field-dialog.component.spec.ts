import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFieldDialogComponent } from './select-field-dialog.component';

describe('SelectFieldDialogComponent', () => {
  let component: SelectFieldDialogComponent;
  let fixture: ComponentFixture<SelectFieldDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFieldDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFieldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
