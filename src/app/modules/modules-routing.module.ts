import { TrainingComponent } from './training/training.component';
import { ApplicantquizComponent } from './applicantquiz/applicantquiz.component';
import { SettingsComponent } from './settings/settings.component';
import { ApplicantselectionComponent } from './applicantselection/applicantselection.component';
import { NewjobComponent } from './newjob/newjob.component';
import { ReportsComponent } from './reports/reports.component';
import { QuizComponent } from './quiz/quiz.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModulesComponent } from './modules.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { ApplicantProfileComponent } from './applicant-profile/applicant-profile.component';
const routes: Routes = [{
  path: '',
  component: ModulesComponent,

  children: [

    {path: '',
    component: DashboardComponent
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

    {
      path: 'profile',
      component: ApplicantProfileComponent
    },

    {
      path: 'quiz',
      component: ApplicantquizComponent
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


    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
