import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantsRoutingModule } from './applicants-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { ServicesComponent } from './services/services.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AboutComponent } from './about/about.component';
import { JobboardsComponent } from './jobboards/jobboards.component';
import { ScorecvComponent } from './scorecv/scorecv.component';
import { PricingComponent } from './pricing/pricing.component';
import { NbTableModule, NbCardModule, NbTabsetModule, NbCheckboxModule } from '@nebular/theme';


@NgModule({
  declarations: [DashboardComponent, SignupComponent, ServicesComponent, BlogsComponent, AboutComponent, JobboardsComponent, ScorecvComponent, PricingComponent],
  imports: [
    CommonModule,
    ApplicantsRoutingModule,
    ThemeModule,
    NbTableModule,
    NbCardModule,
    NbTabsetModule,
    NbCheckboxModule
  ],

  providers: [
    // NbMenuService,
    // NbMenuInternalService,
  ]
})
export class ApplicantsModule { }
