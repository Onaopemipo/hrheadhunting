import { AlertserviceService } from 'app/_services/alertservice.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CLIENT_MENU_ITEMS } from '../pages-menu';

@Component({
  selector: 'ngx-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  menu = CLIENT_MENU_ITEMS;
  loginStatus: boolean = false;
  constructor(public auth: AuthenticationService, private alertMe: AlertserviceService) { }

  ngOnInit(): void {
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/61240dac649e0a0a5cd28f02/1fdqdar62';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
  }

  subscription(){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Successful', 'Ok')
  }

  async getStatus(){
    this.loginStatus = await this.auth.isAuthenticated();
  }


}
