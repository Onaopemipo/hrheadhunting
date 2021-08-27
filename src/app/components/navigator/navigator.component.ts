import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {

  showMenu: boolean = false;
  constructor(public authenService: AuthenticationService) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

  logOut(){
    this.authenService.clearusers();

   }

}
