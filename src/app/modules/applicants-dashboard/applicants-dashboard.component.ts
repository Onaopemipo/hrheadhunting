import { CLIENT_MENU_ITEMS } from './../pages-menu';
import { Component, OnInit } from '@angular/core';
// import { CLIENT_MENU_ITEMS } from '../pages-menu';

@Component({
  selector: 'ngx-applicants-dashboard',
  templateUrl: './applicants-dashboard.component.html',
  styleUrls: ['./applicants-dashboard.component.scss']
})
export class ApplicantsDashboardComponent implements OnInit {
  menu = CLIENT_MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
    // alert('I am here')
  }

}
