import { Router } from '@angular/router';
import { ArtisanDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { ArtisanServiceProxy } from 'app/_services/service-proxies';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-artisans',
  templateUrl: './artisans.component.html',
  styleUrls: ['./artisans.component.scss']
})
export class ArtisansComponent implements OnInit {

  loading: boolean = false;
  btnProcessing: boolean = false;
  artisanCounter:number = 0;
  myPlanHeader:string = "Nothing here";
  myPlanDesc: string = "No data available yet";
  artisanData: ArtisanDTO [] = []
  artisanFilter = {
    id: null,
    searchText: '',
    dateFrom: undefined,
    dateTo: undefined,
    pageSize: 10,
    pageNo: 1
  }
  constructor(private artisan: ArtisanServiceProxy,public authenService: AuthenticationService, private route: Router) { }

  ngOnInit(): void {
    this.fetchAllArtisans();
  }

  artisanDetails(id:number){
    this.route.navigateByUrl('/artisandetails' + id)
    // alert(id)
  }

  fetchAllArtisans(){
    this.loading = true;
    this.artisan.fetchAllArtisans(this.artisanFilter.searchText, this.artisanFilter.dateFrom,
      this.artisanFilter.dateTo, this.artisanFilter.pageSize, this.artisanFilter.pageNo).subscribe(data => {
        this.loading = false;
      if(!data.hasError){
        this.artisanData = data.value;
        this.artisanCounter = data.totalCount;
        console.log('see all artisans', this.artisanData)
      }
    })
  }

}
