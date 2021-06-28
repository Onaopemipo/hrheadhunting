import { ApplicantsComponent } from './applicants/applicants.component';
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
const routes: Routes = [{
  path: '',
  component: ModulesComponent,

  children: [
    // {path: 'dashboard',
    // component: DashboardComponent
    // },

    {
      path: 'applicants',
      component: ApplicantsComponent
    },

    {
      path: 'jobs',
      component: JobsComponent
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
