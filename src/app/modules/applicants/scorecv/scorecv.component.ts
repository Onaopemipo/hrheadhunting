import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-scorecv',
  templateUrl: './scorecv.component.html',
  styleUrls: ['./scorecv.component.scss']
})
export class ScorecvComponent implements OnInit {

  btnprocessing: boolean = false;
  showMenu: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

}
