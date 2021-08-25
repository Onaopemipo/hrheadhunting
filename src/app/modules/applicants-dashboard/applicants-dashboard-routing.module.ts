import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { UploadcvComponent } from './uploadcv/uploadcv.component';
import { ApplicationsComponent } from './applications/applications.component';
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
  },
  {
    path: 'applications',
    component: ApplicationsComponent,
  },

  {
    path: 'uploadcv',
    component: UploadcvComponent
  },

  {
    path: 'password',
    component: PasswordComponent
  },

  {
    path: 'profile',
    component: ProfileComponent
  },

 

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantsDashboardRoutingModule { }
