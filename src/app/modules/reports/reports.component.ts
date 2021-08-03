import { EmployerDTO } from './../../_services/service-proxies';
// import { RecruitmentJobApplicationServiceProxy, JobApplication } from './../../../../_services/service-proxies';
// import { TableColumn } from './../../../../components/tablecomponent/models';
import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'app/components/tablecomponent/models';
import { ReportServiceProxy } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportTable: TableColumn [] = [
    {name: 'name', title: 'Brand Name'},
    {name: 'employerType', title: 'Employer Type'},
    {name: 'sector', title: 'Sector'},
    {name: 'administrator', title: 'Admin'},
    {name: 'status', title: 'Status'},
  ];

  filter = {
    searchText: '',
    dateFrom: null,
    dateTo: null,
    pageSize: 10,
    pageNo: 1
  }

  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "You don't have any report yet";
  reportCounter:number = 0;
  loading:boolean = false;
  employerData: EmployerDTO [] = [];

  allJobsApplication:  [] = [];
  constructor(private employer: ReportServiceProxy) { }

  ngOnInit(): void {
    // this.fetchApplications();
    this.fetchAllEmployers();
  }


  // async fetchApplications(){
  // const data = await this.jobService.fetchJobApplications(undefined, undefined, undefined,undefined,10,1).toPromise();
  // if(!data.hasError){
  //   this.allJobsApplication = data.result;
  // }
  // }

  fetchAllEmployers(){
    this.loading = true;
    this.employer.fetchAllEmployers(this.filter.searchText, this.filter.dateFrom,
      this.filter.dateTo, this.filter.pageSize, this.filter.pageNo).subscribe(data => {
        this.loading = false;
        if(!data.hasError){
          this.employerData = data.value;
          this.reportCounter = data.totalCount;
          console.log('My employers:',this.employerData)
        }
    })
  }

}
