import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultantDashboardComponent } from './consultant-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: ConsultantDashboardComponent,
  children: [
    {
      path: '',
      component: DashboardComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultantDashboardRoutingModule { }
