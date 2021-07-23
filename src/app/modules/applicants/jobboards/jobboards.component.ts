import { AlertserviceService } from 'app/_services/alertservice.service';
import { EmployerServiceProxy, EmployerDTO } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonServiceProxy, IDTextViewModel, Job, JobServiceProxy, JobDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-jobboards',
  templateUrl: './jobboards.component.html',
  styleUrls: ['./jobboards.component.scss']
})
export class JobboardsComponent implements OnInit {

  allJobs: Job []= [];
  loading:boolean = false;
  recruiterData: IDTextViewModel [] = [];
  jobsCounter:number = 0;
  singleJob: JobDTO = new JobDTO().clone();
  btnProcessing: boolean = false;
  employerData: EmployerDTO = new EmployerDTO().clone();

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

  jobId:number = 0;
  constructor( private job: JobServiceProxy, private employer: EmployerServiceProxy, private common: CommonServiceProxy,
    private alertMe:AlertserviceService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.job.getJobById(this.jobId = Number(this.router.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.singleJob = data.value;
        console.log('Your single job is here:', this.singleJob);
        this.fetchSingleEmployer();
      }
    })
  }


  async fetchAllJobs(){
    this.loading = true;
   const data = await this.job.fetchAllJobs(this.jobFilter.SkillAreaId, this.jobFilter.SectorId,
    this.jobFilter.CountryId, this.jobFilter.StateId, this.jobFilter.IsNewlyAdded,
    this.jobFilter.IsPopular,this.jobFilter.PageSize, this.jobFilter.PageNumber).toPromise();
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

  jobApplication(){
    this.btnProcessing = true;
    this.job.applyJob(this.jobId).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'OK')
      }
    })
  }

  // async fetchRecruiters(){
  //   const data = await this.common.fetchAllEmployers().toPromise();
  //   this.recruiterData = data.value;
  // }

}
