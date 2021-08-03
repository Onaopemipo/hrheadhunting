import { environment } from '../../environment';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AccountServiceProxy, InstitutionServiceProxy, CourseServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, StatesServiceProxy, EmployerTypesServiceProxy, CountriesServiceProxy, GradesServiceProxy, QualificationServiceProxy, TitlesServiceProxy, SubscriptionsServiceProxy, CommonServiceProxy, PaymentServiceProxy } from '../../_services/service-proxies';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from 'app/components/components.module';
import { AuthComponent } from './auth.component';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbAlertModule,
  NbRadioModule,
  NbStepperModule
} from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ResetComponent } from './reset/reset.component';
import { Angular4PaystackModule } from 'angular4-paystack';



@NgModule({
  declarations: [AuthComponent, LoginComponent, SignupComponent, ResetComponent],
  imports: [
    ThemeModule,
    CommonModule,
    AuthRoutingModule,
    ngFormsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    ComponentsModule,
    NbAlertModule,
    NbRadioModule,
    NbStepperModule,
    Angular4PaystackModule.forRoot(environment.paystackToken),
    NbDateFnsDateModule.forRoot({
      parseOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
      formatOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
      getWeekOptions:{useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true }
    })
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
    TitlesServiceProxy,
    SubscriptionsServiceProxy,
    AlertserviceService,
    CommonServiceProxy,
    PaymentServiceProxy
  ]

})
export class AuthModule { }
