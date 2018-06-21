import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {GlobalService} from '../../../global.service';
import {AuthService} from '../../../services/auth.service';
<<<<<<< HEAD
import { RouterTestingModule } from '@angular/router/testing';
=======
>>>>>>> c082d9bc74a1806495704c84e2d340442a2f5bd8
import { HeaderStaticComponent } from './header-static.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('HeaderStaticComponent', () => {
  let component: HeaderStaticComponent;
  let fixture: ComponentFixture<HeaderStaticComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderStaticComponent ],
      providers: [ GlobalService,
      {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      {provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
      AuthService],
      imports: [ RouterTestingModule ]
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
