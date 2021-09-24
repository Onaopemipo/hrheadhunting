import { NbCardModule, NbLayoutModule } from '@nebular/theme';
import { ComponentsModule } from 'app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultantDashboardRoutingModule } from './consultant-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { TrainingComponent } from './training/training.component';
import { ConsultantServiceProxy, PaymentServiceProxy, StatesServiceProxy } from 'app/_services/service-proxies';
import { ConsultantProfileComponent } from './consultant-profile/consultant-profile.component';
import { PasswordComponent } from './password/password.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { environment } from 'app/environment';
import { NbDateFnsDateModule } from '@nebular/date-fns';


@NgModule({
  declarations: [DashboardComponent, TrainingComponent, ConsultantProfileComponent, PasswordComponent, TransactionComponent, SubscriptionComponent],
  imports: [
    CommonModule,
    ConsultantDashboardRoutingModule,
    ComponentsModule,
    ThemeModule,
    NbCardModule,
    NbLayoutModule,
    Angular4PaystackModule.forRoot(environment.paystackToken),
    NbDateFnsDateModule.forRoot({
      parseOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
      formatOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
      getWeekOptions:{useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true }
    })
  ],

  providers: [
    ConsultantServiceProxy,
    StatesServiceProxy,
    PaymentServiceProxy,

  ]
})
export class ConsultantDashboardModule { }
