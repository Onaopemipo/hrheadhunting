import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  showMenu: boolean = false;
  myRole: string = '';
  constructor(public authenService: AuthenticationService,) { }

  ngOnInit(): void {
    this.authenService.userRole().then(data => {
      this.myRole = data;
  })
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

}
