import { AlertserviceService } from './../../../_services/alertservice.service';
import { AccountServiceProxy, ChangePasswordDTO, ManageJobSeekerRegDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

passwordChange: ChangePasswordDTO = new ChangePasswordDTO();
show: boolean = false;
btnProcessing: boolean = false;
  constructor(private applicant: AccountServiceProxy, private alertMe: AlertserviceService) { }

  ngOnInit(): void {
  }

  viewpassword() {
    this.show = !this.show;
  }

  changePassword(){
    this.applicant.changePassword(this.passwordChange).subscribe(data => {
      if(!data.hasError){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES, 'Password Updated', 'Ok').subscribe(res => {
        })
      }
    })


  }

}
