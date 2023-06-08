import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-new-header',
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.scss']
})
export class NewHeaderComponent implements OnInit{
  @Output() sideNavToggle = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  constructor() {
  }
  ngOnInit() {
  }

  SideNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sideNavToggle.emit(this.menuStatus);
  }
}
