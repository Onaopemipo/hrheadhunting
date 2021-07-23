// import { RecruitmentJobApplicationServiceProxy, JobApplication } from './../../../../_services/service-proxies';
// import { TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'app/components/tablecomponent/models';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'applicants', title: 'Applicants'},
    {name: 'datePosted', title: 'Date Posted'},
    {name: 'status', title: 'Status'},
  ];

  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "You don't have any report yet";
  reportCounter:number = 0;
  loading:boolean = false;

  allJobsApplication:  [] = [];
  constructor() { }

  ngOnInit(): void {
    // this.fetchApplications();
  }


  // async fetchApplications(){
  // const data = await this.jobService.fetchJobApplications(undefined, undefined, undefined,undefined,10,1).toPromise();
  // if(!data.hasError){
  //   this.allJobsApplication = data.result;
  // }
  // }

}
