import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonServiceProxy, GradesServiceProxy, IDTextViewModel, ManageConsultantDTO, SubscriptionsServiceProxy, TitlesServiceProxy, UserLoginDTO } from 'app/_services/service-proxies';
import { AccountServiceProxy, ManageJobSeekerRegDTO,ManageEmployerDTO,InstitutionServiceProxy, CourseServiceProxy, QualificationServiceProxy,
  StatesServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, CountriesServiceProxy, EmployerTypesServiceProxy } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { OrdersChartData } from 'app/@core/data/orders-chart';
import { ApplicantsComponent } from 'app/modules/applicants/applicants.component';
import { AuthService } from 'app/_services/auth.service';
import { PaystackOptions } from 'angular4-paystack';
import * as firebase from 'firebase';
@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // applicantForm = NgForm;
  selectedAccount: number = 0;
  seekerForm: boolean = false;
  empForm: boolean = false;
  consForm: boolean = false;
  isSeeker: boolean = false;
  isEmployer: boolean = false;
  isConsultant: boolean = false;
  actPick: string ='';
  actPickEmployer: string ='';
  actPickconsultant: string ='';
  jobSeekerStatus: boolean = false;
  employersStatus: boolean = false;
  consultantStatus: boolean = false;
  show: boolean = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  btnprocessing: boolean = false;
  errorMsg: string = '';
  pageNo: number = 0;
  subPlan: boolean = false;
  psychoTest: boolean = false;
  btnProcessing: boolean = true;
  servicePayment: boolean = false;
  currentWork: boolean = false;
  jobSeeker: ManageJobSeekerRegDTO = new ManageJobSeekerRegDTO();
  employer: ManageEmployerDTO = new ManageEmployerDTO();
  institutionData: IDTextViewModel [] = [];
  countryData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  courseData: IDTextViewModel[] = [];
  qualificationData: IDTextViewModel [] = [];
  sectorData: IDTextViewModel [] = [];
  skillData: IDTextViewModel [] = [];
  employerTypeData: IDTextViewModel [] = [];
  gradeData: IDTextViewModel [] = [];
  titleData: IDTextViewModel [] = [];
  subscriptionData: IDTextViewModel [] = [];
  genderData: IDTextViewModel [] = [];
  consultantModel:ManageConsultantDTO = new ManageConsultantDTO();
  planStatus: boolean = false;
  googleData: any;
  facebookData: any [] = [];
  linkedInData: any [] = [];
  twitterData: any [] = [];
  subscriptionPlanId:number = 0;
  reference:string = '';
  tempRef: string = '';
  paymentLoading:boolean = false;
  socialSignup: UserLoginDTO = new UserLoginDTO();

  constructor(private route: Router, private account: AccountServiceProxy, private alertMe: AlertserviceService,
    private institution: InstitutionServiceProxy, private country:CountriesServiceProxy, private title: TitlesServiceProxy,
    private course: CourseServiceProxy, private qualification: QualificationServiceProxy, private employment: EmployerTypesServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, private skill: SkillAreasServiceProxy,
    private social: AuthService, private sub: SubscriptionsServiceProxy, private http: HttpClient, private router: ActivatedRoute,
    private grade: GradesServiceProxy, private common: CommonServiceProxy ) { }
  gotoSetup() {
    this.route.navigate(['/onboarding/accountsetup']);
  }
  ngOnInit(): void {
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.fetchInstitution();
    this.fetchCountries();
    this.fetchCourses();
    this.fetchQualifications();
    // this.fetchStates();
    this.fetchSectors();
    this.fetchSkillAreas();
    this.fetchEmploymentTypes();
    this.fetchGrades();
    this.fetchTitle();
    this.fetchSubscriptions();
    this.fetchGenders();
  }


   paymentInit() {
    this.paymentLoading = true;
    this.registerEmployer();
   }
  paymentCancel() {
    console.log('cancel')
    this.paymentLoading = false;
  }
  paymentDone(e) {
    console.log('success', e)
    // this.verifyPayment()
  }

  verifyPayment() {
  //   this.VerifySubscriptionPaymentService.verifySubscriptionPayment(this.reference,this.regUserId.toString()).subscribe(data => {
  //     this.paymentLoading = false;
  //     if (!data.hasError) {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'OK');
  //       this.proceedtomodules();
  //       this.getPlanModulesbyPlanId();
  //       this.activateModuleSelection = true;
  //     } else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, "Payment Failed, Please try again", 'OK');
  //   }
  // })
}

  proceedNow(e){
    this.employersStatus = false;
    this.subPlan = true;
    this.seekerForm = false;
    this.consForm = false;
    this.empForm = true;
    this.jobSeekerStatus = false;
    this.consultantStatus = false;
    // alert(e);
    // this.subPlan = !this.subPlan;
    switch(e){
      case 0: this.subscriptionPlanId = 0; break;
      case 1: this.subscriptionPlanId = 1; break;
      case 2: this.subscriptionPlanId = 2; break;
      case 3: this.subscriptionPlanId = 3; break;
      case 4: this.subscriptionPlanId = 4; break;
    }

    console.log('Your plan Id is:', this.subscriptionPlanId);
  }

  toggleTest() {
    this.psychoTest = true;
  }

  handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
  }


  _handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          // this.artisanModel.brandLogo= btoa(binaryString);
          console.log(btoa(binaryString));
  }
  toggleJobSeekers(){
    this.consForm = false;
    this.empForm = false;
    this.seekerForm = true;
    this.employersStatus = false;
    this.consultantStatus = false;
    this.jobSeekerStatus = true;
    this.subPlan = false;

  }

  toggleEmpoyers(){
    this.seekerForm = false;
    this.consForm = false;
    this.empForm = true;
    this.jobSeekerStatus = false;
    this.consultantStatus = false;
    this.employersStatus = true;
    this.subPlan = false;
  }

  toggleConsultants(){
    this.empForm = false;
    this.seekerForm = false;
    this.consForm = true;
    this.employersStatus = false;
    this.subPlan = false;
    this.jobSeekerStatus = false;
    this.consultantStatus = true;
  }

  async fetchSubscriptions(){
    const data = await this.sub.fetchSubscriptions().toPromise();
    this.subscriptionData = data.value;
    console.log(this.subscriptionData)
  }

