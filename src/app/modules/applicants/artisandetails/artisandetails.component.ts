import { ReviewArtisanDTO } from './../../../_services/service-proxies';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { ArtisanDTO, ArtisanServiceProxy } from 'app/_services/service-proxies';
import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-artisandetails',
  templateUrl: './artisandetails.component.html',
  styleUrls: ['./artisandetails.component.scss']
})
export class ArtisandetailsComponent implements OnInit {
  @Input() subject: Subject<boolean>

  btnProcessing:boolean = false;
  showRating:boolean = false;
  singleArtisan: ArtisanDTO = new ArtisanDTO();
  artisanId:number = 0;
  stars = [1,2,3,4,5];
  isRated = true;
  rating = 1;

  ratingModel: ReviewArtisanDTO = new ReviewArtisanDTO();

  // ratingModel = {
  //   fullName: '',
  //   starRating: 0,
  //   review: ''
  // }



  constructor(public authenService: AuthenticationService, private alertMe: AlertserviceService, private myArtisan: ArtisanServiceProxy, private artisan: ArtisanServiceProxy, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.artisan.getArtisanById(this.artisanId = Number(this.router.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.singleArtisan = data.value;
        console.log('Your single job is here:', this.singleArtisan);
      }
    })


  }

  toggleRating(){
    this.showRating = true;
  }
  rateArtisan(item){
    this.rating = item;
    this.ratingModel.rating = item;
    console.log('This is your rating',this.rating);
  }

  submitRating(){
    this.myArtisan.postArtisanReview(this.ratingModel).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Ok')
      }
    })
  }

}
