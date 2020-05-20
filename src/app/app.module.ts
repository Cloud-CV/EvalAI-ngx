import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EmailValidator } from '@angular/forms';

// Import serivces
import { AuthService } from './services/auth.service';
import { WindowService } from './services/window.service';
import { ApiService } from './services/api.service';
import { GlobalService } from './services/global.service';
import { ChallengeService } from './services/challenge.service';
import { EndpointsService } from './services/endpoints.service';


// Import Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  TermsAndConditionsModalComponent
} from './components/challenge/challengeparticipate/terms-and-conditions-modal/terms-and-conditions-modal.component';
import { EditphasemodalComponent } from './components/challenge/challengephases/editphasemodal/editphasemodal.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ModalComponent } from './components/utility/modal/modal.component';
import { ToastComponent } from './/components/utility/toast/toast.component';

import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    AppComponent,
    EditphasemodalComponent,
    ModalComponent,
    ToastComponent,
    TermsAndConditionsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [
    AuthService,
    WindowService,
    ApiService,
    GlobalService,
    ChallengeService,
    EndpointsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
