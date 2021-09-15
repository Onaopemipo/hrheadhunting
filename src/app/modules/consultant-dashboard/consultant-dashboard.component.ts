import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-consultant-dashboard',
  templateUrl: './consultant-dashboard.component.html',
  styleUrls: ['./consultant-dashboard.component.scss']
})
export class ConsultantDashboardComponent implements OnInit {
  menu: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: '/assets/icons/home.png',
      link: 'appdash/',
    },

    {
      title: 'Training',
      icon: '/assets/icons/consultant.png',
      link: '/consdash/training',
    },

    {
      title: 'My Profile',
      icon: '/assets/icons/consultant.png',
      link: '/consdash/profile',
    },

    {
      title: 'My Transaction',
      icon: '/assets/icons/consultant.png',
      link: '/consdash/transaction',
    },

    {
      title: 'My Subscription',
      icon: '/assets/icons/consultant.png',
      link: '/consdash/subscription',
    },

    {
      title: 'Change Password',
      icon: '/assets/icons/consultant.png',
      link: '/consdash/training',
    },
  ];
  constructor() { }

  ngOnInit(): void {

  }

}
