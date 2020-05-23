import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import component
import { OurTeamComponent } from './our-team.component';

// import module
import { OurTeamRoutingModule } from './our-team-routing.module';
import { CommonSharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    OurTeamComponent
  ],
  imports: [
    CommonModule,
    OurTeamRoutingModule,
    CommonSharedModule
  ],
  exports: [
    OurTeamComponent
  ]
})
export class OurTeamModule { }
