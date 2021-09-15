import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AccountServiceProxy, ResestPasswordDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  show:boolean = false;

 resetPass: ResestPasswordDTO = new ResestPasswordDTO();
  constructor(private account: AccountServiceProxy,private alertMe: AlertserviceService, private route: Router) { }

  ngOnInit(): void {
  }

  resetPassword(){
    this.account.resetPassword(this.resetPass).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, data.message, 'Go to login').subscribe(done => {
          if(done){
            this.route.navigateByUrl('auth/login');
          }
        })
      }
    })
  }

  viewpassword() {
    this.show = !this.show;
  }

}
