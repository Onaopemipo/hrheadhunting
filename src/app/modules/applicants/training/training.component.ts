import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  showMenu: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.showMenu = !this.showMenu;
  }

}
