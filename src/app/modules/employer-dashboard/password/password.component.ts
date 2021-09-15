import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AccountServiceProxy, ConsultantServiceProxy, ManageEmployerDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  recruiter: ManageEmployerDTO = new ManageEmployerDTO();
  show: boolean = false;
  btnProcessing: boolean = false;
    constructor(private consultant: ConsultantServiceProxy, private alertMe: AlertserviceService) { }

    ngOnInit(): void {
    }

    viewpassword() {
      this.show = !this.show;
    }

    changePassword(){
      if(this.recruiter.password){
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES, 'Password Updated', 'Dismiss').subscribe(res => {
          if(res){
            this.recruiter = new ManageEmployerDTO();
          }
        })
      }


    }
}
