import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { HeaderStaticComponent } from '../partials/nav/header-static/header-static.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalService } from '../global.service';
import { AuthService } from '../services/auth.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent, HeaderStaticComponent ],
      providers: [
        GlobalService,
        AuthService,
        RouterOutlet,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }}
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
