import { Component, OnInit } from '@angular/core';
import { SubscriptionsServiceProxy, Subscription } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  emptyHeader: string = 'You have no subscription here';
  emptyDescription: string = 'There is no data here';
  loading:boolean = false;
  mySubData: Subscription [] = [];
  filter: {
    id: 0,
    searchType: '',
    searchText: '',
    pageSize: 10,
    pageNumber: 1
  }
  constructor(private sub: SubscriptionsServiceProxy) { }

  ngOnInit(): void {
  }

  async fetchSubs(){
    const data = await this.sub.fetchAllSubscriptions(this.filter.id, this.filter.searchType, this.filter.searchText, this.filter.pageSize, this.filter.pageNumber).toPromise();
    if(!data.hasError){
      this.mySubData = data.value;
    }
  }
}
