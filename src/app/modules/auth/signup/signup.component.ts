import { SubscriptionFeatureDTO, SubscriptionPlanFeatureDTO, MessageOut, PaymentServiceProxy } from './../../../_services/service-proxies';
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
import * as firebase from 'firebase/app';
import { AuthenticationService } from 'app/_services/authentication.service';
import { NgForm } from '@angular/forms';
import { initializeApp } from 'firebase/app';
@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  applicantForm  = NgForm;
  employerForm = NgForm;
  consultantForm  = NgForm;
  selectedAccount: number = 0;
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
  // googleData = [];
  // facebookData = [];
  // linkedInData = [];
  // twitterData = [];
  googleData: any;
  facebookData: any;
  linkedInData: any [] = [];
  twitterData: any;
  subscriptionPlanId:number = 0;
  reference:string = '';
  tempRef: string = '';
  paymentLoading:boolean = false;
  socialSignup: UserLoginDTO = new UserLoginDTO();
  cvPlan: SubscriptionFeatureDTO [] = [];
  recruiterPlan: SubscriptionFeatureDTO [] = [];
  allPlans: SubscriptionPlanFeatureDTO [] = [];
  planFeatures
  planAmount: number = 0;
  employerEmail: string = '';
  emailPrompt: boolean = false;
  socialLogin: UserLoginDTO = new UserLoginDTO();
  today: Date = new Date();
  minAgeVal: Date = new Date();
  loading: boolean = false;
  btn: boolean = false;
  // minDate: Date = new Date();
  minDate: string = '';
  testAmount:number = 20000;
  foreignInstitution: number = 0;
  applicantNames = [];


  constructor(private route: Router, private loginServices: AccountServiceProxy, private alertMe: AlertserviceService,
    private institution: InstitutionServiceProxy, private country:CountriesServiceProxy, private title: TitlesServiceProxy,
    private course: CourseServiceProxy, private qualification: QualificationServiceProxy, private employment: EmployerTypesServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, private skill: SkillAreasServiceProxy,
    private social: AuthService, private sub: SubscriptionsServiceProxy, private http: HttpClient, private router: ActivatedRoute,
    private grade: GradesServiceProxy, private common: CommonServiceProxy, private AuthenService: AuthenticationService,
    private VerifySubscriptionPaymentService: PaymentServiceProxy) { }
  gotoSetup() {
    this.route.navigate(['/onboarding/accountsetup']);
  }
  ngOnInit(): void {
    // console.log('Your date:',this.minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
    this.fetchInstitution();
    this.fetchCountries();
    this.fetchCourses();
    this.fetchQualifications();
    this.fetchStates();
    this.fetchSectors();
    this.fetchSkillAreas();
    this.fetchEmploymentTypes();
    this.fetchGrades();
    this.fetchTitle();
    this.fetchSubscriptions();
    this.fetchGenders();
    this.fetchRecruiterSub();
    this.fetchCVPlan();
    this.minAgeCal();

  }

  minAgeCal(){
    let dateObj = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    let month:any = dateObj.getMonth() + 1; //months from 1-12
    let day:any  = dateObj.getDate();
    let year = dateObj.getFullYear();
    if(day<10){
      day= '0'+ day;
    }
    if(month<10){
      month = '0'+ month;
    }
    this.minDate = year + "-" + month + "-" + day;
    // document.getElementById("dob").setAttribute("min", this.minDate);
    // this.minDate = year + "-" + month + "-" + day;
    // var today = new Date();
    // var minAge = 18;
    // $scope.dob = ($filter)('date')(new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate()), 'yyyy-MM-dd');
    // $scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    // let today = new Date();
    // let minAge = 18;
    // console.log(this.today);
    // this.minAgeVal = new Date(this.today.getFullYear() - minAge, this.today.getMonth(), this.today.getDate());
    // console.log('Your min date', this.minAgeCal)
  }

  otherSchool(e){
    this.foreignInstitution = e;
  }

   paymentInit() {
    this.paymentLoading = true;
    // this.registerEmployer();
   }
  paymentCancel() {
    console.log('cancel')
    this.paymentLoading = false;
  }
  paymentDone(event) {
    console.log('success', event)
    if(event.status === 'success'){
      this.servicePayment = false;
      this.verifyPayment();
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Go to dashboard').subscribe(res => {
        if(res){
          this.employer = new ManageEmployerDTO();
          this.route.navigateByUrl('modules')
        }
      })

    }

  }

  testpaymentDone(event) {
    console.log('success', event)
    if(event.status === 'success'){
      this.psychoTest = false;
      this.registerApplicant();
      // this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Success', 'Go to dashboard').subscribe(res => {
      //   if(res){
      //     this.employer = new ManageEmployerDTO();
      //     this.route.navigateByUrl('modules')
      //   }
      // })

    }

  }

  verifyPayment() {
    this.VerifySubscriptionPaymentService.verifyEmployerPayment(this.reference,this.employerEmail.toString()).subscribe(data => {
      this.paymentLoading = false;
      if (!data.hasError) {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Go to Dashboard').subscribe(res => {
          if(res){
            this.route.navigateByUrl('/')
          }
        });
      } else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, "Payment Failed, Please try again", 'OK');
    }
  })
}

