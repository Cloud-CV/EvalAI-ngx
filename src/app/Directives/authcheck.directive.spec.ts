import { TemplateRef, ViewContainerRef, Component, ViewChild } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

// import Directive
import { AuthcheckDirective } from './authcheck.directive';

// import services
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { ApiService } from '../services/api.service';
import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-authcheck',
  template: `<p *appAuthcheck="true">AuthChecking Directive</p>`,
})
class TestAuthDirectiveComponent {
  @ViewChild(AuthcheckDirective) authchcekDirective: AuthcheckDirective;
}
describe('AuthcheckDirective', () => {
  let component: TestAuthDirectiveComponent;
  let fixture: ComponentFixture<TestAuthDirectiveComponent>;
  let authServive: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthcheckDirective,
        TestAuthDirectiveComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        AuthService,
        GlobalService,
        ApiService,
        EndpointsService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestAuthDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authServive = TestBed.get(AuthService);
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
