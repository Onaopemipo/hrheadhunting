import { AlertserviceService } from './../../../_services/alertservice.service';
import { AccountServiceProxy, UserLoginDTO } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { AlertserviceService } from 'app/_services/alertservice.service';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  loginForm: NgForm;
  userlogin: UserLoginDTO = new UserLoginDTO();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  btnprocessing: boolean = false;

  errorMsg: string = "";
  constructor(
    private AuthenService: AuthenticationService,
    private router: Router,
    private alertMe: AlertserviceService,
    private loginServices: AccountServiceProxy,
  ) { }
  viewpassword() {
    this.show = !this.show;
  }
  loginUser() {
    this.btnprocessing = true;
    this.userlogin.isSocial = false;
    this.loginServices.getToken(this.userlogin).subscribe((data) => {
      if(!data.hasError) {
        // console.log(resp)
        // console.log(resp.result)
        if(data.result.lstPermissions[0] === "ASS"){
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'User Authenticated', 'Go to Dashboard').subscribe(data => {
            if(data){
              // this.router.navigateByUrl('/dashboard')
              this.router.navigateByUrl('/')
            }
          })
        }

      //  else if(resp.result.lstPermissions[0] === "ASS"){
      //     this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'User Authenticated', 'Go to Dashboard').subscribe(data => {
      //       if(data){
      //         // this.router.navigateByUrl('/dashboard')
      //         this.router.navigateByUrl('/')
      //       }
      //     })
      //   }

        else {
          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'User Authenticated', 'Go to Dashboard').subscribe(res => {
            if(res){
              // this.router.navigateByUrl('/dashboard')
              this.router.navigateByUrl('/modules')
            }
          })
        }

       this.AuthenService.addUser(data.result);
      } else {
        this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.FAILED, data.message, 'Ok')
        this.clearerror();
        this.errorMsg = data.message;

      }
    }, error => {
      this.clearerror();
        this.errorMsg = 'Oops! Something went wrong, we are fixing it';
        this.btnprocessing = false;

    });
  }
  clearerror() {
  setTimeout(() => {
    this.errorMsg = '';
    this.btnprocessing = false;
  }, 3000);
}

  openSuccessalert(message) {
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, message, 'Go to Dashboard')
      .subscribe(data => {
        this.btnprocessing = false;
        // this.router.navigate(['/dashboard']);
        this.router.navigate(['modules']);
      if (data) {

      }
    });
}

  ngOnInit(): void {

  }

}
