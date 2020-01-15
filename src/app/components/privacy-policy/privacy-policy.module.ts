import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    PrivacyPolicyRoutingModule,
    SharedModule
  ],
  exports: [
    PrivacyPolicyComponent
  ]
})
export class PrivacyPolicyModule { }
