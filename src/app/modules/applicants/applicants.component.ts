import { Component, OnInit } from '@angular/core';
import { CLIENT_MENU_ITEMS } from '../pages-menu';

@Component({
  selector: 'ngx-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {
  menu = CLIENT_MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
