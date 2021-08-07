import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { AuthenticationService } from 'app/_services/authentication.service';
import { DashboardData, DashboardDTO, DashboardServiceProxy, IDTextViewModel } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  src: string = 'assets/icons/camera.jpg';
  show_modal = false;
  optionsForPie: any;
  myPieOptions: any = {};
  recruitmentSkillData: DashboardData [] = [];
  recruitmentOvertimeData: DashboardData [] = [];
  applicantAgeData: DashboardData [] =  [];
  Announcement: [] = [];
  Request: [] = [];
  totalConsultants: number = 0
  totalApplicants: number = 0
  totalEmployers: number = 0
  jobPosted: number = 0;
  skillData: IDTextViewModel [] = [];
  stateData: IDTextViewModel [] = [];
  sectorData: IDTextViewModel [] = [];
  dashboardData: DashboardDTO = new DashboardDTO();
  yearFilter = {
    year: undefined
  }


  loggedInUser: any;
  constructor(private theme: NbThemeService, private dashboard: DashboardServiceProxy, private auth: AuthenticationService) {

  }

  onInit() {

  }



  getUser(){
    this.loggedInUser = this.auth.getuser();
    console.log('See your user', this.loggedInUser);

  }


  ngOnInit(): void {
    this.fetchDashboardData();
    this.getUser();
  }

  openModal() {
    this.show_modal = true;
  }

  closeModal() {
    this.show_modal = false;
  }

  ngOnDestroy(): void {
    // this.themeSubscription.unsubscribe();
  }



  async fetchDashboardData() {
    const data = await this.dashboard.fetchDashboardData(this.yearFilter.year).toPromise();
    this.dashboardData = data.value;
    this.jobPosted = data.value.aggregateData.jobPosted;
    this.totalEmployers = data.value.aggregateData.totalEmployers;
    this.totalApplicants = data.value.aggregateData.totalApplicants;
    this.totalConsultants = data.value.aggregateData.totalConsultants;
    this.recruitmentOvertimeData = data.value.lstRecruitmentOverTimeData;
    this.applicantAgeData = data.value.lstApplicantAgeRangeData;
    this.recruitmentSkillData = data.value.lstSkillSetData;
    console.log('yo baby',this.dashboardData);
  }


}
