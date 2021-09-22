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
    pageNumber: 1
  }
  myRole: string = '';
  showMenu: boolean = false;


  constructor(private artisan: ArtisanServiceProxy,public authenService: AuthenticationService, private route: Router) { }

  ngOnInit(): void {
    this.authenService.userRole().then(data => {
      this.myRole = data;
  })
    this.fetchAllArtisans();
  }

  async filterUpdated(filter: any) {
    console.log('See me',filter)
     this.artisanFilter = {...this.artisanFilter, ...filter};
     console.log('Updated filter', this.artisanFilter)
     this.fetchAllArtisans();
   }

   filterPageUpdated(filter: any){
    this.artisanFilter.pageNumber = filter;
    // console.log('See me',filter)
    // this.jobFilter = {...this.jobFilter, ...filter};
    console.log('Updated filter', this.artisanFilter)
    this.fetchAllArtisans();

  }

  artisanDetails(id:number){
    this.route.navigate(['/applicants/artisandetails', id])
    // alert(id)
    // [routerLink]="['/applicants/employerdetails', employer.id]"
  }

  resetFilter(){
    this.artisanFilter.searchText = '';
  }


  fetchAllArtisans(){
    this.loading = true;
    this.artisan.fetchAllArtisans(this.artisanFilter.searchText, this.artisanFilter.dateFrom,
      this.artisanFilter.dateTo, this.artisanFilter.pageSize, this.artisanFilter.pageNumber).subscribe(data => {
        this.loading = false;
      if(!data.hasError){
        this.artisanData = data.value;
        this.artisanCounter = data.totalCount;
        console.log('see all artisans', this.artisanData)
      }
    })
  }

   toggleMenu(){
    this.showMenu = !this.showMenu;
  }

}
