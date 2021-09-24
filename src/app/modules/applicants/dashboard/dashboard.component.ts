import { Router } from '@angular/router';
import { ReportServiceProxy, EmployerDTO, SkillAreasServiceProxy, SectorsServiceProxy, StatesServiceProxy } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { IDTextViewModel, Job, JobServiceProxy, EmployerServiceProxy, JobDTO } from 'app/_services/service-proxies';
import { AuthenticationService } from 'app/_services/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loggedIn:boolean = false;
  searchForm: NgForm;
  filterForm: NgForm;
  loggedInUser: any = [];
  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "No data available yet";

  page = 1;
  passenger: any;
  itemsPerPage = 6;
  totalItems : any;


  jobFilter = {
    companyId: undefined,
    skillAreaId:undefined,
    countryId:undefined,
    stateId:undefined,
    isNewlyAdded: false,
    isPopular: false,
    searchText: '',
    pageSize:10,
    pageNumber:1
  }

  employerFilter = {
    sectorId: undefined,
    stateId: undefined,
    isNewlyAdded: false,
    isPopular: false,
    searchText: '',
    pageSize:10,
    pageNumber:1

  }

  allJobs: JobDTO []= [];
  popularJobs: JobDTO []= [];
  showMenu:boolean = false;
  btnProcessing:boolean = false;
  recruiterData: IDTextViewModel [] = [];
  jobsCounter:number = 0;
  sectorCounter:number = 0;
  employerCounter:number = 0;
  employerData: EmployerDTO [] = [];
  loading:boolean = false;
  skillData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  sectorData: IDTextViewModel [] = [];
  skillJobsData: IDTextViewModel [] = [];
  skillAreaJobsCounter: number = 0;
  locationJobsData: IDTextViewModel [] = [];
  locationJobsCounter: number = 0;
  filteredSkillArea:number = 0;
  filteredLocation: number = 0;
  filteredEmployer = [];


  filter = {
    searchText: '',
    dateFrom: undefined,
    dateTo: null,
    pageSize: 10,
    pageNo: 1
  }

