import { AlertserviceService } from 'app/_services/alertservice.service';
import { SkillAreasServiceProxy, StatesServiceProxy, SectorsServiceProxy } from '../../_services/service-proxies';
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
import { CommonServiceProxy, CommunicationServiceProxy, EmployerServiceProxy, JobServiceProxy, ReportServiceProxy, SubscriptionsServiceProxy } from 'app/_services/service-proxies';
import { AuthenticationService } from 'app/_services/authentication.service';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';


@NgModule({
  declarations: [DashboardComponent, ServicesComponent, BlogsComponent, AboutComponent, JobboardsComponent, ScorecvComponent, PricingComponent, TrainingComponent, JobdetailsComponent],
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
    AuthenticationService,
    CommunicationServiceProxy,
    JobServiceProxy,
    ReportServiceProxy,
    EmployerServiceProxy,
    CommonServiceProxy,
    SkillAreasServiceProxy,
    StatesServiceProxy,
    SectorsServiceProxy,
    SubscriptionsServiceProxy,
    AlertserviceService,
  ]
})
export class ApplicantsModule { }
