import { ThemeModule } from 'app/@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerDashboardRoutingModule } from './employer-dashboard-routing.module';
import { ComponentsModule } from 'app/components/components.module';
import { NbLayoutModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardData, DashboardServiceProxy } from 'app/_services/service-proxies';
import { JobsComponent } from './jobs/jobs.component';


@NgModule({
  declarations: [DashboardComponent, JobsComponent],
  imports: [
    CommonModule,
    EmployerDashboardRoutingModule,
    ComponentsModule,
    ThemeModule,
    NbLayoutModule,
  ],

  providers: [
    DashboardServiceProxy,
  ]
})
export class EmployerDashboardModule { }
