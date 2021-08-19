import { NbLayoutModule } from '@nebular/theme';
import { ComponentsModule } from 'app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantDashboardRoutingModule } from './consultant-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeModule } from 'app/@theme/theme.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ConsultantDashboardRoutingModule,
    ComponentsModule,
    ThemeModule,
    NbLayoutModule,
  ]
})
export class ConsultantDashboardModule { }
