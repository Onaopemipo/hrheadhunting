import { CurrenciesServiceProxy, Job, JobDTO } from './../../_services/service-proxies';
import { ColumnTypes, TableAction, TableActionEvent, TableColumn } from 'app/components/tablecomponent/models';
import { Router } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { Component, OnInit } from '@angular/core';
import { IStatus, MyColor } from 'app/components/status/models';
import { CountriesServiceProxy, GradesServiceProxy, IDTextViewModel, JobServiceProxy, JobTypesServiceProxy, QualificationServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, StatesServiceProxy, CommonServiceProxy } from 'app/_services/service-proxies';

enum TP  {
VIEW ='1',DELETE = '2'
}

enum draftEnum  {
  EDIT ='1',DELETE = '2',POST = '3'
  }

enum TABS {
  postedJobs, awaitingApproval, draftedJobs
}

// export class JobWithStatus extends JobDTO implements IStatus {
//   jobStatus: JobDTO;

//   constructor(jobStatus: JobDTO) {
//     super(jobStatus);
//     this.jobStatus = jobStatus;

//   }

//   get status() {
//     return this.jobStatus.isActive;
// }
//   getStatusLabel() {
//     if (this.jobStatus.isActive === true) return 'Open';
//     if (this.jobStatus.isActive === false) return 'closed';
//   }
//   getStatusColor() {
//     if (this.jobStatus.isActive === true) return new MyColor(33,150,83);
//     if (this.jobStatus.isActive === false) return new MyColor(242, 153, 74);
//     return new MyColor(242, 0, 74);
//  }
//  }

@Component({
  selector: 'ngx-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  TABS = TABS;
  allowmultipleselection: boolean = false;
  selectionHeader: string = "Select Employee";
  addbtnText: string = "Add Employee";

  showModal = false

  showCvModal = false
  showdeleteModal = false

  emptyHeader: string = 'You have not posted any Job';
  emptyDescription: string = 'Click on the button to post a job';
  emptyButton: string = 'Add a Job Posting';

  availability: string = 'Physical';
  employmentType: string = 'Full Time';
  newJob: boolean = false;
  allJobs: Job []= [];
  allDraftJobs:  []= [];
  jobsCounter: number = 0;
  allDepartments:  [] = [];
  certificationData:  [] = [];
  jobAvailability:  []= [];
  allJobRoles:  [] = [];
  singleJob: JobDTO = new JobDTO().clone();
  tableData: string = '';
  awaitingJobsCounter: number = 0;
  draftCounter: number = 0;
  allQuizes:  [] = [];
  allScoreCards:  [] = [];

  countryData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  courseData: IDTextViewModel[] = [];
  qualificationData: IDTextViewModel [] = [];
  sectorData: IDTextViewModel [] = [];
  skillData: IDTextViewModel [] = [];
  employerTypeData: IDTextViewModel [] = [];
  gradeData: IDTextViewModel [] = [];
  recruiterData: IDTextViewModel [] = [];

  rButton = [
    {name: 'a', label: 'Add New', icon: 'plus'},
  ]

  postedJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'availability', title: 'Availability'},
    {name: 'experience', title: 'Experience(Months)'},
    {name: 'postValidityTo', title: 'Valid To', type: ColumnTypes.Date},
    {name: 'isActive', title: 'Job Status', type: ColumnTypes.Status},
  ];

  scheduledJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
    {name: 'scheduledDate', title: 'Scheduled Date'},
  ];

  draftedJobsTable: TableColumn [] = [
    {name: 'jobTitle', title: 'Job Title'},
    {name: 'department', title: 'Department'},
  ];

tableActions: TableAction [] = [
  {name: TP.VIEW, label: 'View'},
{name: TP.DELETE, label: 'Delete'},
]

draftTableActions: TableAction [] = [
  {name: draftEnum.EDIT, label: 'Edit'},
  {name: draftEnum.POST, label: 'Post'},
  {name: draftEnum.DELETE, label: 'Delete'},
]

// tableActionClicked(event: TableActionEvent){
//   if(event.name==TP.VIEW){
//     this.showJob = true;
//     this.job.getJob(event.data.id).subscribe(data => {
//       if(!data.hasError){
//         this.singleJob = data.result;
//       }
//     })
//     }

//     else if(event.name==TP.DELETE){
//     this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '','Yes').subscribe(dataAction => {
//       if(dataAction){
//         this.job.deleteJob(event.data.id).subscribe(data => {
//           if(!data.hasError){
//             this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Successfully Deleted', 'Dismiss').subscribe(res => {
//               this.fetchAllJobs();
//               this.router.navigateByUrl('/recruitmentadmin/jobs');
//             })
//           }
//         })
//       }
//     }, (error) => {

//       if (error.status == 400) {
//         this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
//       }
//     })
//       }
// }

// draftTableActionClicked(event: TableActionEvent){
//   if(event.name==draftEnum.EDIT){


//     }

