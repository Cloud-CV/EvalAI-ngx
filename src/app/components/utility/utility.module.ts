import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { ForceloginComponent } from './forcelogin/forcelogin.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { LoadingComponent } from './loading/loading.component';
import { SelectphaseComponent } from './selectphase/selectphase.component';
import { InputComponent } from './input/input.component';
import { SideBarComponent } from './side-bar/side-bar.component';

@NgModule({
  declarations: [
    ForceloginComponent,
    InputComponent,
    SideBarComponent,
    ConfirmComponent,
    LoadingComponent,
    SelectphaseComponent,

  ],
  imports: [
    CommonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    FormsModule,
    RouterModule,
    TextareaAutosizeModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule
  ],

  exports: [
    ForceloginComponent,
    InputComponent,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SideBarComponent,
    ConfirmComponent,
    LoadingComponent,
    SelectphaseComponent,
  ]
})
export class UtilityModule { }
