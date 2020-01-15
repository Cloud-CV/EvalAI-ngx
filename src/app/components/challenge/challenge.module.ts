import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChallengeComponent } from './challenge.component';
import { ChallengesettingsComponent } from './challengesettings/challengesettings.component';
import { ChallengeoverviewComponent} from './challengeoverview/challengeoverview.component';
import { ChallengeevaluationComponent } from './challengeevaluation/challengeevaluation.component';
import { ChallengephasesComponent} from './challengephases/challengephases.component';
import { ChallengeparticipateComponent } from './challengeparticipate/challengeparticipate.component';
import { ChallengeleaderboardComponent } from './challengeleaderboard/challengeleaderboard.component';
import { ChallengesubmitComponent } from './challengesubmit/challengesubmit.component';
import { ChallengesubmissionsComponent } from './challengesubmissions/challengesubmissions.component';
import { ChallengeviewallsubmissionsComponent } from './challengeviewallsubmissions/challengeviewallsubmissions.component';
import { PhasecardComponent } from './challengephases/phasecard/phasecard.component';
import { EditphasemodalComponent } from './challengephases/editphasemodal/editphasemodal.component';

import { ChallengeRoutingModule } from './challenge-routing.module';
import { ChallengelistModule } from '../publiclists/challengelist/challengelist.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    ChallengeComponent,
    ChallengesettingsComponent,
    ChallengeoverviewComponent,
    ChallengeevaluationComponent,
    ChallengephasesComponent,
    ChallengeparticipateComponent,
    ChallengeleaderboardComponent,
    ChallengesubmitComponent,
    ChallengesubmissionsComponent,
    ChallengeviewallsubmissionsComponent,
    PhasecardComponent
  ],
  imports: [
    CommonModule,
    ChallengeRoutingModule,
    SharedModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule,
    MatDividerModule,
  ],
  exports: [
    ChallengeComponent,
    ChallengesettingsComponent,
    ChallengeoverviewComponent,
    ChallengeevaluationComponent,
    ChallengephasesComponent,
    ChallengeparticipateComponent,
    ChallengeleaderboardComponent,
    ChallengesubmitComponent,
    ChallengesubmissionsComponent,
    ChallengeviewallsubmissionsComponent,
    PhasecardComponent,
  ]
})
export class ChallengeModule { }