login(){
  this.social.doGoogleLogin().then(data => {
    this.googleData = data;
    // let name = this.googleData[0].displayName;

    console.log('You are', this.googleData)
    this.socialSignup.isSocial = true;
    this.socialSignup.email = this.googleData.email;
    this.socialSignup.firstName = this.googleData.displayName;
    // this.socialSignup.lastname = this.googleData.displayName;
    this.socialSignup.password = this.googleData.uid;
    this.account.getToken(this.socialSignup).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, '', 'OK').subscribe(res => {
          if(res){
            this.route.navigateByUrl('applicants/dashbaord/')
          }
        })
      }
    })
  });
}

doFacebook(){
  this.social.doFacebookLogin().then(data => {
    this.facebookData = data;
    console.log('See your Facebook data',this.facebookData.values);
    this.socialSignup.isSocial = true;
    // this.socialSignup.firstName = this.facebookData.displayName;
    // this.socialSignup.lastName = this.facebookData.displayName;
    this.socialSignup.password = this.googleData.uid;
    // socialSignup.email = this.facebookData.
    this.account.getToken(this.socialSignup).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, '', 'OK').subscribe(res => {
          if(res){
            this.route.navigateByUrl('applicants/dashbaord/')
          }
        })
      }
    })
  });
}

doLinkedIn(){
 let configUrl = "https://www.linkedin.com/oauth/v2/authorization";
 let paramsData = new HttpParams().set("client_id",'78yijd3zifrl4b')
 .set("redirect_uri", 'https://headhunting-79281.firebaseapp.com/__/auth/handler')
 .set("scope", '@N^^^#@622jbdfjhdfhjdfh')
 let configData = "https://api.linkedin.com/v2/me";
 this.http.get(configUrl, {params: paramsData}).subscribe(data => {
   console.log('LinkedIn data is here',data);
 })
}

