import { SubscriptionFeatureDTO, SubscriptionsServiceProxy, SubscriptionPlanFeatureDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-rewriteplans',
  templateUrl: './rewriteplans.component.html',
  styleUrls: ['./rewriteplans.component.scss']
})
export class RewriteplansComponent implements OnInit {

  rewritePlans: SubscriptionFeatureDTO [] = [];
  allPlans: SubscriptionPlanFeatureDTO [] = [];
  myRole: string = '';
  constructor(private subscription: SubscriptionsServiceProxy, public authenService: AuthenticationService,) { }

  ngOnInit(): void {
    this.authenService.userRole().then(data => {
      this.myRole = data;
  })
    this.fetchPlans();
  }


  async fetchPlans(){
    const data = await this.subscription.fetchCvRewritePlanFeatures().toPromise();
    if(!data.hasError){
      this.rewritePlans = data.value;
      this.allPlans = data.value[0].plans
      console.log('See rewrite:',this.rewritePlans);
      console.log('See allplans:',this.allPlans);
    }
  }

}