searchFilter = {
    id:0,
    searchText: '',
    dateFrom: '',
    dateTo: '',
    pageSize: 10,
    pageNo: 1
}
// showingPages = {
//   groupOne: [],
//   seperatorOne: false,
//   groupTwo: [],
//   seperatorTwo: false,
//   groupThree: [],
//   seperatorThree: false,
// };
  currentPage:number = 1;
  myRole: string = '';
  totalPage:number = 1000;
  showingPages = [1,2,3,4,5,6,7,8,9,10];
  overFlowStatus: boolean;
  collection = [];
  p = 0;
  constructor(private job: JobServiceProxy, private employer: EmployerServiceProxy, private skill: SkillAreasServiceProxy,
    private state: StatesServiceProxy, private route: Router, private sector: SectorsServiceProxy, public authenService: AuthenticationService,) {
      for (let i = 1; i <= 100; i++) {
        this.collection.push(`item ${i}`);
      }
     }

  ngOnInit(): void {
    this.authenService.userRole().then(data => {
      this.myRole = data;
  })
    this.fetchAllJobs();
    this.fetchSectors();
    this.fetchSkillAreas();
    this.fetchStates(154);
    this.fetchAllEmployers();
    this.getMyUsers();
    this.authUser();
    this.fetchJobsLocation();
    this. fetchSkillAreaJobs();
    this.checkOverflow();
  }

  checkOverflow(){
    if(this.skillAreaJobsCounter > 3 ){
      this.overFlowStatus = true;
      console.log('See what I am saying:', this.skillAreaJobsCounter, this.overFlowStatus)
    }
  }

  selectPage(num:number){
    this.jobFilter.pageNumber = num;
    this.fetchAllJobs();
    this.currentPage = num;
    this.showingPages;
    if(this.totalPage <= 10){
      this.showingPages = [1,2,3,4,5,6,7,8,9,10];
    } else {
      let midCon = this.currentPage;
      if(midCon < 7){
        midCon = 7;
      }

      if(midCon > this.totalPage - 5){
        midCon = this.totalPage - 5;
      }
      let sPages = [midCon];
      for(let a = 4; a > 0; a--){
        sPages.push(midCon + a);
        sPages.push(midCon - a);
        // sPages.sort();
        this.showingPages = sPages.sort((a,b)=> a-b);
      }
    }
  }

  searchUpdated(){
    console.log('This is it',);
    this.jobFilter = {...this.jobFilter};
    // this.jobFilter.searchText = ;
    this.fetchAllJobs();
  }


  logOut(){
    this.authenService.clearusers();
    this.route.navigateByUrl('/auth/login');
  }

  LoadMore(){

  }

  resetFilter(){
    this.employerFilter.searchText = '';
  }

 async getMyUsers(){
   const data = await this.authenService.getuser();
    console.log('See your user', this.loggedInUser);
    if(data){
      this.loggedIn = true;
      console.log('See your user status', this.loggedIn);
    }

  }

  async authUser(){
    const data = await this.authenService.isAuthenticated();
    if(data){
      console.log('See your status', data);
    }
  }

  getUsers() {
    return this.authenService.getuser()
    .then(
      (users) => {
        console.log('users ' + users);
        this.loggedInUser = users;
        console.log('this.users ' + this.loggedInUser);
      })
     .catch((error) => {
        console.log('error ' + error);
        throw error;
      });
    // users => this.users = users,
    // error => this.errorMsg = <any>error);
  }


 async filterUpdated(filter: any) {
   console.log('See me',filter)
    this.jobFilter = {...this.jobFilter, ...filter};
    console.log('Updated filter', this.jobFilter)
    this.fetchAllJobs();
  }

  filterPageUpdated(filter: any){
    this.jobFilter.pageNumber = filter;
    // console.log('See me',filter)
    // this.jobFilter = {...this.jobFilter, ...filter};
    console.log('Updated filter', this.jobFilter)
    this.fetchAllJobs();

  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  fetchAllJobs(){
    this.loading = true;
    this.filteredSkillArea[0];
    this.filteredLocation[0];
    // const locationId = Number(this.filteredLocation.join());
    const locationId = Number(this.filteredLocation);
    const skillAreaId = Number(this.filteredSkillArea)
    this.job.fetchJobs(this.jobFilter.companyId, skillAreaId,
    this.jobFilter.countryId, locationId, this.jobFilter.isNewlyAdded,
    this.jobFilter.isPopular,this.jobFilter.searchText, this.jobFilter.pageSize,
    this.jobFilter.pageNumber).subscribe(data => {
      this.loading = false;
      if(!data.hasError){
        this.allJobs = data.value;
        this.jobsCounter = data.totalCount;
        // this.totalPage = data.totalCount/10;
        console.log('My Jobs:',this.allJobs);
     }
    });

  }

  async fetchSectors(){
    this.sector.fetchSectors().subscribe(data => {
      this.sectorData = data.value;
    });

  }

  async fetchSkillAreaJobs(){
    const data = await this.skill.fetchSkillAreaJobs().toPromise();
    this.skillJobsData = data.value;
    this.skillAreaJobsCounter = data.totalCount;
    this.checkOverflow();
  }

 async fetchStates(countryId){
    const data = await this.state.fetchStates().toPromise();
    this.stateData = data.value;
    console.log('All states', this.stateData);
  }

 async fetchSkillAreas(){
    const data = await this.skill.fetchSkillAreas().toPromise();
    if(!data.hasError){
      this.skillData = data.value;
    }
  }

  async fetchJobsLocation(){
    const data = await this.state.fetchLocationJobs().toPromise();
    if(!data.hasError){
      this.locationJobsData = data.value;
      this.locationJobsCounter = data.totalCount;
      console.log('See your data', this.skillJobsData)
    }
  }

  fetchAllEmployers(){
    this.loading = true;
    this.employer.fetchAllEmployers(this.employerFilter.sectorId,this.employerFilter.stateId, this.employerFilter.isNewlyAdded,
      this.employerFilter.isPopular,this.employerFilter.searchText,this.employerFilter.pageSize, this.employerFilter.pageNumber).subscribe(data => {
       this.loading = false;
        if(!data.hasError){
          this.employerData = data.value;
          this.employerCounter = data.totalCount;
          console.log('My employers:',this.employerData);
        }
    })
  }

}
