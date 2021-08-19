import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AuthenticationService } from 'app/_services/authentication.service';
// import { EMP_MENU_ITEMS } from '../pages-menu';

@Component({
  selector: 'ngx-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.scss']
})
export class EmployerDashboardComponent implements OnInit {
  menu: NbMenuItem[] = [

  ]
  privilege: string[] = [];
  show:boolean;
  user:string = '';
  // menu = EMP_MENU_ITEMS;
  // menu: NbMenuItem[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: '/assets/icons/home.png',
  //     link: '/modules/dashboard',
  //   },

  //   {
  //     title: 'Jobs',
  //     icon: '/assets/icons/job.png',
  //     link: '/modules/jobs',
  //   },

  //   {
  //     title: 'Applications',
  //     icon: '/assets/icons/user.png',
  //     link: '/modules/selection',
  //   },

  //   {
  //     title: 'Psychometric',
  //     icon: '/assets/icons/test.png',
  //     link: '/modules/quiz',
  //   },

  //   {
  //     title: 'Training',
  //     icon: '/assets/icons/consultant.png',
  //     link: '/modules/training',
  //   },

  //   {
  //     title: 'Settings',
  //     icon: '/assets/icons/settings.png',
  //     link: '/modules/settings',
  //   },

  //   {
  //     title: 'Change Password',
  //     icon: '/assets/icons/settings.png',
  //     link: '/appdash/password',
  //     hidden: this.auth.users[0]!='ROLE_ADMIN'? true:false
  //   },
  // ];
  // privilege: string[] = [];



  constructor(public auth: AuthenticationService) { }

  ngOnInit(): void {
      this.auth.getuser().then(data => {
        this.privilege.push(data[0].lstPermissions);
        console.log('Yes ke',data[0].lstPermissions)
        this.user = this.privilege.pop();
        console.log('Here is your privilege:', this.privilege.pop())
        if(this.user == "RSS"){
          this.show = true;
          this.menu = [
            {
              title: 'Dashboard',
              icon: '/assets/icons/home.png',
              link: '/empdash',
            },

            {
              title: 'Jobs',
              icon: '/assets/icons/job.png',
              link: '/modules/jobs',
            },

            {
              title: 'Applications',
              icon: '/assets/icons/user.png',
              link: '/modules/selection',
            },

            {
              title: 'Test',
              icon: '/assets/icons/test.png',
              link: '/modules/quiz',
            },

            {
              title: 'Artisans',
              icon: '/assets/icons/carpenter.png',
              link: '/modules/artisans',
              hidden: this.show
            },

            {
              title: 'Consultants',
              icon: '/assets/icons/consultant.png',
              link: '/modules/consultants',
              hidden: this.show
            },

            {
              title: 'Training',
              icon: '/assets/icons/consultant.png',
              link: '/modules/training',
            },

            {
              title: 'Report',
              icon: '/assets/icons/report.png',
              link: '/modules/report',
              hidden: this.show,
            },

            {
              title: 'Settings',
              icon: '/assets/icons/settings.png',
              link: '/modules/settings',
            },

          ];
          console.log(this.show)
        } else {
          this.show = false;
          console.log(this.show)
          this.menu = [
            {
              title: 'Dashboard',
              icon: '/assets/icons/home.png',
              link: '/empdash',
            },

            {
              title: 'Jobs',
              icon: '/assets/icons/job.png',
              link: '/modules/jobs',
            },

            {
              title: 'Applications',
              icon: '/assets/icons/user.png',
              link: '/modules/selection',
            },

            {
              title: 'Test',
              icon: '/assets/icons/test.png',
              link: '/modules/quiz',
            },

            {
              title: 'Artisans',
              icon: '/assets/icons/carpenter.png',
              link: '/modules/artisans',
              hidden: this.show
            },

            {
              title: 'Consultants',
              icon: '/assets/icons/consultant.png',
              link: '/modules/consultants',
              hidden: this.show
            },

            {
              title: 'Training',
              icon: '/assets/icons/consultant.png',
              link: '/modules/training',
            },

            {
              title: 'Report',
              icon: '/assets/icons/report.png',
              link: '/modules/report',
              hidden: this.show,
            },

            {
              title: 'Settings',
              icon: '/assets/icons/settings.png',
              link: '/modules/settings',
            },

          ];
        }
        // alert(this.show)
        // this.usermy();
      });
  }
  // menu: NbMenuItem[] = [

  //   {
  //     title: 'Dashboard',
  //     icon: '/assets/icons/home.png',
  //     link: '/modules',
  //     hidden : this.privilege[0] !== 'RSS'? true:false,
  //   },

  //   {
  //     title: 'Dashboard',
  //     icon: '/assets/icons/home.png',
  //     link: '/empdash',
  //     hidden : this.privilege.indexOf[0] == "RSS"? true:false
  //   },

  //   {
  //     title: 'Jobs',
  //     icon: '/assets/icons/job.png',
  //     link: '/modules/jobs',
  //   },

  //   {
  //     title: 'Job Applications',
  //     icon: '/assets/icons/job.png',
  //     link: '/appdash/applications',
  //     hidden : this.privilege[0] !=="ASS"? true:false
  //   },

  //   {
  //     title: 'Applications',
  //     icon: '/assets/icons/user.png',
  //     link: '/modules/selection',
  //   },

  //   {
  //     title: 'Test',
  //     icon: '/assets/icons/test.png',
  //     link: '/modules/quiz',
  //   },

  //   {
  //     title: 'Artisans',
  //     icon: '/assets/icons/carpenter.png',
  //     link: '/modules/artisans',
  //     hidden : this.privilege[0] === "RSS" ? true:false
  //   },

  //   {
  //     title: 'Consultants',
  //     icon: '/assets/icons/consultant.png',
  //     link: '/modules/consultants',
  //     hidden : this.privilege[0] ==="RSS"? true:false
  //   },

  //   {
  //     title: 'Training',
  //     icon: '/assets/icons/consultant.png',
  //     link: '/modules/training',
  //   },

  //   {
  //     title: 'Report',
  //     icon: '/assets/icons/report.png',
  //     link: '/modules/report',
  //     hidden : this.privilege[0] === "RSS"? true:false
  //   },

  //   {
  //     title: 'Settings',
  //     icon: '/assets/icons/settings.png',
  //     link: '/modules/settings',
  //   },

  // ];

}
