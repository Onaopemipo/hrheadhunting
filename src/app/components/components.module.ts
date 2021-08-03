import { NgxEchartsModule } from 'ngx-echarts';
import { DefaultContentComponent } from './default-content/default-content.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsheaderComponent } from './componentsheader/componentsheader.component';
import { ThemeModule } from '../@theme/theme.module';
import { CKEditorComponent, CKEditorModule } from 'ckeditor4-angular';
import Flow from '@flowjs/flow.js';
import { DecimalPipe } from '@angular/common';


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
  NbFormFieldModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule,
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
  ɵa,
  NbMenuService,
  NbDatepickerDirective,
  NbDialogRef,
  NbContextMenuModule
} from '@nebular/theme';


import { StatusComponent } from './status/status.component';
import { DatePipesPipe } from './pipes/date-pipes.pipe';
import { MaxStringLengthPipe } from './pipes/max-string-length.pipe';
import { WysisygInputComponent } from './wysisyg-input/wysisyg-input.component';
import { FormsModule } from '@angular/forms';
import { TablecomponentComponent } from './tablecomponent/tablecomponent.component';
import { TableheaderComponent } from './tableheader/tableheader.component';
import { SideModalComponent } from './side-modal/side-modal.component';
import { AmountInputComponent } from './amount-input/amount-input.component';
import { FlowInjectionToken, NgxFlowModule } from '@flowjs/ngx-flow';
import { DateRangeComponent } from './date-range/date-range.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { MyMenuComponent, MyMenuItemComponent } from './my-menu/my-menu.component';
import { DateComponent } from './date/date.component';
import { CalComponent } from './cal/cal.component';
import { CalenderComponent } from './calender/calender.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { alertmodalComponent } from '../_services/alertservice.service';
import { LoadableButtonComponent } from './loadable-button/loadable-button.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { PageComponent } from './page/page.component';
import { ExcelServiceService } from '../_services/excel-service.service';
import { PdfServiceService } from '../_services/pdf-service.service';
import { NamedStatusComponent } from './named-status/named-status.component';
import { InputvalidationService } from '../_services/inputvalidation.service';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [
    ComponentsheaderComponent,
    StatusComponent,
    DatePipesPipe,
    MaxStringLengthPipe,
    WysisygInputComponent,
    TableheaderComponent,
    TablecomponentComponent,
    FileUploadComponent,
    RadioButtonComponent,
    SideModalComponent,
    FileUploadComponent,
    DateRangeComponent,
    DefaultContentComponent,
    SideModalComponent,
    FileUploadComponent,
    AmountInputComponent,
    StatusCardComponent,
    MyMenuComponent,
    MyMenuItemComponent,
    DateComponent,
    DefaultContentComponent,
    CalComponent,
    CalenderComponent,
    BulkUploadComponent,
    alertmodalComponent,
    LoadableButtonComponent,
    CustomFormComponent,
    PageComponent,
    NamedStatusComponent,
    NavbarComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NbSidebarModule.forRoot(),
    // NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    // CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    // NbMenuModule.forRoot(),
    NbDialogModule.forChild(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbInputModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    CKEditorModule,
    NbTreeGridModule,
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
    NbFormFieldModule,
    NbDatepickerModule,
    NgxFlowModule,
    NgxEchartsModule,
    NbIconModule,
    NbFormFieldModule,
    NbCardModule,
    NbInputModule,
    NbContextMenuModule,
  ],
  providers: [
    {
      provide: FlowInjectionToken,
      useValue: Flow,
    },
    DecimalPipe,
    ɵa,
    NbMenuService,
    NbDatepickerDirective,
    ExcelServiceService,
    PdfServiceService,
    InputvalidationService
  ],
  exports: [
    ComponentsheaderComponent,
    StatusComponent,
    NbButtonModule,
    MaxStringLengthPipe,
    WysisygInputComponent,
    SideModalComponent,
    TablecomponentComponent,
    NbTabsetModule,
    FileUploadComponent,
    NbIconModule,
    DefaultContentComponent,
    AmountInputComponent,
    StatusCardComponent,
    MyMenuComponent,
    MyMenuItemComponent,
    RadioButtonComponent,
    TableheaderComponent,
    AmountInputComponent,
    DateRangeComponent,
    DateComponent,
    DefaultContentComponent,
    CommonModule,
    FormsModule,
    NbCardModule,
    NgxEchartsModule,
    TableheaderComponent,
    DatePipesPipe,
    CalComponent,
    NbInputModule,
    CalenderComponent,
    BulkUploadComponent,
    alertmodalComponent,
    NbDialogModule,
    LoadableButtonComponent,
    PageComponent,
  ],
})
export class ComponentsModule { }
