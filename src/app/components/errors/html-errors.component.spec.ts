import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlErrorsComponent } from './html-errors.component';
import {ServerErrorComponent} from './server-error/server-error.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('HtmlErrorsComponent', () => {
  let component: HtmlErrorsComponent;
  let fixture: ComponentFixture<HtmlErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlErrorsComponent, ServerErrorComponent, NotFoundComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
