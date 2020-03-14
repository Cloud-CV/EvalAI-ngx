import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EmailValidator, FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material';

// Import serivces
import { WindowService } from './services/window.service';
import { ApiService } from './services/api.service';
import { GlobalService } from './services/global.service';
import { ChallengeService } from './services/challenge.service';
import { EndpointsService } from './services/endpoints.service';


// Import Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderStaticComponent } from './components/nav/header-static/header-static.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/nav/footer/footer.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { InputComponent } from './components/utility/input/input.component';
import { ToastComponent } from './components/utility/toast/toast.component';
import { GetInvolvedComponent } from './components/get-involved/get-involved.component';
import { AboutComponent } from './components/about/about.component';
import { CardlistComponent } from './components/utility/cardlist/cardlist.component';
import { ForceloginComponent } from './components/utility/forcelogin/forcelogin.component';
import { PhasecardComponent } from './components/challenge/challengephases/phasecard/phasecard.component';
import { ConfirmComponent } from './components/utility/confirm/confirm.component';
import { LoadingComponent } from './components/utility/loading/loading.component';
import { SelectphaseComponent } from './components/utility/selectphase/selectphase.component';
import { ChallengeCreateComponent } from './components/challenge-create/challenge-create.component';
import { ModalComponent } from './components/utility/modal/modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OurTeamComponent } from './components/our-team/our-team.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { HostAnalyticsComponent } from './components/analytics/host-analytics/host-analytics.component';
import { EditphasemodalComponent } from './components/challenge/challengephases/editphasemodal/editphasemodal.component';
import {
  TermsAndConditionsModalComponent
} from './components/challenge/challengeparticipate/terms-and-conditions-modal/terms-and-conditions-modal.component';
import { SideBarComponent } from './components/utility/side-bar/side-bar.component';

import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { DashboardContentComponent } from './components/dashboard/dashboard-content/dashboard-content.component';
import {PasswordMismatchValidatorDirective} from './Directives/password.validator';
import { EmailValidatorDirective } from './Directives/email.validator';
import { AuthModule } from './components/auth/auth.module';
import { PubliclistModule } from './components/publiclists/publiclist.module';
// import { ChallengeModule } from './components/challenge/challenge.module';
import { HomeModule } from './components/home/home.module';
import { ChallengeevaluationComponent } from './components/challenge/challengeevaluation/challengeevaluation.component';
import { ChallengeleaderboardComponent } from './components/challenge/challengeleaderboard/challengeleaderboard.component';
import { ChallengeoverviewComponent } from './components/challenge/challengeoverview/challengeoverview.component';
import { ChallengeparticipateComponent } from './components/challenge/challengeparticipate/challengeparticipate.component';
import { ChallengephasesComponent } from './components/challenge/challengephases/challengephases.component';
import { ChallengesettingsComponent } from './components/challenge/challengesettings/challengesettings.component';
import { ChallengesubmissionsComponent } from './components/challenge/challengesubmissions/challengesubmissions.component';
import { ChallengesubmitComponent } from './components/challenge/challengesubmit/challengesubmit.component';
import { ChallengeviewallsubmissionsComponent } from './components/challenge/challengeviewallsubmissions/challengeviewallsubmissions.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ChallengelistComponent } from './components/publiclists/challengelist/challengelist.component';
import { ChallengecardComponent } from './components/publiclists/challengelist/challengecard/challengecard.component';
import { TeamcardComponent } from './components/publiclists/teamlist/teamcard/teamcard.component';
import { TeamlistComponent } from './components/publiclists/teamlist/teamlist.component';
import { PubliclistsComponent } from './components/publiclists/publiclists.component';
import { FeaturedChallengesComponent } from './components/home/featured-challenges/featured-challenges.component';
import { HomemainComponent } from './components/home/homemain/homemain.component';
import { PartnersComponent } from './components/home/partners/partners.component';
import { RulesComponent } from './components/home/rules/rules.component';
import { TestimonialsComponent } from './components/home/testimonials/testimonials.component';
import { TwitterFeedComponent } from './components/home/twitter-feed/twitter-feed.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderStaticComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    InputComponent,
    ContactComponent,
    ToastComponent,
    GetInvolvedComponent,
    AboutComponent,
    CardlistComponent,
    ForceloginComponent,
    PhasecardComponent,
    ConfirmComponent,
    LoadingComponent,
    SelectphaseComponent,
    ChallengeCreateComponent,
    ModalComponent,
    DashboardComponent,
    ProfileComponent,
    NotFoundComponent,
    OurTeamComponent,
    SideBarComponent,
    AnalyticsComponent,
    DashboardContentComponent,
    HostAnalyticsComponent,
    PasswordMismatchValidatorDirective,
    EmailValidatorDirective,
    EditphasemodalComponent,
    ChallengeevaluationComponent,
    ChallengeleaderboardComponent,
    ChallengeoverviewComponent,
    ChallengeparticipateComponent,
    ChallengephasesComponent,
    ChallengesettingsComponent,
    ChallengesubmissionsComponent,
    ChallengesubmitComponent,
    ChallengeviewallsubmissionsComponent,
    ChallengeComponent,
    TermsAndConditionsModalComponent,
    // ChallengelistComponent,
    // ChallengecardComponent,
    // TeamcardComponent,
    // TeamlistComponent,
    // PubliclistsComponent,
    FeaturedChallengesComponent,
    HomemainComponent,
    PartnersComponent,
    RulesComponent,
    TestimonialsComponent,
    TwitterFeedComponent,
    HomeComponent
  ],
  imports: [
    AuthModule,
    // HomeModule,
    PubliclistModule,
    // ChallengeModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxTwitterTimelineModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    TextareaAutosizeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSelectModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  providers: [
    WindowService,
    AuthService,
    ApiService,
    GlobalService,
    ChallengeService,
    EndpointsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
