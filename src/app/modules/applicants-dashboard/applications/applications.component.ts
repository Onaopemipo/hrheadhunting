import { ApplicationsServiceProxy, JobApplicationDTO } from 'app/_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  applicationHeader:string = "Nothing here";
  applicationDesc: string = "You don't have any application yet";
  myUser: any = '';
  loading:boolean = false;
  counter:number = 0;
  allMyApplications: JobApplicationDTO [] = []
  appFilter = {
    jobId: 0,
    recStageId: 0,
    searchText: '',
    dateFrom: undefined,
    dateTo: undefined,
    pageSize: 10,
    pageNo: 1

  }

  constructor(private auth: AuthenticationService, private app: ApplicationsServiceProxy) { 
    this.myUser = this.auth.globalUser
    console.log(this.myUser)
  }

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications() {
    this.loading = true;
    this.app.fetchMyApplications(this.appFilter.jobId, this.appFilter.recStageId, this.appFilter.searchText,
      this.appFilter.dateFrom, this.appFilter.dateTo, this.appFilter.pageSize, this.appFilter.pageNo).subscribe(data => {
        this.loading = false;
      if(!data.hasError){
        this.allMyApplications = data.value;
        this.counter = data.totalCount;
        console.log('Hey guy, see my applications',this.allMyApplications)
      }
    })
  }

}
