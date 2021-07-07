import { ApplicantquizComponent } from './applicantquiz/applicantquiz.component';
import { DashboardServiceProxy } from './../_services/service-proxies';
import { ApplicantselectionComponent } from './applicantselection/applicantselection.component';
import { SettingsComponent } from './settings/settings.component';
import { ApiServiceProxy, AccountServiceProxy, InstitutionServiceProxy, CourseServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, StatesServiceProxy, EmployerTypesServiceProxy, CountriesServiceProxy, GradesServiceProxy, QualificationServiceProxy, JobTypesServiceProxy, CurrenciesServiceProxy } from '../_services/service-proxies';
import { NewjobComponent } from './newjob/newjob.component';
import { NewquizComponent } from './newquiz/newquiz.component';
import { ReportsComponent } from './reports/reports.component';
import { QuizComponent } from './quiz/quiz.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';

import { NbLayoutModule , NbCardModule, NbIconModule, NbSelectModule , NbCheckboxModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ComponentsModule } from 'app/components/components.module';
import { JobsComponent } from './jobs/jobs.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobServiceProxy, CommonServiceProxy, CommunicationServiceProxy } from 'app/_services/service-proxies';
import { ApplicantProfileComponent } from './applicant-profile/applicant-profile.component';
import { TrainingComponent } from './training/training.component';




@NgModule({
  declarations: [ModulesComponent, JobsComponent, ApplicantProfileComponent, ApplicantquizComponent, DashboardComponent, QuizComponent, ReportsComponent, ApplicantsComponent, NewquizComponent, NewjobComponent, SettingsComponent, ApplicantselectionComponent, TrainingComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ModulesRoutingModule,
    ThemeModule,
    NbLayoutModule,
    NbCardModule,
    NgxChartsModule,
    NgxEchartsModule,
    NbIconModule,
    NbSelectModule,
    NbCheckboxModule
  ],

  providers: [
    ApiServiceProxy,
    AccountServiceProxy,
    InstitutionServiceProxy,
    CourseServiceProxy,
    SectorsServiceProxy,
    SkillAreasServiceProxy,
    StatesServiceProxy,
    EmployerTypesServiceProxy,
    CountriesServiceProxy,
    GradesServiceProxy,
    QualificationServiceProxy,
    JobServiceProxy,
    JobTypesServiceProxy,
    CurrenciesServiceProxy,
    CommonServiceProxy,
    DashboardServiceProxy,
    CommunicationServiceProxy,
  ]
})
export class ModulesModule { }
