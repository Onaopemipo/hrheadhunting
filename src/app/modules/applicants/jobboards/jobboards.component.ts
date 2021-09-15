import { ArtisanDTO, EmployerServiceProxy } from './../../../_services/service-proxies';
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

  allJobs: JobDTO []= [];
  showMenu:boolean = false;
  btnProcessing:boolean = false;
  recruiterData: IDTextViewModel [] = [];
  jobsCounter:number = 0;
  sectorCounter:number = 0;
  employerCounter:number = 0;
  employerData: EmployerDTO [] = [];
  loading:boolean = false;
  loading1:boolean = false;
  skillData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  sectorData: IDTextViewModel [] = [];
  artisanCounter:number = 0;
  artisanData: ArtisanDTO [] = [];
  filteredSkill = [];
  filteredArtisans = [];
  filteredSector = [];
  skillJobsData: IDTextViewModel [] = [];
  skillAreaJobsCounter: number = 0;
  locationJobsData: IDTextViewModel [] = [];
  locationJobsCounter: number = 0;
  filteredSkillArea = [];
  filteredLocation = [];

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

employerFilter = {
    sectorId: undefined,
    stateId: undefined,
    isNewlyAdded: false,
    isPopular: false,
    searchText: '',
    pageSize:10,
    pageNumber:1

}

 artisanFilter = {
    id: undefined,
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
  currentPage:number = 1;
  totalPage:number = 1000;
  showingPages = [1,2,3,4,5,6,7,8,9,10];

  constructor(private job: JobServiceProxy, private employer: EmployerServiceProxy, private skill: SkillAreasServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, public authenService: AuthenticationService,
    private artisan: ArtisanServiceProxy, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.fetchAllEmployers();
    this.fetchAllArtisans();
    this.fetchAllJobs();
    this.fetchSectors();
    this.fetchSkillAreas();
    this.fetchStates(154);
    this.fetchAllEmployers();
    this.getMyUsers();
    this.authUser();
    this.fetchSkillAreaJobs();
    this.fetchJobsLocation()
  }

  selectPage(num:number){
    this.jobFilter.pageNumber = num;
    this.fetchAllJobs();
    this.currentPage = num;
  }

 async getMyUsers(){
   const data = await this.authenService.getuser();
    console.log('See your user', this.loggedInUser);
    if(data){
      this.loggedIn = true;
      console.log('See your user status', this.loggedIn);
    }

  }

  resetFilter(){
    this.employerFilter.searchText = '';
  }



  // getImage(){
  //   this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
  //                + toReturnImage.base64string);
  // }

  fetchAllArtisans(){
    this.loading1 = true;
    this.artisan.fetchAllArtisans(this.artisanFilter.searchText, this.artisanFilter.dateFrom,
      this.artisanFilter.dateTo, this.artisanFilter.pageSize, this.artisanFilter.pageNo).subscribe(data => {
        this.loading1 = false;
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

  // async fetchSectorJob(){
  //   const data = await this.sector.fetchSectorJobs().toPromise();
  //   this.sectorJobsData = data.value;
  //   this.sectorCounter = data.totalCount;
  //   console.log('My sector jobs data:', this.sectorJobsData)
  // }

  // fetchAllJobs(){
  //   this.loading = true;
  //  this.job.fetchJobs(this.jobFilter.skillAreaId, this.jobFilter.sectorId,
  //   this.jobFilter.countryId, this.jobFilter.stateId, this.jobFilter.isNewlyAdded,
  //   this.jobFilter.isPopular,this.jobFilter.pageSize, this.jobFilter.pageNumber).subscribe(data => {
  //     this.loading = false;
  //     if(!data.hasError){
  //       this.allJobs = data.value;
  //       this.jobsCounter = data.totalCount;
  //       console.log('My Jobs:',this.allJobs)
  //    }
  //   });

  // }

  async fetchJobsLocation(){
    const data = await this.state.fetchLocationJobs().toPromise();
    if(!data.hasError){
      this.locationJobsData = data.value;
      this.locationJobsCounter = data.totalCount;
      console.log('See your data', this.skillJobsData)
    }
  }

  async fetchSkillAreaJobs(){
    const data = await this.skill.fetchSkillAreaJobs().toPromise();
    this.skillJobsData = data.value;
    this.skillAreaJobsCounter = data.totalCount;
  }


  fetchAllJobs(){
    this.loading = true;
    this.filteredSkillArea[0];
    this.filteredLocation[0];
    const locationId = Number(this.filteredLocation.join());
    const skillAreaId = Number(this.filteredSkillArea.join())
    this.job.fetchJobs(this.jobFilter.companyId, skillAreaId,
    this.jobFilter.countryId, locationId, this.jobFilter.isNewlyAdded,
    this.jobFilter.isPopular,this.jobFilter.searchText, this.jobFilter.pageSize,
    this.jobFilter.pageNumber).subscribe(data => {
      this.loading = false;
      if(!data.hasError){
        this.allJobs = data.value;
        this.jobsCounter = data.totalCount;
        console.log('My Jobs:',this.allJobs);
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

  // fetchAllEmployers(){
  //   this.employer.fetchAllEmployers(this.filter.searchText, this.filter.dateFrom,
  //     this.filter.dateTo, this.filter.pageSize, this.filter.pageNo).subscribe(data => {
  //       if(!data.hasError){
  //         this.employerData = data.value;
  //         this.employerCounter = data.totalCount;
  //         console.log('My employers:',this.employerData)
  //       }
  //   })
  // }
}
