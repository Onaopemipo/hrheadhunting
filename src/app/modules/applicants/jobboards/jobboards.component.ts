import { Component, OnInit } from '@angular/core';
import { CommonServiceProxy, IDTextViewModel, Job, JobServiceProxy } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-jobboards',
  templateUrl: './jobboards.component.html',
  styleUrls: ['./jobboards.component.scss']
})
export class JobboardsComponent implements OnInit {

  allJobs: Job []= [];
  loading:boolean = false;
  recruiterData: IDTextViewModel [] = [];

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
  constructor( private job: JobServiceProxy, private common: CommonServiceProxy) { }

  ngOnInit(): void {
  }


  async fetchAllJobs(){
    this.loading = true;
   const data = await this.job.fetchAllJobs(this.jobFilter.SkillAreaId, this.jobFilter.SectorId,
    this.jobFilter.CountryId, this.jobFilter.StateId, this.jobFilter.IsNewlyAdded,
    this.jobFilter.IsPopular,this.jobFilter.PageSize, this.jobFilter.PageNumber).toPromise();
   this.loading = false;
    if(!data.hasError){
      this.allJobs = data.value;
      // this.allJobs = data.result.map(x => new JobWithStatus(x));
      // this.jobsCounter = data.totalRecord;
      console.log('My Jobs:',this.allJobs)
   }
  }

  async fetchRecruiters(){
    const data = await this.common.fetchAllEmployers().toPromise();
    this.recruiterData = data.value;
  }

}
