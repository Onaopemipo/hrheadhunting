import { State } from 'app/_services/service-proxies';
import { state } from '@angular/animations';
import { AccountServiceProxy, ManageJobSeekerRegDTO, ApiServiceProxy, Qualification, ManageEmployerDTO, Country, Course, Sector, SkillArea, Institution, EmployerType } from './../../../_services/service-proxies';
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
  institutionData: Institution [] = [];
  countryData: Country [] = [];
  stateData: State [] = [];
  courseData: Course[] = [];
  qualificationData: Qualification [] = [];
  sectorData: Sector [] = [];
  skillData: SkillArea [] = [];
  employerTypeData: EmployerType [] = [];

  constructor(private route: Router, private applicant: AccountServiceProxy, private alertMe: AlertserviceService,
    private apis: ApiServiceProxy) { }
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
  }

  toggleTest(){
    this.psychoTest = true;
  }

  toggleJob(e){
    this.currentWork = e;
  }

  registerApplicant(){
    this.applicant.applicantSignUp(this.jobSeeker).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, '', 'OK')
      }
    })
  }

  async fetchInstitution(){
    const data = await this.apis.institutionGet().toPromise();
    this.institutionData = data.value;
    console.log(data)
  }

  async fetchEmploymentTypes(){
    const data = await this.apis.employerTypesGet().toPromise();
    this.employerTypeData = data.value;
  }

  async fetchCourses(){
    this.apis.courseGet().subscribe(res => {
      this.courseData = res.value;
   });
  }

  async fetchCountries(){
    this.apis.countriesGet().subscribe(data => {
      this.countryData = data.value;
    })

  }

  async fetchStates(){
    const data = await this.apis.statesGet().toPromise();
    this.stateData = data.value;
    console.log('All states',this.stateData)
  }
  async fetchQualifications(){
    const data = await this.apis.qualificationGet().toPromise();
    this.qualificationData = data.value;

  }

  async fetchSkillAreas(){
    const data = await this.apis.skillAreasGet().toPromise();
    this.skillData = data.value;
  }

  async fetchGrades(){
    // const data = await this.apis.().toPromise();
    // console.log(data)
  }

  async fetchSectors(){
    this.apis.sectorsGet().subscribe(data => {
      this.sectorData = data.value;
    });

  }

  proceed(){}
  cancel(){}

  nextPage(){
    this.pageNo = 1;
  }


  viewpassword() {
    this.show = !this.show;
  }

}
