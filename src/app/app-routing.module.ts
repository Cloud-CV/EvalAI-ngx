import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GetInvolvedComponent } from './get-involved/get-involved.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    data: {
      'title': 'EvalAI - Welcome'
    }
  },
  { path: 'get-involved',
    component: GetInvolvedComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
