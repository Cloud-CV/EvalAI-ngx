import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInvolvedComponent } from './get-involved.component';
import { HeaderStaticComponent } from '../partials/nav/header-static/header-static.component';


describe('GetInvolvedComponent', () => {
  let component: GetInvolvedComponent;
  let fixture: ComponentFixture<GetInvolvedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetInvolvedComponent, HeaderStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
