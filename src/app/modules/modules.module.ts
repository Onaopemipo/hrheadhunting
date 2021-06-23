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




@NgModule({
  declarations: [ModulesComponent, JobsComponent, DashboardComponent, QuizComponent, ReportsComponent, ApplicantsComponent, NewquizComponent, NewjobComponent,],
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

  ]
})
export class ModulesModule { }
