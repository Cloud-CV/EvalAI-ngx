import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {GlobalService} from '../../../global.service';
import { HeaderStaticComponent } from './header-static.component';

describe('HeaderStaticComponent', () => {
  let component: HeaderStaticComponent;
  let fixture: ComponentFixture<HeaderStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderStaticComponent ],
      providers: [ GlobalService ]
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
