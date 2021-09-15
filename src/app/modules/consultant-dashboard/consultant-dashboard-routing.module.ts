import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultantDashboardComponent } from './consultant-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from '../training/training.component';
import { ConsultantProfileComponent } from './consultant-profile/consultant-profile.component';
import { PasswordComponent } from './password/password.component';
import { TransactionComponent } from './transaction/transaction.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [{
  path: '',
  component: ConsultantDashboardComponent,
  children: [
    {
      path: '',
      component: DashboardComponent
    },

    {
      path: 'training',
      component: TrainingComponent
    },

    {
      path: 'transaction',
      component: TransactionComponent
    },

    {
      path: 'profile',
      component: ConsultantProfileComponent
    },

    {
      path: 'subscription',
      component: SubscriptionComponent
    },

    {
      path: 'password',
      component: PasswordComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantDashboardRoutingModule { }
