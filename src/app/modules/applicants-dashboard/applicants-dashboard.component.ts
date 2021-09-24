// import { CLIENT_MENU_ITEMS } from './../pages-menu';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AuthenticationService } from 'app/_services/authentication.service';
// import { CLIENT_MENU_ITEMS } from '../pages-menu';

@Component({
  selector: 'ngx-applicants-dashboard',
  templateUrl: './applicants-dashboard.component.html',
  styleUrls: ['./applicants-dashboard.component.scss']
})
export class ApplicantsDashboardComponent implements OnInit {
  privilege: any = '';
  show: boolean = true;
  // menu = CLIENT_MENU_ITEMS;
  menu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: '/assets/icons/home.png',
      link: 'appdash/',
    },

    {
      title: 'Job Applications',
      icon: '/assets/icons/job.png',
      link: '/appdash/applications',
    },

    {
      title: 'Quiz',
      icon: '/assets/icons/test.png',
      link: '/appdash/quiz',

    },

    {
      title: 'My Subscription',
      icon: '/assets/icons/consultant.png',
      link: '/appdash/subscription',
    },

    {
      title: 'CV Rewrite',
      icon: '/assets/icons/test.png',
      link: '/applicants/scorecv',

    },


    {
      title: 'Upload CV',
      icon: '/assets/icons/cvrewrite.png',
      link: '/appdash/uploadcv',
    },

    {
      title: 'My Profile',
      icon: '/assets/icons/consultant.png',
      link: '/appdash/profile',
    },

    {
      title: 'Change Password',
      icon: '/assets/icons/settings.png',
      link: '/appdash/password',
      // hidden: this.show,

      // hidden : this.privilege.lstPermissions ='ASS'? true:false
    },
  ];


  constructor(public auth: AuthenticationService,
    ) {
    this.privilege = this.auth.globalUser.value;
    console.log('Hey', this.privilege)
  }

  ngOnInit(): void {
    this.getPrivilege();

  }

  async getPrivilege(){
    this.privilege = await this.auth.globalUser;
    // console.log('Yes ke',this.privilege[0].value.lstPermissions);
    // console.log('Hey guy',this.privilege[0].lstPermissions[0]);
  }


}
