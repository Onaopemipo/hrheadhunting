import { ArtisanDTO, ArtisanServiceProxy } from 'app/_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-artisandetails',
  templateUrl: './artisandetails.component.html',
  styleUrls: ['./artisandetails.component.scss']
})
export class ArtisandetailsComponent implements OnInit {


  btnProcessing:boolean = false;
  singleArtisan: ArtisanDTO = new ArtisanDTO();
  artisanId:number = 0;
  constructor(public authenService: AuthenticationService, private artisan: ArtisanServiceProxy, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.artisan.getArtisanById(this.artisanId = Number(this.router.snapshot.paramMap.get("id"))).subscribe(data => {
      if(!data.hasError){
        this.singleArtisan = data.value;
        console.log('Your single job is here:', this.singleArtisan);
      }
    })
  }

}
