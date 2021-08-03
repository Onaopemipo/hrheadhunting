import { ThemeModule } from 'app/@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerDashboardRoutingModule } from './employer-dashboard-routing.module';
import { ComponentsModule } from 'app/components/components.module';
import { NbLayoutModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    EmployerDashboardRoutingModule,
    ComponentsModule,
    ThemeModule,
    NbLayoutModule,
  ]
})
export class EmployerDashboardModule { }
