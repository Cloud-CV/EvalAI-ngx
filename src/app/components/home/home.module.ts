import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { HomeComponent } from './home.component';
import { PartnersComponent } from './partners/partners.component';
import { RulesComponent } from './rules/rules.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { HomemainComponent } from './homemain/homemain.component';
import { TwitterFeedComponent } from './twitter-feed/twitter-feed.component';
import { FeaturedChallengesComponent } from './featured-challenges/featured-challenges.component';

@NgModule({
  declarations: [
    HomeComponent,
    TwitterFeedComponent,
    PartnersComponent,
    RulesComponent,
    TestimonialsComponent,
    HomemainComponent,
    FeaturedChallengesComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxTwitterTimelineModule
  ],
  exports: [
    HomeComponent,
    TwitterFeedComponent,
    PartnersComponent,
    RulesComponent,
    TestimonialsComponent,
    HomemainComponent,
    FeaturedChallengesComponent
  ]
})
export class HomeModule { }
