import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-filter-box',
  templateUrl: './filter-box.component.html',
  styleUrls: ['./filter-box.component.scss']
})
export class FilterBoxComponent implements OnInit {

  @Input() data = [];
  @Input() set value(x) {
    this.selectedItem = x
  }

  @Output() valueChange = new EventEmitter();

  selectedItem = [];

  constructor() { }

  ngOnInit(): void {

  }

   filterUpdated(filter: any) {
    const selectedIndex = this.selectedItem.findIndex(item => item == filter);
    if(selectedIndex > -1){
      this.selectedItem.splice(selectedIndex, 1)
    } else {
      this.selectedItem.push(filter)
    }

    this.valueChange.emit(this.selectedItem)
   }

   isSelected(item){
    return this.selectedItem.find(x => x == item)
   }

   showWhat(aaa){
    alert(aaa)
   }

}
