import { title } from 'process';
import { Job } from '../../_services/service-proxies';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { CountriesServiceProxy,ManageJobDTO, CurrenciesServiceProxy, GradesServiceProxy, JobServiceProxy, JobTypesServiceProxy, QualificationServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, StatesServiceProxy, IDTextViewModel, CommonServiceProxy } from 'app/_services/service-proxies';

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
  allJobs:  [] = [];
  jobFilter: any;
  jobsCounter: number = 0;
  allDepartments:  [] = [];
  countryData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  courseData: IDTextViewModel[] = [];
  qualificationData: IDTextViewModel [] = [];
  sectorData: IDTextViewModel [] = [];
  skillData: IDTextViewModel [] = [];
  employerTypeData: IDTextViewModel [] = [];
  gradeData: IDTextViewModel [] = [];
  employmentTypes:  [] = [];
  jobAvailability:  [] = [];
  allCountries:  [] = [];
  allStates:  [] = [];
  allJobRoles:  [] = [];
  singleJob;
  loading: boolean = false;
  showModal: boolean = true;
  allScoreCards:  [] = [];
  allowmultipleselection: boolean = false;
  selectionHeader: string = 'Select Employee';
  addbtnText: string = 'Add Employee';
  allQuizes:  [] = [];
  btnProcessing: boolean = false;
  jobtypeData: IDTextViewModel [] = [];
  currencyData: IDTextViewModel [] = [];
  recruiterData: IDTextViewModel [] = [];
  jobTitleData: IDTextViewModel [] = [];
  newJobModel: ManageJobDTO = new ManageJobDTO();
  titleFilter: {
    searchText: ''
  }


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
    // this.fetchJobAvailabilty();
    // this.fetchScoreCards();
    this.fetchCurrency();
    this.fetchCurrency();
    this.fetchJobType();
    this.fetchSkillAreas();
    this.fetchStates();
    this.fetchJobType();
    this.fetchRecruiters();
    // this.fetchJobTitles();
  }

  postNewDraft(){}


  // newJobPosting(){
  //   this.router.navigateByUrl('/recruitmentadmin/newjob');
  // }

  addNewJob() {
   this.btnProcessing = true;
   console.log(this.newJobModel)
   let jobModel: ManageJobDTO = new ManageJobDTO();
   jobModel.position = this.newJobModel.position;
   jobModel.jobTypeId = Number(this.newJobModel.jobTypeId);
   jobModel.recruiter = this.newJobModel.recruiter;
   jobModel.requirements = this.newJobModel.requirements;
   jobModel.details = this.newJobModel.details;
   jobModel.location = this.newJobModel.location;
   jobModel.stateId = Number(this.newJobModel.stateId);
   jobModel.countryId = Number(this.newJobModel.countryId);
   jobModel.minExpRequired = this.newJobModel.minExpRequired;
   jobModel.maxExpRequired = this.newJobModel.maxExpRequired;
   jobModel.minQualificationId = Number(this.newJobModel.minQualificationId);
   jobModel.maxQualificationId = Number(this.newJobModel.maxQualificationId);
   jobModel.endDate = this.newJobModel.endDate;
   jobModel.currencyId = Number(this.newJobModel.currencyId);
   jobModel.quizId = Number(this.newJobModel.quizId);
   jobModel.minSalary = this.newJobModel.minSalary;
   jobModel.maxSalary = this.newJobModel.maxSalary;
   jobModel.skillAreaId = Number(this.newJobModel.skillAreaId);
   this.job.postJob(jobModel).subscribe(data => {
      this.btnProcessing = false;
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Dismiss').subscribe(res => {
        if(res){
          this.router.navigateByUrl('modules/jobs');
          this.newJobModel = new ManageJobDTO();
        }
      })
   }, (error) => {

    if (error.status == 400) {
      this.btnProcessing = false;
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

    // async fetchJobTitles(){
    //   const data = await this.common.fetchAllJobTitles(this.titleFilter.searchText).toPromise();
    //   this.jobTitleData = data.value;
    // }

    //  getSelectedEmployee(event,selectType) {
    //    if(selectType == 'employee'){
    //     this.newJobModel.reviewers = event[0].employeeNumber;
    //    }
    // }

}
