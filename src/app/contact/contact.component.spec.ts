import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { HeaderStaticComponent } from '../partials/nav/header-static/header-static.component';
import { InputComponent } from '../input/input.component';
import { MockWindowService } from '../services/mock.window.service';
import { WindowService } from '../services/window.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    // Google Maps API errors out when Karma tries to load it.
    // As a result Components are not created and the tests fail.
    // Mocking the loadJS function in window service to prevent that.
    const MOCK_SERVICE = new MockWindowService(null);
    TestBed.configureTestingModule({
      declarations: [ ContactComponent, HeaderStaticComponent, InputComponent ],
      providers: [ {'provide': WindowService, 'useValue': MOCK_SERVICE } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
