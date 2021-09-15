import { ConsultantsComponent } from './consultants/consultants.component';
import { ArtisansComponent } from './artisans/artisans.component';
import { TrainingComponent } from './training/training.component';
import { ApplicantquizComponent } from './applicantquiz/applicantquiz.component';
import { SettingsComponent } from './settings/settings.component';
import { ApplicantselectionComponent } from './applicantselection/applicantselection.component';
import { NewjobComponent } from './newjob/newjob.component';
import { ReportsComponent } from './reports/reports.component';
import { QuizComponent } from './quiz/quiz.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanLoad } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { AuthGuardService as AuthGuard } from '../_services/auth-guard.service';
import { NewquizComponent } from './newquiz/newquiz.component';
import { PasswordComponent } from './password/password.component';
import { SubscriptionComponent } from './subscription/subscription.component';
const routes: Routes = [{
  path: '',
  component: ModulesComponent,

  children: [

    {
      path: '',
      component: DashboardComponent,
      canLoad: [AuthGuard],
    },

    {
      path: 'jobs',
      component: JobsComponent
    },

    {
      path: 'newjob',
      component: NewjobComponent
    },

    {
      path: 'selection',
      component: ApplicantselectionComponent
    },

    {
      path: 'settings',
      component: SettingsComponent
    },

    // {
    //   path: 'profile',
    //   component: ApplicantProfileComponent
    // },

    {
      path: 'subscription',
      component: SubscriptionComponent
    },

    {
      path: 'quiz',
      component: QuizComponent
    },

    {
      path: 'newquiz',
      component: NewquizComponent
    },


    {
      path: 'training',
      component: TrainingComponent
    },

    {
      path: 'jobdetails/:id',
      component: JobDetailsComponent
    },

    {
      path: 'quiz',
      component: QuizComponent
    },

      {
      path: 'applicants',
      component: ApplicantselectionComponent
    },

    {
      path: 'report',
      component: ReportsComponent
    },

    {
      path: 'artisans',
      component: ArtisansComponent
    },

    {
      path: 'consultants',
      component: ConsultantsComponent
    },

    {
      path: 'password',
      component: PasswordComponent
    },



    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
