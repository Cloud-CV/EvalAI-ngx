import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
import { ChallengecardComponent } from './challengelist/challengecard/challengecard.component';
import { ChallengelistModule } from './challengelist/challengelist.module';

import { PubliclistsRoutingModule } from './publiclists-routing.module';
import { TeamlistsRoutingModule } from './publiclists-routing.module';

import { PubliclistsComponent } from './publiclists.component';
import { TeamlistComponent } from './teamlist/teamlist.component';

@NgModule({
  declarations: [
    PubliclistsComponent
  ],
  imports: [
    CommonModule,
    PubliclistsRoutingModule,
    ChallengelistModule,
    SharedModule
  ]
})
export class PubliclistsModule { }

@NgModule({
  declarations: [
    TeamlistComponent
  ],
  imports: [
    CommonModule,
    ChallengelistModule,
    TeamlistsRoutingModule,
    PubliclistsModule,
    SharedModule
  ]
})
export class TeamlistsModule { }
