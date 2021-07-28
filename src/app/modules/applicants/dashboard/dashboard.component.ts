import { ReportServiceProxy, EmployerDTO, SkillAreasServiceProxy, SectorsServiceProxy, StatesServiceProxy } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { IDTextViewModel, Job, JobServiceProxy } from 'app/_services/service-proxies';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loggedIn:boolean = false;
  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "No vacancy yet";
  loggedInUser: any = [];

  jobFilter = {
    skillAreaId:0,
    sectorId:0,
    countryId:0,
    stateId:0,
    isNewlyAdded: false,
    isPopular: false,
    pageSize:10,
    pageNumber:1

  }

  allJobs: Job []= [];
  showMenu:boolean = false;
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
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, private AuthenService: AuthenticationService,) { }

  ngOnInit(): void {
    // this.fetchAllEmployers();
    // this.fetchAllJobs();
    this.fetchSectors();
    this.fetchSkillAreas();
    this.fetchStates(154);
    this.fetchAllEmployers();
    this.fetchUser();
  }

  getUser(){
    this.loggedInUser = this.AuthenService.getuser();
    console.log('See your user', this.loggedInUser);
    if(this.loggedInUser){

    }

  }

  filterUpdated(filter: any) {

    this.jobFilter = {...this.jobFilter, ...filter};
    console.log('Updated filter', this.jobFilter)
    this.fetchAllJobs();
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  fetchAllJobs(){
    this.loading = true;
   this.job.fetchAllJobs(this.jobFilter.skillAreaId, this.jobFilter.sectorId,
    this.jobFilter.countryId, this.jobFilter.stateId, this.jobFilter.isNewlyAdded,
    this.jobFilter.isPopular,this.jobFilter.pageSize, this.jobFilter.pageNumber).subscribe(data => {
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

  async fetchUser(){
    this.loggedIn = await this.AuthenService.isAuthenticated();
    console.log('See your user:',this.loggedIn)
   }
}
