import { Router } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ActivatedRoute } from '@angular/router';
// import { RecruitmentJobServiceProxy, JobDTO, RecruitmentJobApplicationServiceProxy, ApplyForJobDto } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { JobDTO, JobServiceProxy } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  jobId: number = 0;
  applicantId: number = 1;
  checkStatus: boolean = false;
  jobDetails: JobDTO = new JobDTO();
  // applicationDetails: JobDTO = new JobDTO();
  // application: ApplyForJobDto = new ApplyForJobDto();
  constructor(private job: JobServiceProxy, private route: ActivatedRoute, private alertMe: AlertserviceService,
    private router: Router) { }

  ngOnInit(): void {
    this.job.getJobById(this.jobId = Number(this.route.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.jobDetails = data.value;
      }
    })
  }


  applyForJob(){
    this.job.applyJob(1).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, '', 'Ok')
      }
    })
  }




  // fetchJobDetails(){
  //   this.job.getJob(this.jobId).subscribe(data => {
  //     if(!data.hasError){
  //       this.jobDetails = data.result;
  //     }
  //   })
  // }

  // getJobApplication(){
  //   this.job.getJobByApplicationId(this.jobId).subscribe(data => {
  //     if(!data.hasError){
  //       this.applicationDetails = data.result;
  //     }
  //   })
  // }

}
