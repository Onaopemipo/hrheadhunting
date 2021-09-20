import { AlertserviceService } from 'app/_services/alertservice.service';


/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// import { interactionPlugin } from '@fullcalendar/angular';

import { BrowserModule } from '@angular/platform-browser';
import { AngularTawkComponent } from 'angular-tawk';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DecimalPipe } from '@angular/common';
import { environment } from '../environments/environment';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  // NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbPopoverModule,
  NbAlertModule,
  NbSearchModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbProgressBarModule,
  NbSpinnerModule,
  NbListModule,
  NbLayoutModule,



} from '@nebular/theme';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

//FireBase

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


import { CKEditorModule } from 'ng2-ckeditor';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// Services

import { AuthService } from './_services/auth.service';
import { AuthGuardService } from './_services/auth-guard.service';
import { AuthenticationService } from './_services/authentication.service';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
// import { JwtInterceptor } from './_services/jwt.interceptor';


import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { JwtInterceptor } from './_services/jwt.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { Angular4PaystackModule } from 'angular4-paystack';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  listPlugin
]);

@NgModule({
  declarations: [AppComponent],
  imports: [
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FullCalendarModule,
    ReactiveFormsModule,
    Angular4PaystackModule,
    RouterModule,
    NgxDocViewerModule,
    // NgxDocViewerModule,
    // NbSidebarModule.forRoot(),
    // NbMenuModule.forRoot(),
    // NbDatepickerModule.forRoot(),
    // NbDialogModule.forRoot(),
    // NbWindowModule.forRoot(),
    // NbToastrModule.forRoot(),
    // NbChatModule.forRoot({
    //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    // }),
    NbSidebarModule.forRoot(),
    // NbMenuModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    // CoreModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    Ng2SmartTableModule,
    NbTabsetModule,
    NbTooltipModule,
    NbPopoverModule,
    CKEditorModule,
    NbAlertModule,
    NbSearchModule,
    NbCalendarKitModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbProgressBarModule,
    NbSpinnerModule,
    NbListModule,
    NbLayoutModule,
    NgxChartsModule,
    NgxPaginationModule,
    NbDateFnsDateModule.forRoot({
      parseOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
      formatOptions: { useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true },
      getWeekOptions:{useAdditionalWeekYearTokens: true, useAdditionalDayOfYearTokens: true }
    })

    // NbDateFnsDateModule.forChild({ format: 'dd.MM.yyyy' })
    // NbDatepickerModule.forRoot(),

    // AngularFireModule.initializeApp(environment.firebase),
  ],
  bootstrap: [AppComponent],
  providers: [
    AlertserviceService,
    AuthService,
    AuthGuardService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DecimalPipe,
  ],

})
export class AppModule {
}
