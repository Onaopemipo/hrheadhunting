import { ReportServiceProxy, EmployerDTO, SkillAreasServiceProxy, SectorsServiceProxy, StatesServiceProxy } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { IDTextViewModel, Job, JobServiceProxy } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "No vacancy yet";
  jobFilter = {
    SkillAreaId:0,
    SectorId:0,
    CountryId:0,
    StateId:0,
    IsNewlyAdded: false,
    IsPopular: false,
    PageSize:10,
    PageNumber:1

  }

  allJobs: Job []= [];
  btnProcessing:boolean = false;
  recruiterData: IDTextViewModel [] = [];
  jobsCounter:number = 0;
  employerData: EmployerDTO [] = [];
  loading:boolean = false;
  skillData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  sectorData: IDTextViewModel [] = [];


  filter: {
    id:0,
    searchText: '',
    dateFrom: undefined,
    dateTo: undefined,
    pageSize: 10,
    pageNo: 1
  }
searchFilter: {
    id:0,
    searchText: '',
    dateFrom: undefined,
    dateTo: undefined,
    pageSize: 10,
    pageNo: 1
}



  constructor(private job: JobServiceProxy, private employer: ReportServiceProxy, private skill: SkillAreasServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy,) { }

  ngOnInit(): void {
    // this.fetchAllEmployers();
    this.fetchAllJobs();
    this.fetchSectors();
    this.fetchSkillAreas();
    this.fetchStates(154);
    this.fetchAllEmployers();
  }

  filterUpdated(filter: any) {
    this.searchFilter = {...this.searchFilter, ...filter};
    this.fetchAllJobs();
  }

  fetchAllJobs(){
    this.loading = true;
   this.job.fetchAllJobs(this.jobFilter.SkillAreaId, this.jobFilter.SectorId,
    this.jobFilter.CountryId, this.jobFilter.StateId, this.jobFilter.IsNewlyAdded,
    this.jobFilter.IsPopular,this.jobFilter.PageSize, this.jobFilter.PageNumber).subscribe(data => {
      this.loading = false;
      if(!data.hasError){
        this.allJobs = data.value;
        this.jobsCounter = data.totalCount;
        console.log('My Jobs:',this.allJobs)
     }
    });

  }

  async fetchSectors(){
    this.sector.fetchSectors().subscribe(data => {
      this.sectorData = data.value;
    });

  }

 async fetchStates(countryId){
    const data = await this.state.fetchStates().toPromise();
    this.stateData = data.value;
    console.log('All states', this.stateData);
  }

 async fetchSkillAreas(){
    const data = await this.skill.fetchSkillAreas().toPromise();
    this.skillData = data.value;
  }

  fetchAllEmployers(){
    this.employer.fetchAllEmployers('', this.filter.dateFrom,
      this.filter.dateTo, this.filter.pageSize, this.filter.pageNo).subscribe(data => {
        if(!data.hasError){
          this.employerData = data.value;
          console.log('My employers:',this.employerData)
        }
    })
  }
}
