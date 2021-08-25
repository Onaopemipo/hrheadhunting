import { NbLayoutModule } from '@nebular/theme';
import { ComponentsModule } from 'app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantDashboardRoutingModule } from './consultant-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { TrainingComponent } from './training/training.component';
import { ConsultantServiceProxy, PaymentServiceProxy, StatesServiceProxy } from 'app/_services/service-proxies';


@NgModule({
  declarations: [DashboardComponent, TrainingComponent],
  imports: [
    CommonModule,
    ConsultantDashboardRoutingModule,
    ComponentsModule,
    ThemeModule,
    NbLayoutModule,
  ],

  providers: [
    ConsultantServiceProxy,
    StatesServiceProxy,
    PaymentServiceProxy
  ]
})
export class ConsultantDashboardModule { }
