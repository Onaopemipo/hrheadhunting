import { AuthService } from 'app/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
// import { MENU_ITEMS } from './pages-menu';
import { AuthenticationService } from 'app/_services/authentication.service';
import { resolve } from 'dns';
@Component({
  selector: 'ngx-modules',
  templateUrl: './modules.component.html',
})
export class ModulesComponent implements OnInit {

  menu: NbMenuItem[] = [

  ]
  privilege: string[] = [];
  show:boolean;
  user:string = '';


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
            link: '/modules',
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

  async usermy(){
    const data = await this.auth.getuser();
    this.privilege = data[0].lstPermissions;
    console.log('Yes ke',data[0].lstPermissions)
    console.log('Here is your privilege:', this.privilege)


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
  //     hidden: this.show
  //   },

  //   {
  //     title: 'Applications',
  //     icon: '/assets/icons/user.png',
  //     link: '/modules/selection',
  //     hidden: this.show

  //   },

  //   {
  //     title: 'Test',
  //     icon: '/assets/icons/test.png',
  //     link: '/modules/quiz',
  //     hidden: this.show

  //   },

  //   {
  //     title: 'Artisans',
  //     icon: '/assets/icons/carpenter.png',
  //     link: '/modules/artisans',
  //     hidden: this.show
  //   },

  //   {
  //     title: 'Consultants',
  //     icon: '/assets/icons/consultant.png',
  //     link: '/modules/consultants',
  //     hidden: this.show
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
  //     hidden : this.privilege[0] !== 'RSS'? true:false,
  //   },

  //   {
  //     title: 'Settings',
  //     icon: '/assets/icons/settings.png',
  //     link: '/modules/settings',
  //   },

  // ];


}
