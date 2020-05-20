import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';

import { GetInvolvedComponent } from './get-involved.component';
import { GetInvolvedRoutingModule } from './get-involved-routing.module';

@NgModule({
  declarations: [
    GetInvolvedComponent
  ],
  imports: [
    CommonModule,
    GetInvolvedRoutingModule,
    SharedModule
  ],
  exports: [
    GetInvolvedComponent
  ]
})
export class GetInvolvedModule { }
