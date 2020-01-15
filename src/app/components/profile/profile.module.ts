import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../shared.module';
@NgModule({
  declarations: [
    ProfileComponent
],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
