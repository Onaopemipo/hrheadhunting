import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultantDashboardComponent } from './consultant-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from '../training/training.component';

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
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantDashboardRoutingModule { }
