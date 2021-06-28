import { GradesServiceProxy, IDTextViewModel } from 'app/_services/service-proxies';
import { AccountServiceProxy, ManageJobSeekerRegDTO,ManageEmployerDTO,InstitutionServiceProxy, CourseServiceProxy, QualificationServiceProxy,
  StatesServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, CountriesServiceProxy, EmployerTypesServiceProxy } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { OrdersChartData } from 'app/@core/data/orders-chart';
@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // applicantForm = NgForm;
  // employerForm = NgForm;
  jobSeekerStatus: boolean = true;
  employersStatus: boolean = false;
  show: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  btnprocessing: boolean = false;
  errorMsg: string = "";
  pageNo: number = 1;
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

  constructor(private route: Router, private account: AccountServiceProxy, private alertMe: AlertserviceService,
    private institution: InstitutionServiceProxy, private country:CountriesServiceProxy,
    private course: CourseServiceProxy, private qualification: QualificationServiceProxy, private employment: EmployerTypesServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, private skill: SkillAreasServiceProxy,
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
  }

  toggleTest(){
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



  toggleJob(e){
    this.currentWork = e;
  }

  registerApplicant(){
    this.account.applicantSignUp(this.jobSeeker).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, '', 'OK')
      }
    })
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
    console.log(data)
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

  selectedOption(){

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
