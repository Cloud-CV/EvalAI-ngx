import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { Observable } from 'rxjs';

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
  let challengeService: ChallengeService;
  let authService: AuthService;

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
    challengeService = TestBed.get(ChallengeService);
    authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    fixture.ngZone.run(() => {
      router.navigate(['/challenge-create/']).then(() => {
        fixture.detectChanges();
        const event = {'target': {'files': []}};
        component.handleUpload(event);
        event['target']['files'] = [{'name': 'File name testing'}];
        component.handleUpload(event);
        expect(component).toBeTruthy();
      });
    });
  });

  it('should call create challenge', () => {
    const res = {
      'results': [],
      'error': {'error': 'Error Testing'}
    };
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    spyOn(challengeService, 'challengeCreate').and.returnValue(new Observable((observer) => {
      observer.next(res);
      observer.error(res);
      observer.complete();
      return {unsubscribe() {}};
    }));
    fixture.detectChanges();
    component.challengeCreate();
    component.hostTeam = {'id': '1'};
    component.ChallengeCreateForm['input_file'] = 'File Testing';
    component.ChallengeCreateForm['file_path'] = 'Path Testing';
    component.challengeCreate();
    expect(challengeService.challengeCreate).toHaveBeenCalled();
  });
});
