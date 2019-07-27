import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFieldDialogComponent } from './select-field-dialog.component';
import { MAT_DIALOG_DATA, MatChipsModule, MatDialogModule, MatDialogRef } from '@angular/material';

const data = {fields: []};

describe('SelectFieldDialogComponent', () => {
  let component: SelectFieldDialogComponent;
  let fixture: ComponentFixture<SelectFieldDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectFieldDialogComponent ],
      providers: [{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: data}],
      imports: [MatChipsModule, MatDialogModule]
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
