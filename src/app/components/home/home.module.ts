import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedChallengesComponent } from './featured-challenges/featured-challenges.component';
import { HomemainComponent } from './homemain/homemain.component';
import { PartnersComponent } from './partners/partners.component';
import { RulesComponent } from './rules/rules.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TwitterFeedComponent } from './twitter-feed/twitter-feed.component';
import { HomeComponent } from './home.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FeaturedChallengesComponent,
    HomemainComponent,
    PartnersComponent,
    RulesComponent,
    TestimonialsComponent,
    TwitterFeedComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxTwitterTimelineModule
  ],
  exports: [
    FeaturedChallengesComponent,
    HomemainComponent,
    PartnersComponent,
    RulesComponent,
    TestimonialsComponent,
    TwitterFeedComponent,
    HomeComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class HomeModule { }
