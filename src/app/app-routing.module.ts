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

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      'title': 'EvalAI - Welcome'
    }
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
    path: 'challenges',
    component: PubliclistsComponent,
    children: [
      {path: '', redirectTo: 'all', pathMatch: 'full'},
      {path: 'all', component: ChallengelistComponent},
      {path: 'me', component: ChallengelistComponent}
    ]
  },
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
    path: 'contact',
    component: ContactComponent
  },
  { path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  { path: 'get-involved',
    component: GetInvolvedComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