doTwitter(){
  this.social.doTwitterLogin().then(data => {
    this.twitterData = data;
    console.log('Here is you Twitter', this.twitterData);
  })
}

  async fetchTitle(){
    const data = await this.title.fetchTitles().toPromise();
    this.titleData = data.value;
    console.log(data)
  }



  toggleJob(e){
    this.currentWork = e;
    console.log(e);
  }

  changeGend(event){
    this.jobSeeker.genderId = event;
  }

  registerApplicant(){
    this.btnProcessing = true;
    let applicant: ManageJobSeekerRegDTO = new ManageJobSeekerRegDTO();
    applicant.titleId = Number(this.jobSeeker.titleId);
    applicant.firstName = this.jobSeeker.firstName;
    applicant.lastname = this.jobSeeker.lastname;
    applicant.email = this.jobSeeker.email;
    applicant.nationalityId = Number(this.jobSeeker.nationalityId);
    applicant.genderId = Number(this.jobSeeker.genderId);
    applicant.gradeId = Number(this.jobSeeker.gradeId);
    applicant.institutionId = Number(this.jobSeeker.institutionId);
    applicant.isPresentEmployment = this.jobSeeker.isPresentEmployment;
    applicant.phoneNumber = this.jobSeeker.phoneNumber;
    applicant.stateOfInterestId = Number(this.jobSeeker.stateOfInterestId);
    applicant.yearOfExperience = this.jobSeeker.yearOfExperience;
    applicant.workStartDate = this.jobSeeker.workStartDate;
    applicant.workEndDate = this.jobSeeker.workEndDate;
    applicant.availabilityDuration = this.jobSeeker.availabilityDuration;
    applicant.briefDescription = this.jobSeeker.briefDescription;
    applicant.videoResume = this.jobSeeker.videoResume;
    applicant.resume = this.jobSeeker.resume;
    applicant.password = this.jobSeeker.password;
    applicant.residentialStateId =  Number(this.jobSeeker.residentialStateId);
    applicant.institutionName = this.jobSeeker.institutionName;
    applicant.qualificationId =  Number(this.jobSeeker.qualificationId);
    applicant.qualificationStartDate = this.jobSeeker.qualificationStartDate;
    applicant.qualificationEndDate = this.jobSeeker.qualificationEndDate;
    applicant.fieldOfInterestId = Number(this.jobSeeker.fieldOfInterestId);
    applicant.dateOfBirth = this.jobSeeker.dateOfBirth;
    applicant.courseOfStudyId = Number(this.jobSeeker.courseOfStudyId);

    console.log(applicant);
    this.account.applicantSignUp(applicant).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'OK').subscribe(res => {
          if(res){
            this.jobSeeker = new ManageJobSeekerRegDTO();
            this.route.navigateByUrl('/')
          }
        })
      }
      else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'OK')
      }
    });
  }

  registerEmployer(){
    this.btnProcessing = true;
    let employerVal = new ManageEmployerDTO();
    employerVal.firstName = this.employer.firstName;
    employerVal.lastName = this.employer.lastName;
    employerVal.name = this.employer.name;
    employerVal.email = this.employer.email;
    employerVal.mobile = this.employer.mobile;
    employerVal.contactPerson = this.employer.contactPerson;
    employerVal.password = this.employer.password;
    employerVal.confirmPassword = this.employer.confirmPassword;
    employerVal.employerTypeId = Number(this.employer.employerTypeId);
    employerVal.sectorId = Number(this.employer.sectorId);
    employerVal.stateId = Number(this.employer.stateId);
    employerVal.subscriptionPlanId = this.subscriptionPlanId;
    console.log('Sub plan:', employerVal.subscriptionPlanId);
    this.account.employerSignUp(employerVal).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        console.log(data)
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'OK').subscribe(res => {
          if(res){
            this.employer = new ManageEmployerDTO();
          // this.route.navigateByUrl('dashboard');
          this.route.navigateByUrl('modules')
          }
        })
      } else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'OK')
      }
    })
  }

  registerConsultant(){
    this.btnProcessing = true;
    let consultant = new ManageConsultantDTO();
    consultant.name = this.consultantModel.name;
    consultant.firstName = this.consultantModel.firstName;
    consultant.lastName = this.consultantModel.lastName;
    consultant.email = this.consultantModel.email;
    consultant.mobile = this.consultantModel.mobile;
    consultant.contactPerson = this.consultantModel.contactPerson;
    consultant.sectorId = Number(this.consultantModel.sectorId);
    consultant.subscriptionPlanId = 0;
    consultant.address = this.consultantModel.address;
    consultant.password = this.consultantModel.password;
    consultant.confirmPassword = this.consultantModel.confirmPassword;
    this.account.consultantSignUp(consultant).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'OK').subscribe(res => {
          if(res){
            // this.route.navigateByUrl('dashboard')
            this.route.navigateByUrl('modules')
          }
        })
        console.log('Consultant Added!');
        alert('Consultant Added!')
      }
    })
  }

  async fetchInstitution(){
    const data = await this.institution.fetchInstitutions().toPromise();
    this.institutionData = data.value;
    console.log(data);
  }

  async fetchEmploymentTypes(){
    const data = await this.employment.fetchEmployerTypes().toPromise();
    this.employerTypeData = data.value;
  }

  async fetchCourses(){
    this.course.fetchCourses().subscribe(res => {
      this.courseData = res.value;
      console.log(this.countryData)
   });
  }

  async fetchCountries(){
    this.country.fetchCountries().subscribe(data => {
      this.countryData = data.value;
    });

  }

  async fetchStates(countryId){
    const data = await this.state.fetchStates().toPromise();
    this.stateData = data.value;
    console.log('All states', this.stateData);
  }
  async fetchQualifications(){
    const data = await this.qualification.fetchQualifications().toPromise();
    this.qualificationData = data.value;

  }

  async fetchSkillAreas(){
    const data = await this.skill.fetchSkillAreas().toPromise();
    this.skillData = data.value;
  }

  async fetchGrades(){
    const data = await this.grade.fetchGrades().toPromise();
    this.gradeData = data.value;
    console.log(data)
  }

  async fetchSectors(){
    this.sector.fetchSectors().subscribe(data => {
      this.sectorData = data.value;
    });

  }

  async fetchGenders(){
    this.common.fetchGenders().subscribe(data => {
      this.genderData = data.value;
    });

  }

  selectedOption(){
    this.isSeeker = true;
    this.seekerForm = true;
    this.jobSeekerStatus = true;
    this.isConsultant = false;
    this.isEmployer = false;
    this.pageNo = this.pageNo + 1;
  }

  selectedOption1(){
    this.isEmployer = true;
    this.empForm = true;
    this.employersStatus = true;
    this.isSeeker = false;
    this.isConsultant = false;
    this.pageNo = this.pageNo + 1;
  }
  selectedOption2(){
    this.consForm = true;
    this.isConsultant = true;
    this.consultantStatus = true;
    this.isSeeker = false;
    this.isEmployer = false;
    this.pageNo = this.pageNo + 1;
  }

  proceed(){
    this.psychoTest = false;
    this.servicePayment = true;
  }

  dashboard(){
    this.route.navigateByUrl('/applicants/')
  }
  cancel(){
    this.servicePayment = false;
    this.psychoTest = false;
  }

  nextPage(){
    if(this.selectedAccount == 0){
      this.jobSeekerStatus = true;
      this.pageNo = this.pageNo + 1;
    }

    else if(this.selectedAccount == 1){
      this.employersStatus = true;
      this.pageNo = this.pageNo + 1;
    }

    else if(this.selectedAccount == 2){
      this.consultantStatus = true;
      this.pageNo = this.pageNo + 1;
    }

    // alert(this.selectedAccount)
  }


  viewpassword() {
    this.show = !this.show;
  }

}
