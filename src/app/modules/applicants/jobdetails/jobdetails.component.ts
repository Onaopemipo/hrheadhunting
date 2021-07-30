import { AuthenticationService } from 'app/_services/authentication.service';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { EmployerServiceProxy, EmployerDTO, SkillAreasServiceProxy, SectorsServiceProxy, StatesServiceProxy } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceProxy, IDTextViewModel, Job, JobServiceProxy, JobDTO } from 'app/_services/service-proxies';


@Component({
  selector: 'ngx-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss']
})
export class JobdetailsComponent implements OnInit {

  allJobs: Job []= [];
  showMenu: boolean = false;
  loading:boolean = false;
  recruiterData: IDTextViewModel [] = [];
  jobsCounter:number = 0;
  singleJob: JobDTO = new JobDTO().clone();
  btnProcessing: boolean = false;
  employerData: EmployerDTO = new EmployerDTO().clone();
  skillData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  sectorData: IDTextViewModel [] = [];
  loggedIn:boolean = false;
  loggedInUser: any = [];
  prevApplied: number[] = [];
  flag:boolean = false;

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

  jobId:number = 0;
  constructor( private job: JobServiceProxy, private employer: EmployerServiceProxy, private common: CommonServiceProxy,
    private alertMe:AlertserviceService, private router: ActivatedRoute, private skill: SkillAreasServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, public authenService: AuthenticationService,
    private route: Router) { }

  ngOnInit(): void {
    this.job.getJobById(this.jobId = Number(this.router.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.singleJob = data.value;
        console.log('Your single job is here:', this.singleJob);
        this.fetchSingleEmployer();
      }
    })

    this.checkPrevApplication()
  }

  async getMyUsers(){
    const data = await this.authenService.getuser();
     console.log('See your user', this.loggedInUser);
     if(data){
       this.loggedIn = true;
       console.log('See your user status', this.loggedIn);
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

  checkPrevApplication(){
    var DuplicateChk = this.prevApplied.find(x=>x == this.jobId);
    if(DuplicateChk){
      this.flag = true;
    }
  }


  async fetchAllJobs(){
    this.loading = true;
   const data = await this.job.fetchAllJobs(this.jobFilter.skillAreaId, this.jobFilter.sectorId,
    this.jobFilter.countryId, this.jobFilter.stateId, this.jobFilter.isNewlyAdded,
    this.jobFilter.isPopular,this.jobFilter.pageSize, this.jobFilter.pageNumber).toPromise();
   this.loading = false;
    if(!data.hasError){
      this.allJobs = data.value;
      this.jobsCounter = data.totalCount;
      console.log('My Jobs:',this.allJobs)
   }
  }

  fetchSingleEmployer(){
    this.employer.getEmployerById(this.singleJob.companyID).subscribe(data => {
      if(!data.hasError){
        this.employerData = data.value;
        console.log('see your employer',this.employerData)
      }
    })
  }

  jobApplication(myJobId:number){
    this.btnProcessing = true;
    this.job.applyJob(myJobId).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.prevApplied.push(myJobId)
        console.log(this.prevApplied)
        this.flag = true;
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'OK').subscribe(res => {
          if(res){
            this.route.navigateByUrl('/boards');
          }
        })
      }
    })
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

  // async fetchRecruiters(){
  //   const data = await this.common.fetchAllEmployers().toPromise();
  //   this.recruiterData = data.value;
  // }
}
