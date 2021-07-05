import { GradesServiceProxy, IDTextViewModel, TitlesServiceProxy } from 'app/_services/service-proxies';
import { AccountServiceProxy, ManageJobSeekerRegDTO,ManageEmployerDTO,InstitutionServiceProxy, CourseServiceProxy, QualificationServiceProxy,
  StatesServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, CountriesServiceProxy, EmployerTypesServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { OrdersChartData } from 'app/@core/data/orders-chart';
import { ApplicantsComponent } from 'app/modules/applicants/applicants.component';
import { AuthService } from 'app/_services/auth.service';
@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // applicantForm = NgForm;
  // employerForm = NgForm;
  actPick: string ='';
  actPickEmployer: string ='';
  jobSeekerStatus: boolean = true;
  employersStatus: boolean = false;
  show: boolean = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  btnprocessing: boolean = false;
  errorMsg: string = '';
  pageNo: number = 0;
  psychoTest: boolean = false;
  btnProcessing: boolean = false;
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

  constructor(private route: Router, private account: AccountServiceProxy, private alertMe: AlertserviceService,
    private institution: InstitutionServiceProxy, private country:CountriesServiceProxy, private title: TitlesServiceProxy,
    private course: CourseServiceProxy, private qualification: QualificationServiceProxy, private employment: EmployerTypesServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, private skill: SkillAreasServiceProxy,
    private social: AuthService,
    private grade: GradesServiceProxy ) { }
  gotoSetup() {
    this.route.navigate(['/onboarding/accountsetup']);
  }
  ngOnInit(): void {
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
  }

  toggleTest() {
    this.psychoTest = true;
  }

  toggleJobSeekers(){
    this.jobSeekerStatus = true;
    this.employersStatus = false;
  }

  toggleEmpoyers(){
    this.employersStatus = true;
    this.jobSeekerStatus = false;

  }

login(){
  // this.social.doGoogleLogin()
  // this.social.doRegister(value)
  // .then(res => {
  //   console.log(res);
  //   this.errorMessage = "";
  //   this.successMessage = "Your account has been created";
  // }, err => {
  //   console.log(err);
  //   this.errorMessage = err.message;
  //   this.successMessage = "";
  // })
}

  async fetchTitle(){
    const data = await this.title.fetchTitles().toPromise();
    this.titleData = data.value;
    console.log(data)
  }



  toggleJob(e){
    this.currentWork = e;
  }

  registerApplicant(){
    let applicant: ManageJobSeekerRegDTO = new ManageJobSeekerRegDTO();
    applicant.titleId = this.jobSeeker.titleId;
    applicant.firstName = this.jobSeeker.firstName;
    applicant.lastname = this.jobSeeker.lastname;
    applicant.nationalityId = this.jobSeeker.nationalityId;
    applicant.genderId = this.jobSeeker.genderId;
    applicant.gradeId = this.jobSeeker.gradeId;
    applicant.institutionId = this.jobSeeker.institutionId;
    applicant.isPresentEmployment = this.jobSeeker.isPresentEmployment;
    applicant.phoneNumber = this.jobSeeker.phoneNumber;
    applicant.stateOfInterestId = this.jobSeeker.stateOfInterestId;
    applicant.yearOfExperience = this.jobSeeker.yearOfExperience;
    applicant.workStartDate = this.jobSeeker.workStartDate;
    applicant.workEndDate = this.jobSeeker.workEndDate;
    applicant.availabilityDuration = this.jobSeeker.availabilityDuration;
    applicant.briefDescription = this.jobSeeker.briefDescription;
    applicant.videoResume = this.jobSeeker.videoResume;
    applicant.resume = this.jobSeeker.resume;
    applicant.password = this.jobSeeker.password;
    applicant.residentialStateId = this.jobSeeker.residentialStateId;
    applicant.institutionName = this.jobSeeker.institutionName;
    applicant.qualificationId = this.jobSeeker.qualificationId;
    applicant.qualificationStartDate = this.jobSeeker.qualificationStartDate;
    applicant.qualificationEndDate = this.jobSeeker.qualificationEndDate;
    applicant.fieldOfInterestId = this.jobSeeker.fieldOfInterestId;

    this.account.applicantSignUp(this.jobSeeker).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, '', 'OK')
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
    this.account.employerSignUp(employerVal).subscribe(data => {
      this.btnProcessing = false;
      if(!data.hasError){
        console.log(data)
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, '', 'OK')
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

  selectedOption(e){
    this.actPick = e;
    this.actPickEmployer = '';
    console.log(e)
  }

  selectedEmployer(e){
    this.actPickEmployer = e
    this.actPick = ''
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
    this.pageNo = this.pageNo + 1;
  }


  viewpassword() {
    this.show = !this.show;
  }

}
