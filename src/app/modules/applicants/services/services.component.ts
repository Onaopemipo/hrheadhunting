import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  loggedIn:boolean = false;
  constructor(public authenService: AuthenticationService) { }

  ngOnInit(): void {
    this.fetchUser();
  }

  showMenu: boolean = false;


  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  async fetchUser(){
    this.loggedIn = await this.authenService.isAuthenticated();
    console.log('See your user:',this.loggedIn);
   }

   logOut(){
    this.authenService.clearusers();

   }

}
