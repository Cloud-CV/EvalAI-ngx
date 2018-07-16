import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PubliclistsComponent } from './publiclists/publiclists.component';
import { ChallengelistComponent } from './challengelist/challengelist.component';
import { TeamlistComponent } from './teamlist/teamlist.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { GetInvolvedComponent } from './get-involved/get-involved.component';
import { AboutComponent } from './about/about.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { ChallengeoverviewComponent} from './challengeoverview/challengeoverview.component';
import { ChallengeevaluationComponent } from './challengeevaluation/challengeevaluation.component';
import { ChallengephasesComponent} from './challengephases/challengephases.component';
import { ChallengeparticipateComponent } from './challengeparticipate/challengeparticipate.component';
import { ChallengeleaderboardComponent } from './challengeleaderboard/challengeleaderboard.component';
import { ChallengesubmitComponent } from './challengesubmit/challengesubmit.component';
import { ChallengesubmissionsComponent } from './challengesubmissions/challengesubmissions.component';
import { ChallengecreateComponent } from './challengecreate/challengecreate.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      'title': 'EvalAI - Welcome'
    }
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent}
    ]
  },
  {
    path: 'challenge',
    redirectTo: 'challenges'
  },
  {
    path: 'challenge/:id',
    component: ChallengeComponent,
    children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: ChallengeoverviewComponent},
      {path: 'evaluation', component: ChallengeevaluationComponent},
      {path: 'phases', component: ChallengephasesComponent},
      {path: 'participate', component: ChallengeparticipateComponent},
      {path: 'submit', component: ChallengesubmitComponent},
      {path: 'submissions', component: ChallengesubmissionsComponent},
      {path: 'leaderboard', component: ChallengeleaderboardComponent}
    ]
  },
  {
    path: 'challenges',
    component: PubliclistsComponent,
    children: [
      {path: '', redirectTo: 'all', pathMatch: 'full'},
      {path: 'all', component: ChallengelistComponent},
      {path: 'me', component: ChallengelistComponent}
    ]
  },
  {
    path: 'challenge-create',
    component: ChallengecreateComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'get-involved',
    component: GetInvolvedComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'teams',
    component: PubliclistsComponent,
    children: [
      {path: '', redirectTo: 'participants', pathMatch: 'full'},
      {path: 'participants', component: TeamlistComponent},
      {path: 'hosts', component: TeamlistComponent}
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
