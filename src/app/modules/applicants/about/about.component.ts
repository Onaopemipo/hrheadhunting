import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  showMenu: boolean = false;
  userPerm: string = '';
  myRole: string = '';
  constructor(public authenService: AuthenticationService) { }

  ngOnInit(): void {
      this.authenService.userRole().then(data => {
      this.myRole = data;
    })
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }



}
