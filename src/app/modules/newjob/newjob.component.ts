// import { AlertserviceService } from './../../../../_services/alertservice.service';
import { Router } from '@angular/router';
// import { CommonServiceProxy, DataServiceProxy, GetAllDepartmentsServiceProxy, DepartmentDTO, Certification, IDTextViewModel, State, JobRole } from 'app/_services/service-proxies';
// import { RecruitmentJobServiceProxy, RecruitmentSettingServiceProxy, Country, JobDTO, Qualification, ManageJobDTO, RecruitmentScoreCard, Currency, QuizDTO, RecruitmentQuizServiceProxy } from './../../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from 'app/_services/alertservice.service';

@Component({
  selector: 'ngx-newjob',
  templateUrl: './newjob.component.html',
  styleUrls: ['./newjob.component.scss']
})
export class NewjobComponent implements OnInit {

  myButton: string = 'Add a Job Posting';
  availability: string = 'Physical';
  employmentType: string = 'Full Time';
  pagetitle: string = 'Post New Job';
  newJob: boolean = false;
  allJobs:  []= [];
  jobFilter: any;
  jobsCounter: number = 0;
  allDepartments:  [] = [];
  certificationData:  [] = [];
  qualificationData:  [] = [];
  employmentTypes:  []= [];
  jobAvailability:  []= [];
  allCountries:  [] = [];
  allStates:  [] = [];
  allJobRoles:  [] = [];
  singleJob;
  loading: boolean = false;
  showModal: boolean = true;
  // newJobModel: ManageJobDTO = new ManageJobDTO();
  allScoreCards:  [] = [];
  allCurrencies:  [] = [];
  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  allQuizes:  [] = [];
  btnProcessing: boolean = false;

  constructor( private alertMe: AlertserviceService,) {
   }

  ngOnInit(): void {
    // this.fetchAllDepartments();
    // this.fetchCountries();
    // this.fetchEmploymentTypes();
    // this.fetchQualifications();
    // this.fetchAllQuizes();
    // this.fetchJobRoles();
    // this.fetchJobAvailabilty();
    // this.fetchScoreCards();
    // this.fetchCurrency();
  }

  postNewDraft(){}
  addNewJob(){}
  fetchStates(a){}

  // newJobPosting(){
  //   this.router.navigateByUrl('/recruitmentadmin/newjob');
  // }

  // addNewJob() {
  //  this.loading = true;
  //  this.job.addUpdateJob(this.newJobModel).subscribe(data => {
  //   if(!data.hasError && data.result.isSuccessful == true){
  //     this.loading = false;
  //     this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Dismiss').subscribe(res => {
  //       if(res){
  //         this.router.navigateByUrl('/recruitmentadmin/jobs/');
  //         this.fetchAllJobs();
  //       }
  //     })
  //   }
  //  }, (error) => {

  //   if (error.status == 400) {
  //     this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
  //   }
  // })
  // }

  // postNewDraft(){
  //   this.newJobModel.isDraft = true;
  //   this.loading = true;
  //   this.job.addUpdateJob(this.newJobModel).subscribe(data => {
  //   if(!data.hasError && data.result.isSuccessful == true){
  //     this.loading = false;
  //     this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Draft Saved', 'Dismiss').subscribe(res => {
  //       if(res){
  //         this.router.navigateByUrl('/recruitmentadmin/jobs/');
  //         this.fetchAllJobs();
  //       }
  //     })
  //   }
  //  })
  // }

  // async fetchCountries(){
  //   const data = await this.dataService.getCountries().toPromise();
  //   if(!data.hasError){
  //     this.allCountries = data.result;
  //   }
  // }

  // async fetchCurrency(){
  //   const data = await this.commonService.getCurrency().toPromise()
  //   if(!data.hasError){
  //     this.allCurrencies = data.result;
  //   }
  // }

  // async fetchAllQuizes(){
  //   const data = await this.quiz.getAllQuizzes().toPromise();
  //   if(!data.hasError){
  //     this.allQuizes = data.result;
  //   }
  // }



  // fetchStates(countryId){
  // this.dataService.getStateByCountryId(countryId).subscribe(data => {
  //   if(!data.hasError){
  //     this.allStates = data.result;
  //   }
  // });

  // }

  // async fetchJobRoles(){
  //   const data = await this.common.getJobRoles().toPromise();
  //   if(!data.hasError){
  //     this.allJobRoles = data.result;
  //   }
  // }

  // async fetchJobAvailabilty(){
  //   const data = await this.employment.getJobAvailabilities().toPromise();
  //   if(!data.hasError){
  //     this.jobAvailability = data.result;
  //   }
  // }


  // async fetchQualifications(){
  //   const data = await this.commonService.getQualifications().toPromise();
  //   if(!data.hasError){
  //     this.qualificationData = data.result;
  //     console.log('qualification:', this.qualificationData)
  //   }
  // }

  // async fetchEmploymentTypes(){
  //   const data = await this.employment.getEmploymentTypes().toPromise();
  //   if(!data.hasError){
  //     this.employmentTypes = data.result;
  //   }
  // }

  // async fetchAllDepartments(){
  //   const data = await this.department.getAllDepartments(10,1).toPromise();
  //   if(!data.hasError){
  //     this.allDepartments = data.result;
  //     console.log('All Departments:',this.allDepartments)
  //   }
  // }

  // async fetchSingleJob(){
  //   const data = await this.job.getJob(1).toPromise()
  //     if(!data.hasError){
  //       this.singleJob = data.result;
  //     }
  // }

  fetchAllJobs(){
    // this.job.getAllJobs(this.jobFilter).subscribe(data => {
    //   if(!data.hasError){
    //     this.allJobs = data.result;
    //     this.jobsCounter = data.totalRecord;
    //   }
    // })
  }

//   async fetchScoreCards(){
//    const data = await this.employment.getRecruitmentScoreCards().toPromise();
//    if(!data.hasError){
//      this.allScoreCards = data.result
//    }
//   }

  getSelectedEmployee(event,selectType) {
    if(selectType == 'employee'){
    //  this.newJobModel.reviewers = event[0].employeeNumber;
    }
 }

}
