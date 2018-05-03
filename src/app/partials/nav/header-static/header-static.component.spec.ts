import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {GlobalService} from '../../../global.service';
import {AuthService} from '../../../services/auth.service';

import { HeaderStaticComponent } from './header-static.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('HeaderStaticComponent', () => {
  let component: HeaderStaticComponent;
  let fixture: ComponentFixture<HeaderStaticComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { ... } }
  } as ActivatedRoute;
  const fakeRouter = {
    snapshot: { data: { ... } }
  } as Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderStaticComponent ],
      providers: [ GlobalService, 
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      {provide: Router, useValue: fakeRouter},
      AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
