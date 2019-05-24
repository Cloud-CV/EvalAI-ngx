import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { GlobalService } from '../../services/global.service';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { EndpointsService } from '../../services/endpoints.service';
import { HttpClientModule } from '@angular/common/http';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { HeaderStaticComponent } from '../../components/nav/header-static/header-static.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FooterComponent } from '../../components/nav/footer/footer.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {By} from '@angular/platform-browser';


describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponent;
  let fixture: ComponentFixture<PrivacyPolicyComponent>;
  let de: DebugElement;
  let ALL_NAV;
  let ALL_TARGET;

  const fakeActivatedRoute = {
    snapshot: { data: { } }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivacyPolicyComponent, HeaderStaticComponent, FooterComponent ],
      providers: [
        GlobalService,
        AuthService,
        ApiService,
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); }},
        EndpointsService
      ],
      imports: [ HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyPolicyComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
    ALL_NAV = de.queryAll(By.css('.privacy-nav'));
    ALL_TARGET = de.queryAll(By.css('.privacy-section-title'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have equal number of section-title elements as nav elements', () => {

    expect(ALL_NAV.length).toBeGreaterThan(0);
    expect(ALL_TARGET.length).toBeGreaterThan(0);
    expect(ALL_TARGET.length).toBe(ALL_NAV.length);
  });

  it('should have same section title as nav element title', () => {
    ALL_NAV.forEach((ele, index) => {
      console.log(`LOGE: TARGET: ${ALL_TARGET[index].nativeElement.innerText}`);
      console.log(`LOGE: NAV: ${ele.nativeElement.innerText}`);
      expect(ALL_TARGET[index].nativeElement.innerText).toBe(ele.nativeElement.innerText);
    });
  });



  it('should scroll the page', () => {

    const ALL_TARGET = fixture.debugElement.queryAll(By.css('.privacy-section-title'));

    ALL_TARGET[ALL_TARGET.length - 1].nativeElement.scrollIntoView();

    // component.onWindowScroll();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.onWindowScroll).toHaveBeenCalled();
    });

  });


  it('should scroll the page manually', () => {

    const ALL_NAV = fixture.debugElement.queryAll(By.css('.privacy-nav'));

    // spyOn(component, 'scroll');

    ALL_NAV.forEach((ele, index) => {
      ele.nativeElement.click();
      fixture.whenStable().then(() => {
         expect(component.scroll).toHaveBeenCalled();
       });
    });

  });


  it('should click the Scroll top button', () => {

    const btn = fixture.debugElement.query(By.css('.scroll-to-top'));

    btn.nativeElement.click();

    fixture.whenStable().then(() => {
        expect(component.scrollToTop).toHaveBeenCalled();
    });

  });

});
