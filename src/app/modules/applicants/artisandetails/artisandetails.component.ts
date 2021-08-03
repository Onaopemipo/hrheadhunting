import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-artisandetails',
  templateUrl: './artisandetails.component.html',
  styleUrls: ['./artisandetails.component.scss']
})
export class ArtisandetailsComponent implements OnInit {

  btnProcessing:boolean = false;
  constructor(public authenService: AuthenticationService,) { }

  ngOnInit(): void {
  }

}
