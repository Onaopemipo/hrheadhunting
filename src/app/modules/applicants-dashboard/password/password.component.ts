import { AlertserviceService } from './../../../_services/alertservice.service';
import { AccountServiceProxy, ManageJobSeekerRegDTO } from './../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

jobSeeker: ManageJobSeekerRegDTO = new ManageJobSeekerRegDTO();
show: boolean = false;
btnProcessing: boolean = false;
  constructor(private applicant: AccountServiceProxy, private alertMe: AlertserviceService) { }

  ngOnInit(): void {
  }

  viewpassword() {
    this.show = !this.show;
  }

  changePassword(){
    if(this.jobSeeker.password){
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES, 'Password Updated', 'Dismiss').subscribe(res => {
        if(res){
          this.jobSeeker = new ManageJobSeekerRegDTO();
        }
      })
    }


  }

}
