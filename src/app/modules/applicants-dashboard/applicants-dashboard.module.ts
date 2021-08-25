import { NgxEchartsModule } from 'ngx-echarts';
import { AngularTawkComponent } from 'angular-tawk';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AccountServiceProxy, JobServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, StatesServiceProxy, ApplicationsServiceProxy } from 'app/_services/service-proxies';
import { ThemeModule } from 'app/@theme/theme.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicantsDashboardRoutingModule } from './applicants-dashboard-routing.module';
// import { NbMenuInternalService } from '@nebular/theme/components/menu/menu.service';
import { ComponentsModule } from 'app/components/components.module';
import { NbLayoutModule, NbCardModule, NbIconModule, NbSelectModule, NbCheckboxModule, NbRadioModule } from '@nebular/theme';
import { ApplicationsComponent } from './applications/applications.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadcvComponent } from './uploadcv/uploadcv.component';
import { PasswordComponent } from './password/password.component';
import { AlertserviceService } from 'app/_services/alertservice.service';


@NgModule({
  declarations: [ApplicationsComponent, DashboardComponent, ProfileComponent, UploadcvComponent, PasswordComponent,],
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
  ],

  providers: [
    JobServiceProxy,
    SectorsServiceProxy,
    SkillAreasServiceProxy,
    StatesServiceProxy,
    AccountServiceProxy,
    ApplicationsServiceProxy,
    AlertserviceService
  ],
})
export class ApplicantsDashboardModule { }
