import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

// Import services
import { WindowService } from './services/window.service';
import { ApiService } from './services/api.service';
import { GlobalService } from './services/global.service';
import { ChallengeService } from './services/challenge.service';
import { EndpointsService } from './services/endpoints.service';


// Import Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { ModalComponent } from './components/utility/modal/modal.component';
import { ToastComponent } from './components/utility/toast/toast.component';
import { EditphasemodalComponent } from './components/challenge/challengephases/editphasemodal/editphasemodal.component';
import { TermsAndConditionsModalComponent } from './components/challenge/challengeparticipate/terms-and-conditions-modal/terms-and-conditions-modal.component';

// import module
import { SharedModule } from './shared/shared.module';

// configuration of cookie consent
const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ToastComponent,
    EditphasemodalComponent,
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
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    WindowService,
    AuthService,
    ApiService,
    GlobalService,
    ChallengeService,
    EndpointsService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent],
})
export class AppModule { }
