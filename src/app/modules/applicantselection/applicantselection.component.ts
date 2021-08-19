import { AlertserviceService } from 'app/_services/alertservice.service';
import { TableColumn, ColumnTypes, TableActionEvent, TableAction } from 'app/components/tablecomponent/models';
import { id } from '@swimlane/ngx-charts';
// import { JobApplication, RecruitmentJobApplicationServiceProxy } from './../../../../_services/service-proxies';
// import { ColumnTypes, TableActionEvent, TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { ApplicationsServiceProxy, JobApplicationDTO, JobSeekerDTO } from 'app/_services/service-proxies';

enum ACTIONS {
  VIEW_PROFILE='1', VIEW_CV='2', PROCESS = '3'
}
@Component({
  selector: 'ngx-applicantselection',
  templateUrl: './applicantselection.component.html',
  styleUrls: ['./applicantselection.component.scss']
})
export class ApplicantselectionComponent implements OnInit {

  showModal:boolean = false
  showCvModal;
  allJobRoles: [] = [];
  loading:boolean = false;
  applicationData: JobSeekerDTO = new JobSeekerDTO();

  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "You don't have any application yet"

  myApplicantTable: TableColumn [] = [
    {name: 'firstName', title: 'Name', type: ColumnTypes.Text},
    {name: 'lastName', title: 'Name', type: ColumnTypes.Text},
    {name: 'applicantEmail', title: 'Email'},
    {name: 'position', title: 'Role'},
    {name: 'dateApplied', title: 'Date Applied', type: ColumnTypes.Date},
    {name: ACTIONS.VIEW_PROFILE, title: '', type: ColumnTypes.Link, link_name: 'View Profile'},
    {name: ACTIONS.VIEW_CV, title: '', type: ColumnTypes.Link, link_name: 'View CV'},
    // {name: ACTIONS.PROCESS, title: '', type: ColumnTypes.Link, link_name: 'Process'}
  ];
  data = [
    {id:0, name: 'Name', email: 'Email', role:'Job Title',dateApplied : '02/03/2021'}
  ]

  applicationFilter = {
    id: undefined,
    recruitmentStageId:0,
    searchText:'',
    dateFrom: null,
    dateTo:null,
    pageSize:10,
    pageNumber:1
  }

  // applicantProfile: JobApplication [] = [];
  allApplications: JobApplicationDTO [] = [];
  applicationCounter: number = 0;
  constructor(private jobService: ApplicationsServiceProxy, private application: ApplicationsServiceProxy, 
    private alertMe: AlertserviceService) { }

  ngOnInit(): void {
    this.fetchAllApplications();
  }

  filterUpdated(filter: any) {
    this.applicationFilter = {...this.applicationFilter, ...filter};
    // this.fetchAllApplications();
  }

  tableActions: TableAction [] = [
    {name: ACTIONS.VIEW_CV, label: 'View'},
    {name: ACTIONS.PROCESS, label: 'Process'},
  // {name: TP.DELETE, label: 'Delete'},
  ]

  tableActionClick(actionData: TableActionEvent){
    if(actionData.name === ACTIONS.VIEW_PROFILE){
      this.showModal = true
      this.application.getJobApplicantById(actionData.data.id).subscribe(data => {
        if(!data.hasError){
          this.applicationData = data.value;
        }
      })
    }
    if(actionData.name === ACTIONS.VIEW_CV){
    this.showCvModal = true
    }

    if(actionData.name === ACTIONS.PROCESS){
      this.application.processApplication(actionData.data).subscribe(data => {
        if(!data.hasError){
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Ok')
        }
      })
    }
  }

 fetchAllApplications(){
   this.loading = true;
    this.jobService.fetchAllApplications(this.applicationFilter.id, this.applicationFilter.recruitmentStageId, 
      this.applicationFilter.searchText,this.applicationFilter.dateFrom,this.applicationFilter.dateTo, 
      this.applicationFilter.pageSize, this.applicationFilter.pageNumber).subscribe(data => {
      this.loading = false;
      if(!data.hasError){
        this.allApplications = data.value;
        this.applicationCounter = data.totalCount;
      }
    });

  }
}
