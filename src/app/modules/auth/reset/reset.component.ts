import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AccountServiceProxy } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  btnProcessing: boolean = false;
  userEmail = {
    email:''
  }

  constructor(private account: AccountServiceProxy, private alertMe: AlertserviceService, private route: Router) { }

  ngOnInit(): void {

  }

  resetPassword(){
    this.btnProcessing = true;
    this.account.forgotPassword(this.userEmail.email).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Reset link has been sent to your email', 'Ok')
        this.route.navigateByUrl('auth/login');
      }

      else{
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'Ok')
        this.btnProcessing = false;
      }
    })
  }
}
