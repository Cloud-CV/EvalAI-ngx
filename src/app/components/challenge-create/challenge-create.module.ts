import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { ChallengeCreateRoutingModule } from './challenge-create-routing.module';

import { ChallengeCreateComponent } from './challenge-create.component';

@NgModule({
  declarations: [
    ChallengeCreateComponent
  ],
  imports: [
    CommonModule,
    ChallengeCreateRoutingModule,
    SharedModule
  ],
  exports: [
    ChallengeCreateComponent
  ]
})
export class ChallengeCreateModule { }
