import { Job } from './../../_services/service-proxies';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CountriesServiceProxy, CurrenciesServiceProxy, GradesServiceProxy, JobServiceProxy, JobTypesServiceProxy, QualificationServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, StatesServiceProxy, IDTextViewModel, CommonServiceProxy } from 'app/_services/service-proxies';

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
  certificationData: IDTextViewModel [] = [];
  qualificationData: IDTextViewModel [] = [];
  jobAvailability:  []= [];
  countryData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  skillData: IDTextViewModel [] = [];
  allJobRoles:  [] = [];
  singleJob;
  loading: boolean = false;
  showModal: boolean = true;
  allScoreCards:  [] = [];
  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";
  allQuizes:  [] = [];
  btnProcessing: boolean = false;
  jobtypeData: IDTextViewModel [] = [];
  currencyData: IDTextViewModel [] = [];
  recruiterData: IDTextViewModel [] = [];
  jobTitleData: IDTextViewModel [] = [];
  newJobModel: Job = new Job();


  constructor(private alertMe: AlertserviceService, private router: Router, private job: JobServiceProxy,
    private jobtype: JobTypesServiceProxy, private country:CountriesServiceProxy, private common: CommonServiceProxy,
    private qualification: QualificationServiceProxy, private curreny: CurrenciesServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, private skill: SkillAreasServiceProxy,
    private grade: GradesServiceProxy) {
   }

  ngOnInit(): void {
    this.fetchCountries();
    this.fetchQualifications();
    // this.fetchAllQuizes();
    // this.fetchJobRoles();
    // this.fetchJobAvailabilty();
    // this.fetchScoreCards();
    this.fetchCurrency();
    this.fetchCurrency();
    this.fetchJobType();
    this.fetchSkillAreas();
    this.fetchStates();
    this.fetchJobType();
    this.fetchRecruiters();
  }

  postNewDraft(){}


  // newJobPosting(){
  //   this.router.navigateByUrl('/recruitmentadmin/newjob');
  // }

  addNewJob() {
   this.loading = true;
   let jobModel: Job = new Job();

   this.job.postJob(this.newJobModel).subscribe(data => {
      this.loading = false;
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Dismiss').subscribe(res => {
        if(res){
          this.router.navigateByUrl('/recruitmentadmin/jobs/');
          this.fetchAllJobs();
        }
      })
   }, (error) => {

    if (error.status == 400) {
      this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
    }
  })
  }


  // async fetchAllQuizes(){
  //   const data = await this.quiz.getAllQuizzes().toPromise();
  //   if(!data.hasError){
  //     this.allQuizes = data.result;
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

  async fetchCurrency(){
    const data = await this.curreny.fetchCurrencies().toPromise()
      this.currencyData = data.value;
    }

    async fetchCountries(){
      this.country.fetchCountries().subscribe(data => {
        this.countryData = data.value;
      })

    }

  async fetchStates(){
      const data = await this.state.fetchStates().toPromise();
      this.stateData = data.value;
      console.log('All states',this.stateData)
    }

    async fetchQualifications(){
      const data = await this.qualification.fetchQualifications().toPromise();
      this.qualificationData = data.value;

    }

    async fetchJobType(){
      const data = await this.jobtype.fetchJobTypes().toPromise();
      this.jobtypeData = data.value;
    }

   async fetchSkillAreas(){
      const data = await this.skill.fetchSkillAreas().toPromise();
      this.skillData = data.value;
    }

    async fetchRecruiters(){
      const data = await this.common.fetchAllEmployers().toPromise();
      this.recruiterData = data.value;
    }

    async fetchJobTitles(){
      const data = await this.common.fetchAllJobTitles('').toPromise();
      this.jobTitleData = data.value;
    }

     getSelectedEmployee(event,selectType) {
       if(selectType == 'employee'){
        this.newJobModel.reviewers = event[0].employeeNumber;
       }
    }

}
