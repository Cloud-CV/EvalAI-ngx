import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditphasemodalComponent } from './editphasemodal.component';

describe('EditphasemodalComponent', () => {
  let component: EditphasemodalComponent;
  let fixture: ComponentFixture<EditphasemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditphasemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditphasemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
