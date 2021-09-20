import { SubscriptionFeatureDTO } from './../../../_services/service-proxies';
import { SubscriptionsServiceProxy } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  recruiterStatus: boolean = true;
  CvStatus: boolean = false;
  activePlan: boolean = false;
  activePlanB: boolean = false;
  cvPlan: SubscriptionFeatureDTO [] = [];
  recruiterPlan: SubscriptionFeatureDTO [] = [];
  showMenu: boolean = false;
  myRole: string = '';

  constructor(private sub: SubscriptionsServiceProxy, public authenService: AuthenticationService) { }



  ngOnInit(): void {
    this.authenService.userRole().then(data => {
      this.myRole = data;
  })
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  toggleRecruiter(){
    this.recruiterStatus = true;
    this.CvStatus = false;
  }

  toggleCv(){
    this.CvStatus = true;
    this.recruiterStatus = false;

  }

  async fetchRecruiterSub(){
    const data = await this.sub.fetchRecruiterPlanFeatures().toPromise()
    if(!data.hasError){
      this.recruiterPlan = data.value;
      console.log(this.recruiterPlan)
    }
  }

  async fetchCVPlan(){
    const data = await this.sub.fetchCvRewritePlanFeatures().toPromise()
    if(!data.hasError){
      this.cvPlan = data.value;
      console.log(this.cvPlan)
    }
  }

}
