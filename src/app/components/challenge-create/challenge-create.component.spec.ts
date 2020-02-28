import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ChallengeCreateComponent } from './challenge-create.component';
import { HeaderStaticComponent } from '../../components/nav/header-static/header-static.component';
import { FooterComponent } from '../../components/nav/footer/footer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { EndpointsService } from '../../services/endpoints.service';
import { ApiService } from '../../services/api.service';
import { GlobalService } from '../../services/global.service';
import { ChallengeService } from '../../services/challenge.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import {Router, Routes} from '@angular/router';
import {NotFoundComponent} from '../not-found/not-found.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: 'challenge-create',
    component: ChallengeCreateComponent,
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

describe('ChallengecreateComponent', () => {
  let component: ChallengeCreateComponent;
  let fixture: ComponentFixture<ChallengeCreateComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengeCreateComponent, HeaderStaticComponent, FooterComponent, NotFoundComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientModule, FormsModule],
      providers: [ GlobalService, AuthService, ApiService, ChallengeService, EndpointsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(ChallengeCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.ngZone.run(() => {
      router.navigate(['/challenge-create/']).then(() => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
    });
  });
  it('should test variables', () => {
    expect(component.isFormError).toBe(false);
    expect(component.isSyntaxErrorInYamlFile).toBe(false);
    expect(component.ChallengeCreateForm).toEqual({ input_file: null, file_path: null});
    expect(component.syntaxErrorInYamlFile).toEqual({});
    expect(component.authServicePublic).toBe(null);
    expect(component.isLoggedIn).toBe(false);
    expect(component.routerPublic).toBe(null);
    expect(component.hostTeam).toBe(null);
    expect(component.hostedChallengesRoute).toBe('/challenges/me');
    expect(component.hostTeamsRoute).toBe('/teams/hosts');
  });
  it('should call ngOninit', inject([ AuthService, ChallengeService, GlobalService ],
    (service: AuthService, service2: ChallengeService, service3: GlobalService)  => {
    spyOn(service3, 'showToast').and.callThrough();
    spyOn(service2, 'currentHostTeam').and.callThrough();
    component.ngOnInit();
    expect(component.authServicePublic).toBe(service);
    expect(component.routerPublic).toBe(router);
    expect(service2.currentHostTeam).not.toHaveBeenCalled();
    expect(service3.showToast).not.toHaveBeenCalled();
  }));
  it('should test challengeCreate function', inject([GlobalService, ChallengeService],
    (service: GlobalService, service2: ChallengeService) => {
    component.ChallengeCreateForm = {
      input_file : 'dummy_file',
      file_path : 'dummy_path'
    };
    component.hostTeam = 'dummy_team';
    spyOn(service, 'startLoader').and.callThrough();
    spyOn(service2, 'challengeCreate').and.callThrough();
    spyOn(service, 'stopLoader').and.callThrough();
    component.challengeCreate();
    expect(service.startLoader).toHaveBeenCalled();
    expect(service2.challengeCreate).toHaveBeenCalled();
    expect(service.stopLoader).not.toHaveBeenCalled();
  }));
  it('should test challengeCreate function else part', inject([GlobalService], (service: GlobalService) => {
    spyOn(service, 'showToast').and.callThrough();
    component.challengeCreate();
    expect(component.isFormError).toBe(true);
    expect(service.showToast).toHaveBeenCalled();
  }));
  it('should test handleUpload Function', () => {
    const event = {
      target : {
        files: ['file1', 'file2', 'file3']
      }
    };
    component.handleUpload(event);
    expect(component.isFormError).toBe(false);
    expect(component.ChallengeCreateForm['input_file']).toBe(event.target.files[0]);
    expect(component.ChallengeCreateForm['file_path']).toBe(event.target.files[0]['name']);
  });
  it('should test handleUpload function with error', () => {
    const event = {
      target : {
        files: []
      }
    };
    component.handleUpload(event);
    expect(component.isFormError).toBe(true);
  });
});
