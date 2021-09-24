import { environment } from '../environment';
import { ConsultantDashboardComponent } from './consultant-dashboard/consultant-dashboard.component';
import { ConsultantServiceProxy, PaymentServiceProxy, SubscriptionsServiceProxy } from './../_services/service-proxies';
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
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { ComponentsModule } from 'app/components/components.module';
import { JobsComponent } from './jobs/jobs.component';
import { ApplicantsComponent } from './applicants/applicants.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobServiceProxy, CommonServiceProxy, CommunicationServiceProxy, ReportServiceProxy } from 'app/_services/service-proxies';
import { TrainingComponent } from './training/training.component';
import { ArtisansComponent } from './artisans/artisans.component';
import { ConsultantsComponent } from './consultants/consultants.component';
import { ApplicantsDashboardComponent } from './applicants-dashboard/applicants-dashboard.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { PasswordComponent } from './password/password.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';




@NgModule({
  declarations: [ModulesComponent, JobsComponent, ApplicantquizComponent,
    DashboardComponent, QuizComponent, ReportsComponent, ApplicantsComponent, NewquizComponent,
    NewjobComponent, SettingsComponent, ApplicantselectionComponent, TrainingComponent,
    ArtisansComponent, ConsultantsComponent, ApplicantsDashboardComponent, EmployerDashboardComponent, ConsultantDashboardComponent, PasswordComponent, SubscriptionComponent, PasswordChangeComponent,],
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
    NgxChartsModule,
    NbDateFnsDateModule.forRoot({
      parseOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
      formatOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
      getWeekOptions:{useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true }
    }),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    // NgxEchartsModule,
    Angular4PaystackModule.forRoot(environment.paystackToken),

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
    ConsultantServiceProxy,
    PaymentServiceProxy,
    SubscriptionsServiceProxy,
  ]
})
export class ModulesModule { }
