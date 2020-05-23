import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// import components
import { PubliclistsComponent } from './publiclists.component';

// import routes
import { PubliclistRoutingModule, TeamlistsRoutingModule } from './publiclist-routing.module';

// import Module
import { ChallengelistModule } from './challengelist/challengelist.module';
import { CommonSharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PubliclistsComponent
  ],
  imports: [
    CommonModule,
    PubliclistRoutingModule,
    ChallengelistModule,
    CommonSharedModule
  ],
  exports: [
   ChallengelistModule,
    PubliclistsComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class PubliclistModule {}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TeamlistsRoutingModule,
    PubliclistModule,
    CommonSharedModule
  ],
  exports: [
    PubliclistModule,
  ]
})
export class TeamlistsModule { }
