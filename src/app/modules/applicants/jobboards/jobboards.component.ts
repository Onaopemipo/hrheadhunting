import { ArtisanDTO } from './../../../_services/service-proxies';
import { ReportServiceProxy, EmployerDTO, SkillAreasServiceProxy, SectorsServiceProxy, StatesServiceProxy, ArtisanServiceProxy } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { IDTextViewModel, Job, JobServiceProxy, JobDTO } from 'app/_services/service-proxies';
import { AuthenticationService } from 'app/_services/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'ngx-jobboards',
  templateUrl: './jobboards.component.html',
  styleUrls: ['./jobboards.component.scss']
})
export class JobboardsComponent implements OnInit {

  loggedIn:boolean = false;
  loggedInUser: any = [];
  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "No data available yet";

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

  allJobs: JobDTO []= [];
  showMenu:boolean = false;
  btnProcessing:boolean = false;
  recruiterData: IDTextViewModel [] = [];
  jobsCounter:number = 0;
  employerCounter:number = 0;
  employerData: EmployerDTO [] = [];
  loading:boolean = false;
  skillData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  sectorData: IDTextViewModel [] = [];
  artisanCounter:number = 0;
  artisanData: ArtisanDTO [] = []

  filter = {
    searchText: '',
    dateFrom: null,
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

 artisanFilter = {
    id: null,
    searchText: '',
    dateFrom: undefined,
    dateTo: undefined,
    pageSize: 10,
    pageNo: 1
  }

  imagePath: any;

  news = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loader = false;

  constructor(private job: JobServiceProxy, private employer: ReportServiceProxy, private skill: SkillAreasServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, public authenService: AuthenticationService,
    private artisan: ArtisanServiceProxy, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.fetchAllEmployers();
    this.fetchAllJobs();
    this.fetchSectors();
    this.fetchSkillAreas();
    this.fetchStates(154);
    this.fetchAllEmployers();
    this.getMyUsers();
    this.authUser();
    this.fetchAllArtisans();
  }

 async getMyUsers(){
   const data = await this.authenService.getuser();
    console.log('See your user', this.loggedInUser);
    if(data){
      this.loggedIn = true;
      console.log('See your user status', this.loggedIn);
    }

  }

  // getImage(){
  //   this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
  //                + toReturnImage.base64string);
  // }

  fetchAllArtisans(){
    this.loading = true;
    this.artisan.fetchAllArtisans(this.artisanFilter.searchText, this.artisanFilter.dateFrom,
      this.artisanFilter.dateTo, this.artisanFilter.pageSize, this.artisanFilter.pageNo).subscribe(data => {
        this.loading = false;
      if(!data.hasError){
        this.artisanData = data.value;
        this.artisanCounter = data.totalCount;
        console.log('see all artisans', this.artisanData)
      }
    })
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

  // loadNext() {
  //   if (this.loading) { return }

  //   this.loader = true;
  //   this.placeholders = new Array(this.pageSize);
  //   this.sector.fetchSectorJobs(this.pageToLoadNext, this.pageSize)
  //     .subscribe(news => {
  //       this.placeholders = [];
  //       this.news.push(...news);
  //       this.loading = false;
  //       this.pageToLoadNext++;
  //     });
  // }


  filterUpdated(filter: any) {

    this.jobFilter = {...this.jobFilter, ...filter};
    console.log('Updated filter', this.jobFilter)
    this.fetchAllJobs();
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  async fetChSectorJobs(){
    // const data = await this.sector.fetchSectorJobs()
  }

  fetchAllJobs(){
    this.loading = true;
   this.job.fetchJobs(this.jobFilter.skillAreaId, this.jobFilter.sectorId,
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
    this.employer.fetchAllEmployers(this.filter.searchText, this.filter.dateFrom,
      this.filter.dateTo, this.filter.pageSize, this.filter.pageNo).subscribe(data => {
        if(!data.hasError){
          this.employerData = data.value;
          this.employerCounter = data.totalCount;
          console.log('My employers:',this.employerData)
        }
    })
  }
}
