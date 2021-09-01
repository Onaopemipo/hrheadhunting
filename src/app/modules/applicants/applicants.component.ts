import { AlertserviceService } from 'app/_services/alertservice.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';
import { CLIENT_MENU_ITEMS } from '../pages-menu';

@Component({
  selector: 'ngx-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  menu = CLIENT_MENU_ITEMS;
  loginStatus: boolean = false;
  privilege: string[] = [];
  user:string = '';

  constructor(public auth: AuthenticationService, private alertMe: AlertserviceService) { }

  ngOnInit(): void {
      this.auth.getuser().then(data => {
      this.privilege.push(data[0].lstPermissions);
      console.log('Yes ke',data[0].lstPermissions);
      this.user = this.privilege.pop();
      console.log('Here is your privilege:', this.privilege.pop())
    })
  }

  subscription(){
    this.alertMe.openModalAlert(this.alertMe.ALERT_TYPES.SUCCESS, 'Successful', 'Ok')
  }

  async getStatus(){
    this.loginStatus = await this.auth.isAuthenticated();
  }


}
