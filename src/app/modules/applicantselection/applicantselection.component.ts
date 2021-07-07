import { TableColumn, ColumnTypes, TableActionEvent } from 'app/components/tablecomponent/models';
import { id } from '@swimlane/ngx-charts';
// import { JobApplication, RecruitmentJobApplicationServiceProxy } from './../../../../_services/service-proxies';
// import { ColumnTypes, TableActionEvent, TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { ApplicationsServiceProxy, JobApplicationDTO } from 'app/_services/service-proxies';

enum ACTIONS {
  VIEW_PROFILE='1', VIEW_CV='2'
}
@Component({
  selector: 'ngx-applicantselection',
  templateUrl: './applicantselection.component.html',
  styleUrls: ['./applicantselection.component.scss']
})
export class ApplicantselectionComponent implements OnInit {

  showModal = false
  showCvModal;
  allJobRoles: [] = [];

  myApplicantTable: TableColumn [] = [
    {name: 'name', title: 'Name', type: ColumnTypes.Text},
    {name: 'email', title: 'Email'},
    {name: 'role', title: 'Role'},
    {name: 'dateApplied', title: 'Date Applied', type: ColumnTypes.Date},
    {name: ACTIONS.VIEW_PROFILE, title: '', type: ColumnTypes.Link, link_name: 'View Profile'},
    {name: ACTIONS.VIEW_CV, title: '', type: ColumnTypes.Link, link_name: 'View CV'}
  ];
  data = [
    {id:0, name: 'Name', email: 'Email', role:'Job Title',dateApplied : '02/03/2021'}
  ]

  applicationFilter = {
    id:0,
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
  constructor(private jobService: ApplicationsServiceProxy) { }

  ngOnInit(): void {
    // this.fetchJobRoles();
  }

  filterUpdated(filter: any) {
    this.applicationFilter = {...this.applicationFilter, ...filter};
    // this.fetchAllApplications();
  }

  tableActionClick(actionData: TableActionEvent){
    // if(actionData.name === ACTIONS.VIEW_PROFILE){
    //   this.showModal = true
    //   this.jobService.viewJobApplicationProfileById(0).subscribe(data => {
    //     if(!data.hasError){
    //     }
    //   })
    // }
    // if(actionData.name === ACTIONS.VIEW_CV){
    // this.showCvModal = true
    // }
  }

  // async fetchJobRoles(){
  //   const data = await this.jobService.fetchJobApplicationByRole(this.filter.jobRole, this.filter.pageNumber, this.filter.pageSize).toPromise();
  //   if(!data.hasError){

  //   }
  // }

  // async fetchApplicants(){
  //   const data = await this.jobService.fetchJobInterviewerListByApplicationId(0).toPromise();
  //   if(!data.hasError){
  //   }


  // }

  async fetchAllApplications(){
    const data = await this.jobService.fetchAllApplications(this.applicationFilter.id, this.applicationFilter.recruitmentStageId, this.applicationFilter.searchText,this.applicationFilter.dateFrom,this.applicationFilter.dateTo, this.applicationFilter.pageSize, this.applicationFilter.pageNumber).toPromise();
    if(!data.hasError){
      this.allApplications = data.value;
    }
  }
}