cancelPay() {
  this.servicePayment = false;
}

  proceedNow(e){
    this.employersStatus = false;
    this.subPlan = true;
    this.jobSeekerStatus = false;
    this.consultantStatus = false;
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


  getBase64(event) {
    console.log(event)
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    this.jobSeeker.resume = reader.result.toString();
    console.log(this.jobSeeker.resume);
    reader.onload = function () {
      // this.artisanModel.brandLogo = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

 handleCvFileSelect(evt){
  var files = evt.target.files;
  var file = files[0];
  console.log('My file size', file);

if(files && file && (file.size < 524888 || file.type == "image/png || image/jpg")) {
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
}

else {
  this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Check your file type or size', 'OK')

}
}

handleVideoFileSelect(evt){
  var files = evt.target.files;
  var file = files[0];
  console.log('My file size', file);

if(files && file && (file.size < 524888 || file.type == "mp4")) {
    var reader = new FileReader();
    reader.onload =this._handleVideoReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
}

else {
  this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, 'Check your file type or size', 'OK')

}
}

_handleVideoReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.jobSeeker.videoResume= btoa(binaryString);
         console.log(btoa(binaryString));
 }

_handleReaderLoaded(readerEvt) {
 var binaryString = readerEvt.target.result;
        this.jobSeeker.resume= btoa(binaryString);
        console.log(btoa(binaryString));
}
  toggleJobSeekers(){
    this.employersStatus = false;
    this.consultantStatus = false;
    this.jobSeekerStatus = true;
    this.subPlan = false;

  }

  toggleEmpoyers(){
    this.jobSeekerStatus = false;
    this.consultantStatus = false;
    this.employersStatus = true;
    this.subPlan = false;
  }

  toggleConsultants(){
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

  addSocialEmail(){
    this.btnProcessing = true;
    let login: UserLoginDTO = new UserLoginDTO();
    login.email = this.socialLogin.email;
    login.password = this.socialLogin.password;
    this.btnProcessing = false;
    this.emailPrompt = false;
    this.loginServices.getToken(this.socialLogin).subscribe(data => {
      if(!data.hasError){
        console.log(data);
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'You are authenticated', 'Go to dashboard').subscribe(res => {
          if(res){
            this.route.navigateByUrl('/')
          }
        })
        this.AuthenService.addUser(data.result);
      }
    })
  }

  doLinkedIn(){
    // let configUrl = 'https://www.linkedin.com/oauth/v2/authorization?client_id=78yijd3zifrl4b&redirect_uri=https://headhunting-79281.firebaseapp.com/__/auth/handler&scope=r_liteprofile%20r_emailaddress&response_type=code';
  //  let configUrl = "https://api.linkedin.com/v2/me";
   let configUrl = 'https://www.linkedin.com/oauth/v2/authorization'
    let paramsData = new HttpParams().set("client_id",'78yijd3zifrl4b')
    .set("redirect_uri", 'http://localhost:5000/')
    .set("scope", 'r_liteprofile r_emailaddress')
    .set("response_type", 'code')
    this.http.get(configUrl).subscribe(data => {
      console.log('LinkedIn data is here',data);

    })
   }

  doGoogle(){
    this.social.doGoogleLogin().then(data => {
      this.googleData = data.providerData;
      console.log('You are', this.googleData);
      this.socialLogin.isSocial = true;
      this.socialLogin.email = this.googleData.email;
      this.applicantNames = this.googleData.displayName.split(' ');
      this.socialLogin.firstName = this.applicantNames[1];
      this.socialLogin.lastName = this.applicantNames[0];
      console.log(this.applicantNames + 'I am', this.socialLogin.firstName + 'Last Name:' + this.socialLogin.lastName)
      if(this.socialLogin.email){
        this.loginServices.getToken(this.socialLogin).subscribe(data => {
          if(!data.hasError){
            console.log(data);
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'You are authenticated', 'Go to dashboard').subscribe(res => {
              if(res){
                this.route.navigateByUrl('/')
              }
            })
            this.AuthenService.addUser(data.result);
          }
        })

      }else {
        this.emailPrompt = true;
      }

    });
  }

  doFacebook(){
    this.social.doFacebookLogin().then(data => {
      this.facebookData = data.providerData;;
      console.log('See your Facebook data',this.facebookData.displayName);
      this.socialLogin.isSocial = true;
      this.socialLogin.email = this.facebookData.email;
      this.applicantNames = this.facebookData.displayName.split(' ');
      this.socialLogin.firstName = this.applicantNames[0];
      this.socialLogin.lastName = this.applicantNames[1];
      console.log(this.applicantNames + 'I am', this.socialLogin.firstName + 'Last Name:' + this.socialLogin.lastName)
      if(this.socialLogin.email){
        this.loginServices.getToken(this.socialLogin).subscribe(data => {
          if(!data.hasError){
            console.log(data);
            this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'You are authenticated', 'Go to dashboard').subscribe(res => {
              if(res){
                this.route.navigateByUrl('/')
              }
            })
            this.AuthenService.addUser(data.result);
          }
        })

      }else {
        this.emailPrompt = true;
      }

    });
  }

   doTwitter(){
     this.social.doTwitterLogin().then(data => {
       this.twitterData = data;
       console.log('Here is you Twitter', this.twitterData);
       this.socialLogin.isSocial = true;
       this.socialLogin.email = this.twitterData.email;
       this.applicantNames = this.twitterData.displayName.split(' ');
       this.socialLogin.firstName = this.applicantNames[0];
       this.socialLogin.lastName = this.applicantNames[1];
       console.log(this.applicantNames + 'I am', this.socialLogin.firstName + 'Last Name:' + this.socialLogin.lastName)
       if(this.socialLogin.email){
         this.loginServices.getToken(this.socialLogin).subscribe(data => {
           if(!data.hasError){
             console.log(data);
             this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'You are authenticated', 'Go to dashboard').subscribe(res => {
               if(res){
                 this.route.navigateByUrl('/')
               }
             })
             this.AuthenService.addUser(data.result);
           }
         })

       }else {
         this.emailPrompt = true;
       }

     });
   }



