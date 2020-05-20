import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared.module';

import { ChallengecardComponent } from './challengecard/challengecard.component';
import { ChallengelistComponent } from './challengelist.component';
import { TeamlistComponent } from '../teamlist/teamlist.component';
import { TeamcardComponent } from '../teamlist/teamcard/teamcard.component';

import { CardlistComponent } from '../../utility/cardlist/cardlist.component';

@NgModule({
  declarations: [
    ChallengelistComponent,
    ChallengecardComponent,
    TeamcardComponent,
    TeamlistComponent,
    CardlistComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ChallengelistComponent,
    ChallengecardComponent,
    TeamcardComponent,
    TeamlistComponent,
    CardlistComponent
  ]
})
export class ChallengelistModule { }
