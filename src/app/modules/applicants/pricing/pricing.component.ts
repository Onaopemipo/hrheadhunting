import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  recruiterStatus: boolean = true;
  CvStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  toggleRecruiter(){
    this.recruiterStatus = true;
    this.CvStatus = false;
  }

  toggleCv(){
    this.CvStatus = true;
    this.recruiterStatus = false;

  }

}