async fetchRecruiterSub(){
  const data = await this.sub.fetchRecruiterPlanFeatures().toPromise()
  if(!data.hasError){
    this.recruiterPlan = data.value;
    this.allPlans = data.value[0].plans;
    // this.planPrice
    this.planFeatures = data.value.map(x => x.plans)
    console.log('My Plans', this.allPlans)
    console.log('My Plans features', this.recruiterPlan)
  }
}

async fetchCVPlan(){
  const data = await this.sub.fetchCvRewritePlanFeatures().toPromise()
  if(!data.hasError){
    this.cvPlan = data.value;
    console.log('My CV Plans', this.cvPlan)
  }
}

// doLinkedIn(){
//  let configUrl = "https://www.linkedin.com/oauth/v2/authorization?client_id=78yijd3zifrl4b&redirect_uri=https://headhunting-79281.firebaseapp.com/__/auth/handler&scope=r_liteprofile%20r_emailaddress&response_type=code";
//  let paramsData = new HttpParams().set("client_id",'78yijd3zifrl4b')
//  .set("redirect_uri", 'http://localhost:5000/')
//  .set("scope", 'r_liteprofile r_emailaddress')
//  .set("response_type", 'code')
//  this.http.get(configUrl).subscribe(data => {
//    console.log('LinkedIn data is here',data);
//  })
// }

