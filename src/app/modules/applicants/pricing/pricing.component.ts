import { SubscriptionsServiceProxy } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  recruiterStatus: boolean = true;
  CvStatus: boolean = false;

  constructor(private sub: SubscriptionsServiceProxy) { }

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

  async fetchSubscription(){
    // const data = this.sub.
  }

}
