import { AuthGuardService as AuthGuard } from '../../_services/auth-guard.service';
import { ApplicantsDashboardComponent } from './applicants-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Path } from 'leaflet';
import { DashboardComponent } from '../applicants-dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
  path: '',
  component: ApplicantsDashboardComponent,

  children: [{
    path: '',
    component: DashboardComponent,
    canLoad: [AuthGuard],
  }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantsDashboardRoutingModule { }
