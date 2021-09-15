import { AlertserviceService } from '../../../_services/alertservice.service';
import { Transfer } from '@flowjs/ngx-flow';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { Router } from '@angular/router';
import { ApplicantProfileDTO, ApplicantServiceProxy, CommonServiceProxy, GradesServiceProxy, IDTextViewModel, SubscriptionsServiceProxy, TitlesServiceProxy, JobSeekerEducation, ManageJobSeekerQualificationDTO, AccountServiceProxy, ManageJobSeekerExperienceDTO, JobSeekerExperience, ManageJobSeekerPreferenceDTO } from 'app/_services/service-proxies';
import { InstitutionServiceProxy, CourseServiceProxy, QualificationServiceProxy,
  StatesServiceProxy, SectorsServiceProxy, SkillAreasServiceProxy, CountriesServiceProxy, EmployerTypesServiceProxy } from '../../../_services/service-proxies';
import { ManageJobSeekerRegDTO } from 'app/_services/service-proxies-0109';


@Component({
  selector: 'ngx-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.scss']
})
export class ApplicantProfileComponent implements OnInit {

  interviewType = [
    {id: 0, label:'Oral'},
    {id: 1, label:'Written'},
  ]

//  getbtnaction(actionname) {
//     if (actionname == 'dashboard') {
//       this.router.navigate(['/employeemodule/employeebulkupload'])
//     }
//     if (actionname == 'profile') {
//       this.router.navigate(['/employeemodule/viewemployeerecords'])
//     }

//     if (actionname == 'preference') {
//       this.router.navigate(['/employeemodule/viewemployeerecords'])
//     }
//   }

  pageTitle: string = 'Profile';
  // title: string = 'Set up your account';
  src: string = 'assets/icons/camera.jpg';
  selectedPanel: string = '';
  showModulesModal = false;
  modalPosition = 'Center';
  reference:string = '';
  beginSetup = true;
  share: boolean = false;
  updateProfile: boolean = false;
  newWork: boolean = false;
  emptyHeader:string = 'Nothing here';
  emptyDescription:string = 'You do not have any data here yet';
  isApplicant: boolean = false;
  isInterviewer: boolean = false;
  isAdmin: boolean = true;
  applicantId: number = 0;
  skills: [] = [];
  addReferences: boolean = false;
  addSkiils: boolean = false;
  addEducation: boolean = false;
  // preferenceModel: ManageJobPreferenceDto = new ManageJobPreferenceDto();
  btnprocessing: boolean = false;
  tempRef:string;
  Entity: IDTextViewModel[] = [];
  entityId:number = 0;
  countryData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  courseData: IDTextViewModel[] = [];
  qualificationData: IDTextViewModel [] = [];
  sectorData: IDTextViewModel [] = [];
  skillData: IDTextViewModel [] = [];
  employerTypeData: IDTextViewModel [] = [];
  gradeData: IDTextViewModel [] = [];
  titleData: IDTextViewModel [] = [];
  jobPreference:boolean = false;
  btnProcessing:boolean = false;
  tempJobRole: string [] = [];
  tempJobType: string [] = [];
  tempIndustry: string [] = [];
  tempJobLevel: string [] = [];
  tempSalary: string [] = [];
  institutionData: IDTextViewModel[] = [];
  jobLevelData: IDTextViewModel[] = [];
  genderData: IDTextViewModel[] = [];
  workChecker:boolean = false;
  currentWork:boolean = false;
  isPresentEmployment:boolean = false;
  expereinceData: string = '';
  userlogin: ManageJobSeekerRegDTO = new ManageJobSeekerRegDTO();
  applicantQualification: ManageJobSeekerQualificationDTO = new ManageJobSeekerQualificationDTO();
  applicantProfile: ApplicantProfileDTO = new ApplicantProfileDTO();
  applicantEducationData: JobSeekerEducation [] = [];
  applicantExperienceData: JobSeekerExperience [] = [];
  foreignInstitution: number = 0;
  preferenceModel: ManageJobSeekerPreferenceDTO = new ManageJobSeekerPreferenceDTO();
  applicantExperience: ManageJobSeekerExperienceDTO = new ManageJobSeekerExperienceDTO();


  constructor(iconsLibrary: NbIconLibraries, private router: ActivatedRoute, private route: Router,private alertMe: AlertserviceService,
    private institution: InstitutionServiceProxy, private country:CountriesServiceProxy, private title: TitlesServiceProxy,
    private course: CourseServiceProxy, private qualification: QualificationServiceProxy, private employment: EmployerTypesServiceProxy,
    private state: StatesServiceProxy, private sector: SectorsServiceProxy, private skill: SkillAreasServiceProxy, private applicant: ApplicantServiceProxy,
    private grade: GradesServiceProxy, private common: CommonServiceProxy,) {
    iconsLibrary.registerFontPack('ion', { iconClassPrefix: 'ion' });
    iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    iconsLibrary.registerFontPack('far', { packClass: 'far', iconClassPrefix: 'fa' });
  }
  ngOnInit(): void {
    // this.applicantId = Number(this.route.snapshot.paramMap.get("id"));
    // this.tempRef = `ref-${Math.ceil(Math.random() * 10e13)}`;
    // this.profile.getApplicantById(this.applicantId = Number(this.route.snapshot.paramMap.get("id"))).subscribe(data => {
    //   if(!data.hasError){
    //     this.profileData = data.result;
    //     this.expereinceData = JSON.parse(data.result.workExperience);
    //     console.log(this.expereinceData);
    //   }
    // })
    this.fetchQualification()
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
    this.fetchGenders();
    this.fetchProfile();
    this.fetchWorkExperience();

  }

  async fetchProfile() {
    const data = await this.applicant.getMyProfile().toPromise()
    if(!data.hasError){
      this.applicantProfile = data.value;
      console.log('Here is my profile', this.applicantProfile)
    }
  }

  toggleJob(e){
    this.currentWork = e;
    this.isPresentEmployment = e;
    this.applicantExperience.isPresentEmployment = e;
    console.log(this.currentWork);
  }

  otherSchool(e){
    this.foreignInstitution = e;
  }

  addWorkExperience(){
    this.btnprocessing = true;
    this.applicant.addUpdateWorkExperience(this.applicantExperience).subscribe(data => {
      this.btnprocessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, "Ok").subscribe(done => {
          if(done){
            this.jobPreference = false;
          }
        })
      }

      else {
        this.btnprocessing = false;
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'Ok')
      }
    })
  }

  deleteExperience(id){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.CONFIRM, 'Do you want to delete Experience?', 'Ok').subscribe(yes => {
      if(yes){
        this.applicant.deleteWorkExperience(id).subscribe(data => {

        })
      }
    })
  }

  addQualification() {
    this.btnprocessing = true;
    let applicant = new ManageJobSeekerQualificationDTO();
    applicant.institutionName = this.applicantQualification.institutionName;
    applicant.qualificationId =  Number(this.applicantQualification.qualificationId);
    applicant.qualificationStartDate = this.applicantQualification.qualificationStartDate;
    applicant.qualificationEndDate = this.applicantQualification.qualificationEndDate;
    applicant.courseOfStudyId = Number(this.applicantQualification.courseOfStudyId);
    applicant.gradeId = Number(this.applicantQualification.gradeId);
    applicant.institutionId = Number(this.applicantQualification.institutionId);
    this.applicant.addUpdateQualification(applicant).subscribe(data => {
      this.btnprocessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, "OK").subscribe(done => {
          if(done){
            this.addEducation = false;
          }
        })
      }
      else {
        this.btnprocessing = false;
      }
    })
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
           this.userlogin.videoResume= btoa(binaryString);
           console.log(btoa(binaryString));
   }

  _handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.userlogin.resume= btoa(binaryString);
          console.log(btoa(binaryString));
  }

  async fetchQualification(){
    const data = await this.applicant.fetchMyEducations(10,1).toPromise();
    if(!data.hasError){
      this.applicantEducationData = data.value;
    }
  }

  async fetchWorkExperience(){
    const data = await this.applicant.fetchMyWorkExperiences(10,1).toPromise();
    if(!data.hasError){
      this.applicantExperienceData = data.value;
    }
  }


  selectedFile(files: Transfer, title) {
     const refNumber =  this.tempRef
    console.log('temp ref', this.tempRef)
    if (this.Entity.length > 0) {
      let srchR = this.Entity.find(f => f.text == "Apllicant Document");
      this.entityId = srchR.id;
    }
  }

  editProfile(){
    this.updateProfile = !this.updateProfile;
  }

  toggle(e){

  }


  toggleNewWork(){
    this.newWork = !this.newWork
  }

  toggleSkills(){
    this.addSkiils = !this.addSkiils

  }

  updateWorkExperience(){

  }

  addPreference(){
    this.btnProcessing = true;
    let jobPref = new ManageJobSeekerPreferenceDTO();
    jobPref.fieldOfInterestId = Number(this.preferenceModel.fieldOfInterestId);
    jobPref.stateOfInterestId = Number(this.preferenceModel.stateOfInterestId);
    jobPref.availabilityDuration = this.preferenceModel.availabilityDuration;
    jobPref.yearOfExperience = this.preferenceModel.yearOfExperience;
    this.applicant.updateJobPreference(jobPref).subscribe(data => {
      if(!data.hasError){
        this.fetchProfile();
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Preference Added', 'Dismiss').subscribe(res => {
          this.jobPreference = false;

        })
      } else {
        this.btnProcessing = false;
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'Ok')
      }
    })
  }

  updateSkills(){

  }

  toggleEducation(){
    this.addEducation = !this.addEducation;
  }

  toggleJobPreference(){
    this.jobPreference = true;
  }

  toggleReferences(){
    this.addReferences = !this.addReferences
  }

  addNewWork(){
    this.newWork = !this.newWork;
  }

  updateMyProfile(){
    this.btnprocessing = true;
    // this.updateProfile = !this.updateProfile;
    this.userlogin.firstName = this.applicantProfile.firstName;
    this.userlogin.lastname = this.applicantProfile.lastname;
    this.userlogin.phoneNumber = this.applicantProfile.phoneNumber;
    this.userlogin.fieldOfInterestId = Number(this.applicantProfile.fieldOfInterestId);
    this.userlogin.yearOfExperience = this.applicantProfile.yearOfExperience;
    this.userlogin.availabilityDuration = this.applicantProfile.availabilityDuration;
    this.userlogin.password = 'paw#$3Qsdss';
    this.userlogin.residentialStateId = Number(this.applicantProfile.residentialStateId);
    this.applicant.updateMyProfile(this.userlogin).subscribe(data => {
      this.btnprocessing = false;
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES, data.message, 'Ok').subscribe(done => {
          this.fetchProfile();
          this.updateProfile = false;
        })
      }
    }, (error) => {
      this.btnProcessing = false;
      if (error.status == 400) {
        this.alertMe.openCatchErrorModal(this.alertMe.ALERT_TYPES.FAILED, error.title, "OK", error.errors);
      }
    })

  }


  toggleShareProfile(){
    this.share = true;
  }

  async fetchTitle(){
    const data = await this.title.fetchTitles().toPromise();
    this.titleData = data.value;
    console.log(data)
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

}
