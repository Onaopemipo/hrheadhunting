import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  applicationHeader:string = "Nothing here";
  applicationDesc: string = "You don't have any application yet";
  constructor() { }

  ngOnInit(): void {
  }

}
