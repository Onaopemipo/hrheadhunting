import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  showMenu: boolean = false;
  constructor(public authenService: AuthenticationService,) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

}
