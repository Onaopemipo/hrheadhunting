import { ApiServiceProxy, AccountServiceProxy, InstitutionServiceProxy, CourseServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, StatesServiceProxy, EmployerTypesServiceProxy, CountriesServiceProxy, GradesServiceProxy, QualificationServiceProxy } from './../../_services/service-proxies';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from 'app/components/components.module';
import { AuthComponent } from './auth.component';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbAlertModule,
  NbRadioModule
} from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [AuthComponent, LoginComponent, SignupComponent],
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
    NbRadioModule
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
  ]

})
export class AuthModule { }
