import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PubliclistsComponent } from './publiclists.component';
import { ChallengelistComponent } from './challengelist/challengelist.component';
import { TeamlistComponent } from './teamlist/teamlist.component';

const routes: Routes = [
  {
    path: '',
    component: PubliclistsComponent,
    children: [
      {path: '', redirectTo: 'all', pathMatch: 'full'},
      {path: 'all', component: ChallengelistComponent},
      {path: 'me', component: ChallengelistComponent}
    ]
  }
];

const teamListRoutes: Routes = [
  {
    path: '',
    component: PubliclistsComponent,
    children: [
      {path: '', redirectTo: 'participants', pathMatch: 'full'},
      {path: 'participants', component: TeamlistComponent},
      {path: 'hosts', component: TeamlistComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PubliclistsRoutingModule { }


@NgModule({
  imports: [RouterModule.forChild(teamListRoutes)],
  exports: [RouterModule]
})
export class TeamlistsRoutingModule { }
