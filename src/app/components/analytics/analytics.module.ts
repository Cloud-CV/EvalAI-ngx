import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';

import { AnalyticsComponent } from './analytics.component';
import { HostAnalyticsComponent } from './host-analytics/host-analytics.component';

@NgModule({
  declarations: [
    AnalyticsComponent,
    HostAnalyticsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    SharedModule
  ],
  exports: [
    AnalyticsComponent,
    HostAnalyticsComponent
  ],
})
export class AnalyticsModule { }
