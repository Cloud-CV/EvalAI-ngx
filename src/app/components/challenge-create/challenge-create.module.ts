import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import component
import { ChallengeCreateComponent } from './challenge-create.component';

// import module
import { ChallengeCreateRoutingModule } from './challenge-create-routing.module';
import { CommonSharedModule } from '../../shared/common-shared.module';

@NgModule({
  declarations: [
    ChallengeCreateComponent
  ],
  imports: [
    CommonModule,
    ChallengeCreateRoutingModule,
    CommonSharedModule
  ],
  exports: [
    ChallengeCreateComponent
  ]
})
export class ChallengeCreateModule { }
