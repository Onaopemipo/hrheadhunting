import { AlertserviceService } from 'app/_services/alertservice.service';
import { ApplicantquizComponent } from './applicantquiz/applicantquiz.component';
import { ApplicationsServiceProxy, DashboardServiceProxy, ArtisanServiceProxy, QuizServiceProxy } from '../_services/service-proxies';
import { ApplicantselectionComponent } from './applicantselection/applicantselection.component';
import { SettingsComponent } from './settings/settings.component';
import { AccountServiceProxy, InstitutionServiceProxy, CourseServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, StatesServiceProxy, EmployerTypesServiceProxy, CountriesServiceProxy, GradesServiceProxy, QualificationServiceProxy, JobTypesServiceProxy, CurrenciesServiceProxy } from '../_services/service-proxies';
import { NewjobComponent } from './newjob/newjob.component';
import { NewquizComponent } from './newquiz/newquiz.component';
import { ReportsComponent } from './reports/reports.component';
import { QuizComponent } from './quiz/quiz.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { ModulesComponent } from './modules.component';

import { NbLayoutModule , NbCardModule, NbIconModule, NbSelectModule , NbCheckboxModule, NbRadioModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ComponentsModule } from 'app/components/components.module';
import { JobsComponent } from './jobs/jobs.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobServiceProxy, CommonServiceProxy, CommunicationServiceProxy, ReportServiceProxy } from 'app/_services/service-proxies';
import { ApplicantProfileComponent } from './applicant-profile/applicant-profile.component';
import { TrainingComponent } from './training/training.component';
import { ArtisansComponent } from './artisans/artisans.component';
import { ConsultantsComponent } from './consultants/consultants.component';
import { ApplicantsDashboardComponent } from './applicants-dashboard/applicants-dashboard.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';




@NgModule({
  declarations: [ModulesComponent, JobsComponent, ApplicantProfileComponent, ApplicantquizComponent,
    DashboardComponent, QuizComponent, ReportsComponent, ApplicantsComponent, NewquizComponent,
    NewjobComponent, SettingsComponent, ApplicantselectionComponent, TrainingComponent,
    ArtisansComponent, ConsultantsComponent, ApplicantsDashboardComponent, EmployerDashboardComponent,],
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
    NbCheckboxModule,
    NbRadioModule,
  ],

  providers: [
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
    ApplicationsServiceProxy,
    ArtisanServiceProxy,
    AlertserviceService,
    QuizServiceProxy,
    ReportServiceProxy,
  ]
})
export class ModulesModule { }
