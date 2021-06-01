import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show: boolean = false;
  loginForm: FormGroup;
  userloginDto: any = {
    email: '',
    passwword: ''
  }; 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  btnprocessing: boolean = false;
  errorMsg: string = "";
  constructor(
    private AuthenService: AuthenticationService,
    private router: Router,
  ) { }
  viewpassword() {
    this.show = !this.show;
  }

  clearerror() {
  setTimeout(() => {
    this.errorMsg = "";
    this.btnprocessing = false;
  }, 3000);
}

  ngOnInit(): void {

  }

}
