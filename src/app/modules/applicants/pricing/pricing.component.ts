import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  jobSeekerStatus: boolean = true;
  employersStatus: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }


  toggleJobSeekers(){
    this.jobSeekerStatus = true;
    this.employersStatus = false;
  }

  toggleEmpoyers(){
    this.employersStatus = true;
    this.jobSeekerStatus = false;

  }

}
