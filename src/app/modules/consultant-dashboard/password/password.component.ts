import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AccountServiceProxy, ChangePasswordDTO, ManageConsultantDTO } from 'app/_services/service-proxies';

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
