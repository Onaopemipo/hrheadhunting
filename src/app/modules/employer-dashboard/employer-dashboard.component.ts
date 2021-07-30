import { Component, OnInit } from '@angular/core';
import { EMP_MENU_ITEMS } from '../pages-menu';

@Component({
  selector: 'ngx-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrls: ['./employer-dashboard.component.scss']
})
export class EmployerDashboardComponent implements OnInit {
  menu = EMP_MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
