import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  show: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  btnprocessing: boolean = false;
  errorMsg: string = "";

  constructor(private route: Router) { }
  gotoSetup() {
    this.route.navigate(['/onboarding/accountsetup']);
  }
  ngOnInit(): void {
  }



  viewpassword() {
    this.show = !this.show;
  }

}
