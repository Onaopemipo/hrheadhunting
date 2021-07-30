import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/_services/authentication.service';

@Component({
  selector: 'ngx-scorecv',
  templateUrl: './scorecv.component.html',
  styleUrls: ['./scorecv.component.scss']
})
export class ScorecvComponent implements OnInit {

  btnprocessing: boolean = false;
  showMenu: boolean = false;
  constructor(public authenService: AuthenticationService) { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

}
