import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { HeaderStaticComponent } from '../../components/nav/header-static/header-static.component';
import { ToastComponent } from '../../components/utility/toast/toast.component';
import { InputComponent } from '../../components/utility/input/input.component';
import { MockWindowService } from '../../services/mock.window.service';
import { WindowService } from '../../services/window.service';
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';
import { EndpointsService } from '../../services/endpoints.service';
import { ApiService } from '../../services/api.service';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../../components/nav/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule } from 'ng-pick-datetime';

const routes: Routes = [
  {
    path: 'contact',
    component: ContactComponent
  }
];


describe('ContactComponent', () => {
  let router: Router;
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  let authService: AuthService;
  let apiService: ApiService;
  let globalService: GlobalService;

  beforeEach(async(() => {
    // Google Maps API errors out when Karma tries to load it.
    // As a result Components are not created and the tests fail.
    // Mocking the loadJS function in window service to prevent that.
    const MOCK_SERVICE = new MockWindowService(null);
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule.withRoutes(routes), FormsModule, OwlDateTimeModule ],
      declarations: [ ContactComponent, HeaderStaticComponent, InputComponent, ToastComponent, FooterComponent ],
      providers: [
        GlobalService,
        AuthService,
        ApiService,
        {provide: WindowService, useValue: MOCK_SERVICE },
        EndpointsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    authService = TestBed.get(AuthService);
    apiService = TestBed.get(ApiService);
    globalService = TestBed.get(GlobalService);
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.ngZone.run(() => {
      router.navigate(['/contact']).then(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
    });
  });

  it('should check variables', () => {
    expect(component.ALL_FORMS).toEqual({});
    expect(component.contactForm).toEqual('formgroup');
    expect(component.componentlist).toBeUndefined();
  });

  it('should check ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.ALL_FORMS[component.contactForm]).toBe(component.components);
  });

  it('should check formValidate',  inject([GlobalService], (service: GlobalService)  => {
    const formname = ['name', 'email', 'message'];
    spyOn(service, 'formValidate');
    component.formValidate(formname);
    expect(service.formValidate).toHaveBeenCalled();
  }));

  it('should check formSubmit',  inject([GlobalService, ApiService], (service: GlobalService, service2: ApiService)  => {
    component.ALL_FORMS = {
      item: [{
        label: 'name',
        value: 'xyz'
      }]
    };
    component.contactForm = 'item';
    spyOn(service, 'formValueForLabel').and.callThrough();
    spyOn(service2, 'postUrl').and.callThrough();
    component.formSubmit(component);
    expect(service.formValueForLabel).toHaveBeenCalled();
    expect(service2.postUrl).toHaveBeenCalled();
  }));
});
