import { TrainingdetailsComponent } from './trainingdetails/trainingdetails.component';
import { EmployerdetailsComponent } from './employerdetails/employerdetails.component';
import { ArtisandetailsComponent } from './artisandetails/artisandetails.component';
import { ArtisansComponent } from './artisans/artisans.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { TrainingComponent } from './training/training.component';
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
import { AuthGuardService as AuthGuard } from '../../_services/auth-guard.service';

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
        path: 'applicants/boards',
        component: JobboardsComponent
      },

      {
        path: 'applicants/blog',
        component: BlogsComponent
      },

      {
        path: 'applicants/artisans',
        component: ArtisansComponent
      },

      {
        path: 'applicants/details/:id',
        component: JobdetailsComponent
      },

      {
        path: 'applicants/artisandetails/:id',
        component: ArtisandetailsComponent
      },

      {
        path: 'applicants/employerdetails/:id',
        component: EmployerdetailsComponent
      },

      {
        path: 'applicants/scorecv',
        component:ScorecvComponent,
        canLoad: [AuthGuard],
      },

      {
        path: 'applicants/about',
        component: AboutComponent
      },

      {
        path: 'applicants/pricing',
        component: PricingComponent
      },

      {
        path: 'applicants/services',
        component: ServicesComponent
      },

      {
        path: 'applicants/training',
        component: TrainingComponent
      },

      {
        path: 'applicants/trainingdetails/:id',
        component: TrainingdetailsComponent
      },

      {
        path: 'applicants/signup',
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
