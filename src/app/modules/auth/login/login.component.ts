import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from 'app/_services/auth.service';
import { AlertserviceService } from './../../../_services/alertservice.service';
import { AccountServiceProxy, UserLoginDTO } from '../../../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
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
  socialLogin: UserLoginDTO = new UserLoginDTO();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  btnprocessing: boolean = false;
  googleData: any;
  facebookData: any;
  linkedInData: any [] = [];
  twitterData: any;
  emailPrompt: boolean = false;
  btnProcessing: boolean = false;
  applicantNames = []


  errorMsg: string = "";
  constructor(
    private AuthenService: AuthenticationService,
    private router: Router,
    private alertMe: AlertserviceService,
    private loginServices: AccountServiceProxy,
    private social: AuthService,
    private route: Router,
    private http: HttpClient,
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

addSocialEmail(){
  this.btnProcessing = true;
  let login: UserLoginDTO = new UserLoginDTO();
  login.email = this.socialLogin.email;
  login.password = this.socialLogin.password;
  this.btnProcessing = false;
  this.emailPrompt = false;
  this.loginServices.getToken(this.socialLogin).subscribe(data => {
    if(!data.hasError){
      console.log(data);
      this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'You are authenticated', 'Go to dashboard').subscribe(res => {
        if(res){
          this.route.navigateByUrl('/')
        }
      })
      this.AuthenService.addUser(data.result);
    }
  })
}

doLinkedIn(){
  let configUrl = 'https://www.linkedin.com/oauth/v2/authorization?client_id=78yijd3zifrl4b&redirect_uri=https://headhunting-79281.firebaseapp.com/__/auth/handler&scope=r_liteprofile%20r_emailaddress&response_type=code';
 // let configUrl = "https://api.linkedin.com/v2/me";
  // let paramsData = new HttpParams().set("client_id",'78yijd3zifrl4b')
  // .set("redirect_uri", 'http://localhost:5000/')
  // .set("scope", 'r_liteprofile r_emailaddress')
  // .set("response_type", 'code')
//   this.http.get(configUrl).subscribe(data => {
//     console.log('LinkedIn data is here',data);

//   })
//  }

window.location.href = configUrl;
}
 doGoogle(){
  // this.social.doGoogleLogin().then(data => {
  //   this.googleData = data;
  //   console.log('You are', this.googleData);
  //   this.socialLogin.isSocial = true;
  //   this.socialLogin.email = this.googleData.email;
  //   this.applicantNames = this.googleData.displayName.split(' ');
  //   this.userlogin.firstName = this.applicantNames[1];
  //   this.userlogin.lastName = this.applicantNames[0];
  //   console.log(this.applicantNames + 'I am', this.userlogin.firstName + 'Last Name:' + this.userlogin.lastName)
  //   if(this.socialLogin.email){
  //     this.loginServices.getToken(this.socialLogin).subscribe(data => {
  //       if(!data.hasError){
  //         console.log(data);
  //         this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'You are authenticated', 'Go to dashboard').subscribe(res => {
  //           if(res){
  //             this.route.navigateByUrl('/')
  //           }
  //         })
  //         this.AuthenService.addUser(data.result);
  //       }
  //     })

  //   }else {
  //     this.emailPrompt = true;
  //   }

  // });
}

doFacebook(){
  // this.social.doFacebookLogin().then(data => {
  //   this.facebookData = data;
  //   console.log('See your Facebook data',this.facebookData.displayName);
  //   this.socialLogin.isSocial = true;
  //   this.socialLogin.email = this.facebookData.email;
  //   this.applicantNames = this.facebookData.displayName.split(' ');
  //   this.userlogin.firstName = this.applicantNames[0];
  //   this.userlogin.lastName = this.applicantNames[1];
  //   console.log(this.applicantNames + 'I am', this.userlogin.firstName + 'Last Name:' + this.userlogin.lastName)
  //   if(this.socialLogin.email){
  //     this.loginServices.getToken(this.socialLogin).subscribe(data => {
  //       if(!data.hasError){
  //         console.log(data);
  //         this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'You are authenticated', 'Go to dashboard').subscribe(res => {
  //           if(res){
  //             this.route.navigateByUrl('/')
  //           }
  //         })
  //         this.AuthenService.addUser(data.result);
  //       }
  //     })

  //   }else {
  //     this.emailPrompt = true;
  //   }

  // });
}

 doTwitter(){
  //  this.social.doTwitterLogin().then(data => {
  //    this.twitterData = data;
  //    console.log('Here is you Twitter', this.twitterData);
  //    this.socialLogin.isSocial = true;
  //    this.socialLogin.email = this.twitterData.email;
  //    this.applicantNames = this.twitterData.displayName.split(' ');
  //    this.userlogin.firstName = this.applicantNames[0];
  //    this.userlogin.lastName = this.applicantNames[1];
  //    console.log(this.applicantNames + 'I am', this.userlogin.firstName + 'Last Name:' + this.userlogin.lastName)
  //    if(this.socialLogin.email){
  //      this.loginServices.getToken(this.socialLogin).subscribe(data => {
  //        if(!data.hasError){
  //          console.log(data);
  //          this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'You are authenticated', 'Go to dashboard').subscribe(res => {
  //            if(res){
  //              this.route.navigateByUrl('/')
  //            }
  //          })
  //          this.AuthenService.addUser(data.result);
  //        }
  //      })

  //    }else {
  //      this.emailPrompt = true;
  //    }

  //  });
 }

  ngOnInit(): void {

  }

}
