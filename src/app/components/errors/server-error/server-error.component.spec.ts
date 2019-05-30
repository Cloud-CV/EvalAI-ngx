import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorComponent } from './server-error.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('ServerErrorComponent', () => {
  let component: ServerErrorComponent;
  let fixture: ComponentFixture<ServerErrorComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be EvalAi', () => {
    expect(component).toBeTruthy();
    expect(de.query(By.css('p')).query(By.css('a')).nativeElement.innerText).toBe(' EvalAi');
  });

  it('should be redirected to homePage ', () => {
    expect(component).toBeTruthy();
    expect(de.query(By.css('p')).query(By.css('a')).attributes.valueOf()['href']).toBe('');
  });

});
