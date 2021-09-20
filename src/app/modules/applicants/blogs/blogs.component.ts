import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {

  showMenu: boolean = false;
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
