import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlErrorsComponent } from './html-errors.component';

describe('HtmlErrorsComponent', () => {
  let component: HtmlErrorsComponent;
  let fixture: ComponentFixture<HtmlErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
