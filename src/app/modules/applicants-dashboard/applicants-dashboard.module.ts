import { NgxEchartsModule } from 'ngx-echarts';
import { AngularTawkComponent } from 'angular-tawk';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AccountServiceProxy, JobServiceProxy, SectorsServiceProxy, GradesServiceProxy, SkillAreasServiceProxy, StatesServiceProxy, ApplicationsServiceProxy, QuizServiceProxy, InstitutionServiceProxy, CountriesServiceProxy, CourseServiceProxy, EmployerServiceProxy, TitlesServiceProxy, QualificationServiceProxy, EmployerTypesServiceProxy, CommonServiceProxy, ApplicantServiceProxy, SubscriptionsServiceProxy } from 'app/_services/service-proxies';
import { ThemeModule } from 'app/@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantsDashboardRoutingModule } from './applicants-dashboard-routing.module';
// import { NbMenuInternalService } from '@nebular/theme/components/menu/menu.service';
import { ComponentsModule } from 'app/components/components.module';
import { NbLayoutModule, NbCardModule, NbIconModule, NbSelectModule, NbCheckboxModule, NbRadioModule, NbAccordionModule, NbProgressBarModule } from '@nebular/theme';
import { ApplicationsComponent } from './applications/applications.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadcvComponent } from './uploadcv/uploadcv.component';
import { PasswordComponent } from './password/password.component';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { QuizComponent } from './quiz/quiz.component';
import { ApplicantProfileComponent } from '../applicants-dashboard/applicant-profile/applicant-profile.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';


@NgModule({
  declarations: [ApplicationsComponent, DashboardComponent, ApplicantProfileComponent, UploadcvComponent, PasswordComponent, QuizComponent, SubscriptionComponent,],
  imports: [
    CommonModule,
    ApplicantsDashboardRoutingModule,
    ComponentsModule,
    ThemeModule,
    NbLayoutModule,
    NbCardModule,
    NgxChartsModule,
    NgxEchartsModule,
    NbIconModule,
    NbSelectModule,
    NbCheckboxModule,
    NbRadioModule,
    NbAccordionModule,
    NbProgressBarModule,
    NgxDocViewerModule,
  ],

  providers: [
    JobServiceProxy,
    SectorsServiceProxy,
    SkillAreasServiceProxy,
    StatesServiceProxy,
    AccountServiceProxy,
    ApplicationsServiceProxy,
    AlertserviceService,
    QuizServiceProxy,
    InstitutionServiceProxy,
    CountriesServiceProxy,
    CourseServiceProxy,
    EmployerServiceProxy,
    TitlesServiceProxy,
    QualificationServiceProxy,
    EmployerTypesServiceProxy,
    GradesServiceProxy,
    CommonServiceProxy,
    ApplicantServiceProxy,
    SubscriptionsServiceProxy,
  ],
})
export class ApplicantsDashboardModule { }
