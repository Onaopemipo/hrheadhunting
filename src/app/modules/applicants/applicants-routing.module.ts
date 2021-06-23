import { ServicesComponent } from './services/services.component';
import { PricingComponent } from './pricing/pricing.component';
import { AboutComponent } from './about/about.component';
import { ScorecvComponent } from './scorecv/scorecv.component';
import { BlogsComponent } from './blogs/blogs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicantsComponent } from './applicants.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../auth/signup/signup.component';
import { JobboardsComponent } from './jobboards/jobboards.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicantsComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },

      {
        path: 'boards',
        component: JobboardsComponent
      },

      {
        path: 'blog',
        component: BlogsComponent
      },

      {
        path: 'scorecv',
        component:ScorecvComponent
      },

      {
        path: 'about',
        component: AboutComponent
      },

      {
        path: 'pricing',
        component: PricingComponent
      },

      {
        path: 'services',
        component: ServicesComponent
      },

      {},

      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantsRoutingModule { }
