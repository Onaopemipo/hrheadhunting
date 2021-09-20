import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { ConsultantServiceProxy, TrainingDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "No data available yet";
  loading: boolean = false;
  showMenu: boolean = false;
  trainingCounter: number = 0;
  trainingData: TrainingDTO [] = []

  trainingFilter = {
    searchText: '',
    dateFrom: undefined,
    dateTo: undefined,
    pageSize: 10,
    pageNo: 1
  }
  myRole: string = '';
  constructor(public authenService: AuthenticationService,private training: ConsultantServiceProxy,) { }

  ngOnInit(): void {
    this.fetchTraining();

    this.authenService.userRole().then(data => {
      this.myRole = data;
  })
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  filterUpdated(filter: any) {

    this.trainingFilter = {...this.trainingFilter, ...filter};
    console.log('Updated filter', this.trainingFilter)
    this.fetchTraining();
  }

  fetchTraining(){
    this.loading = true;
      this.training.fetchActiveTrainings(this.trainingFilter.searchText, this.trainingFilter.dateFrom,
        this.trainingFilter.dateTo, this.trainingFilter.pageSize, this.trainingFilter.pageNo).subscribe(data => {
          this.loading = false;
          if(!data.hasError)
          {
            this.trainingData = data.value;
            this.trainingCounter = data.totalCount;
          } })
    }

}
