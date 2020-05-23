import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import component
import { GetInvolvedComponent } from './get-involved.component';

// import module
import { GetInvolvedRoutingModule } from './get-involved-routing.module';
import { CommonSharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    GetInvolvedComponent
  ],
  imports: [
    CommonModule,
    GetInvolvedRoutingModule,
    CommonSharedModule
  ],
  exports: [
    GetInvolvedComponent
  ]
})
export class GetInvolvedModule { }
