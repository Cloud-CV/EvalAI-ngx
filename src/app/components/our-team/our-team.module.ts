import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurTeamRoutingModule } from './our-team-routing.module';
import { SharedModule } from '../../shared.module';
import { OurTeamComponent } from './our-team.component';

@NgModule({
  declarations: [
    OurTeamComponent
  ],
  imports: [
    CommonModule,
    OurTeamRoutingModule,
    SharedModule
  ],
  exports: [
    OurTeamComponent
  ]
})
export class OurTeamModule { }
