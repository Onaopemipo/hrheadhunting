import { Component, OnInit } from '@angular/core';
import { AlertserviceService } from 'app/_services/alertservice.service';
import { AuthenticationService } from 'app/_services/authentication.service';
import { AccountServiceProxy, ChangePasswordDTO, ConsultantServiceProxy, ManageEmployerDTO } from 'app/_services/service-proxies';

@Component({
  selector: 'ngx-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  passwordChange: ChangePasswordDTO = new ChangePasswordDTO();
  loggedinUser;
  show: boolean = false;
  btnProcessing: boolean = false;
  passMixsmatch: boolean = false;
  weakPass: boolean = false;
  paswdFormat =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    constructor(private applicant: AccountServiceProxy, private alertMe: AlertserviceService, private auth: AuthenticationService,) { }

    ngOnInit(): void {
    }

    viewpassword() {
      this.show = !this.show;
    }

    async getUser(){
      this.loggedinUser = await this.auth.getuser()
      console.log('Na me o', this.loggedinUser[0].email)
    }

    checkPass(){
      if (!this.passwordChange.password.match(this.paswdFormat)) {
        this.weakPass = true;
      }
    }

    checkMatch(){
      if(this.passwordChange.password !== this.passwordChange.confirmPassword){
        this.passMixsmatch = true;
      }
    }

    changePassword(){
      this.btnProcessing = true;
      this.passwordChange.email = this.loggedinUser[0].email;
      this.passwordChange.currentPassword;
      this.passwordChange.password;
      this.passwordChange.confirmPassword;
      this.applicant.changePassword(this.passwordChange).subscribe(data => {
        this.btnProcessing = false;
        if(!data.hasError){
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES, 'Password updated successfully', 'Ok').subscribe(res => {
            if(res){
              this.passwordChange = new ChangePasswordDTO();
            }
          })
        }
        else {
          this.btnProcessing = false;
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'Ok')
        }
      })

    }
}