// doTwitter(){
//   this.social.doTwitterLogin().then(data => {
//     this.twitterData = data;
//     console.log('Here is you Twitter', this.twitterData);
//     this.socialSignup.isSocial = true;
//     this.socialSignup.firstName = this.twitterData.displayName;
//     this.socialSignup.email = this.twitterData.email;
//     console.log('Your name is:', this.socialSignup.firstName, this.socialSignup.email);
//     if(this.socialSignup.email.length > 0){
//       this.account.getToken(this.socialSignup).subscribe(data => {
//         if(!data.hasError){
//           this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, '', 'OK').subscribe(res => {
//             if(res){
//               this.route.navigateByUrl('/')
//             }
//           })
//           this.AuthenService.addUser(data.result);
//         }
//       })
//     }
//   })
// }

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

  dayManipulate(object) {

    var startTime = new Date(new Date(object.date).toISOString());
    let localDate = new Date().toLocaleString();
    console.log("Diff: ", (startTime.getTimezoneOffset() * -1) / 60);
    console.log("local: ", localDate);
    startTime = new Date(startTime.getTime() + (startTime.getTimezoneOffset() * -60000));
    let dateObj = new Date(object.date);

    let day = dateObj.getDate().toString();
    console.log(day)
    day = +day < 10 ? '0' + day : day;
    let month = (dateObj.getMonth() + 1).toString();
    month = +month < 10 ? '0' + month : month;
    let year = dateObj.getFullYear();
    let formattedDate = year + "-" + month + "-" + day;
    object.date = formattedDate;
    console.log(object.date)
    return object;
  }




  registerApplicant(){
    this.btnProcessing = true;
    this.loading = true;
    let applicant: ManageJobSeekerRegDTO = new ManageJobSeekerRegDTO();
    applicant.titleId = Number(this.jobSeeker.titleId);
    applicant.firstName = this.jobSeeker.firstName;
    applicant.lastname = this.jobSeeker.lastname;
    applicant.email = this.jobSeeker.email;
    // applicant.nationalityId = Number(this.jobSeeker.nationalityId);
    applicant.genderId = Number(this.jobSeeker.genderId);
    // applicant.gradeId = Number(this.jobSeeker.gradeId);
    // applicant.institutionId = Number(this.jobSeeker.institutionId);
    // applicant.isPresentEmployment = this.jobSeeker.isPresentEmployment;
    applicant.phoneNumber = this.jobSeeker.phoneNumber;
    // applicant.stateOfInterestId = Number(this.jobSeeker.stateOfInterestId);
    // applicant.yearOfExperience = this.jobSeeker.yearOfExperience;
    // applicant.workStartDate = this.jobSeeker.workStartDate;
    // applicant.workEndDate = this.jobSeeker.workEndDate;
    // applicant.availabilityDuration = this.jobSeeker.availabilityDuration;
    // applicant.briefDescription = this.jobSeeker.briefDescription;
    // applicant.videoResume = this.jobSeeker.videoResume;
    // applicant.resume = this.jobSeeker.resume;
    applicant.password = this.jobSeeker.password;
    // applicant.
    applicant.residentialStateId =  Number(this.jobSeeker.residentialStateId);
    // applicant.institutionName = this.jobSeeker.institutionName;
    // applicant.qualificationId =  Number(this.jobSeeker.qualificationId);
    // applicant.qualificationStartDate = this.jobSeeker.qualificationStartDate;
    // applicant.qualificationEndDate = this.jobSeeker.qualificationEndDate;
    // applicant.fieldOfInterestId = Number(this.jobSeeker.fieldOfInterestId);
    console.log('Your dob',this.jobSeeker.dateOfBirth)
    applicant.dateOfBirth = this.jobSeeker.dateOfBirth;
    // applicant.courseOfStudyId = Number(this.jobSeeker.courseOfStudyId);
    this.loginServices.applicantSignUp(applicant).subscribe(data => {
      this.btnProcessing = false;
      this.loading = false;
      if(!data.hasError){
        // this.testAmount = data.result.amount;
        // if(this.testAmount > 0){
        //   this.psychoTest = true;
        // }
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Finish Setup').subscribe(res => {
          if(res){
            this.jobSeeker = new ManageJobSeekerRegDTO();
            this.route.navigateByUrl('/auth/login');
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
    employerVal.referenceNumber = this.reference;
    this.employerEmail = this.employer.email;
    this.loginServices.employerSignUp(employerVal).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        console.log(data)
        this.planAmount = data.result.amount;
        if(this.planAmount > 0){
          this.servicePayment = true;
        } else {
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Finish Setup').subscribe(res => {
            if(res){
              this.employer = new ManageEmployerDTO();
              this.route.navigateByUrl('modules')
            }
          })
        }

      } else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'OK')
      }
    })
  }

  registerConsultant(){
    this.btn = true;
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
    this.loginServices.consultantSignUp(consultant).subscribe(data => {
      this.btn = false;
      if(!data.hasError){
        this.consultantModel = new ManageConsultantDTO();
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Finish Setup').subscribe(res => {
          if(res){
            // this.route.navigateByUrl('dashboard')
            this.route.navigateByUrl('/consdash')
          }
        })
      } else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'OK')
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

  async fetchStates(){
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
    this.jobSeekerStatus = true;
    this.isConsultant = false;
    this.isEmployer = false;
    this.pageNo = this.pageNo + 1;
  }

  selectedOption1(){
    this.isEmployer = true;
    this.employersStatus = true;
    this.isSeeker = false;
    this.isConsultant = false;
    this.pageNo = this.pageNo + 1;
  }
  selectedOption2(){
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
