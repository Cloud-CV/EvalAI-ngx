import {async, ComponentFixture, fakeAsync, getTestBed, TestBed, tick} from '@angular/core/testing';

import { TeamlistComponent } from './teamlist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { GlobalService } from '../../../services/global.service';
import { AuthService } from '../../../services/auth.service';
import { ChallengeService } from '../../../services/challenge.service';
import { EndpointsService } from '../../../services/endpoints.service';
import { HttpClientModule } from '@angular/common/http';
import {Router, Routes} from '@angular/router';

import {PubliclistsComponent} from '../publiclists.component';
import {By} from '@angular/platform-browser';


const routes: Routes = [

  {path: 'teams/participants', component: TeamlistComponent},
  {path: 'teams/hosts', component: TeamlistComponent},
  {
    path: 'teams',
    component: PubliclistsComponent,
    children: [
      {path: '', redirectTo: 'participants', pathMatch: 'full'},
      {path: 'participants', component: TeamlistComponent},
      {path: 'hosts', component: TeamlistComponent}
    ]
  },
  {
    path: 'challenge-create',
    redirectTo: '/teams/hosts',
    pathMatch: 'full'
  }
];

describe('TeamlistComponent', () => {
  let component: TeamlistComponent;
  let fixture: ComponentFixture<TeamlistComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamlistComponent, PubliclistsComponent],
      providers: [ GlobalService, ApiService, AuthService, ChallengeService, EndpointsService ],
      imports: [ RouterTestingModule.withRoutes(routes), HttpClientModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(TeamlistComponent);
    component = fixture.componentInstance;
  });


  it('should create', fakeAsync(() => {

    router.navigate(['/teams/hosts']);
    tick();

    fixture.detectChanges();

    expect(component).toBeTruthy();

  }));



  it('should click see-more button', () => {

    spyOn(fixture.debugElement.injector.get(AuthService), 'isLoggedIn').and.returnValue(true);


    component.allTeams.length = 2;
    component.filteredTeams.length = 1;

    fixture.detectChanges();

    fixture.debugElement.query(By.css('.see-more a')).nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.seeMore).toBeGreaterThanOrEqual(2);
    });

  });


  it('should click create challenge button', () => {
    spyOn(TestBed.get(AuthService), 'isLoggedIn').and.returnValue(true);
    spyOn(TestBed.get(ChallengeService), 'changeCurrentHostTeam').and.returnValue(null);
    spyOn(component, 'selectedTeam').and.returnValue({});
    // spyOn(router, 'url').and.returnValue('/teams/hosts');

    fixture.detectChanges();

    router.navigate(['/teams/hosts']).then(() => {
      fixture.detectChanges();
      const elems = fixture.debugElement.queryAll(By.css('.create-challenge a'));
      elems[0].nativeElement.click();
      console.log(elems[0].nativeElement.innerText);
      console.log(component.routerPublic.url);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        // expect(fixture.debugElement.injector.get(ChallengeService).changeCurrentHostTeam).toHaveBeenCalled();
      });
    });

  });


  it('should click participate challenge button', () => {
    spyOn(fixture.debugElement.injector.get(AuthService), 'isLoggedIn').and.returnValue(true);
    spyOn(fixture.debugElement.injector.get(ChallengeService), 'participateInChallenge');
    spyOn(component, 'selectedTeam').and.returnValue({});

    fixture.detectChanges();

    const ele = fixture.debugElement.query(By.css('.create-challenge a'));
    ele.nativeElement.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.injector.get(ChallengeService).participateInChallenge).toHaveBeenCalled();
    });

  });


  it('should click create team button', () => {
    spyOn(fixture.debugElement.injector.get(AuthService), 'isLoggedIn').and.returnValue(true);
    spyOn(fixture.debugElement.injector.get(GlobalService), 'formValidate');

    fixture.detectChanges();

    const ele = fixture.debugElement.query(By.css('.team-create-form span'));


    ele.nativeElement.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.debugElement.injector.get(GlobalService).formValidate).toHaveBeenCalled();
    });

  });

  it('should append properties in teams object ', () => {
    const teams = [{}];
    expect(component.appendIsSelected(teams)[0]['isSelected']).toBe(false);
    expect(component.appendIsSelected(teams)[0]['isHost']).toBe(true);
  });

});