//     else if(event.name==draftEnum.DELETE){
//     this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '','Yes').subscribe(dataAction => {
//       if(dataAction){
//         this.job.deleteJob(event.data.id).subscribe(data => {
//           if(!data.hasError){
//             this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Successfully Deleted', 'Dismiss').subscribe(res => {
//               this.router.navigateByUrl('/recruitmentadmin/jobs');
//             })
//           }
//         })
//       }
//     })
//       }
//       else if(event.name == draftEnum.POST){
//         this.job.toggleJob(event.data.id).subscribe(data => {
//           if(!data.hasError){
//             this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Dismiss')
//           }
//         }, (error) => {

//           if (error.status == 400) {
//             this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
//           }
//         })
//       }
// }

  getTableActions (){
    if(TABS.postedJobs){
      this.tableActions = [{name: 'posted', label:'Posted'},
      {name: 'disburse', label:'Disburse'},
    ]
    } else if(TABS.awaitingApproval){
      this.tableActions = [{name: 'view', label:'View'},
      // {name: 'disburse', label:'Disburse'},
    ]
    } else if(TABS.draftedJobs){
      this.tableActions = [{name: 'view', label:'View'},
      // {name: 'disburse', label:'Disburse'},
    ]
    }
  }

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

  selectedTab = TABS.postedJobs;

  selectedOption;
  loading: boolean;
  showJob: boolean = false;
  jobtypeData: IDTextViewModel [] = [];
  currencyData: IDTextViewModel [] = [];
  newJobModel: Job = new Job();

  constructor( private alertMe: AlertserviceService, private router: Router, private job: JobServiceProxy,
    private jobtype: JobTypesServiceProxy, private country:CountriesServiceProxy,
    private qualification: QualificationServiceProxy, private curreny: CurrenciesServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, private skill: SkillAreasServiceProxy,
    private grade: GradesServiceProxy, private common: CommonServiceProxy ) {
   }

  ngOnInit(): void {
    this.fetchAllJobs();
    // this.fetchEmploymentTypes();
    // this.fetchAllDraft();
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

  selectTab(tab: TABS) {
    this.selectedTab = tab;
  }

  newJobPosting(){
    this.router.navigateByUrl('newjob');
  }

  updateJob() {
    this.loading = true;
    this.newJobModel.id = this.singleJob.id;
    this.newJobModel.recruiter = this.singleJob.recruiter;
    this.newJobModel.maxQualificationId = this.singleJob.maxQualificationId;
    this.newJobModel.maxSalary = this.singleJob.maxSalary;
    this.newJobModel.minQualificationId = this.singleJob.minQualificationId;
    this.newJobModel.minSalary = this.singleJob.minSalary;
    this.newJobModel.position = this.singleJob.position;
    this.newJobModel.requirements = this.singleJob.requirements;
    this.newJobModel.minExpRequired = this.singleJob.minExpRequired;
    this.newJobModel.maxExpRequired = this.singleJob.maxExpRequired;
    this.newJobModel.skillAreaId = this.singleJob.skillAreaId;
    this.newJobModel.stateId = this.singleJob.stateId;
    this.newJobModel.countryId = this.singleJob.countryId;
    this.job.postJob(this.newJobModel).subscribe(data => {
    if(5){
      this.loading = false;
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Dismiss').subscribe(res => {
        if(res){
          // this.router.navigateByUrl('/recruitmentadmin/jobs');
          // this.fetchAllJobs();
        }
      })
    }
   }, (error) => {

    if (error.status == 400) {
      this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
    }
  });
  }

  // deleteJob(){
  //   this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, '','Yes').subscribe(res => {
  //     if(res){
  //       this.job.deleteJob(1).subscribe(data => {
  //         if(!data.hasError){
  //           this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Job Deleted!', 'Dismiss').subscribe(res => {
  //             if(res){
  //               this.router.navigateByUrl('/recruitmentadmin/jobs');
  //               this.fetchAllJobs();
  //             }
  //           });
  //         }
  //       }, (error) => {

  //         if (error.status == 400) {
  //           this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
  //         }
  //       });
  //     }
  //   })
  // }



  // async fetchJobRoles(){
  //   const data = await this.common.getJobRoles().toPromise();
  //   if(!data.hasError){
  //     this.allJobRoles = data.result;
  //   }
  // }

  async fetchCurrency(){
    const data = await this.curreny.fetchCurrencies().toPromise()
      this.currencyData = data.value;
    }

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

  async fetchSingleJob(){
    const data = await this.job.getJobById(1).toPromise()
      if(!data.hasError){
        this.singleJob = data.value;
      }
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

  actionClicked(event: TableActionEvent){
    if (event.name === TP.VIEW){
      this.showCvModal = true
    }

    if (event.name === TP.DELETE){
      this.showdeleteModal = true
    }

  }
  showMasterSearchModal(){
    this.showModal = true
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
   getSelectedEmployee(event,selectType) {
     if(selectType == 'employee'){
      this.newJobModel.reviewers = event[0].employeeNumber;
     }
  }


  }


