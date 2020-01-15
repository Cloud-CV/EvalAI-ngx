import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    data: {
      'title': 'EvalAI - Welcome'
    }
  },
  {
    path: 'about',
    loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'challenge',
    redirectTo: 'challenges'
  },
  {
    path: 'challenge/:id',
    loadChildren: () => import('./components/challenge/challenge.module').then(m => m.ChallengeModule)
  },
  {
    path: 'challenges',
    loadChildren: () => import('./components/publiclists/publiclists.module').then(m => m.PubliclistsModule)
  },
  {
    path: 'challenge-create',
    loadChildren: () => import('./components/challenge-create/challenge-create.module').then(m => m.ChallengeCreateModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./components/analytics/analytics.module').then(m => m.AnalyticsModule)
  },
  {
    path: 'get-involved',
    loadChildren: () => import('./components/get-involved/get-involved.module').then(m => m.GetInvolvedModule)
  },
  {
    path: 'our-team',
    loadChildren: () => import('./components/our-team/our-team.module').then(m => m.OurTeamModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./components/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./components/publiclists/publiclists.module').then(m => m.TeamlistsModule)
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules
      }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
