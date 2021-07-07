import { ComponentsModule } from 'app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantsRoutingModule } from './applicants-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { ServicesComponent } from './services/services.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AboutComponent } from './about/about.component';
import { JobboardsComponent } from './jobboards/jobboards.component';
import { ScorecvComponent } from './scorecv/scorecv.component';
import { PricingComponent } from './pricing/pricing.component';
import { NbTableModule, NbCardModule, NbTabsetModule, NbCheckboxModule } from '@nebular/theme';
import { TrainingComponent } from './training/training.component';
import { CommunicationServiceProxy, JobServiceProxy } from 'app/_services/service-proxies';


@NgModule({
  declarations: [DashboardComponent, ServicesComponent, BlogsComponent, AboutComponent, JobboardsComponent, ScorecvComponent, PricingComponent, TrainingComponent],
  imports: [
    CommonModule,
    ApplicantsRoutingModule,
    ThemeModule,
    NbTableModule,
    NbCardModule,
    NbTabsetModule,
    NbCheckboxModule,
    ComponentsModule
  ],

  providers: [
    // NbMenuService,
    // NbMenuInternalService,
    CommunicationServiceProxy,
    JobServiceProxy
  ]
})
export class ApplicantsModule { }
